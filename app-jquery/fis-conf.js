/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
fis.set('project.files', [
    '/fis-conf.js', '/map.json', 'progress.md',
    '/components/**', '/server/*', '/view/**',
    '/bower_components/bootstrap/dist/**/{bootstrap.min.{css,js},glyphicons-halflings-regular.*}',
    '/bower_components/jquery/dist/jquery.min.js',
    '/bower_components/form.validation/dist/css/formValidation.min.css',
    '/bower_components/form.validation/dist/js/{formValidation.min,framework/bootstrap.min,language/zh_CN}.js',
    '/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css',
    '/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
    '/bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js'
]);

/************************* 目录规范 *****************************/
fis.match('/view/(*.html)', {
    release: '/$1'
});
fis.match('/bower_components/(**)', {
    release: '/vendor/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
fis.match('/{components,bower_components,view}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/(*.design.*)', {
    release: '/vendor/design/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.{eot, svg, ttf, woff}})', {
    release: '${project.static}/iconfont/$1',
    url: '/iconfont/$1',
    domain: '.'
});
fis.match('/{map.json,fis-conf.*}', {
    release: '/config/$0'
});
/************************* 打包规范 *****************************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});
/*** public js ***/
fis.match('/bower_components/{jquery,bootstrap,form.validation,bootstrap-datepicker}/dist{/**/,/}*.js', {
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
/*** public css ***/
fis.match('/bower_components/{bootstrap,bootstrap-datepicker,form.validation}/dist/css/*', {
    packTo: '${project.static}/yhtml5.css'
});
fis.match('/bower_components/bootstrap/dist/css/*', {
    packOrder: -99
});
fis.match('/bower_components/bootstrap-datepicker/dist/css/*', {
    packOrder: -97
});
fis.match('/bower_components/form.validation/dist/css/*', {
    packOrder: -95
});
/*** custom resourse ***/
fis.match('{/server/author.js, /components/**/*.js}', {
    packTo: '${project.static}/index.js'
});
fis.match('{/server/author.css,/components/**/*.css}', {
    packTo: '${project.static}/index.css'
});

/************************* Pro规范 *****************************/

fis.media('pro')
    .match('/{static/**,{components,bower_components,view}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,woff2,svg}}', {
        useHash: false,
        domain: '.'
    })
    //css 自动补充兼容性 https://github.com/ai/browserslist#queries
    .match('/components/**/*.css', {
        preprocessor: fis.plugin('cssprefixer', {
            "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
            "cascade": true
        })
    })
    .match('/{components/**/*.css', {
        optimizer: fis.plugin('htmlminify', {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true
        })
    })

// .match('/{{components,view}/**/*.{html,css},index.html}', {
//     optimizer: fis.plugin('htmlminify', {
//         removeComments: true,
//         collapseWhitespace: true,
//         minifyJS: true,
//         minifyCSS: true
//     })
// })
// .match('/{components,view}/**/init.js', {
//     optimizer: fis.plugin('htmlminify', {
//         removeComments: true,
//         collapseWhitespace: true,
//         minifyJS: true
//     })
// })

// 自动雪碧图
// .match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
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