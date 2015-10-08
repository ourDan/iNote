/**
 * Created by yyc on 2015/10/4.
 */
// 这个就是封装的 负责适配各种webApp机型的func;


var metaEle = document.documentElement.querySelector("meta[name=viewport]");

var docEle = document.documentElement,
    dpr =  window.devicePixelRatio || 1,
    scale = 1 / dpr;
// console.log(docEleWidth );
// 正常 console.log(scale);
   // var device = device-width;
//console.log(device)
if (!metaEle){
    metaEle = document.createElement("meat");
    metaEle.name = "viewport";
}

//width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no
metaEle.content = "initial-scale="+scale+",minmuim-scale="+scale+",maxmuim-scale="+scale+",user-scalable=no"
   ; docEle.firstElementChild.appendChild(metaEle);
//  console.log  dom里面，看不见 meta带设置参数的
console.log(docEle.getBoundingClientRect());
var rem = docEle.getBoundingClientRect().width/ 16  //    chrome <10px,强制12px
console.log(rem);
document.getElementsByTagName("html")[0].style.fontSize = rem + "px";


var UA = navigator.userAgent;





