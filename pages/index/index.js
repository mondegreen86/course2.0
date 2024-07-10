Page({
  data: {
    yonghudata: {}, // Store the user data received from the server here
    loginSuccess: false // Initialize login success status
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const { inputname, inputpassword } = e.detail.value;
    const data = {
      "username":inputname,
      "password":inputpassword,
      "userType":"3"
    }
    wx.request({
      url: "http://localhost:8085/user/login",
      method: 'POST',
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // 请求成功，处理返回的数据
        console.log(res.data.code);
        if (res.data.code==0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              // Navigate to another page
              wx.navigateTo({
                url: '/pages/main/main' // Replace '/pages/anotherpage/anotherpage' with the actual path of the page you want to navigate to
              });
              // Close the current page
              wx.navigateBack({
                delta: 1
              });
            }
          });
        } else {
          wx.showToast({
            title: '登录失败，用户名或密码错误',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(err) {
        // 请求失败，处理错误信息
        console.error(err);
      }
    })},
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value);
    this.setData({
      chosen: ''
    });
  },
  
  onReady: function () {
    // Page rendering completed
  },
  onShow: function () {
    // Page shown
  },
  onHide: function () {
    // Page hidden
  },
  onUnload: function () {
    // Page unloaded
  }
})
