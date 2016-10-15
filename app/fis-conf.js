/*=====================================================================
 * 配置说明:
 *
 * 监听文件: 选择你需要监听的文件, 已经有了对应的demo写法(Glob/正则)
 * 目录规范: 提供默认demo写法
 * 配置data:
 *    name  --项目名
 *    path  --静态资源目录
 *    viewType  view--单页应用, page--多页应用
 *    framework  可配置项 jquery,angular,vue,(react)
 * 依赖关系:
 *    基于整个系统,自己的开发模块,定义依赖关系即可
 *    基于整个系统,属于第三包的,请指定打包顺序
 *    基于单个页面,定义依赖关系,通过allInOne打包
 *
 *====================================================================*/
var yhtml5Data = {
    author: '张大漾丨王晨翱',
    version: 1.2,
    name: "yhtml5",
    viewType: "page",
    domain: ".",
    path: "/static",
    framework: "jquery",
    isStart: false
}
console.log('This project is based on YHTML5-Seed and developed by ' + yhtml5Data.author)
/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
fis.set('project.files', [
    './fis-conf.js', './map.json', './progress.md',
    '/components/**', '/server/*', '/' + yhtml5Data.viewType + '/**',
    // '/bower_components/angular/angular.min.js',
    // '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    '/bower_components/bootstrap/dist/**/bootstrap.min.{css,js}',
    '/bower_components/jquery/dist/jquery.min.js',
    '/bower_components/pickadate/lib/compressed/**/{picker,default,zh_CN}.*',
    '/bower_components/form.validation/dist/**/{formValidation.min,bootstrap.min,zh_CN}.*',
    '/bower_components/bootstrap-datepicker/dist/**/{bootstrap-datepicker3.min.css,bootstrap-datepicker.min.js,bootstrap-datepicker.zh-CN.min.js}'
    // '/bower_components/vue/dist/vue.min.js',
]);
/************************* Directory Standard *****************************/
fis.match('/bower_components/(**)', {
    release: '/vendor/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
if (yhtml5Data.viewType === 'page') {
    fis.match('/page/(*.html)', {
        release: '/$1'
    })
    console.log('PG Mode')
}
if (yhtml5Data.isStart === true) {
    fis.match('/page/start/(index.html)', {
        release: '/$1'
    })
    console.log('release start.html')
}
fis.match('/**/(*.design.*)', {
    release: '/vendor/design/$1'
});
fis.match('/{map.json,fis-conf.*}', {
    release: '/config/$0'
});
fis.match('/pkg/page/(**)', {
    release: '${project.static}/$1'
});
fis.match('/{components,bower_components,view,page}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.{eot, svg, ttf, woff}})', {
    release: '${project.static}/iconfont/$1',
    url: '/iconfont/$1',
    domain: '.'
});

/************************* Package Standard *****************************/
//https://github.com/fex-team/fis3-postpackager-loader
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true,
        allInOne: true,
        useTrack: false
    })
});
/*** public js ***/
fis.match('/{server,components/jquery,bower_components}/{*,**/*}.js', {
    packTo: '${project.static}/yhtml5.js'
});
fis.match('/server/author.js', {
    packOrder: -999
});
fis.match('/bower_components/angular/angular.js', {
    packOrder: -399
});
fis.match('/bower_components/angular-ui-router/release/angular-ui-router.js', {
    packOrder: -398
});
fis.match('/bower_components/jquery/dist/*', {
    packOrder: -299
});
fis.match('/bower_components/bootstrap/dist/js/*', {
    packOrder: -297
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.js', {
    packOrder: -295
});
fis.match('/bower_components/form.validation/dist/js/formValidation.min.js', {
    packOrder: -289
});
fis.match('/bower_components/form.validation/dist/js/framework/bootstrap.min.js', {
    packOrder: -287
});
fis.match('/bower_components/form.validation/dist/js/language/zh_CN.js', {
    packOrder: -285
});
fis.match('/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js', {
    packOrder: -279
});
fis.match('/bower_components/bootstrap-datepicker/dist/locales/bootstrap-datetimepicker.zh-CN.min.js', {
    packOrder: -277
});
fis.match('/bower_components/pickadate/lib/compressed/picker.js', {
    packOrder: -269
});
fis.match('/bower_components/pickadate/lib/compressed/picker.date.js', {
    packOrder: -267
});
fis.match('/bower_components/pickadate/lib/compressed/picker.time.js', {
    packOrder: -265
});
fis.match('/bower_components/pickadate/lib/compressed/translations/zh_CN.js', {
    packOrder: -263
});
fis.match('/bower_components/vue/dist/vue.min.js', {
    packOrder: -199
});
fis.match('/server/console.js', {
    packOrder: 2
});

/*** public css ***/
fis.match('/{server,components,bower_components}/{*,**/*}.css', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/server/author.css', {
    packOrder: -999
});
fis.match('/bower_components/angular-bootstrap/ui-bootstrap-csp.css', {
    packOrder: -399
});
fis.match('/bower_components/bootstrap/dist/css/bootstrap.min.css', {
    packOrder: -299
});
fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.css', {
    packOrder: -295
});
fis.match('/bower_components/form.validation/dist/css/*', {
    packOrder: -289
});
fis.match('/bower_components/bootstrap-datepicker/dist/css/*', {
    packOrder: -279
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.css', {
    packOrder: -269
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.date.css', {
    packOrder: -267
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.time.css', {
    packOrder: -265
});
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -99
});
/************************* Pro Standard *****************************/
fis.media('pro')
    .match('/{pkg/page/**,static/**,{components,bower_components,page,view}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: true,
        domain: '.'
    }, console.log("building pro"))
    //html remove comments
    .match('/{index,{view,page,components}/{*,**/*}}.html', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/{'+yhtml5Data.viewType+',components}/{*,**/*}.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{page,view,components}/{*,**/*}.html', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
        })
    })
    // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically
    .match('/{page,view,components}/{*,**/*}.css', {
        optimizer: fis.plugin('clean-css', {
            // target:false
            // keepSpecialComments:0
            // rebase:false
            // keepBreaks: true,
            // compatibility:'ie7'
        })
    })
    .match('/components/public/csssprites/(*)', {
        url: '/img/$1'
    })
// csssprites https://github.com/fex-team/fis-spriter-csssprites
// .match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
// })
// .match('/page/**/*.css', {
//     useSprite: true
// })
// .match('*.css', {
//     optimizer: fis.plugin('clean-css', {
//         'keepBreaks': false,
//         useSprite: true
//     })
// })
// .match('*.js', {
//     optimizer: fis.plugin('uglify-js', {
//         mangle: {
//             expect: ['require', 'define', 'some string']
//         }
//     })
// })
// .match('/{page,server,components}/**', {
//     deploy: [
//         fis.plugin('skip-packed', {
//             skipPackedToPkg: true,
//             skipPackedToAIO: true,
//             skipPackedToCssSprite: true
//         }),
//         // fis.plugin('local-deliver', {
//         //     to: '../dist/www'
//         // })
//     ]
// })
// .match('/{page,server,components}/**', {
//     parser: fis.plugin('jdists', {
//         remove: "debug,test"
//     })
// })

/************************* php *****************************/
/************************* cdn *****************************/
