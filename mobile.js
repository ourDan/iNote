
var allBtn = document.getElementById("chooseLeft"),
    notBtn = document.getElementById("chooseCenter"),
    completeBtn = document.getElementById("chooseRight");

//  负责做页面适配的
(function(){

    var metaEle = document.documentElement.querySelector("meta[name=viewport]");

    var docEle = document.documentElement,
        dpr =  window.devicePixelRatio || 1,
        scale = 1 / dpr;
// console.log(docEleWidth );
// ���� console.log(scale);
// var device = device-width;
//console.log(device)
    if (!metaEle){
        metaEle = document.createElement("meat");
        metaEle.name = "viewport";
    }

//width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no
    metaEle.content = "initial-scale="+scale+",minmuim-scale="+scale+",maxmuim-scale="+scale+",user-scalable=no"
    ; docEle.firstElementChild.appendChild(metaEle);
//  console.log  dom�����
    console.log(docEle.getBoundingClientRect());
    var rem = docEle.getBoundingClientRect().width/ 16  //    chrome <10px,ǿ��12px
    console.log(rem);
    document.getElementsByTagName("html")[0].style.fontSize = rem + "px";


    var UA = navigator.userAgent;


})()

//  做 切换用的，就是center那页里面 的完成 ，未完成 什么的，用来切换
addEvent(  allBtn  ,"touchstart",changeAllTask  );
addEvent(notBtn ,"touchstart",changeNotTask);
addEvent( completeBtn,"touchstart",changeCompleteTask);


//  因为dom结构的问题，需要 重写一个添加按钮
(function(){
    var newADD = document.createElement("div");
    newADD.innerHTML = "<div class='BtnPlaceholder'></div> <p>aaa<img src='./images/add.png' class='ImgAdd'></p>"
    document.body.getElementsByClassName("good")[0].appendChild(newADD);
    newADD.setAttribute("id","neewAdd");
})()


    function showCenterTaskDiv(taskDivTitle){
        var centerTaskDivList = Center_taskList.getElementsByTagName("div"),
            centerTaskDiv;

        for (var i= 0,len = centerTaskDivList.length;i<len;i++){
            if (centerTaskDivList[i].getAttribute("title") == needTitle){
                centerTaskDiv = centerTaskDivList[i];
                break;
            }
        }
        //
    }

    function decideWhichCenterTaskToShow(needTitle){
        var centerTaskDivList = Center_taskList.getElementsByTagName("div"),
            centerTaskDiv;

        for (var i= 0,len = centerTaskDivList.length;i<len;i++){
            if (centerTaskDivList[i].getAttribute("title") == needTitle){
                centerTaskDiv = centerTaskDivList[i];
                break;
            }
        }

        showCenterTaskDiv( centerTaskDiv)

    }

// 不是模式，就是一个把 控制几大页面来 滑动 返回 操作 ，判断，当前显示的是哪个 ，就可以自己控制
/*(function (){
   // console.log("why error?")
    var position={},
        goodPart = document.body.getElementsByClassName("good")[0];
    console.log(goodPart);
    addEvent(goodPart,"touchstart",function(Event){
        // console.log("START in touch" + " " )
        var touch=Event.touches[0];
        position.Xstart = touch.pageX;
        console.log( position.Xstart)
    });
    addEvent(goodPart,"touchmove",function(Event){
        var touch = Event.touches[0];
        position.Xp = touch.pageX;
        position.Yp = touch.pageY;

        if ( (position.Xp - position.Xstart )> 100  &&  Left_class.style.display == "none" ){
            //alert("ok")
            console.log( Center_task.style.display == "none" )
            var showPart ,
                hiddenPart;
            if ( Center_task.style.display == "none" ){
                showPart =Center_task  ;
                hiddenPart = Right_content;
                showNoShow(hiddenPart,showPart);
            }else {
                //console.log("cnm");
                showPart =Left_class ;
                hiddenPart = Center_task ;
                showNoShow(hiddenPart,showPart);
            }
            function showNoShow(hiddenP,showP){
                showP.style.display = "block";
                hiddenP.setAttribute("class","backToHidden");
                showP.setAttribute("class","backToShow");
                setTimeout(function(){
                    hiddenP.style.display = "none"
                },600);
            }
        }
    });
}())

*/

