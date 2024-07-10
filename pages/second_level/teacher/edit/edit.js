
Page({
  data: {
    departmentNames: [], // 存储专业名列表
    id: null,
    departmentId:null,
    departmentName:'请选择系',
    name: '',
    number:'',
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id,
      departmentName: options.name,
    });
    this.loadMessageData();
    this.fetchDepartmentNames();
  },
  fetchDepartmentNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/department/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            departmentNames: res.data.data
          });
        }
      },
      fail: function(err) {
        console.error("请求失败", err);
      }
    });
  },
  loadMessageData: function() {
    const id = this.data.id;
    var that = this;
    wx.request({
      url: `http://localhost:8085/admin/teacher/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
          number: message.number,
          departmentId :message.departmentId,
          // 其他需要编辑的字段
        });
      },
      fail: function(err) {
        console.error("加载消息失败", err);
      }
    });
  },
  bindPickerChange: function(e) {
    const selectedIndex = e.detail.value;
    const selectedDepartment = this.data.departmentNames[selectedIndex];
    this.setData({
      departmentId: selectedDepartment.id,
      departmentName: selectedDepartment.name
    });
  },
  bindInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindInputNumber: function(e) {
    this.setData({
      number: e.detail.value
    });
  },
  submitEdit: function() {
    const { id, name, departmentId, number } = this.data;
    if (number.length !== 12) {
      wx.showToast({
        title: '工号必须为12位数字',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const data = {
      id:id,
      name: name,
      departmentId: departmentId,
      number: number,
      password: 123456,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/teacher',
      method: 'PUT',
      data: data,
      success: function(res) {
        console.log('修改成功', res);
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            wx.navigateBack();
          }
        });
      },
      fail: function(err) {
        console.error("修改失败", err);
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});