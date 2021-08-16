// 引入封装的wx小程序原声的方法
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from '../../utils/asyncWx'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
import { request } from '../../request/index'
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart') || [];
    // 过滤后的购物车数组
    cart = cart.filter(item => item.checked)
    this.setData({
      address
    })
    // 总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0;
    cart.forEach(item => {
      totalPrice += item.num * item.goods_price;
      totalNum += item.num

    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 点击支付功能
  async handlePay() {
    try {
      // 判断缓存中有没有token
      const token = wx.getStorageSync('token');
      console.log(token);
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return
      }
      // 有token创建订单
      // 1.准备请求头参数
      // const header = { Authorization: token };
      // 2.准备请求体参数
      const order_price = this.data.totalPrice;
      //3. 收货地址参数
      let s = this.data.address
      const consignee_addr = s.provinceName + s.cityName + s.countyName + s.detailInfo
      // 4.订单
      let goods = [];
      this.data.cart.forEach(item => goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      }));
      // 准备发送请求，创建订单，获取订单编号
      const orderParams = { order_price, consignee_addr, goods }
      const { order_number } = request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
        method: 'POST',
        data: {
          orderParams
        },
        // header: header
      })
      console.log(order_number);
      // 发起预支付接口
      const { pay } = await request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',
        method: 'POST',
        // header: header,
        data: { order_number }
      })
      // 发起微信支付
      await requestPayment(pay)
      // 查询后台 订单状态
      const res = await request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/chkOrder',
        method: 'POST',
        // header: header,
        data: { order_number }
      })

    } catch (error) {

    }

  }
})