//  这个是 带 动画 效果的 大 页面之间的切换 效果
function showNoShow(hiddenP,showP) {
    showP.style.display = "block";
    hiddenP.setAttribute("class", "backToHidden");
    showP.setAttribute("class", "backToShow");

    setTimeout(function () {
        hiddenP.style.display = "none"
    }, 400);
}
//addEvent(Center_taskList,"touchstart",touchToShowContent)


// 这个是用来 显示 添加 分类，或者 进入添加 task的页面
var addBTn = document.getElementById("neewAdd");
addEvent(addBTn,"touchend",function(Event){
    console.log(Left_class.style.display =="none")
    Event.preventDefault();
        //  因为实在不太好操作，只能将dom在移动端和pc做了不同的调整，所以说，添加动作，需要做在哪里添加的 区分
        if ( Left_class.style.display !== "none"){   //  那就是说，中间的那页并没有显示 ，就是在LeftList 上面 要 添加 分类喽，
            createClass();
        }
        else if (Left_class.style.display == "none") {  // 好了 ，这里是添加task
            // 这里和移动端就有很大的不同了
            // 就得先把  Right的页面显示了，而且显示的是 填写的页面
         //   touchToShowContent();
            ( function (){
               Right_content.setAttribute("class","prepareShow");
               Right_content.style.display = "block";
//
               Center_task.setAttribute("class","canvasHidden");
               Right_content.setAttribute("class","needShow");
               setTimeout(function(){
                   Center_task.style.display = "none"
               },400);
           } )();
            // 显示 填写的
            Right_FaultContent.style.display = "none"
            Right_createTaskContent.style.display = "block";

            //

        }
});
//  因为 流程设计原因 ，这里还得写，点击确认添加 task 之后
addEvent( Right_sureToCreateContent ,"touchstart",  toCreateTask);



//编辑 任务
// 首先 得，先进入到可编辑的界面
addEvent(Right_editBtn,"touchstart",editContent);
// 其次 ，直接修改
addEvent( Right_content,"touchstart",sureEdit);
// 完成项目
addEvent(Right_okBtn,"touchstart",completeTask);


//  这里就是关于 关于 核心在 mobile上面的运用




// 这个是别人写的例子，可以一看
/*
var Touchable = function() {

    function Touchable(target) {
        var self = this;

        function Touch(touch) {
            this.x = touch.pageX;
            this.y = touch.pageY;
        }

        EventEmitter.call(self);

        self.el = El.from(target);
        self.touches = {};

        attach(self, self.el);

        self.on({
            touchstart: function(e) {
                log("touchstart");
                // log(e);

                forEach(e.changedTouches, function(touch) {
                    capture(self, touch);

                    // log(touch);
                });
            }


            touchmove: function(e) {
                forEach(e.changedTouches, function(touch) {
                    var ot = self.touches[touch.identifier];
                    if (!ot)
                        return;
                    var t = new Touch(touch);

                    var dx = t.x - ot.x,
                        dy = t.y - ot.y;

                    if (ot.isSwipe === undefined && Math.abs(dy) > 10) {
                        ot.isSwipe = false;
                        ot.isScrolling = true;

                        self.emit("touchscrollstart", e);
                    } else if (ot.isSwipe === undefined && Math.abs(dy) < 10 && Math.abs(dx) > 30) {
                        e.preventDefault();

                        ot.isSwipe = true;
                    } else if (Math.abs(dy) > 30) {
                        ot.isSwipe = false;
                    }
                });
            },

            touchend: function(e) {
                log("touchend");
                // log(e);
                // log(self.touches);
                forEach(e.changedTouches, function(touch) {
                    var ot = self.touches[touch.identifier];

                    if (!ot)
                        return;

                    var t = new Touch(touch);

                    log(ot);
                    log(t);

                    var dx = t.x - ot.x,
                        dy = t.y - ot.y;

                    if (Math.abs(dx) < 10 && Math.abs(dy) < 10)
                        self.emit("touchtap", e);
                    else if (ot.isSwipe)
                        self.emit("touchswipe", e);
                    else if (ot.isScrolling)
                        self.emit("touchscrollend", e);

                    uncapture(self, touch);
                });

                // log(self.touches);
            },
            touchcancel: function(e) {
                log("touchcancel");
                // log(e);

                forEach(e.changedTouches, function(touch) {
                    uncapture(self, touch);

                    // log(touch);
                });
            }
        });



        function forEach(a, f) {
            Array.prototype.forEach.call(a, f);
        }

        function capture(self, touch) {
            var id = touch.identifier;

            var t = new Touch(touch);

            self.touches[id] = t;
        }

        function uncapture(self, touch) {
            var id = touch.identifier;

            delete self.touches[id];
        }
    }

    Touchable.prototype = Object.create(EventEmitter.prototype, Obj.descriptor({
        constructor: Touchable
    }));

    function attach(self, el) {
        "touchstart touchmove touchend touchcancel".split(" ").forEach(function(x) {
            self.el.on(x, function(e) {
                self.emit(x, e);
            });
        });
    }

    function setPush(set, element) {
        if (set.indexOf(element) === -1)
            set.push(element);
    }

    return Touchable;
}();
*/

