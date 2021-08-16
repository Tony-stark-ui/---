// 引入封装的请求函数
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputValue: ''
  },
  TimeId: -1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 输入框的值改变了就会触发的事件
  handleinput(e) {
    // 获取输入框的值
    const { value } = e.detail
    // 检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      // 值不合法
      return
    }
    this.setData({
      isFocus: true
    })
    // 防抖
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 500);

  },
  // 准备发送请求获取数据
  async qsearch(query) {
    let res = await request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
      data: { query }
    })
    this.setData({
      goods: res.data.message
    })
    console.log(this.data.goods);
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    })
  }


})