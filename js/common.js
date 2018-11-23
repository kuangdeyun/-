// 获取地址栏参数, 返回为对象格式
function getUrl( k ){
  // 获取地址栏参数信息
  var str = location.search;
  // 对中文解码
  str = decodeURI( str );
   // 去掉问号
  str = str.slice( 1 );
  // str.split( 字符 ); 可以将字符串切割成数组
  var arr = str.split("&");

  var obj = {};
  // 遍历数组, 取得键值对
  arr.forEach(function( v, i){
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[ key ] = value;
  })

   // 将需要获取的对应属性返回
   return obj[ k ];
}