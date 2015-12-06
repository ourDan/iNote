// 写一写基础操作 用来完成一些已经知道的一些兼容性问题 以及选择器

function getElementsByClass(fatherNode,selector){

    if( !fatherNode ){
        var fatherNode = document;
    }

    if( document.getElementsByClassName ){
        return fatherNode.getElementsByClassName(selector);
    }
    else{
        var list = document.getElementsByTagName("*");
        pattern = new RegExp("(^|\\s)"+selector+"(\\s|$)");
        var answerList = [];
        var j = 0;
        for (var i = 0,len = list.length;i<len;i++){
            if( patern.test( list[i].getAttribute("class") ) && list[i].parentNode == fatherNode ){
                answerList[j] = list[i];
                j++;
            }
        }
        return answerList;
    }

}


function $(selector){ //基础的操作 "#id" || ".class" || "tagName" || "" 还有。。。。
    // 实现一个简单的Query
    /*
     可以通过id获取DOM对象，通过#标示，例如
    $("#adom"); // 返回id为adom的DOM对象
     可以通过tagName获取DOM对象，例如
    $("a"); // 返回第一个<a>对象

     可以通过样式名称获取DOM对象，例如
    $(".classa"); // 返回第一个样式定义包含classa的对象

     可以通过attribute匹配获取DOM对象，例如
    $("[data-log]"); // 返回第一个包含属性data-log的对象

    $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

     可以通过简单的组合提高查询便利性，例如
    $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
    */

    var idReg = /^\#/;
    var classReg = /^\./;

    if ( idReg.exec(selector) ){
        selector = selector.replace("#","")
        return document.getElementById(selector);
    } 
    else if( classReg.exec(selector) ){  // 这里不只返回第一个查到的，返回一个数组最好
        
        console.log("i am finding s");
        selector = selector.replace(".","")

        if( document.getElementsByClassName ){
            return document.getElementsByClassName(selector);
            //console.log( document.getElementsByClassName(selector))
        }
        else{
            var list = document.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)"+selector+"(\\s|$)");
            var answerList = [];
            var j = 0;
            for (var i = 0,len = list.length;i<len;i++){
                if( patern.test( list[i].getAttribute("class") ) ){
                    answerList[j] = list[i];
                    j++;
                }
            }
            return answerList;
        }
    }
}

function addEvent(element,event,hander) {
    if ( element.addEventListener ){
        element.addEventListener(event,hander);
    }else if (element.attachEvent){
        element.attachEvent("on"+event,hander);
    }else{
        var newEvent = "on" + event;
        element.newEvent = hander;
    }
}


function isArray(arr) {
    //  ÒòÎª instanceof  ºÍ isArray£¨£©£¬¾ù´æÔÚÎÊÌâ£¬Ç°ÕßÎÞ·¨±£Ö¤¶à¸öframe£¬ºóÕß ie 9ÒÔÏÂ µÃ¹ò
    if( typeof arr.isArray() !=="undefined"  ){
        return arr.isArray();
    }else{ // ²Ý ie  ÔõÃ´ µ÷ÓÃÔ­ÐÍ
        return Object.prototype.toString().call(arr) === "[object Array]"
        //  Õâ¸ö¾ÍÖ±½Ó¿ÉÒÔ½â¾ö ¿çÓòÏÂ £¬ÎÞ·¨ ±£Ö¤Ô­ÐÍÁ´µÄÁ÷´«²»Í¨
        //  ÆäÊµ ÎÒ±È½ÏºÃÆæ ÎªÉ¶ ¶à¸ö frame£¬ÄÑµÀËµ Ã¿¸ö frame ¶¼ÓÐÒ»¸ö window£¿Õâ¸öºÃÏñÒÔÇ°  ºìÆ¤ÊéÀïÃæÓÐËµ
    }
}

// ÅÐ¶ÏfnÊÇ·ñÎªÒ»¸öº¯Êý£¬·µ»ØÒ»¸öboolÖµ
function isFunction(fn) {
    // j¼òµ¥ ´Ö±©  ÕâÀïÃæÉæ¼°µÄÖªÊ¶µã£º
    return  Object.prototype.toString().call(fn) === "[object Function]"
}

// ÕýÔò¶ÔÏó
/*
function isRegExp(str){

}*/

// Éî¶È¿ËÂ¡£¬¿ÉÒÔ¸´ÖÆÒ»¸öÄ¿±ê¶ÔÏó£¬·µ»ØÒ»¸öÍêÕû¿½±´£¬Õë¶ÔÊý×Ö¡¢×Ö·û´®¡¢²¼¶û¡¢ÈÕÆÚ¡¢Êý×é¡¢Object¶ÔÏó¡£²»»á°üº¬º¯Êý¡¢ÕýÔò¶ÔÏóµÈ
function cloneObject(src) {
    
    var newStr;
    if ( isFunction(src) || isRegExp(str) ){
        console.log("ll")
    }
    else{
        if ( src instanceof  Object ){ 
            if ( isArray(src) ){ 
                 for (var i =0,len= src.length;i<src;i++){
                     newStr[i] = arguments.callee.call(src[i]);
                }
            }
            else{
                for(var k in src){
                    newStr[k] = arguments.callee.call(src[k])
                }
            }
        }
        else{  //
            newStr = str;
        }
    }

    return newStr;
}

// ¶ÔÊý×éÈ¥ÖØ£¬Ö»¿¼ÂÇÊý×éÖÐÔªËØÎªÊý×Ö»ò×Ö·û´®£¬·µ»ØÒ»¸öÈ¥ÖØºóµÄÊý×é
/*
function uniqArray(arr) {
    // your implement
    if ( typeof arr == Number || typeof arr === String) {
        var testObject = {};
        for ( ) {

            if () {
            }
        }

    }
    else {
            console.log("you input is not str or number");

        }

    }
 */



