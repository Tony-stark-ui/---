// pages/auth/auth.js
// 引入封装的请求函数
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
  },
  async handleGetUserInfo(e) {
    try {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      // 获取用户信息
      let { encryptedData, iv, rawData, signature } = e.detail;
      // 获取登录状态
      let { code } = await login();
      let userData = { encryptedData, iv, rawData, signature, code }
      // 发送请求获取用户token
      let res = {

        "message": {
          "user_id": 23,
          "user_email_code": null,
          "is_active": null,
          "user_sex": "男",
          "user_qq": "",
          "user_tel": "",
          "user_xueli": "本科",
          "user_hobby": "",
          "user_introduce": null,
          "create_time": 1562221487,
          "update_time": 1562221487,
          "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        }
      }
      // let res = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      wx.setStorageSync("token", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
      console.log(token);
      wx.navigateBack({
        // 1表示返回上一层
        delta: 1
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 获取用户信息
  // handleGetUserInfo(e) {
  //   //  获取用户信息
  //   const { encryptedData, iv, rawData, signature } = e.detail
  //   console.log(e);
  //   // 获取小程序登陆成功的code值
  //   wx.login({
  //     timeout: 10000,
  //     success: (result) => {
  //       const { code } = result
  //     },
  //     fail: () => { },
  //     complete: () => { }
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})