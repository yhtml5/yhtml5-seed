const createNonceStr = () => Math.random().toString(36).substr(2, 15)
const createTimestamp = () => String(parseInt(new Date().getTime() / 1000))
const salt = 'zXb1m'

const encrypt = (value) => createNonceStr() + createTimestamp() + salt + value
const decrypted = (value) => value.split(salt)[1]

export {encrypt, decrypted}
