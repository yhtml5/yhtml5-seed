const packageConfig = require('../package.json')

const formatMoment = (moment) => (moment < 10) ? "0" + "" + moment : moment;

function getVersionDate() {
  var year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
    day = new Date().getDate(),
    hour = new Date().getHours(),
    minute = new Date().getMinutes(),
    second = new Date().getSeconds();

  const versionDate = formatMoment(year) + '' + formatMoment(month) + '' + formatMoment(day) + '' + formatMoment(hour) + '' + formatMoment(minute) + '' + formatMoment(second)
  return versionDate
}

const version = 'v' + packageConfig.version + ((/[a-zA-Z]/.test(packageConfig.version)) ? '' : ('-' + getVersionDate()))

const isEnvPro = () => process.env.NODE_ENV == 'production'
const isEnvDev = () => process.env.NODE_ENV == 'development'
const isEnvDebug = () => process.env.NODE_ENV == 'debug'
const hasMinString = () => (isEnvPro() || isEnvDebug()) ? ".min" : ""

module.exports = {version, isEnvPro, isEnvDev, isEnvDebug, hasMinString}
