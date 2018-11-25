$(function(){

  var productid = getUrl().productid;

  $.ajax({
    type:"get",
    url: "http://127.0.0.1:9090/api/getmoneyctrlproduct",
    data: {
      productid: productid 
    },
    dataType: "json",
    success: function( info ){
      console.log(info);

      // 渲染商品详情
      var htmlStr1 = template("proText_tpl" , info);
      $(".moneyproduct").html( htmlStr1 );

      // 渲染extra内容
      var htmlstr2 = template("extra_tpl" , info );
      $(".extra").html( htmlstr2 );
    }
  })
})