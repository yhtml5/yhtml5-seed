/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/static');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**']);
fis.set('project.files', [
    'fis-conf.js', 'index.html', 'map.json',
    '/components/**', '/server/*', '/view/**',
    '/bower_components/angular/angular{.,.min.}js',
    '/bower_components/angular-ui-router/release/angular-ui-router{.,.min.}js',
    '/bower_components/bootstrap/dist/**/{bootstrap{.,.min.}{css,js},glyphicons-halflings-regular.*}'
]);

/************************* 目录规范 *****************************/

fis.match('/bower_components/bootstrap/dist/css/(**)', {
    release: '/vendor/bootstrap/$1'
});
fis.match('/bower_components/(angular/**)', {
    release: '/vendor/$1'
});
fis.match('/bower_components/angular-ui-router/release/(**)', {
    release: '/vendor/angular/$1'
});
fis.match('/components/**', {
    release: '/vendor/$0'
});
fis.match('/{components,bower_components}/**/(*.{png,gif,jpg,jpeg,svg})', {
    release: '${project.static}/img/$1'
});
fis.match('/**/({glyphicons-halflings-regular.*,iconfont.*})', {
    release: '${project.static}/iconfont/$1',
    url: '/iconfont/$1'
});
fis.match('{/map.json,fis-conf.*}', {
    release: '/config/$0'
});

/************************* 打包规范 *****************************/
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
})

/*** public resourse ***/
fis.match('/bower_components/{angular/angular,angular-ui-router/release/angular-ui-router}.js', {
    packTo: '${project.static}/yhtml5.js',
})
fis.match('/bower_components/angular/angular.js', {
    packOrder: -99
})
fis.match('/bower_components/angular-ui-router/release/angular-ui-router.js', {
    packOrder: -98
})
fis.match('/bower_components/bootstrap/dist/css/bootstrap.css', {
    packTo: '${project.static}/yhtml5.css'
})

/*** custom resourse ***/
fis.match('{/server/author.js, /components/**/*.js}', {
    packTo: '${project.static}/index.js'
})
fis.match('/server/author.js', {
    packOrder: -99
})
fis.match('/components/js/directive.js', {
    packOrder: -88
})
fis.match('/components/js/filter.js', {
    packOrder: -87
})
fis.match('/components/js/router.js', {
    packOrder: -86
})
fis.match('/components/js/ctrl.js', {
    packOrder: -85
})
fis.match('{/server/author.css,/components/**/*.css}', {
    packTo: '${project.static}/index.css'
})
fis.match('/server/author.css', {
    packOrder: -99
})
fis.match('/components/iconfont/iconfont.css', {
    packOrder: -98
})
fis.match('/components/css/bootstrap.ex.css', {
    packOrder: -88
})
fis.match('/components/css/bootstrap.ex.css', {
    packOrder: -88
})
fis.match('/components/css/cover.css', {
    packOrder: -87
})
fis.match('/components/css/animation.css', {
    packOrder: -86
})
fis.match('/components/css/custom.css', {
    packOrder: -85
})
fis.match('/components/css/base.css', {
    packOrder: -84
})
fis.match('/components/css/box.css', {
    packOrder: -83
})

// fis.match('/{components,bower_components}/**/*.{png,gif,jpg,jpeg,eot,ttf,woff,svg}', {
//     useHash: true
// })
// fis.match('/index.html',{
//     release:false
// })
// fis.match('{/static/**,/components/**/*.{png,gif,jpg,jpeg},/components/**/(iconfont.*)}', {
//     domain: '.'
// });
/************************* Pro规范 *****************************/

// optimize
fis.media('pro')
// .match('::package', {
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
// })
// .match('{/static/**,**.{gif,png}}', {
//     useHash: true
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
    .match('{/index.html,/view/*.html}', {
        optimizer: function (content) {
            return content.replace(/<!--([\s\S]*?)-->/g, '');
        }
    })