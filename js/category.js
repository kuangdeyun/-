$(function(){

  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getcategorytitle",
    dataType: "json",
    success: function( info ){
      console.log( info );
      // 渲染到页面
      var htmlStr = template("category_tpl" , info);
      $(".category ul").html( htmlStr );

      // 点击分裂标题获得标题对应的分类列表, 然后渲染到页面上
      $(".item").on("click" , "a" , function(){
        var $that = $(this);
        // console.log($that);
        var titleid = $(this).data("titleid");
        // console.log(titleid);

        $.ajax({
          type:"get",
          url: "http://127.0.0.1:9090/api/getcategory",
          data:{
            titleid: titleid
          },
          dataType:"json",
          success: function(info){
            console.log( info) ;
            console.log($that);
            // 渲染
            var htmlStr = template("item_tpl" , info);
            //  console.log($that.next());   //  ul.subBox
            $that.next().html( htmlStr );
            $that.next().stop().slideToggle();

            // $(selector).slideToggle(speed,callback);
            // slideToggle() 方法可以在 slideDown() 与 slideUp() 方法之间进行切换
          }


        })
      })
    }
  })

  
  
})