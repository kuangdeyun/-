$(function(){

  // 用封装的地址栏方法获取 brandtitleid
  var brandtitleid = getUrl().brandtitleid || 1;

  // 渲染各十大品牌
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrand",
    data:{
      brandtitleid: brandtitleid
    },
    dataType: "json",
    success: function(info){
      console.log(info);

      // 渲染
      var htmlStr1 = template("tenHotItem_tpl" ,info);
      $(".tenHot ul").html( htmlStr1 );
    }
  })

  // 渲染品牌id对应的商品列表
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getbrandproductlist",
    data:{
      brandtitleid: brandtitleid,
      pagesize: 4
    },
    dataType: "json",
    success: function(info){
      console.log(info);

      // 渲染
      var htmlStr2 = template("sellList_tpl" ,info);
      $(".sellList ul").html( htmlStr2 );
    }
  })



    // 渲染评论列表
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductcom",
      data:{
        productid: 0
      },
      dataType: "json",
      success: function(info){
        console.log(info);
  
        // 渲染
        var htmlStr3 = template("commentList_tpl" ,info);
        $(".commentList ul").html( htmlStr3 );
      }
    })

})