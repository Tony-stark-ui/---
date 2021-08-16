// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中获取用户信息
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    })

  },
  onShow() {
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    });
    // 获取缓存中收藏的商品数量
    let collect = wx.getStorageSync('collect') || [];
    let collectNum = collect.length;
    this.setData({
      collectNum
    })
  }


})