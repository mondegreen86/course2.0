Page({
  data: {
    departmentNames: [], // 存储专业名列表
    selectedDepartmentId: null, // 选中的专业ID
    selectedDepartmentName: '请选择所属系', // 选中的专业名
    name: '' // 专业名称输入值
  },
  onLoad: function() {
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
  bindPickerChange: function(e) {
    const selectedIndex = e.detail.value;
    const selectedDepartment = this.data.departmentNames[selectedIndex];
    this.setData({
      selectedDepartmentId: selectedDepartment.id,
      selectedDepartmentName: selectedDepartment.name
    });
  },
  bindInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  submitAdd: function() {
    const { name, selectedDepartmentId } = this.data;
    if (!name || !selectedDepartmentId) {
      wx.showToast({
        title: '请输入并选择所属系',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const data = {
      name: name,
      id:-1,
      departmentId: selectedDepartmentId,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/major',
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
});