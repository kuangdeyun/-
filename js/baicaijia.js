$(function(){

  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
    dataType: "json",
    success: function(info){
      console.log(info);
      // 渲染导航栏
      var htmlStr = template("nav_tpl" , info);
      $(".bcjNav ul").html(htmlStr);

      // 实现白菜价导航区域滚动
      new IScroll(".bcjNav" , {
        scrollX: true,
        scrollY: false
      });


      // 给白菜价导航列表注册点击事件 , 事件委托
      $(".bcjNav").on("click" , ".navList" , function(){
        $(this).addClass("active").siblings().removeClass("active");

        // 获得 当前被点击页面的 titleid
        var titleid = $(this).find("a").data("titleid");
        // console.log(titleid);
        // 根据 titleid 请求渲染不同的优惠商品列表页
        $.ajax({
          type: "get",
          url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
          data: {
            titleid : titleid
          },
          dataType: "json",
          success: function(info){
            console.log(info);

            // 渲染到页面
            var htmlStr1 = template("bjcPro_tpl" , info);
            $(".bcjProduct ul").html( htmlStr1 );
          }
        })
      })


      // 页面第一次加载时触发第一个标题的点击事件,给第一个li添加active
      $(".navList").eq(0).trigger("click");


    }
  })

  

})