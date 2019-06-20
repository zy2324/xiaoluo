Page({
  data: {
    goods: []
  },
  goodsAdd: function() {
    wx.navigateTo({
      url: '../../pages/goodsAdd/goodsAdd'
    })
  },
  onLoad: function() {
    var self = this;
    wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/all',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        self.setData({
          goods: res.data
        })
      }
    })
  }
});