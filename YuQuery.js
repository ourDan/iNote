/**
 * Created by yyc on 2015/9/27.
 */
// 这个就是我 自己给自己封装一个很小很小的 库，用来解决一些 类似 jQuery 的 功能的一些选择器 ，和一些常用的习惯操作手法 ，
//  好吧 我承认 ，这个写得写得确实不好 ，这个query不过是我在看 浏览过百度ife课堂的作业，看完之后觉得，不如写这么一个 ，看看会解决多少
//  随着个人的学习  应该会 逐渐把 这个 query丰富起来 ，


//  浏览器检测一大类

// 函数绑定

//  各种选择器的 组合

//  ---------------------------------------------针对一些基本数据操作----------------------------------
//   判断arr是否为一个数组，
function isArray(arr) {
    //  因为 instanceof  和 isArray（），均存在问题，前者无法保证多个frame，后者 ie 9以下 得跪
    if( typeof arr.isArray() !=="undefined"  ){
        return arr.isArray();
    }else{ // 草 ie  怎么 调用原型
        return Object.prototype.toString().call(arr) === "[object Array]"
        //  这个就直接可以解决 跨域下 ，无法 保证原型链的流传不通
        //  其实 我比较好奇 为啥 多个 frame，难道说 每个 frame 都有一个 window？这个好像以前  红皮书里面有说
    }
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // j简单 粗暴  这里面涉及的知识点：
    return  Object.prototype.toString().call(fn) === "[object Function]"
}

// 正则对象
/*
function isRegExp(str){

}*/

// 深度克隆，可以复制一个目标对象，返回一个完整拷贝，针对数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var newStr;
    if ( isFunction(src) || isRegExp(str) ){
        console.log("ll")
    }else{//，针对数字、字符串、布尔、日期、数组、Object对象
        if ( src instanceof  Object ){ // 引用大类z
            if ( isArray(src){ //数组
                 for (var i =0,len= src.length;i<src;i++){
                     newStr[i] = arguments.callee.call(src[i]);
                 }
                /*
                newArr = src.map(,,function(){
                                                   return (arguments.callee.call(src[i]));
                                                })
                **/
            }
            else{
                for(var k in src){
                    newStr[k] = arguments.callee.call(src[k])
                }
            }
        }
        else{  //针对数字、字符串、布尔、日期、
            newStr = str;
        }
    }
    return newStr;
}

// 对数组去重，只考虑数组中元素为数字或字符串，返回一个去重后的数组
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