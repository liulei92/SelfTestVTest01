const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  // publicPath  type:{string} default:'/'
  // 将部署应用程序的基本URL。
  // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
  // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集publicPath到'/my-app/'.
  // 目前无子路径
  publicPath: IS_PROD ? './' : '/',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist' 输出文件目录
  outputDir: process.env.outputDir || 'dist',
  //  相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: '',
  // 加hash 防缓存
  // filenameHashing: true,
  // pages:{ type:Object,Default:undfind }
  /*
    构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
    个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
    的字符串，
    注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  */
  // pages: {
  // index: {
  // entry for the page
  // entry: 'src/index/main.js',
  // the source template
  // template: 'public/index.html',
  // output as dist/index.html
  // filename: 'index.html'
  // },
  // when using the entry-only string format,
  // template is inferred to be `public/subpage.html`
  // and falls back to `public/index.html` if not found.
  // Output filename is inferred to be `subpage.html`.
  // subpage: 'src/subpage/main.js'
  // },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 修复Lazy loading routes Error： Cyclic dependency  [https://github.com/vuejs/vue-cli/issues/1669]
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      // .set('@scss', resolve('src/assets/scss'))
      .set('@components', resolve('src/components'))
      // .set('@plugins', resolve('src/plugins'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      // .set('@layouts', resolve('src/layouts'))
      // .set('@static', resolve('src/static'))

    // 压缩图片 需要安装image-webpack-loader'
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: '65-90', speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   })

    // 多页面配置，为js添加hash
    config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

    // 修改图片输出路径
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     name: path.join('../assets/', 'img/[name].[chunkhash:8].[ext]')
    //   })

    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    // config.plugin('define').tap(args => {
    //   const argv = process.argv
    //   const mode = argv[argv.indexOf('--project-mode') + 1]
    //   args[0]['process.env'].MODE = `"${mode}"`
    //   args[0]['process.env'].BASE_API = '"http://47.94.138.75:8000"'
    //   return args
    // })
  },
  configureWebpack: config => {
    // cdn引用时配置externals
    // config.externals = {
    //   'vue': 'Vue',
    //   'element-ui': 'ELEMENT',
    //   // 'vue-router': 'VueRouter',
    //   'vuex': 'Vuex'
    //   // 'axios': 'axios'
    // }
    if (IS_PROD) {
      const plugins = []
      // 去除 console.log，使用babel-plugin-transform-remove-console插件 代替
      // plugins.push(
      //     new UglifyJsPlugin({
      //       uglifyOptions: {
      //         compress: {
      //           // warnings: false,
      //           drop_console: true,
      //           drop_debugger: false,
      //           pure_funcs: ['console.log'] // 移除console
      //         }
      //       },
      //       sourceMap: false,
      //       parallel: true
      //     })
      // );
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // 打包分析
      if (process.env.IS_ANALYZ) {
        plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 9002
          })
        )
      }
      // 合并plugins
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: IS_PROD,
    // 为css后缀添加hash
    // extract: {
    //   filename: 'css/[name].[hash:8].css',
    //   chunkFilename: 'css/[name].[hash:8].css'
    // },
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // px转换为rem
      // postcss: {
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       rootValue : 1, // 换算的基数
      //       selectorBlackList  : ['weui', 'el'], // 忽略转换正则匹配项
      //       propList   : ['*']
      //     })
      //   ]
      // }
    }
  },
  pluginOptions: {
    // 安装vue-cli-plugin-style-resources-loader插件
    // 添加全局样式global.scss
    // "style-resources-loader": {
    //   preProcessor: "scss",
    //   patterns: [
    //     resolve(__dirname, "./src/scss/scss/variables.scss")
    //   ]
    // }
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: IS_PROD,
    // host: '0.0.0.0',
    port: 9901,
    https: false,
    hotOnly: false,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      '/account': {
        target: 'https://woyaofq.xyz/',
        changeOrigin: true,
        pathRewrite: {
          '^/account': 'account'
        }
      },
      // '/api': {
      //   target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': 'api'
      //   }
      // }
    },
    before: app => {}
  }
}
