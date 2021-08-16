// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    // 被选举中的图片路径数组
    chooseImage: [],
    //文本域的内容
    textValue: ''
  },
  //外网的图片的路径数组
  uploadImgs: [],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击+号选择图片
  handleChooseImg() {
    // 调用小程序内置的选择图片的api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result);
        this.setData({
          // 图片数组进行拼接
          chooseImage: [...this.data.chooseImage, ...result.tempFilePaths]
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击删除图片、
  remove(e) {
    let index = e.currentTarget.dataset.index
    let { chooseImage } = this.data
    chooseImage.splice(index, 1)
    this.setData({
      chooseImage
    })
  },
  //文本域的输入事件
  handleText(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  //提交按钮的点击事件
  handleForm() {
    // 获取文本域的内容
    const { textValue, chooseImage } = this.data
    //获取图片数组
    //合法性的验证
    if (!textValue.trim()) {
      //不合法的
      wx.showToast({
        icon: 'error',
        title: '输入不合法',
        mask: true
      });
      return
    }
    //准备上传图片到专门的图片服务器
    //上传文件的api不支持多个文件同时上传，遍历数组挨个上传
    chooseImage.forEach((item, index) => {
      var upTask = wx.uploadFile({
        url: 'https://imgtu.com/',
        filePath: item,
        name: 'file',
        formData: {},
        success: (result) => {
          console.log(result);
        },
        fail: () => { },
        complete: () => { }
      });
    })
    //清空页面返回上一页
    this.setData({
      textValue: "",
      chooseImage: []
    });
    wx.showToast({
      title: '提交成功',

    });
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 1000);
  }


})