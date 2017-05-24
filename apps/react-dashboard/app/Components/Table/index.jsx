import { validator } from '../../util/validator'

const renderColumns = (text) => (validator.isStringEmpty(text)) ? '--' : text
const renderStatus = (text, record) => (validator.isStringEmpty(text)) ? '--' : (Number(record.status) === 1) ? '显示' : '隐藏'
const renderNavType = (text, record) => (validator.isStringEmpty(text)) ? '--' : (Number(record.type) === 1) ? '频道' : '链接'
const renderLiveType = (text, record) => (validator.isStringEmpty(text)) ? '--' : (Number(record.type) === 1) ? '视频' : '图文'
const renderRecommendation = (text, record) => (validator.isStringEmpty(text)) ? '--' : (Number(record.is_reco) === 1) ? '已推荐' : '未推荐'

export { renderColumns, renderStatus, renderNavType, renderLiveType, renderRecommendation }
