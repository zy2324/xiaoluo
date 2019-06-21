const app = getApp()

Page({
  data: {
    name: '',
    price: '',
    short:'',
    gid: ''
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  onLoad: function (options) {
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