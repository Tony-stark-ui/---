// 引入用来发送请求的方法
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航分类数据
    cateList: [],
    // 楼层数据
    floorList: [],
    url: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送异步请求，获取伦布图数据
    //  wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   data: {},
    //   success: (result) => {
    //     console.log(result);
    //    this.setData( {
    //      swiperList : result.data.message
    //    })
    //   }
    // });

    // promise请求数据

    // 轮播图数据
    this.getSwiperList()
    // 分类导航数据
    this.getCateList()
    // 楼层数据
    this.floorList()
  },
  // 自定义方法
  // 获取轮播图数据
  getSwiperList() {
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        })
      })
  },
  // 获取首页分类导航数据
  getCateList() {
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems' })
      .then(res => {
        console.log(res);
        this.setData({
          cateList: res.data.message
        })
      })
  },
  // 获取楼层数据
  floorList() {
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata' })
      .then(result => {
        let res = result.data.message
        for (let i = 0; i < res.length; i++) {
          res[i].product_list.forEach((item, index) => {
            res[i].product_list[index].navigator_url = item.navigator_url.replace('?', '/goods_list?')
          })
        }
        console.log(res);
        console.log(res[0].product_list[0].navigator_url);
        this.setData({
          floorList: res
        })
      })
  }

})