$(function(){

  var productid = getUrl().productid || 0;

  // 根据商品 id 获取商品详情
  $.ajax({
    type:  "get",
    url: "http://127.0.0.1:9090/api/getproduct",
    data: {
      productid: productid
    },
    dataType: "json",
    success: function( info ){
      console.log( info );

      // 渲染商品信息
      var htmlStr1 = template("getproduct_tpl" , info);
      $(".productBox .desc").html(htmlStr1);

      // 渲染 goshop 部分
      var htmlStr2 = template("goshop_tpl" , info);
      $(".productBox .goshop").html(htmlStr2);

      // 保存分类id
      var categoryid = info.result[0].categoryId;

      // 截取商品名
      var productName = info.result[0].productName.split(" ")[0];

      // 根据分类id 获取分类名
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {
          categoryid: categoryid
        },
        dataType: "json",
        success: function(info){
          console.log(info);  // 只有分类名

          // 加上商品名
          brand = {
            category: info.result[0],
            productName: productName
          };
          console.log(brand);
          // 渲染到三级导航
          var htmlStr3 = template("threenav_tpl" , brand );
          $(".product .title .three_nav").html( htmlStr3 );
        }


      })
    }
  })


  // 根据商品id获取商品评论
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getproductcom",
    data: {
      productid: productid
    },
    dataType: "json",
    success: function( info ){
      console.log(info);

      // 渲染评论
      var htmlStr4 = template("text_tpl" , info);
      $(".textBox ul").html( htmlStr4 );
    }

  })

})