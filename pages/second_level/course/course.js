
var app = getApp()
Page({
  data: {
    userInfo: {}, 
    messages: [],
    inputValue: '',
    currentPage: 1, // 当前页码
    hasMoreData: true, // 是否有更多数据
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/second_level/course/add/add',
    })

  },
  deleteMessage: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log('删除信息ID:', id);
    var that = this;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条信息吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: `http://localhost:8085/admin/course/${id}`,
            method: 'DELETE',
            success: function(res) {
              console.log('删除成功', res);
              // 从信息列表中移除已删除的信息
              const updatedMessages = that.data.messages.filter(item => item.id !== id);
              that.setData({
                messages: updatedMessages
              });
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function(err) {
              console.error("删除失败", err);
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      }
    })
  },
  editMessage: function(e) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    console.log('编辑消息ID:', id);
    // 在这里实现编辑消息的逻辑
    // 例如：跳转到编辑页面并传递ID参数
    wx.navigateTo({
      url: `/pages/second_level/course/edit/edit?id=${id}&name=${name}`
    });
  },
  getInputValue(e) {
    this.setData({
      inputValue: e.detail.value  
    });
    console.log(this.data.inputValue); // 打印当前 inputValue
  },
  query: function() {
    this.setData({
      currentPage: 1,
      messages: [],
      hasMoreData: true
    }, () => {
      this.loadData();
    });
  },
  loadData: function() {
    if (!this.data.hasMoreData) return;

    var that = this;
    wx.request({
      url: "http://localhost:8085/admin/course/page/" + that.data.currentPage,
      method: 'GET',
      data:{"name":this.data.inputValue},
      success: function(res) {
        const newMessages = res.data.data;
        if (newMessages.length === 0) {
          that.setData({
            hasMoreData: false
          });
        } else {
          that.setData({
            messages: that.data.messages.concat(newMessages),
            currentPage: that.data.currentPage + 1
          });
        }
      },
      fail: function(err) {
        console.error("请求失败", err);
      }
    })
  },
  onReachBottom: function() {
    this.loadData();
  },
  onLoad: function() {
    this.loadData();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.query()
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  // enterMessage: function() {
  //   wx.navigateTo({
  //     url: 'message/message'
  //   })
  // }
})
