/*//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'http://47.95.237.94:8001/api/v1/goods/user/data',
            data : {
              code: res.code
            },
            success: function(res){
              
            }
          })
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo.avatarUrl)
              console.log(this.globalData.userInfo.nickName)
              console.log(this.globalData.openid)
              wx.request({
                url: 'http://47.95.237.94:8001/api/v1/goods/user/login',
                data: {
                  nickname: this.globalData.userInfo.nickName,
                  avatarurl: this.globalData.userInfo.avatarUrl
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res.data)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:""
  }
})*/
//app.js
App({
  globalData: {
    appid: 'wx38ca28463107a13f',//appid需自己提供，此处的appid我随机编写
    secret: '509be89503d2099e2aa1da37f0bd9b08',//secret需自己提供，此处的secret我随机编写

  },
  onLaunch: function () {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {

          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                //console.log(objz);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              }
            });
            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                //console.log(obj);
                wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
    console.log(user.openid)
    console.log(userInfo.avatarUrl, userInfo.nickName)
    wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/user/login',
      data: {
        userid: user.openid,
        nickname: userInfo.nickName,
        avatarurl: userInfo.avatarUrl
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log(res.data)
      }
    })
  },
})
