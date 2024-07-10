Page({
  data: {
    majorNames: [], // 存储专业名列表
    selectedMajorId: null, // 选中的专业ID
    selectedMajorName: '请选择所属专业', // 选中的专业名
    name: '' ,// 班级名称输入值
    grade:'' ,//年级输入值
  },
  onLoad: function() {
    this.fetchMajorNames();
  },
  fetchMajorNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/major/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            majorNames: res.data.data
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
    const selectedMajor = this.data.majorNames[selectedIndex];
    this.setData({
      selectedMajorId: selectedMajor.id,
      selectedMajorName: selectedMajor.name
    });
  },
  bindInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindInputGrade: function(e) {
    this.setData({
      grade: e.detail.value
    });
  },
  submitAdd: function() {
    const { name, selectedMajorId ,grade} = this.data;
    if (!name || !selectedMajorId || !grade) {
      wx.showToast({
        title: '请输入并选择所属系',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const data = {
      name: name,
      grade: grade,
      id:-1,
      majorId: selectedMajorId,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/class',
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