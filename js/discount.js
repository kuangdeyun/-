$(function(){

  var productid = getUrl().productid;

  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getdiscountproduct",
    data: {
      productid : productid
    },
    dataType: "json",
    success: function(info){
      console.log(info);

      // 渲染商品详细信息
      var htmlStr1 = template("discountText_tpl" ,info);
      $(".moneyproduct").html( htmlStr1 );

      // 渲染 extra 
      var htmlStr2 = template("extra_tpl" , info)
      $(".extra").html( htmlStr2 );

    }
  })
})