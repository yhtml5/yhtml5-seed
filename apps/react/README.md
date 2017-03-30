## React + Redux + Webpack2 + Ant-design



### Directory Structure

合理的规范有利于项目开发速度，我们推崇高内聚低耦合的代码结构
模块化开发， 分而治之， 各模块同目录下就近维护。
这里，我们规定了项目构建，开发，测试，发布等目录及文件路径（react项目为例）：

```
 root
  ├── app                              --client source code
  │   ├── components
  │   ├── login
  │   ├── static                       --公共静态资源
  │   │     └── favicon.ico
  │   ├── global.pcss                  --公共静态资源
  │   ├── template.jsx                 --页面模板
  │   ├── index.jsx                    --公用入口
  │   └── others
  ├── build
  │   ├── webpack.config.js
  │   ├── webpack.dev.js
  │   ├── webpack.pro.js
  │   └── other.js
  ├── exmaple
  ├── dist                             --产品发布目录
  ├── node_modules
  ├── server                           --server source code
  ├── .babelrc
  ├── .editorconfig
  ├── .eslintignore
  ├── .eslintrc.js
  ├── .gitignore
  ├── .npmignore
  ├── .gitignore
  ├── CHANGELOG.md
  ├── ISSUE.md
  ├── LICENSE
  ├── package.json
  └── README.md
```
