const app = getApp()

Page({
  data: {
    name: '',
    short: '',
    desc: '',
    price: '',
    phonenum: '',
    pictures: []
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
        const images = this.data.pictures.concat(res.tempFilePaths);
        var i;
        for (i=0; i< images.length; i++){
          console.log(images[i])
          wx.uploadFile({
            url: 'https://www.draknesslion.top:8001/api/v1/goods/upload',
            filePath: images[i],
            name: 'picture',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData:{
            },
            success (res){
              var aa = res.map(JSON.parse(res.data).url)
             console.log("upload pic", aa) 
            }
          })
        }
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
    wx.navigateTo({
      url: '../../pages/home/home'
    })
  },

  addToAgent: function() {
    console.log(app.globalData.userInfo.nickName, app.globalData.userInfo.avatarUrl, app.globalData.openId)
    console.log("add:", this.data.name, this.data.desc, this.data.price, this.data.phonenum)
    wx.request({
      url: 'https://www.draknesslion.top:8001/api/v1/goods/add',
      data: {
        openId: app.globalData.openId,
        goods: {
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
    })

    wx.navigateTo({
      url: '../../pages/home/home',
    })
  }
});