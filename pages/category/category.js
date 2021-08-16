// 引入封装的请求函数
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0

  },
  // 请求成功服务器返回的数据
  Cates: [],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实现缓存
    // 1. 先判断一下本地存储中有没有旧的数据
    //2. 没有旧数据直接发送新的请求
    //3. 有旧数据 同时旧数据也没有过期， 就是要本地存储中的旧数据即可

    // 1.获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    // 2. 判断
    if (!Cates) {
      // 不存在发送请求获取数据
      this.getCates()
    } else {
      // 有旧数据 定义过期时间 10s 改成五分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送请求
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data

        let leftMenuList = this.Cates.map((item) => {
          return item.cat_name
        });
        let rightContent = this.Cates[0].children

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

    // 获取分类数据
    // this.getCates()
  },

  // 自定义方法
  // 获取分类数据
  async getCates() {
    // request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' })
    //   .then(res => {
    //     console.log(res);
    //     this.Cates = res.data.message;
    //     // 把接口的数据存到本地存储中
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })

    //     // 构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map((item) => {
    //       return item.cat_name
    //     });
    //     // 构造右侧的商品数据
    //     let rightContent = this.Cates[0].children

    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    // 1.使用es7的async和await来发送异步请求
    const res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' });
    this.Cates = res.data.message;
    // 把接口的数据存到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })

    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map((item) => {
      return item.cat_name
    });
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children

    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单的点击事件
  goodsClick(e) {
    let index = e.currentTarget.dataset.item
    // 构造右侧的商品数据
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    });

  }

})