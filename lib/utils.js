/**
 * Creator: Tang Xiaoji
 * Time: 2017-12-22
 */

const crypto = require('crypto');
const _ = require('lodash');
const moment = require('moment');
const urlencode = require('urlencode');

function getUTCTime() {
  return moment().toISOString();
}

function getRandom() {
  return `${moment() + 0}${_.random(10000, 99999)}`;
}

function encodeUTF8(string) {
  return urlencode(string).replace(/\+/g, '%20').replace(/\*/g, '%2A').replace(/%7E/g, '~');
}

/**
 * 使用hmac-sha1进行加密
 * @param payload 待价密的内容
 * @param secret 秘钥，即secretAccessKey
 * @returns {string} 返回加密完成后的字符串
 * @private
 */
function makeSha1(payload, secret) {
  return crypto.createHmac('sha1', secret).update(payload).digest().toString('base64');
}

module.exports = {
  getUTCTime: getUTCTime,
  getRandom: getRandom,
  encodeUTF8: encodeUTF8,
  makeSha1: makeSha1
};
