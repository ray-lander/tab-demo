
//二级菜单显示与隐藏效果
$(".child").prev().on("click", function () {
  $(this).next().slideToggle();
});


//侧边栏显示与隐藏效果
$(".icon_menu").on("click", function () {
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
});

var tabArr = []
//点击侧边栏，动态添加tab栏
$(".lt_aside a").on("click", function(){  
  var tabId = $(this).data("id")
  
  if(this.href !== "javascript:;" && $.inArray("tabId", tabArr) == -1){
    tabArr.push(tabId)   
     
    $(".tab_main ul").append('<li data-id="'+ tabId +'"><a>'+ this.text +'</a><a class="closeBtn">X</a></li>')
    $(".lt_content").append('<div data-id="'+ tabId +'"><iframe width=100% height=500 frameborder="0" src="'+ $(this).data("name") + '.html' +'"></iframe></div>')
    //给最新生成的li元素添加类
    $("tab_main>ul>li[data-id="+ tabId +"]").addClass("now").siblings().removeClass("now")
    console.log($("tab_main>ul>li[data-id="+ tabId +"]"))
  }
 })

 //点击上边tab栏
 $(".tab_main ul").on("click", "li", function(){      
      console.log($(this).data("id"))
      $(this).addClass("now").siblings().removeClass("now")
      $(".lt_content div").eq($(this).data("id")).css("z-index", "1").siblings().css("z-index", "0")          

  })

  //点击关闭按钮
  $(".tab_main ul").on("click", ".closeBtn", function(){    
    $(this).parent().remove()
    $(".lt_content>div[data-id="+$(this).parent().data("id")+"]").remove()
  })


//退出功能
$(".icon_logout").on("click", function () {
  $("#logoutModal").modal("show");

  //因为jquery注册事件不会覆盖。
  //off()解绑所有的事件
  //off("click")
  $(".btn_logout").off().on("click", function () {
    
    //发送ajax请求，告诉服务器，需要退出
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(data) {
        if(data.success){
          //退出成功，才跳转到登录页面
          location.href = "login.html";
        }
      }
    });


  });
});