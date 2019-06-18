const app = getApp()

Page({
  data: {
    name: '',
    desc: '',
    price: '',
    phonenum: ''
  },

  nameChange: function(e){
    this.setData({
      name: e.detail.value
    })
  },

  descChange: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },

  priceChange: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  phoneChange: function (e) {
    this.setData({
      phonenum: e.detail.value
    })
  },

  addToAgent: function(){
    console.log(app.globalData.userInfo.nickName, app.globalData.userInfo.avatarUrl, app.globalData.openId)
    console.log("add:", this.data.name, this.data.desc, this.data.price, this.data.phonenum)
    /*wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/add' + username,
      data:{
        name: 
      }
    })*/

    wx.navigateTo({
      url: '../../pages/home/home',
    })
  }
});
