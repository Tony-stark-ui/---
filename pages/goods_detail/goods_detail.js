// 引入封装的请求函数
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情数据
    goodsObj: {},
    goods_id: '',
    // 商品是否被收藏
    isCollect: ''
  },
  properties:{
    src:{
      type:String,
      value:''
    }
  },
  // 商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const { goods_id } = options;
    // this.setData({
    //   goods_id
    // });
    console.log(this.data.isCollect);
  },
  onShow: function () {
    // let { goods_id } = this.data
    // this.getGoodsDetail(goods_id);
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id)
  },
  // 自定义事件，发送求情获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${goods_id}` })
    console.log(res);
    this.setData({
      goodsObj: res.data.message
    })
    console.log(this.data.goodsObj);
    this.GoodsInfo = res.data.message;
    // 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断商品是否被收藏了
    let isCollect = collect.some(item => item.goods_id === this.GoodsInfo.goods_id);
  },
  // 自定义事件，点击轮播图放大预览
  handlePrevewImage(e) {
    // 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(item => item.pics_mid);
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: urls[current], // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  },
  // 自定义事件，加入购物车
  addCart() {
    // 将商品添加到缓存中去
    let cart = wx.getStorageSync('cart') || [];
    // 判断商品对象是否存在购物车数组中
    let index = cart.findIndex(index => index.goods_id === this.GoodsInfo.goods_id);

    if (index === -1) {
      // 不存在将商品 第一次添加添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    } else {
      // 已经存在数据，num++
      cart[index].num++;
    }
    // 把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'succ',
      mask: true,

    });

  },
  // 点击将商品加入收藏
  handleCollect() {
    let isCollect = false
    // 拿到缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断该商品是否被收藏过
    let index = collect.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
    // 当index不等于-1就表示已经收藏过了
    if (index !== -1) {
      // 能找到 已经收藏过了 在数组中删除出该商品
      collect.splice(index, 1);
      isCollect = false
      this.setData({
        isCollect: false
      })
      wx.showToast({
        title: '取消收藏',
        mask: true
      });

    } else {
      // 没有收藏过 将商品添加到收藏数组中
      collect.push(this.GoodsInfo)
      isCollect = true
      this.setData({
        isCollect: true
      })
      wx.showToast({
        title: '收藏成功',
        mask: true
      });
    }
    // 把这个数组从新存入到缓存中
    wx.setStorageSync('collect', collect);
    // 修改data中的属性

    // this.setData({
    //   isCollect: isCollect
    // })
  }
})