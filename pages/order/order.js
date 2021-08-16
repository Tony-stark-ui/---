// pages/order/order.js
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
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退货/换货',
        isActive: false
      },
    ],
    type: '',
    orders: [
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
      {
        order_id: 1104,
        user_id: 23,
        order_number: 'HMDD2019081200000001104',
        order_price: 13618,
        order_pay: '否',

      },
    ]
  },
  // 自定义子组件的点击事件
  // 根据标题索引选中标题数组
  changeTitleByIndex(index) {
    // 修改原数组，让他产生激活选中效果
    let { tabs } = this.data
    tabs.forEach((item, id) => id == index ? item.isActive = true : item.isActive = false);
    // 复制到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    let { index } = e.detail;
    this.changeTitleByIndex(index)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { type } = options
    // 激活选中页面标题
    this.changeTitleByIndex(type - 1)
    this.setData({
      type
    })
  },
  onShow(options) {
    let currentPages = parseInt(this.data.type)
    console.log(currentPages);
    this.getOrders(currentPages)
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all',
      data: { type }
    })
    console.log(res.data);
  }
})