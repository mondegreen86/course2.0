Page({
  data: {
    teacherNames: [], // 存储专业名列表
    selectedTeacherId: null, // 选中的专业ID
    selectedTeacherName: '请选择任课老师', // 选中的专业名
    name: '' ,// 班级名称输入值
    grade:'' ,//年级输入值
    credit:'',
    location:'',
  },
  onLoad: function() {
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
  bindPickerChange: function(e) {
    const selectedIndex = e.detail.value;
    const selectedTeacher = this.data.teacherNames[selectedIndex];
    this.setData({
      selectedTeacherId: selectedTeacher.id,
      selectedTeacherName: selectedTeacher.name
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
  submitAdd: function() {
    const { name, selectedTeacherId ,grade, credit, location} = this.data;
    if (!name || !selectedTeacherId || !grade || !credit || !location) {
      wx.showToast({
        title: '请输入完整内容',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const data = {
      name: name,
      grade: grade,
      id:-1,
      teacherId: selectedTeacherId,
      credit:credit,
      location:location,
      maxSize:50,
      time:'1-1-2',
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/course',
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