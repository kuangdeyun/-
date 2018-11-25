$(function(){

  // 获取 couponid
  var couponid = getUrl().couponid;

  // 渲染优惠券列表
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcouponproduct",
    data: {
      couponid: couponid
    },
    dataType: "json",
    success: function(info){
      console.log(info);
      // 渲染
      var htmlStr = template("product_tpl" , info);
      $(".product ul").html( htmlStr );

    }
  });


  var src;
  // 点击优惠券 显示模态框 , 事件委托
  $(".proBox").on("click" , ".proItem" , function(){
    src = $(this).find(".img img").attr("src");
    $(".mask").find(".mask_img img").attr("src" , src);
    $(".mask").show();
  });

  // 点击删除小符号, 关闭模态框
  $(".mask").on("click" , ".delete" , function(){
    $(this).parents(".mask").hide();
    $(this).prev().attr("src" , "");
  })


})