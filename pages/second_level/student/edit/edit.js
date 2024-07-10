
Page({
  data: {
    classNames: [], // 存储专业名列表
    id: null,
    classId:null,
    className:'请选择班级',
    name: '',
    number:'',
    password:'',
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id,
      className: options.name,
    });
    this.loadMessageData();
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
  loadMessageData: function() {
    const id = this.data.id;
    var that = this;
    wx.request({
      url: `http://localhost:8085/admin/student/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
          classId :message.classId,
          number : message.number,
          password : message.password,
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
    const selectedClass = this.data.classNames[selectedIndex];
    this.setData({
      classId: selectedClass.id,
      className: selectedClass.name
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
  bindInputGrade: function(e) {
    this.setData({
      grade: e.detail.value
    });
  },
  submitEdit: function() {
    
    const { id, name, classId ,number, password } = this.data;
    if (number.length !== 12) {
      wx.showToast({
        title: '学号必须为12位数字',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    const data = {
      id:id,
      name: name,
      classId: classId,
      number: number,
      password: password,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/student',
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