$(function(){

  $.ajax({
    type:"get",
    url: "http://127.0.0.1:9090/api/getcoupon",
    dataType: "json",
    success: function(info){
      console.log(info);
      // 渲染
      var htmlStr = template("coupon_tpl" ,info);
      $(".coupon ul").html( htmlStr );
    }
  })
})