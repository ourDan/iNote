var Left_class = document.getElementById("LeftClassList"),
    Left_classList = document.getElementById("classListFather"),
    Left_classDefault = document.getElementById("defaultTask"),
    Left_classModel = document.getElementById("defaultTaskModel"),
    Left_classAdd = document.getElementById("addClassBtn");

var Center_task = document.getElementById("CenterTaskList"),
    Center_sreened = document.getElementById("screened"),
    Center_taskList = document.getElementById("taskListFather"),
    Center_taskListModel = document.getElementById("taskListModel"),
    Center_taskAdd = document.getElementById("addTaskBtn"),
    Center_taskSrened = document.getElementById("screened");

var Right_content = document.getElementById("content"),
    Right_contentList = document.getElementById("contentList"),
    Right_createTaskContent = document.getElementById("createTask"),
    Right_TaskContentModel = document.getElementById("showTaskModel"),
    Right_TaskContentEditModel = document.getElementById("editTask"),
    Right_sureToCreateContent = document.getElementById("sureToAddContent"),
    Right_editBtn = document.getElementById("btn"),
    Right_okBtn = document.getElementById("okBtn"),
    Right_FaultContent = document.getElementById("rightDefaultTask");

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


//  create new Add

var newADD = document.createElement("div");
newADD.innerHTML = "<div class='BtnPlaceholder'></div> <p>aaa<img src='./images/add.png' class='ImgAdd'></p>"
document.body.getElementsByClassName("good")[0].appendChild(newADD);
newADD.setAttribute("id","neewAdd");

function showCenterTaskList(eTarget){
        var needShowCenterTaskDivTitle = eTarget.getAttribute("id");
        // �
        decideWhichCenterTaskToShow(needShowCenterTaskDivTitle );
}


//  �
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

function showCenterTaskDiv(TaskDiv){

    var needHiddenEle = Left_class ,
        needShowEle = Center_task ;
  //  Center_taskAdd.parentNode.removeChild(Center_taskAdd);
// ��ִ��
    Center_taskList.getElementsByClassName("showEd")[0].setAttribute("class","notShowEd");
    TaskDiv.setAttribute("class","showEd");

    (function moveToChange (event){
        //event.preventDefault();
        needShowEle.style.display = "block";
        needShowEle.setAttribute("class","prepareShow");

        needHiddenEle.setAttribute("class","canvasHidden");
        needShowEle.setAttribute("class","needShow");
        // control which to show and,decide which to
        setTimeout(function(){
            needHiddenEle.style.display = "none"
        },800)


    })()

   var newAdd = document.createElement("div");
    newAdd.innerHTML = "cnmgb";
    Center_task.appendChild(newAdd);
    newAdd.setAttribute("class","Add");
    newAdd.setAttribute("id","addTaskBtn")

}


var touchFa,
    touchFaList =  Left_classList.getElementsByClassName("ClassTask");
console.log(touchFaList.length)

for (var i= 0,len=touchFaList.length;i<len;i++){
    if (touchFaList[i].getAttribute("title") == "1"){
        touchFa = touchFaList[i]
    }
}

console.log(touchFa);


addEvent(touchFa,"touchstart",function(){
    var e = window.event || arguments[0],
        eTarget = e.target || e.srcElement;

    console.log(eTarget.nodeName.toLowerCase())
    if (eTarget.nodeName.toLowerCase() == "li"){
        showCenterTaskList(eTarget);
    }
});

