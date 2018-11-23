$(function(){

  var pageid = 0;
  var totalPage;
  var $next = $(".recommend .pages .next");
  var $prev = $(".recommend .pages .prev");
  var $curr = $(".recommend .pages .btn-group");

  render();

 function render(){

  pageid = pageid || 0;

  $.ajax({
    type: "get",
    url: "http://127.0.0.1:9090/api/getmoneyctrl",
    data: {
      pageid: pageid
    },
    dataType: "json",
    success: function(info){
      console.log( info );
      // 渲染
      var htmlStr = template("moneyctrl_tpl" , info);
      $(".content ul").html( htmlStr );

      // 向上取整总页数
      totalPage = Math.ceil( info.totalCount / info.pagesize );
      // console.log(totalPage);   //15
      $(".recommend .pages .btn span").text( (pageid + 1) + "/" + totalPage );

      var page = template("pageCount_tpl" , {
        pageCount: totalPage
      });
      $(".recommend .pages .dropdown-menu").html( page );
    }
  })


 }


//  下一页
 $next.on("click" , function(){
   pageid++;
   if( pageid >= totalPage ){
     pageid = totalPage;
   }
   render(pageid);
 })


//  上一页
$prev.on("click" , function(){
  pageid--;
  if( pageid <= 0 ){
    pageid = 0;
  }
  render(pageid);
})

// 中间分页按钮
$curr.on("click", function () {
  $(this).find(".morePage").toggle();

})

$curr.on("click" , ".dropdown-menu li" , function(){
  pageid = $(this).index();
  render(pageid);
})


})