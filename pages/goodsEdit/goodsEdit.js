const app = getApp()

Page({
  data: {
    name: '',
    desc: '',
    price: '',
    short: '',
    phonenum: '',
    pictures: [],
    gid: ''
  },

  nameChange: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  shortChange: function(e) {
    this.setData({
      short: e.detail.value
    })
  },


  descChange: function(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  priceChange: function(e) {
    this.setData({
      price: e.detail.value
    })
  },

  phoneChange: function(e) {
    this.setData({
      phonenum: e.detail.value
    })
  },

  addPicture(e) {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.pictures.concat(res.tempFilePaths)
        this.setData({
          pictures: images
        })
      },
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.pictures.splice(idx, 1)
    this.setData({
      pictures: this.data.pictures.splice(idx, 1)
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.pictures
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  backToHome: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  editToAgent: function() {
    console.log("add:", this.data.name, this.data.desc, this.data.price, this.data.phonenum)
    wx.request({
        url: 'http://47.95.237.94:8001/api/v1/goods/edit',
        data: {
          openId: app.globalData.openId,
          goods: {
            gid: this.data.gid,
            name: this.data.name,
            pictures: this.data.pictures,
            short: this.data.short,
            desc: this.data.desc,
            price: parseFloat(this.data.price),
            phonenum: this.data.phonenum,
            state: '1',
            owneropenId: app.globalData.openId
          }
        },
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: function(res) {
          console.log(res.data)
        }
      }),

      wx.navigateTo({
        url: '../../pages/goodsLook/goodsLook?gid=' + this.data.gid
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
          desc: res.data.desc,
          price: res.data.price,
          phonenum: res.data.phonenum,
          pictures: res.data.pictures,
          gid: res.data.gid
        })
      }
    })
  }
});