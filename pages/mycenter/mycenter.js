const app = getApp()

Page({
  data: {
    own_goods: [],
    deal_goods: []
  },

  goodsAdd: function () {
    wx.navigateTo({
      url: '../../pages/goodsAdd/goodsAdd'
    })
  },

  backToHome: function () {
    wx.navigateTo({
      url: '../../pages/home/home'
    })
  },

  goodsdetail: function (e) {
    var gid = e.currentTarget.dataset.gid
  
  },

  goodsdel: function (e) {
    var that = this
    var gid = e.currentTarget.dataset.info
    console.log("------------", gid)
    wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/delete',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        goodsid: gid,
        openId: app.globalData.openId
      },
      success(res) {
        console.log(res.data)
      }
    }),
    wx.showToast({
        title: `删除成功`,
        icon: 'none'
    }),
    that.onLoad()
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  onLoad: function () {
    var self = this;

    wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/' + app.globalData.openId + '/my/list',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        self.setData({
          own_goods: res.data.owns,
          deal_goods: res.data.deals
        })
      }
    })
  }
});