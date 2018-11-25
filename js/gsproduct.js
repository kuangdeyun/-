$(function(){


  // 渲染第一个下拉ul下拉框
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshop",
    dataType: "json",
    success: function(info){
      console.log(info);
      var  htmlStr1 = template("navList1_tpl" ,info);
      $(".select .shopBox").html( htmlStr1 );
    }
  })


  // 渲染第二个下拉ul下拉框
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getgsshoparea",
    dataType: "json",
    success: function(info){
      console.log(info);
      var  htmlStr2 = template("navList2_tpl" ,info);
      $(".select .areaBox").html( htmlStr2 );
    }
  })


  //给导航栏按钮注册点击事件，点击时，对应下标的ul显示，其他ul隐藏
  $(".navBox").on("click" , ".navItem" ,function(){
    var $index = $(this).index();
    $(".select ul").eq($index).toggle();

    // 隐藏其它,显示自己
    if($(".select ul").eq($index).css("display") === "block" ){
      $(".select ul").eq($index).siblings().hide();
    }
  }) 

  

  var $shopid;
  var $areaid;
  // 给下拉框中li注册点击事件，记录shopid和areaid。点击之后即发送ajax请求，获取对应的数据渲染到页面中
  //  第一个下拉框
  $(".shopBox").on("click" , "li" ,function(){

    $shopid = $(this).data("shopid");
    // 隐藏下拉框
    $(".shopBox").hide();
    // 导航框里的文字显示为选中的li里的文字
    $(".navBox .navItem").eq(0).find("span").text( $(this).text() );

    render($shopid , $areaid );

  })


   //  第二个下拉框
   $(".areaBox").on("click" , "li" ,function(){

    $areaid = $(this).data("areaid");
    // 隐藏下拉框
    $(".areaBox").hide();
    // 导航框里的文字显示为选中的li里的文字
    var a = $(this).text().trim().slice( 0 , 2 );
    $(".navBox .navItem").eq(1).find("span").text( a );

    render($shopid , $areaid );

  })


  //  第三个下拉框
  $(".priceBox").on("click" , "li" ,function(){
    // 隐藏下拉框
    $(".priceBox").hide();
    
    render(0 , 0);

  })


  // 渲染商品
  function render(shopid , areaid ){
    shopid = shopid || 0;
    areaid = areaid || 0;

    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getgsproduct",
      data: {
        shopid: shopid,
        areaid: areaid
      },
      dataType: "json",
      success: function(info){
        console.log(info);

        var str = template("conItem_tpl" , info);
        $(".conBox").html( str );
      }

    })
  }

  render();

})