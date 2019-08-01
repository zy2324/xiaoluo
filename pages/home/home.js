Page({
  data: {
    goods: []
  },
  goodsAdd: function() {
    wx.navigateTo({
      url: '../../pages/goodsAdd/goodsAdd'
    })
  },

  mycenter: function() {
    wx.navigateTo({
      url: '../../pages/mycenter/mycenter'
    })
  },

  goodsdetail: function(e) {
    var gid = e.currentTarget.dataset.gid
    console.log(gid)
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail?gid=' + gid
    })
  },

  onLoad: function() {
    var self = this;
    wx.request({
      url: 'https://www.draknesslion.top:8001/api/v1/goods/all',
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