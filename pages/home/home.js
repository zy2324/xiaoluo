Page({
  data: {
    goods: [{
        price: "10.00",
        name: "兰花",
        desc: "老家山里挖的兰花",
        pictures: ["url1", "url2", "url3"]
      },
      {
        price: "100.00",
        name: "自行车",
        desc: "儿子高考完不用的",
        pictures: ["url1", "url2", "url3"]
      }
    ]
  },
  goodsAdd: function() {
    wx.navigateTo({
      url: '../../pages/goodsAdd/goodsAdd'
    })
  },
  onLoad: function() {
    /*wx.request({
      url: 'http://47.95.237.94:8001/api/v1/goods/all',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        goods = res.data
      }
    })*/
  }
});