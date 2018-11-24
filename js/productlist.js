
$(function(){

  // 根据封装的地址栏方法获取 categoryid
  var  categoryid = getUrl().categoryid || 0;

  // 根据分类id获取分类名称
  renderName();
  function renderName(){
    $.ajax({
      type:"get",
      url: "http://127.0.0.1:9090/api/getcategorybyid",
      data: {
        categoryid: categoryid
      },
      dataType: "json",
      success: function(info){
        console.log(info);
        // 渲染
        var htmlStr = template("categoryName_tpl" , info);
        $(".title .three_nav ").html( htmlStr);
      }
    })
  }


  // 根据分类id获取该分类的商品列表并渲染到页面
  // 根据商品列表总数, 渲染分页标签的页数

  var currentPage = 1;
  var pageCount;
  var $next = $(" .pages .next");
  var $prev = $(" .pages .prev");
  var $curr = $(" .pages .btn-group");

  // 一进入页面调用
  renderProduct();
  
  function  renderProduct(){
    currentPage = currentPage || 1;

    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {
        categoryid : categoryid,
        pageid : currentPage
      },
      dataType: "json",
      success: function( info ){
        console.log(info);
        // 渲染
        var htmlStr = template("categoryProduct_tpl" , info);
        $(" .listBox ").html( htmlStr) ;

        // 计算总页数
        pageCount = Math.ceil( info.totalCount / info.pagesize );
        // 渲染到分页容器里
        $(".btn-group span").text( currentPage + " / " + pageCount );
       
        // 将获取到的总页数包装成对象, 结合模板引擎,动态渲染分页ul里的li
        var page = template("pageCount_tpl" , {
          pageCount:pageCount
        });
        $(".pages .btn-group .dropdown-menu").html( page );
      
      
      }
    })
  }

  // 点击下一页, 当前页 currentPage+1 , 重新渲染页面
  $next.on("click" , function(){
    currentPage++;
    if(currentPage >= pageCount){
      currentPage = pageCount;
    }
    renderProduct(currentPage);
  })

  // 点击上一页, 当前页 currentPage-1 , 重新渲染页面 
  $prev.on("click" , function(){
    currentPage--;
    if(currentPage <= 0 ){
      currentPage = 1;
    }
    renderProduct(currentPage);
  })

  // 点击当前页 , 改变当前页数, 重新渲染页面 ,事件委托
  $curr.on("click" , ".dropdown-menu li " , function(){
      // 记录当前页数
      currentPage = $(this).index() + 1;
      renderProduct(currentPage);
  })


})

