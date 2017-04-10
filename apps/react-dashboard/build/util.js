const packageConfig = require('../package.json')

const formatMoment = (moment) => (moment < 10) ? "0" + "" + moment : moment;

function getVersionDate() {
  const year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
    day = new Date().getDate(),
    hour = new Date().getHours(),
    minute = new Date().getMinutes(),
    second = new Date().getSeconds();

  const versionDate = formatMoment(year) + '' + formatMoment(month) + '' + formatMoment(day) + '' + formatMoment(hour) + '' + formatMoment(minute) + '' + formatMoment(second)
  return versionDate
}

const version = 'v' + packageConfig.version + ((/[a-zA-Z]/.test(packageConfig.version)) ? '' : ('-' + getVersionDate()))

function isMin() {
  console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'production')
  if (process.env.NODE_ENV === 'production') {
    return ''
  } else {
    return 'min'
  }
}

module.exports = {version, isMin}
