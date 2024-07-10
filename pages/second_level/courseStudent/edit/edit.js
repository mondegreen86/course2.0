
Page({
  data: {
    id: null,

    studentNames: [], // 存储专业名列表
    studentId:null,
    studentName:'请选择学生',

    courseNames: [], // 存储专业名列表
    selectedCourseId: null, // 选中的专业ID
    selectedCourseName: '请选择课程', // 选中的专业名

    dailyScore: null,
    examScore: null,
    score: null,
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id,
      selectedCourseName:options.cname,
      studentName:options.sname,
    });
    this.loadMessageData();
    this.fetchStudentNames();
    this.fetchCourseNames();
  },
  fetchStudentNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/student/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            studentNames: res.data.data
          });
        }
      },
      fail: function(err) {
        console.error("请求失败", err);
      }
    });
  },
  fetchCourseNames: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8085/admin/course/names',
      method: 'GET',
      success: function(res) {
        if (res.data) {
          that.setData({
            courseNames: res.data.data
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
      url: `http://localhost:8085/admin/student/course/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          studentId :message.studentId,
          selectedCourseId :message.courseId,
          dailyScore:message.dailyScore,
          examScore:message.dailyScore,
          score:message.score,
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
    const selectedStudent = this.data.studentNames[selectedIndex];
    this.setData({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name
    });
  },
  bindPickerChangeC: function(e) {
    const selectedIndex = e.detail.value;
    const selectedCourse = this.data.courseNames[selectedIndex];
    this.setData({
      selectedCourseId: selectedCourse.id,
      selectedCourseName: selectedCourse.name
    });
  },
  bindInputDaily: function(e) {
    this.setData({
      dailyScore: e.detail.value
    });
  },
  bindInputExam: function(e) {
    this.setData({
      examScore: e.detail.value
    });
  },
  bindInputScore: function(e) {
    this.setData({
      score: e.detail.value
    });
  },
  submitEdit: function() {
    const { id, studentId ,selectedCourseId, dailyScore, examScore, score } = this.data;

    const data = {
      id:id,
      studentId: studentId,
      courseId: selectedCourseId,
      dailyScore: dailyScore,
      examScore: examScore,
      score: score,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/student/course',
      method: 'PUT',
      data: data,
      success: function(res) {
        if (res.data.code === 0) {
          console.log('修改成功', res);
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.navigateBack();
            }
          });
        } else {

          wx.showToast({
            title: '修改失败: ' + res.data.message,
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(err) {
        console.error("请求失败", err);
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});