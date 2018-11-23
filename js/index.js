$(function(){

  // 一进入页面,发送ajax请求,请求数据渲染导航信息
  $.ajax({
    type:"get",
    url: "http://127.0.0.1:9090/api/getindexmenu",
    dataType: "json",
    success:function(info){
      console.log(info);
      // 渲染
      var htmlStr = template("nav_tpl" , info);
      $(".nav ul").html( htmlStr );

      // 点击更多按钮,切换第三行导航栏数据的显示模式
      var $item_more = $(".nav .nav_item.item_more");
      //    ???
      var $item_hide = $(".nav .nav_item.item_more ~ .nav_item");
      $item_more.on("click" , function(){
        $item_hide.stop().toggleClass("item_hide");
        // toggleClass() 方法对添加和移除被选元素的一个或多个类进行切换。
        // 该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
      })

    }
  })


  // 请求折扣商品信息
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getmoneyctrl",
    dataType: "json",
    success: function( info ){
      console.log( info );
      // 渲染
      var htmlStr = template("recom_tpl" , info);
      $(".content ul").html( htmlStr );
    }
  })
  



})