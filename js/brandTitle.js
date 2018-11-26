$(function(){

  // 渲染各十大品牌
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrandtitle",
    dataType:"json",
    success: function(info){
      console.log(info);
      // 渲染
      var htmlStr = template("tenHot_tpl" , info);
      $(".tenHot ul").html( htmlStr );

      

    }
  })



})