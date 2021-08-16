// 引入封装的请求函数
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: []
  },
  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  pages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid = options.cid || '',
      this.QueryParams.query = options.query || ''
    // 发送请求 获取商品列表数据
    this.getGoodsList();


  },
  // 生命周期函数，页面上划 滚动条触底事件
  onReachBottom() {
    // console.log('页面触底');
    // 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.pages) {
      // 没有下一页数据了
      wx.showToast({
        title: '没有下一页数据了',
      });
    } else {
      // 还有下一页数据
      // console.log('还有');
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  // 自定义子组件的点击事件
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    let { index } = e.detail;
    // 修改原数组，让他产生激活选中效果
    let { tabs } = this.data
    tabs.forEach((item, id) => id == index ? item.isActive = true : item.isActive = false);
    // 复制到data中
    this.setData({
      tabs
    })
  },
  // 发送请求 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data: this.QueryParams
    });
    // 商品列表
    let goods = res.data.message.goods;
    // 获取商品总条数
    let total = res.data.message.total;
    // 计算总页数
    this.pages = Math.ceil(total / this.QueryParams.pagesize);
    console.log(this.pages);
    this.setData({
      // 拼接了数组
      goodsList: [...this.data.goodsList, ...goods]
    })
    // 数据请求成功，关闭下拉刷新的等待动画
    wx.stopPullDownRefresh()
  },
  // 下拉刷新事件
  //生命周期函数
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: []
    });
    // 重置页码
    this.QueryParams.pagenum = 1;
    // 重新发送请求
    this.getGoodsList()
  }
})