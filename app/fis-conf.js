/*=====================================================================
 * 配置说明:
 *
 * 监听文件: 选择你需要监听的文件, 已经有了对应的demo写法(Glob/正则)
 * 合理的目录结构: 开发与发布不同, 已默认
 *
 *====================================================================*/

/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
fis.set('project.files', [
    'fis-conf.js', 'index.html', 'map.json', 'progress.md',
    '/components/**', '/server/*', '/view/**', '/page/**',
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
fis.match('/page/(*.html)', {
    release: '/$1'
});
fis.match('/bower_components/(**)', {
    release: '/vendor/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
fis.match('/page/(*.html)', {
    release: '/$1'
});
fis.match('/**/(*.design.*)', {
    release: '/vendor/design/$1'
});
fis.match('/{map.json,fis-conf.*}', {
    release: '/config/$0'
});
fis.match('/{components,bower_components,view,page}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.{eot, svg, ttf, woff}})', {
    release: '${project.static}/iconfont/$1',
    url:'/iconfont/$1',
    domain: '.'
});

fis.match('/bower_components/jquery/dist/*', {
    packOrder: -99
});
fis.match('/bower_components/bootstrap/dist/js/*', {
    packOrder: -97
});
fis.match('/bower_components/pickadate/lib/compressed/picker.js', {
    packOrder: -89
});
fis.match('/bower_components/pickadate/lib/compressed/picker.date.js', {
    packOrder: -87
});
fis.match('/bower_components/pickadate/lib/compressed/picker.time.js', {
    packOrder: -85
});
fis.match('/bower_components/pickadate/lib/compressed/translations/zh_CN.js', {
    packOrder: -83
});
fis.match('/bower_components/form.validation/dist/js/formValidation.min.js', {
    packOrder: -79
});
fis.match('/bower_components/form.validation/dist/js/framework/bootstrap.min.js', {
    packOrder: -77
});
fis.match('/bower_components/form.validation/dist/js/language/zh_CN.js', {
    packOrder: -75
});
fis.match('/bower_components/vue/dist/vue.min.js', {
    packOrder: -69
});
/*** public css ***/
fis.match('/bower_components/**/*.css', {
    packTo: '${project.static}/cmbc.css'
});
fis.match('/bower_components/bootstrap/dist/css/*', {
    packOrder: -99
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.css', {
    packOrder: -89
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.date.css', {
    packOrder: -87
});
fis.match('/bower_components/pickadate/lib/compressed/**/default.time.css', {
    packOrder: -85
});
fis.match('/bower_components/form.validation/dist/css/*', {
    packOrder: -79
});
/*** custom resourse ***/
fis.match('/{server,components,page}/{*,**/*}.js', {
    packTo: '${project.static}/index.js'
});
fis.match('/server/author.js', {
    packOrder: -99
});
fis.match('/server/console.js', {
    packOrder: 2
});
fis.match('/{server,page,components}/{*,**/*}.css', {
    packTo: '${project.static}/cmbc.css'
});
fis.match('/server/author.css', {
    packOrder: -101
});
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -69
});

/************************* Package Standard *****************************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});
/*** public resourse ***/


/*** public js ***/
// fis.match('/bower_components/{jquery,bootstrap,vue}/dist{/**/,/}*.js', {
//     packTo: '${project.static}/cmbc.js',
// });
// fis.match('/bower_components/pickadate/lib/compressed/{**/,/}{picker,zh_CN}.*', {
//     packTo: '${project.static}/cmbc.js',
// });
fis.match('/bower_components/**/*.js', {
    packTo: '${project.static}/yhtml5.js'
});


fis.match('/bower_components/{angular,angular-ui-router/release}/*.js', {
    packTo: '${project.static}/yhtml5.js',
});
fis.match('/bower_components/angular/angular.js', {
    packOrder: -99
});
fis.match('/bower_components/angular-ui-router/release/angular-ui-router.js', {
    packOrder: -98
});
fis.match('/bower_components/{jquery,bootstrap,form.validation,bootstrap-datepicker}/**/*.js', {
    packTo: '${project.static}/yhtml5.js',
});
fis.match('/bower_components/jquery/dist/*', {
    packOrder: -99
});
fis.match('/bower_components/bootstrap/dist/js/*', {
    packOrder: -97
});
fis.match('/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js', {
    packOrder: -95
});
fis.match('/bower_components/bootstrap-datepicker/dist/locales/bootstrap-datetimepicker.zh-CN.min.js', {
    packOrder: -93
});
fis.match('/bower_components/form.validation/dist/js/formValidation.min.js', {
    packOrder: -89
});
fis.match('/bower_components/form.validation/dist/js/framework/bootstrap.min.js', {
    packOrder: -87
});
fis.match('/bower_components/form.validation/dist/js/language/zh_CN.js', {
    packOrder: -85
});
fis.match('/bower_components/{bootstrap,bootstrap-datepicker,form.validation}/**/*.css', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/bower_components/html5-boilerplate/dist/**/normalize.css', {
    packOrder: -99
});
fis.match('/bower_components/html5-boilerplate/dist/**/main.css', {
    packOrder: -97
});
fis.match('/bower_components/bootstrap/dist/css/bootstrap.min.css', {
    packOrder: -89
});
fis.match('/bower_components/angular-bootstrap/ui-bootstrap-csp.css', {
    packOrder: -87
});
fis.match('/bower_components/bootstrap-datepicker/dist/css/*', {
    packOrder: -77
});
fis.match('/bower_components/form.validation/dist/css/*', {
    packOrder: -75
});
/*** custom resourse ***/
fis.match('/{server,components}/{*,**/*}.js', {
    packTo: '${project.static}/index.js'
});
fis.match('/server/author.js', {
    packOrder: -99
});
fis.match('/server/console.js', {
    packOrder: 2
});
fis.match('/{server,page,components}/{*,**/*}.css', {
    packTo: '${project.static}/index.css'
});
fis.match('/server/author.css', {
    packOrder: -89
});
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -78
});

/************************* Pro规范 *****************************/

fis.media('pro')
    .match('/{static/**,{components,bower_components,page,view}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: true,
        domain: '.'
    })
    //html remove comments
    .match('/{index,{view,page,components}/{*,**/*}.html', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/{page,components}/{*,**/*}.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{page,components}/{*,**/*}.{css,js,html}', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })
    })
    .match('/components/public/csssprites/(*)', {
        url: '/img/$1'
    })
// 自动雪碧图
// .match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
// })

//uglify



/************************* php *****************************/

fis.media('php')
    .match('/{static/*,{components,bower_components,page}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: false,
        domain: '.'
    })
    // .match('::package', {
    //     packager: fis.plugin('map'),
    //     spriter: fis.plugin('csssprites', {
    //         // layout: 'matrix',
    //         margin: '15'
    //     })
    // })
    // .match('/page/**/*.css', {
    //     useSprite: true
    // })
    .match('/**/(*.csp.*)', {
        release: '${project.static}/img/$1',
        url: '/img/$1'
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/{page,components}/{*,**/*}.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{page,components}/{*,**/*}.css', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })
    })
    .match('/{server/console.js,bower_components/form.validation/dist/js/language/zh_CN.js}', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })
    })
    .match('*.html', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
// .match('/bower_components/**/*.js', {
//     optimizer: function (content) {
//         return content.replace((/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/), '');
//     }
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
