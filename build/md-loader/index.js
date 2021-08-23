const md = require('./config')
const { getMdSfc, compilerMdSfc, prodImports } = require('./util')

function mdLoader (source) {
  const content = md.render(source)
  const { output, VCArr } = getMdSfc(content)
  const allImports = []; const allComponents = []; const allStyles = []
  VCArr.forEach(({ name, VC }, i) => {
    const { scriptFn, imports, styleArr } = compilerMdSfc({ sfc: VC, id: `00${i}` })
    allImports.push(...imports)
    allComponents.push(`"${name}": (${scriptFn})()`)
    allStyles.push(...styleArr)
  })
  const importArr = prodImports(allImports)

  const VCMd = `
        <template>
            <section class="content zeng-doc">${output.join('')}</section>
        </template>
        <script>
            ${importArr.join('\n')}
            const Vue = require('vue');
            const vm = Vue.defineComponent({
                name: 'zeng-doc',
                components: {
                    ${allComponents.join(',')}
                },
                mounted(){
                    console.log(vm)
                }
            })
            export default vm
        </script>
        <style>
          ${allStyles.join('\n')}
        </style>
    `
  return VCMd
}

module.exports = mdLoader