// 大框架应该没错
// 应用在 那个 那个 center  切换 别的页面 可进，可退，还得滑动删除 相关的操作里面了
(function (){  // 一个测试版，所有的触发，其实都在”touchend",这样的话可能会好一些
    var maybeSome={};  // 里面是一些记录用的东西

    addEvent(Center_task,"touchend",Center_task);   // 这个姑且 这么放着 ，先看看 能不能使用，
    // 毕竟是应该放在点击 center 的某一个 li 之后，content会有相应的变化
    addEvent(Center_task,"touchStart",function(event){
        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;
        var touchE =event.touches[0];

        if (eTarget.nodeName.toLowerCase() == "li"){  // 肯定是触发了 li， 要么是进入下一步，要么是 滑动删除
            // 但是 为了 能够做出 滑动删除的内容，我必须记录初始触发的 位置
            maybeSome.StartX = touchE.pageX;
        }
    });
    addEvent(Center_task,"touchmove",function(event){
        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;

        console.log(eTarget.nodeName.toLowerCase())

        var touchE = event.touches[0];


        if (eTarget.nodeName.toLowerCase() == "li"){ // 就是说，一直在 li 滑动

            maybeSome.moveX = touchE.pageX; // 记录现在的手指在哪里

            if(maybeSome.moveX - maybeSome.StartX > 100){ //  就是说，往回划拉了100px
                alert(maybeSome.StartX - maybeSome.moveX)

                //alert("i should delete this li");
                maybeSome.konw = "deleteLi"
            }
        }
        else if (eTarget.getAttribute("id") == "taskListFather" || eTarget.nodeName.toLowerCase() == "div" ){
         // 那就是说，并没有在滑动删除 ，而是在滑动返回上一菜单
           // alert("i should get back to Left")
            maybeSome.konw = "backToLast"
        }

    });
    addEvent(Center_task,"touchend",function(event){
    // 在手指离开屏幕的时候触发，通过累积记录前面的操作数，再去判断
        console.log("1")

        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;
        if ( maybeSome.konw == "deleteLi"){  // 执行 删除
            alert(" maybeSome.konw = 'deleteLi'");
            var needDeleteObj = getObj(eTarget.getAttribute("title"));
            needDeleteObj.deletefunc();
            }else if ( maybeSome.konw == "backToLast"){
            alert(" maybeSome.konw = 'backToLeft'");
            showNoShow(Center_task,Left_class);

        }else {
            //alert("next"); 就是普通的点击l

            // 好歹 先切换到 right页面啊
            showNoShow(Center_task,Right_content)

            var needShowObj =findObj(eTarget.getAttribute("title"));
            //console.log(needShowObj)
            needShowObj.showContent();


        }

    });
})();

