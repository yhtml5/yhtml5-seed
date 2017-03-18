// const meta = require('./components/meta.html')
// Export a function / promise / or a string:
// This function has to return a string or promised string:
module.exports = function (templateParams) {
    var html = '<!DOCTYPE html>'
        + '<html>'
        + '<head>'
        + '<title>' + templateParams.htmlWebpackPlugin.options.title + '</title>'
        + '</head>'
        + '<body>' + '</body>'
        + '</html>'
    return html
};