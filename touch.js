/**
 * Created by yyc on 2015/10/4.
 */
var needHiddenEle = document.getElementById("LeftClassList"),
    needShowEle = document.getElementById("CenterTaskList");

function moveToChange (event){
    // event.preventDefault();
    needShowEle.setAttribute("class","prepareShow");

    needHiddenEle.setAttribute("class","canvasHidden");

    needShowEle.setAttribute("class","needShow");
    console.log("1")

}
//canvas.addEventListener("touchmove",touchMoveToDelete,false)
needHiddenEle.addEventListener("touchmove",moveToChange,false);

console.log("11111111")

function showCenterList(){

}

// 这里肯定要重写，面临的问题有 ：1 不支持 所有的 click？是这样？待会儿看一下其他人的处理。。。。。。2 重写 func，毕竟要面临 要不然先重构传统的页面吧
// 2 这里的结构也不太好改  草  是写一个   其实还好 ，尤其是那些切换用的，只不过，就是，用 touchstart 来触发下一级 然后 有用touchmove 来返回 罢了