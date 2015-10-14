var allBtn = document.getElementById("chooseLeft"),
    notBtn = document.getElementById("chooseCenter"),
    completeBtn = document.getElementById("chooseRight");

//console.log(contentList)
// 点击添加 是添加分类
addEvent( Left_classAdd,"click",createClass);
// 点击 添加任务之前，要先把 填写的页面调出来
function toShowCreateContent(){
    var needHiddenContent = Right_FaultContent   ;
    needHiddenContent.style.display = "none";
    Right_createTaskContent.style.display= "block";
}
addEvent(Center_taskAdd ,"click",toShowCreateContent);
// 确认添加，这个content
addEvent( Right_sureToCreateContent ,"click",toCreateTask);
// 关于 content的修改和绑定
addEvent(Right_editBtn,"click",editContent);

addEvent( Right_content,"click",sureEdit);

//  就是 切换的绑定  嗯
addEvent(  allBtn  ,"click",changeAllTask  );
addEvent(notBtn ,"click",changeNotTask);
addEvent( completeBtn,"click",changeCompleteTask);
//  用来展示 ，center的list哪个有被选中
addEvent(Center_taskList,"click",decideWhichChoosed);
//// 用来就是 选中 left分类

//的，然后决定了，center显示什么
function decideWhichHeighLight (){
    var e = window.event || arguments[0];        // actually  i really forget what will code behind \\
    var eTarget = e.srcElement || e.target;

    if ( eTarget.nodeName.toLowerCase() == "li"){
        // this is li we should  chang  something about li background
        // and wo must clear all li background-color for choosed
        var needClearLiList = Left_classList.getElementsByTagName("li");
        //console.log(needClearLiList);
        for ( var j=0,len= needClearLiList.length;j<len;j++ ){
            if ( needClearLiList[j].getAttribute("class")  == "HeighLight" ){
                needClearLiList[j].setAttribute("class","unHeighLight");
                break;
            }
        }
        eTarget.setAttribute("class","HeighLight");
        // then we should sure what will show in centerTaskList
        var needShowTaskLstId = eTarget.getAttribute("id").toLowerCase();
        var needShowTaskList = Center_taskList.getElementsByClassName("notShowEd"),
            needShowTask;
        // console.log("needShowList" +needShowTaskList[0].getAttribute("title")+needShowTaskList[1].getAttribute("title"));
        for (var t= 0,len= needShowTaskList.length;t<len;t++){
            if (needShowTaskList[t].getAttribute("title") == needShowTaskLstId ){
                needShowTask =  needShowTaskList[t];
            }
        }
        var needHiddenTaskList =   Center_taskList.getElementsByClassName("showEd")[0];
        needHiddenTaskList.setAttribute("class","notShowEd");
        needShowTask.setAttribute("class","showEd");
    }
    else if (eTarget.nodeName.toLowerCase() == "p"){
        // wo konw wo shouls chang it parentNode backgroud-Color;
        if (eTarget.parentNode.getAttribute("title") == "1"){
            eTarget.parentNode.setAttribute("title","0");
        }else{
            var needCleanList = Left_classList.getElementsByClassName("ClassTask");
            for (var k= 0,len=needCleanList.length;k<len;k++){
                needCleanList[k].setAttribute("title","0");
            }
            eTarget.parentNode.setAttribute("title","1");
        }
    }
    else{
        console.log("shit!, error in changeHeight")
    }
}

addEvent(Left_classList,"click",decideWhichHeighLight);  // 将 切换分类的操作绑定，就是看看哪个分类被打开了

addEvent(Right_okBtn,"click",completeTask);


