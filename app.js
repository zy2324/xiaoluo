//app.js
var login = require('./common/login.js');
App({
  onLaunch: function () {
    login.login(this);
  },
  globalData: {
    userInfo: null,
    encryptedData: "",
    iv: "",
    sid: "",
    openId: ""
  }
})