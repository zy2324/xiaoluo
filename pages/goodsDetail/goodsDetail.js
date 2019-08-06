const app = getApp()

Page({
  data: {
    name: '',
    desc: '',
    price: '',
    short: '',
    phonenum: '',
    pictures: [],
    gid: '',
    user: ''
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.pictures
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  onTodeal: function(e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../../pages/goodsDeal/goodsDeal?gid=' + gid
    })
  },

  onToback: function() {
    wx.navigateTo({
      url: '../../pages/home/home'
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
          desc: res.data.desc,
          price: res.data.price,
          phonenum: res.data.phonenum,
          pictures: res.data.pictures,
          gid: res.data.gid,
          user: res.data.user
        })
      }
    })
  }


});