let ajaxTime = 0

export const request = (params) => {
  ajaxTime++
  // 判断url中是否带有/my/请求的是私有的路径，带上header token
  let header = {...params.header};
  // if(params.url.inculudes('/my/')) {
  //   // 拼接header 带上token
  //   header[Authorization] = wx.getStorageSync('token')
  // }
  // 显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true,
   
  })
  // 定义公共的url
  return new Promise((res, rej) => {
    wx.request({
      ...params,
      header:header,
      success: (result) => {
        res(result)
       
      },
      fail: (err) => {
        rej(err)
        
      },
      // 不管数据请求成功还是失败都会触发的函数
      complete:()=> {
        ajaxTime--
        if(ajaxTime === 0) {
        // 关闭加载中效果
        wx.hideLoading()
        }
      }
    })
  })
}