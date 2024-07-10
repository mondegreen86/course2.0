
Page({
  data: {
    majorNames: [], // 存储专业名列表
    id: null,
    majorId:null,
    majorName:'请选择专业',
    name: '',
    grade:'',
    // 其他需要编辑的字段
  },
  onLoad: function(options) {
    // 页面初始化，options 为页面跳转所带来的参数
    this.setData({
      id: options.id,
      majorName: options.name,
    });
    this.loadMessageData();
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
  loadMessageData: function() {
    const id = this.data.id;
    var that = this;
    wx.request({
      url: `http://localhost:8085/admin/class/${id}`,
      method: 'GET',
      success: function(res) {
        const message = res.data.data;
        that.setData({
          name: message.name,
          majorId :message.majorId,
          grade : message.grade,
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
    const selectedMajor = this.data.majorNames[selectedIndex];
    this.setData({
      majorId: selectedMajor.id,
      majorName: selectedMajor.name
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
  submitEdit: function() {
    const { id, name, majorId ,grade } = this.data;

    const data = {
      id:id,
      name: name,
      majorId: majorId,
      grade: grade,
      // 其他字段
    };

    wx.request({
      url: 'http://localhost:8085/admin/class',
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