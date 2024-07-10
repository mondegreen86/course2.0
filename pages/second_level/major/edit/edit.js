
Page({
  data: {
    departmentNames: [], // 存储专业名列表
    id: null,
    departmentId:null,
    departmentName:'请选择系',
    name: '',
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
      url: `http://localhost:8085/admin/major/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
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
  submitEdit: function() {
    const { id, name, departmentId } = this.data;

    const data = {
      id:id,
      name: name,
      departmentId: departmentId,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/major',
      method: 'PUT',
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