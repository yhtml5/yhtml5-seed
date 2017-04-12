import {validator} from '../../util/validator'

const renderColumns = (text, record) => (validator.isStringEmpty(text)) ? '--' : text

export {renderColumns}
