//index.js
//获取应用实例
var app = getApp()
Page({ 
  data: {
    imgUrls: [
      '/image/image.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  //事件处理函数
  teacher: function() {
    wx.navigateTo({
      url: '../second_level/teacher/teacher'
    })
  },
  department: function() {
    wx.navigateTo({
      url: '../second_level/department/department'
    })
  },
  major: function() {
    wx.navigateTo({
      url: '../second_level/major/major'
    })
  },
  class: function() {
    wx.navigateTo({
      url: '../second_level/class/class'
    })
  },
  student: function() {
    wx.navigateTo({
      url: '../second_level/student/student'
    })
  },
  courseStudent: function() {
    wx.navigateTo({
      url: '../second_level/courseStudent/courseStudent'
    })
  },
  course: function() {
    wx.navigateTo({
      url: '../second_level/course/course'
    })
  },

  onShow: function () {
    
  },
  tapName: function(event) {
    console.log(event)
  }
})

