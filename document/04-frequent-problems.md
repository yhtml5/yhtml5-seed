## problems


### How to use
- [x] How to webpack Multi Page
- [x] How to custom page,Dynamically generated html
- [x] Allow server can accessible externally

### bug
- [ ] level1  --can't set chunkhash in dev.env
- [ ] level2  --Custom domain name
- [ ] level3  --开发模式下热更新俩次
- [ ] level3  --clear repeated css class

### Error in developing
- [ ] windows 下兼容问题
- [x] $ is not defined
- [x] file-loader option.outputPath not working
    It seems that some features on GitHub version are not yet deployed to npm registry.
    Try installing from GitHub repo: npm install webpack/file-loader --save-dev. You also have to use trailing slash on your paths and it should work:
    ```query: {
      publicPath: 'static/fonts/',
      outputPath: 'static/fonts/',
      name: '[hash].[ext]',
    }
    ```
- [x] if(!loader.query) return loader.loader;TypeError: Cannot read property 'query' of undefined
    Instead of using key loaders in your config use key loader.
    There is no option loaders in ExtractTextPlugin.
- [x] Hot Module Replacement VS reload
    * index.jsx | add `import {AppContainer} from 'react-hot-loader';`
    * index.jsx | add `if (module.hot) {}` in the index.jsx
    * webpack.js | add `entry: {hot: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:61200', 'webpack/hot/only-dev-server'] },`
    * webpack.js | add `new HtmlWebpackPlugin` and set `{chunks: ['index', 'vendor', 'hot', 'manifest']`
    * webpack.js | set `devServer.hot: true`
    * [react-hot-loader][react-hot-loader]
    * [react-hot-boilerplate][react-hot-boilerplate]
    * [热更新教程][react-hot-tutorial]
- [x] Code is too big after webpack, it always bigger then compressed package which provided by the third party
    * set devtool: "false" in production environment
    * set NODE_ENV=production
    * don't webpack, but use third party like `*.min.*` command. `resolve.alias`
    * http://blog.csdn.net/code_for_free/article/details/51583737
    * http://www.jianshu.com/p/a64735eb0e2b
    * [Make your own React production version with webpack][webpack-optimize-production]
- [ ] It looks like you're using a minified copy of the development build of React.
      When deploying React apps to production,
      make sure to use the production build which skips development warnings and is faster.
      See https://fb.me/react-minification for more details.
      webpack + react 优化：缩小js包体积 [webpack-optimize-uglify]
    * https://github.com/mishoo/UglifyJS2#usage
- [x] webpack打包第三方类库的正确姿势
    * externals vs resolve vs require [use resolve][webpack-optimize-resolve]
    * set `externals: { moment: true}` and add `<script src="//cdn.com/moment.min.js"></script>`
    * set `resolve: { alias: {moment: "moment/min/moment-with-locales.min.js"}}`
    * set `var moment = require('moment/min/moment-with-locales.min.js');`
- [x] Hot Module Replacement can't work when *.css changed
    * you can use postCSS (using CSS Modules)
- [x] [Development][webpack-development],Never use any of these tools in production. Ever
    * Adjusting Your Text Editor
    * Source Maps
    * devtool: "cheap-eval-source-map"
- [x] how to set `*.*?hash`
    * `HtmlWebpackPlugin.hash=true`append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
    * `webpack.filename *.*?[hash]`
- [ ] Multiple pages, [wrong chunks order][wrong-chunks-order]
- [x] webpackJsonp is not defined
    * set multiple pages with CommonsChunkPlugin and HtmlWebpackPlugin.
    * CommonsChunkPlugin choice chunks pack into common package  `chunks: ['vendor', 'index']`

[react-hot-loader]:https://github.com/gaearon/react-hot-loader
[react-hot-boilerplate]:https://github.com/gaearon/react-hot-boilerplate/tree/next
[react-hot-tutorial]:http://www.jianshu.com/p/941bfaf13be1
[webpack-dashboard]:https://github.com/FormidableLabs/webpack-dashboard
[webpack-development]:https://webpack.js.org/guides/development/
[webpack-optimize-resolve]:http://www.tuicool.com/articles/fQB3IjE
[webpack-optimize-uglify]:http://blog.csdn.net/code_for_free/article/details/51583737
[webpack-optimize-production]:http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
[wrong-chunks-order]:https://github.com/ampedandwired/html-webpack-plugin/issues/481
[template-option]:https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
