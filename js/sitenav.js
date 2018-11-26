$(function(){

  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getsitenav",
    dataType: "json",
    success: function( info ){
      console.log(info);

      // 渲染导航列表
      var htmlStr = template("sitenav_tpl" , info);
      $(".sitenav ul").html( htmlStr );
    }
  })
})