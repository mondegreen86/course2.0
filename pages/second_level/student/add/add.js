Page({
  data: {
    classNames: [], // 存储班级名列表
    selectedClassId: null, // 选中的班级ID
    selectedClassName: '请选择所属班级', // 选中的班级名
    name: '' ,// 学生名称输入值
    password: '',//密码
    number: '',//学号
  },
  onLoad: function() {
    this.fetchClassNames();
  },
  fetchClassNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/class/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            classNames: res.data.data
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
    const selectedClass = this.data.classNames[selectedIndex];
    this.setData({
      selectedClassId: selectedClass.id,
      selectedClassName: selectedClass.name
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
  bindInputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  submitAdd: function() {
    const { name, selectedClassId ,number, password,} = this.data;
    if (!name || !selectedClassId || !number) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (number.length !== 12) {
      wx.showToast({
        title: '学号必须为12位数字',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const data = {
      name: name,
      number: number,
      password: password,
      id:-1,
      classId: selectedClassId,
      sex:1,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/student',
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