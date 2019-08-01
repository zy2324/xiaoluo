const app = getApp()

Page({
  data: {
    name: '',
    price: '',
    short: '',
    gid: '',
    date: '',
    time: '',
    buyerphonenum: '',
    buyeropenId: '',
    dealsit: '',
    show: false
  },

  dealsiteChange: function(e) {
    this.setData({
      dealsite: e.detail.value
    })
  },

  buyerChange: function(e) {
    this.setData({
      buyerphonenum: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },


  makeDeal: function(e) {
    //支付接口，并确认支付是否成功


    //支付成功，则将新增的数据传入后端
    wx.request({
        url: 'https://www.draknesslion.top:8001/api/v1/goods/dealok',
        data: {
          openId: app.globalData.openId,
          gid: this.data.gid,
          dealtime: this.data.date + " " + this.data.time,
          buyerphonenum: this.data.buyerphonenum,
          dealsite: this.data.dealsite,
          state: "2",
          buyeropenId: app.globalData.openId
        },
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: function(res) {
          console.log(res.data)
        }
      }),

      //成功后，推送消息
      wx.request({
        url: 'https://www.draknesslion.top:8001/api/v1/goods/pushinfo',
        data: {
          formId: e.detail.formId,
          gid: this.data.gid
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
        }
      }),

      wx.navigateTo({
        url: '../../pages/goodsDealok/goodsDealok?gid=' + this.data.gid
      })

  },

  onLoad: function(options) {
    var self = this;
    wx.request({
      url: 'https://www.draknesslion.top:8001/api/v1/goods/' + options.gid + '/detail',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        self.setData({
          name: res.data.name,
          short: res.data.short,
          price: res.data.price,
          gid: res.data.gid
        })
      }
    })
  }


});