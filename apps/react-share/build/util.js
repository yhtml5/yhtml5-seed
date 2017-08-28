const packageConfig = require('../package.json')
const process = require('child_process')

const formatMoment = (moment) => (moment < 10) ? "0" + "" + moment : moment

const getVersionDate = () => {
  const year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
    day = new Date().getDate(),
    hour = new Date().getHours(),
    minute = new Date().getMinutes(),
    second = new Date().getSeconds()
  // return formatMoment(year) + '' + formatMoment(month) + '' + formatMoment(day) + '' + formatMoment(hour) + '' + formatMoment(minute) + '' + formatMoment(second)
  return `${formatMoment(year)}${formatMoment(month)}${formatMoment(day)}${formatMoment(hour)}${formatMoment(minute)}${formatMoment(second)}`
}

const version = 'v' + packageConfig.version + ((/[a-zA-Z]/.test(packageConfig.version)) ? '' : ('-' + getVersionDate()))
const isMin = () => (process.env.NODE_ENV === 'production') ? '' : 'min'

function clearConsole() {
  process.exec('D: && cd testweb && md mydir',
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    })
}

module.exports = { version, isMin, clearConsole }
