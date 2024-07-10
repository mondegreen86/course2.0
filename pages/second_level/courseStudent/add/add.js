Page({
  data: {
    studentNames: [], // 存储专业名列表
    selectedStudentId: null, // 选中的专业ID
    selectedStudentName: '请选择学生', // 选中的专业名

    courseNames: [], // 存储专业名列表
    selectedCourseId: null, // 选中的专业ID
    selectedCourseName: '请选择课程', // 选中的专业名

    name: '' ,// 班级名称输入值
    grade:'' ,//年级输入值
    dailyScore: null,
    examScore: null,
    score: null,
  },
  onLoad: function() {
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
  bindPickerChange: function(e) {
    const selectedIndex = e.detail.value;
    const selectedStudent = this.data.studentNames[selectedIndex];
    this.setData({
      selectedStudentId: selectedStudent.id,
      selectedStudentName: selectedStudent.name
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
  submitAdd: function() {
    const { selectedStudentId ,selectedCourseId, dailyScore, examScore, score} = this.data;
    if (!selectedStudentId || !selectedCourseId) {
      wx.showToast({
        title: '请选择学生与课程',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const data = {
      id:-1,
      studentId: selectedStudentId,
      courseId: selectedCourseId,
      dailyScore: dailyScore,
      examScore: examScore,
      score: score,
      // 其他字段
    };
    console.log(data)

    wx.request({
      url: 'http://localhost:8085/admin/student/course',
      method: 'POST',
      data: data,
      success: function(res) {
        if (res.data.code === 0) {
          console.log('新增成功', res);
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.navigateBack();
            }
          });
        } else {

          wx.showToast({
            title: '新增失败: ' + res.data.message,
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