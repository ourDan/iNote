var allBtn = document.getElementById("chooseLeft"),
    notBtn = document.getElementById("chooseCenter"),
    completeBtn = document.getElementById("chooseRight");

//console.log(contentList)
// ������ ����ӷ���
addEvent( Left_classAdd,"click",createClass);
// ��� �������֮ǰ��Ҫ�Ȱ� ��д��ҳ�������
function toShowCreateContent(){
    var needHiddenContent = Right_FaultContent   ;
    needHiddenContent.style.display = "none";
    Right_createTaskContent.style.display= "block";
}
addEvent(Center_taskAdd ,"click",toShowCreateContent);
// ȷ����ӣ����content
addEvent( Right_sureToCreateContent ,"click",toCreateTask);
// ���� content���޸ĺͰ�
addEvent(Right_editBtn,"click",editContent);

addEvent( Right_content,"click",sureEdit);

//  ���� �л��İ�  ��
addEvent(  allBtn  ,"click",changeAllTask  );
addEvent(notBtn ,"click",changeNotTask);
addEvent( completeBtn,"click",changeCompleteTask);
//  ����չʾ ��center��list�ĸ��б�ѡ��
addEvent(Center_taskList,"click",decideWhichChoosed);
//// �������� ѡ�� left����

//�ģ�Ȼ������ˣ�center��ʾʲô
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

addEvent(Left_classList,"click",decideWhichHeighLight);  // �� �л�����Ĳ����󶨣����ǿ����ĸ����౻����

addEvent(Right_okBtn,"click",completeTask);


