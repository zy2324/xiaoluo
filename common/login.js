var login = {
  loginResponders: [],
  addLoginResponder: function (responder) {
    this.loginResponders.push(responder);
  },

  login: function(app){
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var resData = {};
    var jsCodeDone, userInfoDone;

    function setUserInfo() {
      wx.request({
        url: 'https://www.draknesslion.top:8001/api/v1/goods/user/login',
        data: {
          encryptedData: resData.encryptedData,
          iv: resData.iv

        },
        header: {
          'content-type': 'application/json',
          'Cookie': "beegosessionID=" + resData.sid
        },
        method: 'POST',
        success: function (res) {
          app.globalData.userInfo = resData.userInfo
          app.globalData.openId = res.data.openId
          console.log(res.data)
        }

      });
    }

    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'https://www.draknesslion.top:8001/api/v1/goods/user/id',
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (res) {
              resData.sid = res.data.sid
              jsCodeDone = true;
              jsCodeDone && userInfoDone && setUserInfo();
            }
          });

          wx.getUserInfo({
            success: function (res) {
              resData.userInfo = res.userInfo
              resData.encryptedData = res.encryptedData
              resData.iv = res.iv
              userInfoDone = true;
              jsCodeDone && userInfoDone && setUserInfo();
            }
          });
        }
      }
    })
  }
}
module.exports = login;