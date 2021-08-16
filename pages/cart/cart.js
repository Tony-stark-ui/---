// 引入封装的wx小程序原声的方法
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime'
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数组
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 收货地址按钮点击事件 获取用户收货地址
  async handleChooseAddress() {
    // 获取权限
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting['scop.address'];
    //  判断权限状态
    if (scopeAddress === true || scopeAddress === false) {
      //  调用获取收货地址的代码api
      const res2 = await chooseAddress();
      // 将用户地址存入到缓存中
      wx.setStorageSync("address", res2);
    } else {
      //  诱导用户打开授权页面
      // await openSetting()
      //  成功之后重新调用收货地址api
      const res2 = await chooseAddress();
      wx.setStorageSync("address", res2);
    }
  },
  // 商品的选中
  handleChange(e) {
    // 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let { cart } = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(item => item.goods_id === goods_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态，重新计算底部工具栏的数据
  setCart(cart) {
    // 重新计算商品价格，数量
    let allChecked = true
    // 总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0;
    cart.forEach(item => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num
      } else {
        allChecked = false
      }
    });
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    // 赋值到缓存中
    wx.setStorageSync('cart', cart);
  },
  // 商品全选功能
  handleItemAllChange() {
    // 获取data中的数据
    let { cart, allChecked } = this.data;
    // 修改allChecked
    allChecked = !allChecked;
    // 循环修改cart数组中的商品选中状态
    cart.forEach(item => {
      item.checked = allChecked
    });
    // 修改后的值填充回data中和缓存中
    this.setCart(cart);
  },
  // 商品加减按钮事件
  async handleItemNumEdit(e) {
    // 获取传递过来的参数
    let { operation, id } = e.currentTarget.dataset;
    // 找到商品对象
    let { cart } = this.data;
    // 找到需要改变商品的索引
    const index = cart.findIndex(item => item.goods_id === id);
    // 进行数量修改
    // if (cart[index].num <= 0) {
    //   cart[index].num = 0;
    //   operation == -1 ? operation = 0 : operation
    // }
    cart[index].num += operation
    // 当购物车数量为1同时点击的是-号按钮，则询问用户是否删除
    if (cart[index].num === 0 && operation == -1) {
      // wx.showModal({
      //   title: '提示',
      //   content: '是否删除此商品?',
      //   showCancel: true,
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index, 1);
      //       this.setCart(cart)
      //     } else {
      //       operation == -1 ? operation = 1 : operation
      //       cart[index].num += operation
      //       this.setCart(cart)
      //     }
      //   }
      // });
      // promise形式的showModal
      const res = await showModal({ content: '是否删除此商品?' });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart)
      } else {
        operation == -1 ? operation = 1 : operation
        cart[index].num += operation
        this.setCart(cart)
      }
    }
    // 重新赋值给data和缓存
    this.setCart(cart)
  },
  // 点击结算按钮
  async handlePay() {
    // 判断收货地址
    let { address, totalNum } = this.data;
 
    if (!address.userName) {
      await showToast({ title: '您还没有选择收货地址' });
      return
    }
    // 判断用户有没有选购商品
    if (totalNum === 0) {
      await showToast({ title: '您还没有选购商品' })
      return
    }
    // 跳转到结算页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})