//  应用在 那个 Right的操作（其实就是一个 滑动返回）
(function (){
    var recodeSome = {};
    addEvent(Right_content,"touchstart",function(event){
        var touch = event.touches[0];
        recodeSome.startX = touch.pageX;
    });

    addEvent(Right_content,"touchmove",function(event){
        var touch = event.touches[0];

        recodeSome.moveX = touch.pageX;

    });

    addEvent(Right_content,"touchend",function(){
        var touch = event.touches[0];

        if (    recodeSome.startX - recodeSome.moveX  > 150 ){

            showNoShow(Right_content,Center_task)
        }

    });

})();


// 应用在Left方面的操作 ，其实呢，这个就是监听一个 touchend，然后嗯，进入centerList，选出相应的 list就对了，再就是 一个滑动切除  ，
(function(){
    var maybeSome={};  // 里面是一些记录用的东西

    addEvent(Left_class,"touchend",Center_task)   // 这个姑且 这么放着 ，先看看 能不能使用，
    // 毕竟是应该放在点击  left 的某一个 li 之后，center 会有相应的变化
    addEvent(Left_class,"touchStart",function(event){
        console.log("1");

        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;
        var touchE =event.touches[0];

        if (eTarget.nodeName.toLowerCase() == "li"){  // 肯定是触发了 li， 要么是进入下一步，要么是 滑动删除
            // 但是 为了 能够做出 滑动删除的内容，我必须记录初始触发的 位置
            maybeSome.StartX = touchE.pageX;
        };



    });

    addEvent(Left_class,"touchmove",function(event){
        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;

        console.log(eTarget.nodeName.toLowerCase())

        var touchE = event.touches[0];


        if (eTarget.nodeName.toLowerCase() == "li"){ // 就是说，一直在 li 滑动

            maybeSome.moveX = touchE.pageX; // 记录现在的手指在哪里

            if(maybeSome.moveX - maybeSome.StartX > 100){ //  就是说，往回划拉了100px
                alert(maybeSome.StartX - maybeSome.moveX)

                //alert("i should delete this li");
                maybeSome.konw = "deleteLi"
            }
        }


    });

    addEvent(Left_class,"touchend",function(event){
        var e = window.event || arguments[0],
            eTarget = e.target || e.srcElement;

        console.log(eTarget)
        // 在手指离开屏幕的时候触发，通过累积记录前面的操作数，再去判断
        if (!maybeSome.moveX  ){  // 说明 ，没有滑动动作 ，那就是进入
            showNoShow(Left_class,Center_task); // 先 切换 大页面效果

            // 再 调用 切换 组内的东西
            var needShowCenterTaskDivTitle = eTarget.getAttribute("id"),
                needShowCenterTaskDiv = findCenterTaskDiv(needShowCenterTaskDivTitle);
            console.log(needShowCenterTaskDivTitle)
            // 把现在 showEd 的给隐藏，把目标给显示了，
            Center_taskList.getElementsByClassName("showEd")[0].setAttribute("class","notShowEd");
            needShowCenterTaskDiv.setAttribute("class","showEd");
        }else {  // 写 删除
            alert(" i should delete it !")
        }
    });
})();

// 这个是用来显示 content的 ，touch之后
function touchToShowContent(event){
    var e = window.event || arguments[0],
        eTarget = e.target || e.srcElement;

    console.log("touchToShowContent(")
    if (eTarget.nodeName.toLowerCase() ==  "li" ){
        //alert(1)
        Right_content.setAttribute("class","prepareShow");
        Right_content.style.display = "block";
//
        Center_task.setAttribute("class","canvasHidden");
        Right_content.setAttribute("class","needShow");
        setTimeout(function(){
            Center_task.style.display = "none"
        },400);
        // 接下来，改变 content里面的
        //  但是 ，这次要 分离 eventListener 结构那一类的东西了 就是 ，技法上面的东东。。。

        var needShowObj,
            needShowObjV = element.getAttribute("title");
        needShowObj = findObj(needShowObjV);
        // 展示出来
        needShowObj.showContent;

    }
}


//  封装 一个 编辑,这个首先是要进入到 编辑页面的
addEvent(Right_editBtn,"touchend",function(){
    editContent()
});

// 然后是  确认编辑
addEvent(Right_sureToEdit,"touchend",function(){
   sureEdit ();
})

// 封装一个 完成
addEvent( Right_okBtn ,"touchend",function(){
    completeTask()
})

