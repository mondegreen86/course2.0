// pages/second_level/department/edit/edit.js
Page({
  data: {
    id: null,
    name: '',
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id
    });
    this.loadMessageData();
  },
  loadMessageData: function() {
    const id = this.data.id;
    var that = this;
    wx.request({
      url: `http://localhost:8085/admin/department/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
          // 其他需要编辑的字段
        });
      },
      fail: function(err) {
        console.error("加载消息失败", err);
      }
    });
  },
  bindInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  // 绑定其他输入框的函数
  
  submitEdit: function() {
    const { id, name } = this.data;
    // 构造要提交的数据
    const data = {
      id: id,
      name: name,
      // 其他字段
    };
    wx.request({
      url: 'http://localhost:8085/admin/department',
      method: 'PUT',
      data: data,
      success: function(res) {
        console.log('编辑成功', res);
        wx.showToast({
          title: '编辑成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            wx.navigateBack();
          }
        });
      },
      fail: function(err) {
        console.error("编辑失败", err);
        wx.showToast({
          title: '编辑失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
})