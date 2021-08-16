// primise 形式的getSeting
export const getSetting = ()=> {
  return new Promise((res,rej)=> {
    wx.getSetting({
      success:(result)=> {
        res(result)
      },
      fail:(err)=> {
        rej(err)
      }
    })
  })
}

// primise形式的 chooseAddress
export const chooseAddress = ()=> {
  return new Promise((res,rej)=> {
    wx.chooseAddress({
      success:(result)=> {
        res(result)
      },
      // fail:(err)=> {
      //   rej(err)
      // }
    })  
  })
}


// primise形式的 openSetting
export const openSetting = ()=> {
  return new Promise((res,rej)=> {
    wx.openSetting({
      success:(result)=> {
        res(result)
      },
      // fail:(err)=> {
      //   rej(err)
      // }
    })
  })
};

// primise形式的弹窗提示
export const showModal = ({content}) => {
  return new Promise((res,rej)=> {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        res(result)
        }
    })
}
  )}

  // promise形式的结算弹窗
  export const showToast = ({title})=> {
    return new Promise((res,rej)=> {
      wx.showToast({
        title:title,
        icon:'none',
        success:(result)=> {
          res(result)
        }
      })
    })
  }

// promise形式的微信登录
  export const login = ()=> {
    return new Promise((res,rej)=> {
      wx.login({
        timeout: 10000,
        success: (result) => {
          res(result)
        },
        fail: (res) => {
          rej(res)
        }
      })
    })
  }

  // 调用微信支付
  export const requestPayment = (pay)=> {
    return new Promise((res,rej)=>{
      wx.requestPayment({
        ...pay,
        success: (result)=>{
          res(result)
        }
      });
    })
  }
