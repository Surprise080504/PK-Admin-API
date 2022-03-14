require('dotenv').config();

module.exports = {
    CIV: Buffer.from(process.env.CIV, 'hex'),
    CKEY: Buffer.from(process.env.CKEY, 'hex'),
};
