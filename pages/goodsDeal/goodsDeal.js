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
    show: false,
    via: ['http://a1.qpic.cn/psb?/V108803N2OnUxr/vvGx*nGekiHIYe8Q*TOH177u1Rb4EsgMNCXfiXgTSX4!/b/dMAAAAAAAAAA&ek=1&kp=1&pt=0&bo=OATJBQAAAAARF9A!&tl=3&vu']
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
      url: 'http://47.95.237.94:8001/api/v1/goods/dealok',
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
      url: 'http://47.95.237.94:8001/api/v1/goods/pushinfo',
      data: {
        formId: e.detail.formId,
        gid: this.data.gid
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })

  },

  onLoad: function(options) {
    var self = this;
    wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/' + options.gid + '/detail',
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