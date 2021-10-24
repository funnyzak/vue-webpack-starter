module.exports = {
  // 使用相对路径
  publicPath: '',
  // 将 lint 错误输出为编译警告
  lintOnSave: 'warning',
  // 输出文件夹
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 文件名hash
  filenameHashing: true,
  //  multi-page 模式, entry设置
  pages: {
    index: {
      entry: 'src/index/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/second.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `second.html`。
    second: 'src/second/main.ts'
  }
}
