/**
 * Creator: Tang Xiaoji
 * Time: 2017-12-22
 */

const request = require('request');
const utils = require('./utils');

class Eip {
  constructor() {

  }

  getEIPList() {
    const random = utils.getRandom();
    const timestamp = utils.getUTCTime();
    const params = [
      ['AccessKeyId', 'LTAIkxeRwwYXgDfC'],
      ['Action', 'DescribeEipAddresses&'],
      ['Format', 'JSON'],
      ['RegionId', 'cn-hangzhou-1'],
      ['SignatureMethod', 'HMAC-SHA1'],
      ['SignatureNonce', random],
      ['SignatureVersion', '1.0'],
      ['Timestamp', timestamp],
      ['Version', '2016-04-28']];

    const StringToSign =
      'GET' + '&' +
      utils.encodeUTF8('/') + '&' +
      utils.encodeUTF8(params.map((p) => {
        return p.map((e) => {
          return utils.encodeUTF8(e)
        }).join('=');
      }).join('&'));

    console.log(StringToSign);

    const Signature = utils.makeSha1(StringToSign, 'rtnmQwdHP8WjV7gEjIzyqqgQSqthdp&');

    const host = 'https://vpc.aliyuncs.com/?';
    const signatureUrl = [
      ['AccessKeyId', 'LTAIkxeRwwYXgDfC'],
      ['Action', 'DescribeEipAddresses'],
      ['Format', 'JSON'],
      ['RegionId', 'cn-hangzhou-1'],
      ['Signature', Signature],
      ['SignatureMethod', 'HMAC-SHA1'],
      ['SignatureNonce', random],
      ['SignatureVersion', '1.0'],
      ['Timestamp', timestamp],
      ['Version', '2016-04-28']
    ];

    const url = host + signatureUrl.map((u) => {
      return u.map((e) => {
        return utils.encodeUTF8(e);
      }).join('=');
    }).join('&');

    const options = {
      url: url
    };

    request(options, (err, res, body) => {
      console.log(res.statusCode);
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    });
  }
}

module.exports = Eip;
