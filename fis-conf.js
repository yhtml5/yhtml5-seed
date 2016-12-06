/*=====================================================================
 * 配置说明:
 *
 * 监听文件: 选择你需要监听的文件, 已经有了对应的demo写法(Glob/正则)
 * 目录规范: 提供默认demo写法
 * 配置data:
 *    name  --项目名
 *    path  --静态资源目录
 *    viewType   pages--多页应用, spa--单页应用, view--混合模式
 *    framework  可配置项 angular,jquery,vue,(react)
 * 依赖关系:
 *    基于整个系统,自己的开发模块,定义依赖关系即可
 *    基于整个系统,属于第三包的,请指定打包顺序
 *    基于单个页面,定义依赖关系,通过allInOne打包
 *
 *====================================================================*/
var yhtml5Data = {
    author: '张大漾丨王晨翱 | 陈孟圆',
    domain: ".",
    framework: "vue",
    hasStart: true,
    staticName: "yhtml5",
    staticPath: "/static",
    viewType: "view",
    viewPath: "view-myBonus",
    version: 0.2.1
}
console.log('This project is based on YHTML5-Seed and developed by ' + yhtml5Data.author)
/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
if (yhtml5Data.viewType == 'pages') {
    var pagesPath = 'app/' + yhtml5Data.viewPath + '/**'
    console.log('Setting project files as pages', pagesPath)
    fis.set('project.files', [
        './fis-conf.js', './map.json', './progress.md',
        'app/server/*', 'app/components/**', pagesPath,
        '/bower_components/bootstrap/dist/**/bootstrap.min.{css,js}',
        '/bower_components/jquery/dist/jquery.min.js',
        '/bower_components/pickadate/lib/compressed/**/{picker,default,zh_CN}.*',
        '/bower_components/form.validation/dist/**/{formValidation.min,bootstrap.min,zh_CN}.*',
        '/bower_components/bootstrap-datepicker/dist/**/{bootstrap-datepicker3.min.css,bootstrap-datepicker.min.js,bootstrap-datepicker.zh-CN.min.js}',
        '/bower_components/echarts/dist/echarts.min.js'
    ]);
} else if (yhtml5Data.viewType == 'view') {
    var viewPath = 'app/' + yhtml5Data.viewPath + '/**'
    console.log('Setting project files as pages', viewPath)
    fis.set('project.files', [
        './fis-conf.js', './map.json', './progress.md',
        'app/components/**', 'app/server/*', viewPath,
        '/bower_components/vue/dist/vue.min.js',
        '/bower_components/reqwest/reqwest.min.js',
        // '/bower_components/plupload/js/plupload.full.min.js',
        // '/bower_components/qiniu/dist/qiniu.js',
        '/bower_components/signature_pad/signature_pad.min.js',
        // '/bower_components/vue-validator/dist/vue-validator.min.js',
        '/bower_components/vux/dist/vux.css',
        '/bower_components/countUp.js/dist/countUp.min.js',
        '/bower_components/vux/dist/**/actionsheet/index.js',
        '/bower_components/vux/dist/**/cell/index.js',
        '/bower_components/vux/dist/**/confirm/index.js',
        '/bower_components/vux/dist/**/datetime/index.js',
        '/bower_components/vux/dist/**/divider/index.js',
        '/bower_components/vux/dist/**/flexbox/index.js',
        '/bower_components/vux/dist/**/flexbox-item/index.js',
        '/bower_components/vux/dist/**/group/index.js',
        '/bower_components/vux/dist/**/icon/index.js',
        '/bower_components/vux/dist/**/loading/index.js',
        '/bower_components/vux/dist/**/switch/index.js',
        '/bower_components/vux/dist/**/toast/index.js',
        '/bower_components/vux/dist/**/x-header/index.js',
        '/bower_components/vux/dist/**/x-input/index.js',
        '/bower_components/vux/dist/**/tab/index.js',
        '/bower_components/vux/dist/**/tab-item/index.js',
        '/bower_components/vux/dist/**/button-tab/index.js',
        '/bower_components/vux/dist/**/button-tab-item/index.js',
        '/bower_components/vux/dist/**/swiper/index.js',
        '/bower_components/vux/dist/**/swiper-item/index.js',
        '/bower_components/vux/dist/**/selector/index.js',
        '/bower_components/vux/dist/**/x-button/index.js',
        '/bower_components/vux/dist/**/popup/index.js',
        '/bower_components/vux/dist/**/checker/index.js',
        '/bower_components/vux/dist/**/checker-item/index.js',
        '/bower_components/vux/dist/**/scroller/index.js'
    ]);
} else {
    fis.set('project.files', [
        './fis-conf.js', './map.json', './progress.md',
        'app/components/**', 'app/server/*', yhtml5Data.viewPath,
        // '/bower_components/angular/angular.min.js',
        // '/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    ]);
    console.error('Please set yhtml5Data.viewType')
}
/************************* Directory Standard *****************************/
fis.match('/bower_components/(**)', {
    release: '/vendor/$1'
});
fis.match('app/**', {
    release: '/vendor/$0'
});
if (yhtml5Data.viewType == 'pages') {
    fis.match('/app/' + yhtml5Data.viewPath + '/(*.html)', {
        release: '/$1'
    })
    console.log('Running in PG Mode')
} else if (yhtml5Data.viewType == 'view') {
    fis.match('/app/' + yhtml5Data.viewPath + '/**/(*.html)', {
        release: '/$1'
    })
    console.log('Running in the View Mode')
} else {
    console.error('Please set yhtml5Data.viewType2', yhtml5Data.viewType)
}
if (yhtml5Data.hasStart) {
    fis.match('/app/' + yhtml5Data.viewPath + '/start/(index.html)', {
        release: '/$1'
    })
    console.log('Release start.html')
}
fis.match('/**/(*.design.*)', {
    release: '/vendor/design/$1'
});
fis.match('/app/{map.json,fis-conf.*}', {
    release: '/config/$0'
});
fis.match('/pkg/app/' + yhtml5Data.viewPath + '/**/(*)', {
    release: '${project.static}/$1'
});
fis.match('/{app/components,bower_components,' + yhtml5Data.viewPath + 'app/pages}/**/(*.{png,gif,jpg,jpeg,svg})', {
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
fis.match('/{app/server,bower_components}/{*,**/*}.js', {
    packTo: '${project.static}/yhtml5.js'
});
fis.match('/app/server/author.js', {
    packOrder: -999
});
if (yhtml5Data.framework == 'angular') {
    fis.match('/bower_components/angular/angular.js', {
        packOrder: -399
    });
    fis.match('/bower_components/angular-ui-router/release/angular-ui-router.js', {
        packOrder: -398
    });
} else if (yhtml5Data.framework == 'jquery') {
    fis.match('/bower_components/jquery/dist/*', {
        packOrder: -399
    });
    fis.match('/bower_components/bootstrap/dist/js/*', {
        packOrder: -397
    });
    fis.match('/bower_components/fullpage.js/dist/jquery.fullpage.min.js', {
        packOrder: -395
    });
    fis.match('/bower_components/form.validation/dist/js/formValidation.min.js', {
        packOrder: -389
    });
    fis.match('/bower_components/form.validation/dist/js/framework/bootstrap.min.js', {
        packOrder: -387
    });
    fis.match('/bower_components/form.validation/dist/js/language/zh_CN.js', {
        packOrder: -385
    });
    fis.match('/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js', {
        packOrder: -379
    });
    fis.match('/bower_components/bootstrap-datepicker/dist/locales/bootstrap-datetimepicker.zh-CN.min.js', {
        packOrder: -377
    });
    fis.match('/bower_components/pickadate/lib/compressed/picker.js', {
        packOrder: -369
    });
    fis.match('/bower_components/pickadate/lib/compressed/picker.date.js', {
        packOrder: -367
    });
    fis.match('/bower_components/pickadate/lib/compressed/picker.time.js', {
        packOrder: -365
    });
    fis.match('/bower_components/pickadate/lib/compressed/translations/zh_CN.js', {
        packOrder: -363
    });
} else if (yhtml5Data.framework == 'vue') {
    fis.match('/bower_components/vue/dist/vue.min.js', {
        packOrder: -399
    });
    fis.match('/bower_components/vux/**/divider/index.js', {
        packOrder: -369
    });
    fis.match('/bower_components/vux/**/x-header/index.js', {
        packOrder: -368
    });
}
fis.match('/bower_components/reqwest/reqwest.min.js', {
    packOrder: -199
});
fis.match('/bower_components/echarts/dist/echarts.min.js', {
    packOrder: -198
});
fis.match('/bower_components/countUp.js/dist/countUp.min.js', {
    packOrder: -179
});
fis.match('/bower_components/signature_pad/signature_pad.min.js', {
    packOrder: -177
});
// fis.match('/bower_components/plupload/js/plupload.full.min.js', {
//     packOrder: -175
// });
// fis.match('/bower_components/qiniu/dist/qiniu.js', {
//     packOrder: -173
// });
fis.match('/app/server/console.js', {
    packOrder: 2
});

/*** public css ***/
fis.match('/{app/server,app/components/**,bower_components}/{*,**/*}.css', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/app/server/author.css', {
    packOrder: -999
});
if (yhtml5Data.framework == 'jquery') {
    console.log('using [' + yhtml5Data.framework + '] now')
    fis.match('/bower_components/angular-bootstrap/ui-bootstrap-csp.css', {
        packOrder: -399
    });
} else if (yhtml5Data.framework == 'jquery') {
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
} else if (yhtml5Data.framework == 'vue') {
    fis.match('/bower_components/vux/dist/vux.css', {
        packOrder: -299
    });
} else {
    console.error('Please set yhtml5Data.framework')
}
fis.match('/app/components/iconfont/iconfont.css', {
    packOrder: -99
});
/************************* Pro Standard *****************************/
fis.media('pro')
    .match('/{pkg/pages/**,static/**,bower_components,app/{components,' + yhtml5Data.viewPath + '}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: true,
        domain: '.'
    }, console.log("Building in pro mode"))
    //html remove comments
    .match('/app/{index,view,pages,components}/{*,**/*}}.html', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/app/{' + yhtml5Data.viewPath + ',components}/{*,**/*}.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/app/{pages,view,components}/{*,**/*}.html', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
        })
    })
    // https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-programmatically
    .match('/app/{pages,view,components}/{*,**/*}.css', {
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
// .match('/pages/**/*.css', {
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
// .match('/{pages,server,components}/**', {
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
// .match('/{pages,server,components}/**', {
//     parser: fis.plugin('jdists', {
//         remove: "debug,test"
//     })
// })

/************************* php *****************************/
/************************* cdn *****************************/
