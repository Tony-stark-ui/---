// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      },
    ],
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    // 页面启动获取缓存中的收藏数据
    const collect = wx.getStorageSync('collect');
    this.setData({
      collect
    })
  }


})