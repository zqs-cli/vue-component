// const vueLoader = require('vue-loader').default;
const { parse, compileTemplate, compileStyle } = require('@vue/compiler-sfc');
// const { baseCompile } = require('@vue/compiler-core')
// const Vue = require('vue')

// const demoCpntsReg = new RegExp(/(<!--zeng-demo:) ([\s\S\?n+]*) \n*?:zeng-demo-->/g)
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

function matchImports (code) {
  return code.match(IMPORT_RE) || [];
}

const uniqueArr = (arr) => {
  return [...new Set([...arr])]
}

// 查找第一个 `,` 的位置; 例如: import Vue, { defineComponent, ref } from 'vue'
function findFirstDot (imps) {
  const start = imps.indexOf('{')
  let firstDot = -1
  if (start !== -1) {
    firstDot = imps.slice(0, start).indexOf(',')
  }
  return firstDot
}

// 分析处理 import 导入依赖项
function getImportsMaps (importStr) {
  const importIndex = importStr.indexOf('import')
  const fromIndex = importStr.indexOf('from')
  const endIndex = importStr.endsWith(';') ? importStr.length - 1 : importStr.length;
  const imps = importStr.slice(importIndex + 'import'.length, fromIndex).trim()
  const by = importStr.slice(fromIndex + 'from'.length, endIndex).trim()
  const impsArr = []
  const firstDot = findFirstDot(imps)
  if (firstDot !== -1) {
    const main = imps.slice(0, firstDot).trim()
    const others = imps.slice(firstDot + 1, endIndex).trim()
    impsArr.push(main, others)
  } else {
    impsArr.push(imps)
  }
  return {
    by,
    imps: impsArr
  }
}

// 将导入依赖数组分析合并处理
function prodImports (importsArr) {
  const maps = {}; const reurnImports = []
  importsArr.forEach(v => {
    const { by, imps } = getImportsMaps(v)
    maps[by] ? maps[by].push(...imps) : (maps[by] = imps)
  })
  for (const [key, value] of Object.entries(maps)) {
    let defaultImport = ''; let otherImport = [];
    uniqueArr(value).map(v => {
      const vtrim = v.trim()
      const vlen = vtrim.length
      const isOtherDefault = vtrim.startsWith('{')
      if (isOtherDefault) {
        otherImport.push(...vtrim.slice(1, vlen - 1).split(',').map(s => (s || '').trim()))
        otherImport = uniqueArr(otherImport)
      } else {
        defaultImport = vtrim
      }
    })
    const hasOtherImport = otherImport.length
    const otherImportStr = hasOtherImport ? '{' + `${otherImport.join(', ')}` + '}' : ''
    const importStr = `import ${defaultImport}${defaultImport && hasOtherImport ? ',' : ''}${otherImportStr} from ${key}`
    reurnImports.push(importStr)
  }
  return reurnImports
}

// 获取 markdown 中的 vue demo
function getMdSfc (md) {
  const startTag = '<!--zeng-demo:';
  const endTag = ':zeng-demo-->'
  const startTagLen = startTag.length
  const endTagLen = endTag.length
  let start = 0; let id = 0; const output = []; const VCArr = []; let commentStart = md.indexOf(startTag); let commentEnd = md.indexOf(endTag)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(md.slice(start, commentStart))
    const VC = md.slice(commentStart + startTagLen, commentEnd)
    const zengDemoName = `zeng-demo${id}`
    output.push(`<template v-slot:source><${zengDemoName} /></template>`)
    VCArr.push({ name: zengDemoName, VC })
    // 重新计算下一次位置
    start = commentEnd + endTagLen
    commentStart = md.indexOf(startTag, start)
    commentEnd = md.indexOf(endTag, commentStart + endTagLen)
    id++
  }
  output.push(md.slice(start))
  return { output, VCArr }
}

function templateToRender (options) {
  let render = 'null';
  const { source } = options
  if (source) {
    const { code } = compileTemplate({
      ...options
    })
    render = `(() => {
            const Vue = require('vue'); \n
            ${code}
        })()`
  }
  return render
}

function handleVCScript (scriptContent, render) {
  let scriptStr = scriptContent.trim(); let imports = []; let scriptFn = ''
  if (scriptStr) {
    scriptStr = scriptStr.replace(/export\s+default/, 'const democomponentExport =')
    imports = matchImports(scriptStr)
    scriptStr = scriptStr.replace(IMPORT_RE, '')
    scriptFn = `function (){
            ${scriptStr}\n
            return {
                ...democomponentExport,
                render: ${render}
            }
        }`
  }
  return {
    imports,
    scriptFn
  }
}

function handleStyles (styles, options) {
  const styleArr = []
  styles.map(sty => {
    const { content, attrs: { lang, scoped } } = sty
    const { code } = compileStyle({
      source: content,
      scoped,
      preprocessLang: lang,
      ...options,
    })
    styleArr.push(code)
  })
  return styleArr
}

// 暂时不考虑 函数式 组件，只考虑 .vue 的 sfc 组件
// options: SFCScriptCompileOptions
function compilerMdSfc (options) {
  const { sfc, id } = options
  const { descriptor, } = parse(sfc)
  const { template, script, styles } = descriptor
  const render = templateToRender({ source: template.content || '', id, scoped: true, compilerOptions: { mode: 'function', prefixIdentifiers: true, inline: false, } })
  const { imports, scriptFn } = handleVCScript(script.content, render)
  const styleArr = handleStyles(styles, { id })
  return {
    imports,
    scriptFn,
    styleArr
  }
}

exports.getMdSfc = getMdSfc;
exports.prodImports = prodImports;
exports.compilerMdSfc = compilerMdSfc;

