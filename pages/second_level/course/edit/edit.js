
Page({
  data: {
    teacherNames: [], // 存储专业名列表
    id: null,
    teacherId:null,
    teacherName:'请选择老师',
    name: '',
    grade:'',
    credit:'',
    location:'',
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id,
      teacherName: options.name,
    });
    this.loadMessageData();
    this.fetchTeacherNames();
  },
  fetchTeacherNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/teacher/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            teacherNames: res.data.data
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
      url: `http://localhost:8085/admin/course/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
          teacherId :message.teacherId,
          grade : message.grade,
          credit:message.credit,
          location:message.location,
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
    const selectedTeacher = this.data.teacherNames[selectedIndex];
    this.setData({
      teacherId: selectedTeacher.id,
      teacherName: selectedTeacher.name
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
  bindInputCredit: function(e) {
    this.setData({
      credit: e.detail.value
    });
  },
  bindInputLocation: function(e) {
    this.setData({
      location: e.detail.value
    });
  },
  submitEdit: function() {
    const { id, name, teacherId ,grade, credit, location } = this.data;

    const data = {
      id:id,
      name: name,
      teacherId: teacherId,
      grade: grade,
      credit:credit,
      location:location,
      maxSize:50,
      time:'1-1-2',
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/course',
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