// 不是模式，就是一个把 控制几大页面来回切换，判断，当前显示的是哪个 ，就可以自己控制
(function (){
    var position={},
        goodPart = document.body.getElementsByClassName("good")[0];
    console.log(goodPart);

    addEvent(goodPart,"touchstart",function(Event){
        console.log("START in touch" + " " )
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

})()


function touchToShowContent(Event){
    console.log("touchToShowContent(")
    var e = window.event || arguments[0],
        eTarget = e.target || e.srcElement;

    if (eTarget.nodeName.toLowerCase() ==  "li" ){
        //alert(1)

        Right_content.setAttribute("class","prepareShow");

        Right_content.style.display = "block";

//

      Center_task.setAttribute("class","canvasHidden");
        Right_content.setAttribute("class","needShow");

        setTimeout(function(){
            Center_task.style.display = "none"
        },400)
        // 接下来，改变 content里面的
        //  但是 ，这次要 分离 eventListener 结构那一类的东西了 就是 ，技法上面的东东。。。

    }
}

addEvent(Center_taskList,"touchstart",touchToShowContent)



function tapToAddTask(){
    console.log("11111111")
}


var addBTn = document.getElementById("neewAdd");

addEvent(addBTn,"touchstart",function(Event){
    Event.preventDefault();

    // 调用 弹出层 ，用来记录
    var inputEle= document.createElement("div");

    inputEle.innerHTML = "<input>cnmb</input>";
    inputEle.setAttribute("class","newInput")
    var goodPart =  document.body.getElementsByClassName("good")[0];console.log(goodPart)
        goodPart.insertBefore(inputEle,goodPart.firstChild);
    var NameText = inputEle.value;
    console.log(NameText);

    var name = prompt("Please enter your name", "");
    if(name !== null && name != "") {   // 在 只有 标题 为 有 填写的时候 才会 创建 吧 如果没有的话就 不创建了
        console.log("1")
        // var NameText = document.createTextNode(name);
    };

    //
    if ( Left_class.style.display !== "none"){


        ( function tapToAddClass(){
            var targetFatherToAdd = Left_classList;
            for (var i=0,len=Left_classList.childNodes.length;i<len;i++){// 遍历
                if (Left_classList.childNodes[i].nodeType == "1" &&  Left_classList.childNodes[i].getAttribute("title") == "1" ) {//   就是看看有没有被 “展开”的
                    targetFatherToAdd =  Left_classList.childNodes[i];     // sure which is fatherNode will appendchild 如果有被展开的div，那就是 直接在这个div底下展开
                    break;
                }
            }
            if (targetFatherToAdd  ==  Left_classList) {  // 就是 说 说 没有找到 一个 title=1的
                //  这时候 就要 创建 div 的结构了
                // 复制一个 提前写好的 模板dom节点  ，是个div结构 ，只用找位置去插
                console.log(Left_classModel);
                var addClass = Left_classModel.cloneNode(true);
                addClass.setAttribute("id",name);
                addClass.getElementsByTagName("p")[0].appendChild(NameText);// 找到 可以放名字的 p 节点  ，把名字textnode填充进去
                targetFatherToAdd.appendChild(  addClass);
                // change  fatherList's title and backgrond-color
                addClass.setAttribute("title","1");
                /*ar newClass = addFather.getAttribute("class")+""+"onFocus" ;  //  oh  shit   ，到底css里 还用不用写。onfocus{}
                 addClass.setAttribute("class",newClass);*/
            }
            else {
                // li  创建li
                console.log(targetFatherToAdd);
                var addFather = targetFatherToAdd.getElementsByClassName("taskList")[0];
                console.log(addFather);
                var newLi = addFather.getElementsByClassName("LiModel")[0].cloneNode(true);
                newLi.insertBefore(NameText, newLi.firstChild);
                newLi.setAttribute("class", "");
                newLi.setAttribute("id", name);

                addFather.appendChild(newLi);
                // as we konw  the className == what you input in Classcreat ,then the div(whisch id =  what you input) in centerTaskList
                // change  fatherList's title and backgrond-color
                // shit i forget create in CenterTaskList
                var newTaskListInCenter = Center_taskListModel.cloneNode(true),
                    cloneNameText = NameText.cloneNode(true);
                newTaskListInCenter.getElementsByTagName("span")[0].appendChild(cloneNameText); // 就是 这句话 让我的 left——li  无法展示nameText,直到 在 debug 一下午之后 我他妈的终于想起来  NameNode是个node节点，dom节点都是指针啊，换了指令方向就没有啦 ，真是把大黑狗给操了  草  太傻逼了

                newTaskListInCenter.setAttribute("title", name);
                newTaskListInCenter.removeAttribute("id");
                Center_taskList.appendChild(newTaskListInCenter);
                //newTaskListInCenter.getElementsByTagName("span")[0].appendChild(NameText );
            }

        })()


    }
    else {

        tapToAddTask();
    }

});

/*
function moveToChange (event){
    // event.preventDefault();
    needShowEle.setAttribute("class","prepareShow");
    needHiddenEle.setAttribute("class","canvasHidden");
    needShowEle.setAttribute("class","needShow");
    console.log("1")
}

*/
//canvas.addEventListener("touchmove",touchMoveToDelete,false)
//needHiddenEle.addEventListener("touchmove",moveToChange,false);
