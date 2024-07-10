// pages/second_level/department/add/add.js
Page({
  data: {
    name: '',
    // 其他需要新增的字段
  },
  bindInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  // 绑定其他输入框的函数

  submitAdd: function() {
    const { name } = this.data;
    // 构造要提交的数据
    const data = {
      name: name,
      id:-1,
      // 其他字段
    };
    wx.request({
      url: 'http://localhost:8085/admin/department',
      method: 'POST',
      data: data,
      success: function(res) {
        console.log('新增成功', res);
        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            wx.navigateBack();
          }
        });
      },
      fail: function(err) {
        console.error("新增失败", err);
        wx.showToast({
          title: '新增失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
})