const anchorPlugin = require('markdown-it-anchor')
const mdContainer = require('markdown-it-container')
const { slugify } = require('transliteration')
const md = require('markdown-it')({ html: true })
const mdContainerDemoOpts = {
  validate (params) {
    return params.trim().match(/^demo\s*(.*)$/)
  },
  render (tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : ''
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
      return `<demo-block>
                    ${description ? `<div>${md.render(description)}</div>` : ''}
                    <!--zeng-demo:
                     ${content}
                    :zeng-demo-->
                `
    }
    return '</demo-block>'
  }
}

function mdWithPlugins (md) {
  md.use(anchorPlugin, { level: 2, slugify, permalink: true, permalinkBefore: true })
  md.use(mdContainer, 'demo', mdContainerDemoOpts)
  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
  return md
}

function overWriteFenceRule (md) {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 判断 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1]
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info === 'html' && isInDemoContainer) {
      return `<template v-slot:highlight><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`
    }
    return defaultRender(tokens, idx, options, env, self)
  }
  return md
}

mdWithPlugins(md);
overWriteFenceRule(md);

module.exports = md
