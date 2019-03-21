let CryptoJS = require('crypto-js');
export default function aesEncrypt(data) {

  var key = '!~oX@y$]4#$%@(Yj'

  var iv = '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0';
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv
    });

  const base64Cipher = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  return base64Cipher;
}