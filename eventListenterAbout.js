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
//  说在前面的 话  有关数据设计的 结构问题
//  每次这个事情导致我 在 有些dom 操作上 实在是 捉急
//  简直就是操蛋
//  leftDiv  >  ul  > li ( idA )
                             //  CenterDiv ( titleA )  >  ul > li( titleB )
                                                                     // RightContent ( idB )
//  这个函数 主要用来  绑定    应该没什么错误了吧
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


var contentList = {};  //设计这个 是为了 把 content 的 Object  存储，为啥用对象，不用数组，因为object还可以有方法啊，到后面好遍历操作   全局变量，是不是不太好，，，，，，，
//  用来 创建 object  ，存储 参数 和方法
function MakeContent(nameValue ,dateValue,contentValue ,LeftClassli_id,LeftClassLiDiv_id,complete){
    this.LeftClassLiDiv_id =LeftClassLiDiv_id ;
    this.LeftClassLi_id = LeftClassli_id;
    this.CenterTaskDiv_title = LeftClassli_id;
    this.Centerli_title = nameValue ;
    this.RightContetnt_id = nameValue;
    this.nameV= nameValue;
    this.dateV = dateValue;
    this.contentV =contentValue;
    this.complete = complete;
}
//  第二次 recode 说明
//   首先 使用 原型和继承 ，把所有的 content 的数据 装载到 同一个 object里
//    其次 每个 object里 ，都会有方法，
MakeContent.prototype.createContent = function (){
    //  调用 复制使用的模板结构  是不是可以不用这么麻烦 ，毕竟  我们可以读取数据，然后直接把显示的那个的数据给显示出来  element。innerHtml = xxValue ，这样可以减少操作
    //  先创建根据填写内容 创建要用的text节点
    var nameValueNode = document.createTextNode(this.nameV),
        dateValueNode = document.createTextNode(this.dateV ),
        contentValueNode = document.createTextNode(this.contentV );

    var needChangeContentTaskName = Right_FaultContent.getElementsByClassName("taskName")[0],
        needChangeContentTaskTime = Right_FaultContent.getElementsByClassName("taskTime")[0],
        needChangeContentTaskContent = Right_FaultContent.getElementsByClassName("taskContent")[0];

    var
        shouldAddTaskName = "<span>"+"任务名称"+"</span>"+this.nameV,
        shouldAddTaskTime = "<span>"+"任务时间"+"</span>"+this.dateV,
        shouldAddTaskContent = "<span>"+"任务内容"+"</span>"+this.contentV ;

    needChangeContentTaskName.innerHTML = shouldAddTaskName;
    needChangeContentTaskTime.innerHTML = shouldAddTaskTime;
    needChangeContentTaskContent .innerHTML =  shouldAddTaskContent;
    // 把相应的挂钩，加上，其实现在来看好像必要性已经不大了 待会儿看看有没有要删除的必要
    needChangeContentTaskName.setAttribute("title",this.nameV);
    needChangeContentTaskTime.setAttribute("title",this.dateV);
    needChangeContentTaskContent.setAttribute("title",this.contentV);
    Right_FaultContent.style.display = "block"
    //  清空  ，清空 ，把 填写的那个web清空 ，
    Right_createTaskContent.style.display= "none";
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("nnn").value = "";
    // then think about Center,so
    var newLi = document.createElement("li"),
        newnameValueNode =  nameValueNode.cloneNode(true) ;

    newLi.appendChild( newnameValueNode);
    newLi.setAttribute("title",this.nameV);
    newLi.setAttribute("name","not");

    var needHiddenLiFather =  Center_taskList.getElementsByClassName("showEd")[0],
        needHiddenLi =  needHiddenLiFather.getElementsByClassName("choosed")[0];

    if(needHiddenLi){
        needHiddenLi.setAttribute("class","noChoosed");
    }

    var needAddGrandfather =   Center_taskList.getElementsByClassName("showEd")[0];
    var needAddFather = needAddGrandfather.getElementsByClassName("fxxkFather")[0];
    needAddFather.appendChild(newLi);
    newLi.setAttribute("class","choosed");
    newLi.setAttribute("name",this.complete);


}
MakeContent.prototype.addToLocalStorage = function (){
    console.log("addtolocal");

    var newObject ={};
    newObject.typeV = "object";
    newObject.nameV =   this.nameV;
    newObject.dateV =   this.dateV;
    newObject.contentV =  this.contentV ;
    newObject.complete = this.complete;  // 用来存储completed的空间

    newObject.CenterTaskLi_title =  this.nameV; // 就是中间的那个  li  的id  ，对应的是详细的content的  namevalue

    newObject.LeftClassLiDiv_id =this.LeftClassLiDiv_id;
    newObject.LeftClassLi_id = this.LeftClassLi_id;

    var JsonText = JSON.stringify(newObject);
    localStorage.setItem( this.nameV,JsonText);

}
MakeContent.prototype.editLocalStorage = function () {
    console.log(this);
    console.log(this.complete)
    localStorage.removeItem(this.nameV);
    console.log(localStorage);
    this.addToLocalStorage();
    console.log(localStorage)
    /*
    var oldObject ;
    var ls = localStorage;
    for (var k in ls){
        if (k[nameV] == this.nameV  ){
            oldObject = k ;
        }
    }
    console.log(oldObject);
    */
    //  这个当初是怎么想的来着，为啥要这么啰嗦的对象克隆。
    /*
    var newObjcet = this;
    newObject.typeV = "object";
    newObject.nameV =   this.nameV;
    newObject.dateV =   this.dateV;
    newObject.contentV =  this.contentV ;
    newObject.complete = this.complete;  // 用来存储completed的空间
    newObject.CenterTaskLi_title =  this.nameV; // 就是中间的那个  li  的id  ，对应的是详细的content的  namevalue
    newObject.LeftClassLiDiv_id =this.LeftClassLiDiv_id;
    newObject.LeftClassLi_id = this.LeftClassLi_id;

    var JsonText = JSON.stringify(newObject);
    localStorage.removeItem(oldObject.nameV);
    localStorage.setItem( this.nameV,JsonText);
    */
}
MakeContent.prototype.showContent = function(){

    var taskName = Right_FaultContent.getElementsByClassName("taskName")[0],
           taskDate = Right_FaultContent.getElementsByClassName("taskTime")[0],
           taskContent = Right_FaultContent.getElementsByClassName("taskContent")[0];

    var taskNameV = "<span>"+"任务名称"+"</span>"+ this.nameV,
        taskDateV = "<span>"+"任务时间"+"</span>"+ this.dateV,
        taskContentV = "<span>"+"任务内容"+"</span>"+this.contentV;

    console.log( taskName)
    taskName.innerHTML =  taskNameV;
    taskDate.innerHTML = taskDateV;
    taskContent.innerHTML = taskContentV;

    taskName.setAttribute("title",this.nameV);
    taskDate.setAttribute("title",this.dateV);
    taskContent.setAttribute("title",this.contentV);

}
MakeContent.prototype.deletefunc = function(){
    // 删除center的 li ，删完之后判断一下 div里面还有没有li，要是没有，连div也顺路删除了；再把contentList 的这个对象也给delete;
    // centerLi
    // find  centerLiDiv
    var needDeleteCenterLiDivList = Center_taskList.getElementsByTagName("div"),
        needDeleteCenterLiDiv;
     for (var i= 0,len=needDeleteCenterLiDivList.length;i<len;i++){
         if (needDeleteCenterLiDivList[i].getAttribute("title") == this.LeftClassLi_id){
             needDeleteCenterLiDiv = needDeleteCenterLiDivList[i];
         }
     }


    var  needDeleteCenterLiList =  needDeleteCenterLiDiv.getElementsByTagName("li"),
        needDeleteCenterLi ;

    for (var k = 0,leng=needDeleteCenterLiList.length;k<leng;k++){
        console.log(needDeleteCenterLiList[k].getAttribute("title"));
        console.log(this.Centerli_title )
        if (needDeleteCenterLiList[k].getAttribute("title") ==this.Centerli_title ){
            needDeleteCenterLi = needDeleteCenterLiList[k];
        }
    }
    needDeleteCenterLi.parentNode.removeChild( needDeleteCenterLi );
    if (needDeleteCenterLiList.length = 0){
        needDeleteCenterLiDiv.parentNode.removeChild(needDeleteCenterLiDiv);
    }

    // then ,think about in contentList
    for (var key in contentList){
        if (contentList[key].nameV == this.nameV){
            delete contentList[key];
        }
    }
    // then in localstrage
    localStorage.removeItem(this.nameV);

}

//  待会儿调用给 事件 添加  绑了  点击 确认添加之后的 发生
function toCreateTask ( ) {
    //  得到要创建的值 从填写的那页获取
    var nameValue = document.getElementById("name").value;
    var dateValue = document.getElementById("date").value;
    var contentValue = document.getElementById("nnn").value;
    //  获取 相关的leftLi  和 center Li  的数据
    var LeftClassLi_id  ,
        LeftClassLiDiv_id ;
    var LeftClassDivLIst = Left_classList.getElementsByClassName("ClassTask");
    for ( var t= 0,len =  LeftClassDivLIst .length;t<len;t++ ){  //  对于当前 创建的content  ，其对应的left可以肯定的是 div的title=1
        if ( LeftClassDivLIst[t].getAttribute("title") == "1" ){
            LeftClassLiDiv_id =  LeftClassDivLIst[t].getAttribute("id")
        }
    }
// console.log(  LeftClassLiDiv_id );
    var needShowContent =  Center_taskList.getElementsByClassName("showEd")[0];   // 对于 当前 ，反正，center的 都是 showd，只要找到就敲定了
    LeftClassLi_id = needShowContent.getAttribute("title");  //  this  is in center  ,the div;'s title == the li's id(in left)
    // 调用 构造函数 创
    var  newObject  =  new  MakeContent(nameValue ,dateValue,contentValue,LeftClassLi_id,LeftClassLiDiv_id,"not");
    newObject.createContent();  //  调用 方法 创建 一个content
    newObject.addToLocalStorage();  // 调用方法  把相关的数据 可以放进localStorage去了
    //console.log( newObject.addToLocalStorage)
    contentList[nameValue] = newObject;  //  把这个 object藏好 ，后面肯定要调用 然后 ，咕噜^-^!
    //  因为在 点击 “添加任务" 的时候  把 content给隐藏了，同时显示的的
    Right_FaultContent.display = "block";
    console.log(contentList)
}
//  用来创建 左侧列表中 的 函数  先判断 谁被点击，再在被点击的子元素中 创建
function createClass() {
    // 调用 对话框
    var name = prompt("Please enter your name", "");
    if(name !== null && name != "") {   // 在 只有 标题 为 有 填写的时候 才会 创建 吧 如果没有的话就 不创建了
        var NameText = document.createTextNode(name);
    };
    // 先要 判断 出来 是 添加 一个 div  还是 添加 一个li
    // 添加 给 div  的时候 采用 titlie = 0/1 如果 都是0  则 要 添加 div ; 如果有一个 是title = 1  ,则 在 其下 添加一个 li
    // 先默认targetFatherToAdd 为 div的父级
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
        console.log( targetFatherToAdd);
        var addFather = targetFatherToAdd.getElementsByClassName("taskList")[0];
        console.log(addFather);
        var newLi = addFather.getElementsByClassName("LiModel")[0].cloneNode(true);
        newLi.insertBefore(NameText,newLi.firstChild);
        newLi.setAttribute("class","");
        newLi.setAttribute("id", name);

        addFather.appendChild(newLi);
         // as we konw  the className == what you input in Classcreat ,then the div(whisch id =  what you input) in centerTaskList
        // change  fatherList's title and backgrond-color
        // shit i forget create in CenterTaskList
        var newTaskListInCenter = Center_taskListModel.cloneNode(true),
            cloneNameText = NameText.cloneNode(true);
        newTaskListInCenter.getElementsByTagName("span")[0].appendChild( cloneNameText); // 就是 这句话 让我的 left——li  无法展示nameText,直到 在 debug 一下午之后 我他妈的终于想起来  NameNode是个node节点，dom节点都是指针啊，换了指令方向就没有啦 ，真是把大黑狗给操了  草  太傻逼了

        newTaskListInCenter.setAttribute("title",name);
        newTaskListInCenter.removeAttribute("id");
        Center_taskList.appendChild(newTaskListInCenter);
        //newTaskListInCenter.getElementsByTagName("span")[0].appendChild(NameText );
    }
}
// 用来 干嘛的 函数 ，我看看 就是 选中 left的，然后决定了，center显示什么
function decideWhichHeighLight() {
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
    }else if (eTarget.nodeName.toLowerCase() == "p"){
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
    }else{
       // console.log("cnmlgb, error in changeHeight")
    }
}

function toShowCreateContent(){

    var needHiddenContent =   Right_contentList.getElementsByClassName("showtask")[0];
    needHiddenContent.setAttribute("class","showtaskHidden");
    Right_createTaskContent.style.display= "block";
}

// 用来显示，right的content的内容变化 ，cccc
function decideWhichChoosed(){
    var e = window.event  ||  arguments[0];
    var eTarget = e.srcElement || e.target;
    // 判断 在 center 点击的 是 li  还是 p  ，要是 点击了p  就啥事也没有最好 ，
    if (eTarget.nodeName.toLowerCase() == "li"){     // 判断 在 center 点击的 是 li
        //  这个怎么说呢，先根据 eTarget  得到 li_title,然后，在再 调用方法，showContent，
        var needChoosedGrandfather =   Center_taskList.getElementsByClassName("showEd")[0];
        var needChoosedFather = needChoosedGrandfather.getElementsByClassName("fxxkFather")[0];
        var needHiddenLi = needChoosedFather.getElementsByClassName("choosed")[0];
        if (needHiddenLi) {
            needHiddenLi.setAttribute("class","notChoosed");
        }
        eTarget.setAttribute("class","choosed");
        var needShowContentObjectId = eTarget.getAttribute("title"),
               newObj;
        console.log( needShowContentObjectId)
        // can not use like it
        for (var k in contentList){
            console.log(contentList[k].Centerli_title)
            if (contentList[k].Centerli_title === needShowContentObjectId){
                newObj = contentList[k];
                console.log(contentList[k])
            }
        }
        console.log(newObj );
        newObj.showContent();
    }
    //else { console.log("nothing happened)  }
}

// 这个用来删除 分两部分，第一部分判断是在Left_li上click,还是在Center_li上click,前者还要多删除Left中的，再找到object动用content.delete方法
function deleteLeftOrCenter(){
    var event = window.event || arguments[0],
        eTarget = event.target || event.srcElement;

    if (eTarget.getAttribute("class") == "deleteBtnLeft" ){ // 如果说，那个 ，是删除一个分类，那就是得到后面循环遍历 的使用 object。delete，
//console.log( eTarget.parentNode)
        //  傻逼了 好像 这里写错了 草


        var needDeleteCenterLiDiv_title = eTarget.parentNode.getAttribute("id"),
            needDeleteCenterLiDivList =Center_taskList.getElementsByTagName("div"),
        needDeleteCenterLiDiv ;
        console.log(needDeleteCenterLiDiv_title);
        for (var i= 0,len =  needDeleteCenterLiDivList.length;i<len;i++){
            console.log( needDeleteCenterLiDivList[i].getAttribute("title"))
            if (needDeleteCenterLiDiv_title == needDeleteCenterLiDivList[i].getAttribute("title")){
                needDeleteCenterLiDiv = needDeleteCenterLiDivList[i];
            }
        }
        console.log(needDeleteCenterLiDiv)

        var needDeleteCenterLiList =  needDeleteCenterLiDiv.getElementsByTagName("li");
        for (var t = 0,leng=needDeleteCenterLiList.length;t<leng;t++ ){

            for (var k in contentList){
                if (contentList[k].nameV ==  needDeleteCenterLiList[t].getAttribute("title") ){
                    delete contentList.k;
                    localStorage.removeItem(contentList[k].nameV);
                }
            }


        }
        needDeleteCenterLiDiv.parentNode.removeChild( needDeleteCenterLiDiv);
        Left_classDefault.setAttribute("title","1");
        document.getElementById("defaulttask").setAttribute("class","HeighLight");

        var defaultCenterClassDiv;
        for (var i = 0,len = Center_taskList.getElementsByTagName("div").length;i<len;i++){
            if (Center_taskList.getElementsByTagName("div")[i].getAttribute("title") == "defaulttask"){
                defaultCenterClassDiv = Center_taskList.getElementsByTagName("div")[i];

            }
        }
        defaultCenterClassDiv.setAttribute("class","showEd")


    }
    else if (eTarget.getAttribute("class") =="deleteBtnRight" ){
        var needDeleteObjNameV = eTarget.parentNode.getAttribute("title");
            for (var key in contentList){
                if (  contentList[key].nameV ==  needDeleteObjNameV ){
                    contentList[key].deletefunc();
                    delete  contentList.key ;
                }

            }




    }
}

function editContent(){
    // display:none   让  现在 showed 的  content none了
    var needEditContent = Right_contentList.getElementsByClassName("showtask")[0];
    // console.log(needEditContent.getAttribute("title"));

    var needEditNameValue =needEditContent.getElementsByClassName("taskName")[0].getAttribute("title"),
        needEditDatevalue = needEditContent.getElementsByClassName("taskTime")[0].getAttribute("title"),
        needEditContentValue = needEditContent.getElementsByClassName("taskContent")[0].getAttribute("title"),
        needEditNameValueNode = document.createTextNode(needEditNameValue),
        needEditDatevalueNode = document.createTextNode(needEditDatevalue),
        needEditContentValueNode = document.createTextNode(needEditContentValue);
        console.log( needEditNameValue +"  "+  needEditDatevalue+"   " +needEditContentValue  );

        newContent = Right_TaskContentEditModel;
        newContentName = document.getElementById("editName"),
        newContentDate = document.getElementById("editDate"),
        newContentV = document.getElementById("editNnn");

    newContentName.setAttribute("value",needEditNameValue);
    console.log( newContentName);
    newContentDate.appendChild(needEditDatevalueNode);
    console.log( newContentDate);
    newContentV.appendChild(needEditContentValueNode);
    console.log( newContentV);

   // newContentDate.value =  needEditDatevalueNode ;
   // newContentV.value =   needEditContentValueNode;
    newContent.setAttribute("class","showtask");
    newContent.setAttribute("id","new"+ needEditNameValue);
    needEditContent.setAttribute("class","showtaskHidden");
    Right_contentList.removeChild( needEditContent);
   // 因为 dom结构有问题 这里得把 “编辑”按钮隐藏
    Right_editBtn.style.visibility= "hidden";
    Right_okBtn.style.visibility= "hidden";
    //  console.log("ccc   none")
};

// come on ,
function sureEdit (){

    var e = window.event ||  arguments[0];
    var eTarget = e.srcElement || e.target;
    //console.log(eTarget.getAttribute("id"));
    if ( eTarget.getAttribute("id") == "sureEdit" ){

        var newNameValue = document.getElementById("editName").value ,
            newDateValue =  document.getElementById("editDate").value ,
            newContentValue = document.getElementById("editNnn").value ;

        // bottom code come from create !!!  come on gay
        var newTask =   Right_TaskContentModel.cloneNode(true);

        Right_contentList.appendChild(newTask);
        var newTaskName =   newTask.getElementsByClassName("taskName")[0],
            newNameValueNode = document.createTextNode(newNameValue),
            newDateValueNode = document.createTextNode(newDateValue),
            newContentValueNode = document.createTextNode(  newContentValue);

        newTaskName.appendChild(newNameValueNode);
        newTaskName.setAttribute("title",newNameValue);
        var newTaskDate =  newTask.getElementsByClassName("taskTime")[0];
        newTaskDate.appendChild( newDateValueNode);
        newTaskDate.setAttribute("title", newDateValue);
        var newTaskContent =  newTask.getElementsByClassName("taskContent")[0];
        newTaskContent.appendChild(newContentValueNode );
        newTaskContent.setAttribute("title",newContentValue );

        var needHiddenEditContent = Right_contentList.getElementsByClassName("showtask")[0];
        needHiddenEditContent.setAttribute("class","showtaskHidden");

        newTask.setAttribute("title",newNameValue);
        newTask.setAttribute("class","showtask");

        // then creat li in center
        var newLi = document.createElement("li"),
            nameValueNode = document.createTextNode(newNameValue),
            oldLi =  Center_taskList.getElementsByClassName("showEd")[0].getElementsByClassName("choosed")[0];
        newLi.appendChild(  nameValueNode);
        newLi.setAttribute("title",newNameValue);
        newLi.setAttribute("class","choosed");

        var needAddGrandfather =   Center_taskList.getElementsByClassName("showEd")[0];
        var needAddFather = needAddGrandfather.getElementsByClassName("fxxkFather")[0];
        needAddFather.replaceChild(newLi,oldLi);
        // then create onject  ,and then create JSON in localStorage

        // 因为dom结构 这里得把“编辑”按钮 显示
        Right_editBtn.style.visibility = "visible";
        Right_okBtn.style.visibility = "visible";


        // then createNew Dom  and li
        localStorage.removeItem(needEditNameValue);

        var newObject ={};
        newObject.typeV = "object";
        newObject.nameV = newNameValue;
        newObject.dateV = newDateValue;
        newObject.contentV = newContentValue;
        newObject.complete = "not";  // 用来存储completed的空间
        newObject.CenterTaskLi_id = newNameValue; // 就是中间的那个  li  的title  ，对应的是详细的content的  namevalue
        var  LeftClassLiDiv_id ;
        for ( var t= 0,len = Left_classList.getElementsByClassName("showtask").length;t<len;t++ ){  //  对于当前 创建的content  ，其对应的left可以肯定的是 div的title=1
            if ( Left_classList[t].getAttribute("title") == "1" ){
                LeftClassLiDiv_id = Left_classList[t].getAttribute("id")
            }
        }

        newObject. LeftClassLiDiv_id  =  LeftClassLiDiv_id  ;

        var needShowContent =  Center_taskList.getElementsByClassName("showEd")[0];   // 对于 当前 ，反正，center的 都是 showd，只要找到就敲定了
        newObject.LeftClassLi_id = needShowContent.getAttribute("title");  //  this  is in center  ,the div;'s title == the li's id(in left)
        var JsonText = JSON.stringify(newObject);
        localStorage.setItem(nameValue,JsonText);

        /*
        var newObject ={};
        newObject.typeV = "object";
        newObject.nameV = newNameValue;
        newObject.dateV = newDateValue;
        newObject.contentV = newContentValue;

        newObject.TaskLi_id = newNameValue;
        var needShowContent;
        newObject.TaskLiDiv_id = needShowContent.getAttribute("id");
        var JsonText = JSON.stringify(newObject);
        localStorage.setItem(newNameValue,JsonText);
        */


    }



};

// 这个是 用来 点击 “完成” 所进行的函数
function completeTask(){ // 草 ，有的重构 ，这个好像有个坑

    var e = window.event || arguments[0],
           eTarget =  e.srcElement ||  e.target ;

    var nameV = Right_FaultContent.getElementsByClassName("taskName")[0].getAttribute("title"),
        needConpleteObj;

    for (var key in contentList){
        if (contentList[key].nameV ==  nameV){
            contentList[key].complete = "complete"

            contentList[key].editLocalStorage();

            // then in center
            var needChangeCenterLi,
                str =Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");
            for (  var i= 0,len=str.length;i<len;i++ ){
                if ( str[i].getAttribute("title") == contentList[key].nameV  ){
                    needChangeCenterLi =  str[i];
                    break;
                }
            }
            //  console.log(needChangeLi)
            needChangeCenterLi.setAttribute("name","completed");


            break;
        }
    }





    // 将 center li  的name 也改变
   // var needChangeLi_title =  needChangeContent.getAttribute("title");  // 找到 相关的centerLi 的 id （通过 title） ；
    //console.log(needChangeLi_title)

   /* var needChangeLi,
           str =Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");
   // console.log(str);

    for (  var i= 0,len=str.length;i<len;i++ ){
        if ( str[i].getAttribute("title") == needChangeLi_title  ){
            needChangeLi =  str[i];
            break;
        }
    }

 //  console.log(needChangeLi)
    needChangeLi.setAttribute("name","completed");

    var newObject = JSON.parse(   localStorage.getItem( needChangeLi_title  )  ) //

    console.log(newObject)
    newObject.complete  = "complete";
    console.log(newObject)

    localStorage.removeItem( needChangeLi_title);

    //  新建一个object  ?这里是咋回事 ，草  草 草
    var nextObject =newObject;
  /*  nextObject.typeV = "object";
    nextObject.nameV = newNameValue;
    nextObject.dateV = newDateValue;
    nextObject.contentV = newContentValue;
    nextObject.complete = "not";  // 用来存储completed的空间
    nextObject.CenterTaskLi_id = newNameValue; // 就是中间的那个  li  的id  ，对应的是详细的content的  namevalue
    var  LeftClassLiDiv_id ;
    for ( var t= 0,len = Left_classList.getElementsByClassName("showtask").length;t<len;t++ ){  //  对于当前 创建的content  ，其对应的left可以肯定的是 div的title=1
        if ( Left_classList[t].getAttribute("title") == "1" ){
            LeftClassLiDiv_id = Left_classList[t].getAttribute("id")
        }
    }
    newObject. LeftClassLiDiv_id  =  LeftClassLiDiv_id  ;
    var needShowContent =  Center_taskList.getElementsByClassName("showEd")[0];   // 对于 当前 ，反正，center的 都是 showd，只要找到就敲定了
    newObject.LeftClassLi_id = needShowContent.getAttribute("title");  //  this  is in center  ,the div;'s title == the li's id(in left)*/
    //var JsonText = JSON.stringify(nextObject);
    //localStorage.setItem( needChangeLi_title,JsonText);
}

/*  写失败了 分开写
function changeTask () {
    // 其次 的 设计思路就是  主动显示 全部  ，只有在 点击了 三个 筛选的时候   ，
    // 把当前的 center的li  都给 get  到 name  ，得到那么以后 ，可以控制显示 和隐
    var e = document.event || arguments[0],
 eTarget = e.srcElement || e.target;
    console.log(eTarget)
    var needChangeList = Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");

        console.log(typeof eTarget);
        if (eTarget.getAttribute("name") == "not") {  //
            for (var t = 0, len = needChangeList.length; t < len; t++) {
                if (needChangeList[t].getAttribute("name") != "notCompleted") {
                    needChangeList[t].style.display = "none";
                }
            }
        } else if (eTarget.getAttribute("name") == "complete") {
            for (var t = 0, len = needChangeList.length; t < len; t++) {
                if (needChangeList[t].getAttribute("name") != "completed") {
                    needChangeList[t].style.display = "none";
                }
            }
        } else {
            for (var t = 0, len = needChangeList.length; t < len; t++) {
                needChangeList[t].style.display = "block";
            }
        }

}

 */
// 三个筛选按钮

var allBtn = document.getElementById("chooseLeft"),
       notBtn = document.getElementById("chooseCenter"),
       completeBtn = document.getElementById("chooseRight");

function changeCompleteTask() {

    console.log("complete");
    var needChangeList = Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");

    for (var t = 0, len = needChangeList.length; t < len; t++) {
        if (needChangeList[t].getAttribute("name") == "not") {
            needChangeList[t].style.display = "none";
        }
        else{
            needChangeList[t].style.display = "block";
        }

    }
    // change class
    var e = document.event  || arguments[0],
        eTarget = e.target || e.srcElement;

    Center_sreened.getElementsByClassName("clicked")[0].setAttribute("class","");
    console.log(eTarget.nodeName)

    if (eTarget.nodeName.toLowerCase() == "p"){

        eTarget.parentNode.setAttribute("class", "clicked");
    }else{
        eTarget.setAttribute("class", "clicked")
    }
}

function changeAllTask() {


        var needChangeList = Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");
        for (var t = 0, len = needChangeList.length; t < len; t++) {
            needChangeList[t].style.display = "block";
        }

    var e = document.event  || arguments[0],
        eTarget = e.target || e.srcElement;

    Center_sreened.getElementsByClassName("clicked")[0].setAttribute("class","");

    if (eTarget.nodeName.toLowerCase()  == "p"){
        eTarget.parentNode.setAttribute("class", "clicked");
    }else{
        eTarget.setAttribute("class", "clicked")
    }

}

function changeNotTask() {
    var needChangeList = Center_taskList.getElementsByClassName("showEd")[0].getElementsByTagName("li");
    for (var t = 0, len = needChangeList.length; t < len; t++) {
        if (needChangeList[t].getAttribute("name") == "complete") {
            needChangeList[t].style.display = "none";
        }else {
            needChangeList[t].style.display = "block";
        }
    }

    var e = document.event  || arguments[0],
        eTarget = e.target || e.srcElement;

    Center_sreened.getElementsByClassName("clicked")[0].setAttribute("class","");
    console.log(eTarget)
    if (eTarget.nodeName.toLowerCase()  == "p"){
        console.log("1")
        eTarget.parentNode.setAttribute("class", "clicked");
    }else{
        eTarget.setAttribute("class", "clicked")
    }
}

addLocalStorageDataToDom();
function addLocalStorageDataToDom(){
    // 对于 content  就是，只用重新创建object，到时候读obj的数据直接添加即可
    var ls = localStorage;
    for (var key in ls){
        var newObjJSON =localStorage.getItem(key),
            newObj = JSON.parse(newObjJSON);

        var finallyObj = new MakeContent(newObj.nameV,newObj.dateV,newObj.contentV ,newObj.LeftClassLi_id,newObj.LeftClassLiDiv_id,newObj.complete);
        console.log(typeof finallyObj )
        contentList[ finallyObj.nameV] =finallyObj;
    }



    //  shit contentList is object ,i forget it ,and i really forget it
    for (var key in contentList){
       // console.log(contentList[key])
        var objCenterTaskDiv_title = contentList[key].LeftClassLi_id,
            objCenterli_title = contentList[key].CenterTaskLi_title,
            objLeftClassLiDiv_id = contentList[key].LeftClassLiDiv_id,
            objLeftClassLi_id = contentList[key].LeftClassLi_id,
            objComplete = contentList[key].complete;

        //console.log(contentList[key].nameV + " " + objLeftClassLi_id+" "+objComplete )
        var LeftClassLi = null,
            LeftClassLiDiv = null,
            CenterTaskDiv = null,
            Centerli = null; //  oh 这里要每次清零，草 ，找了半天的bug，这里面还是在一个作用域，并没有执行以下就回收


        var centerTaskDivList = Center_taskList.getElementsByTagName("div") ;
        // Left
        // leftDiv,
        if (document.getElementById(objLeftClassLiDiv_id)){
            LeftClassLiDiv = document.getElementById(objLeftClassLiDiv_id);
        }
        else {  // 那就是没有，得自己创建
            LeftClassLiDiv = Left_classModel .cloneNode(true);
            Left_classList.appendChild(LeftClassLiDiv);

            LeftClassLiDiv.setAttribute("title","0");
            LeftClassLiDiv.setAttribute("id",objLeftClassLiDiv_id);

            var newLeft_DivSpanNameValue = document.createTextNode(objLeftClassLiDiv_id); // 为了底下能够显示 id的名称，还得再这么搞一个
            LeftClassLiDiv.getElementsByClassName("className")[0].appendChild(newLeft_DivSpanNameValue);
        }
            console.log(LeftClassLiDiv)
        // leftLi
        if (document.getElementById(objLeftClassLi_id)){
            LeftClassLi = document.getElementById(objLeftClassLi_id);
        }
        else {
            LeftClassLi  = LeftClassLiDiv.getElementsByClassName("LiModel")[0].cloneNode(true);
            LeftClassLi.setAttribute("id",objLeftClassLi_id);
            LeftClassLi.setAttribute("class","");
            var newLeft_LiNameValue = document.createTextNode(objLeftClassLi_id);
            LeftClassLi.insertBefore(newLeft_LiNameValue,LeftClassLi.firstChild);
            LeftClassLiDiv.getElementsByClassName("taskList")[0].appendChild(  LeftClassLi)

        }
        console.log(  LeftClassLi )

        // center
        for (var t= 0,leng=centerTaskDivList.length;t<leng;t++){
            if (centerTaskDivList[t].getAttribute("title") == objCenterTaskDiv_title){
                CenterTaskDiv = centerTaskDivList[t];
            }
        }
        if (! CenterTaskDiv  ) {
            CenterTaskDiv =  Center_taskListModel.cloneNode(true);
            CenterTaskDiv.setAttribute("title", objCenterTaskDiv_title );
            CenterTaskDiv.setAttribute("class","notShowEd");

            var spanValueNode = document.createTextNode(objCenterTaskDiv_title);   //  给 span 传个 text，显示

            CenterTaskDiv.getElementsByTagName("span")[0].appendChild(spanValueNode);
            Center_taskList.appendChild(CenterTaskDiv);
        }

        var CenterliList = CenterTaskDiv.getElementsByTagName("li");

        for (var r = 0,lengt = CenterliList.length;r<lengt;r++){

            if (CenterliList[r].getAttribute("title") ===  objCenterli_title ){
                Centerli = CenterliList[r];
            }
        }

        if (!Centerli){

            Centerli = document.createElement("li");
            Centerli.innerHTML = contentList[key].nameV + "<span class='deleteBtnRight'>"+"删除"+"</span>";
            //var newLi_textContent =document.createTextNode(contentList[key].nameV);


            Centerli.setAttribute("class","notChoosed");
            Centerli.setAttribute("title",contentList[key].nameV);
            Centerli.setAttribute("name", objComplete);

            CenterTaskDiv.getElementsByClassName("fxxkFather")[0].appendChild(Centerli);  // 把 刚才创建的newLi 添加进
        }
        console.log(  Centerli)




    }

    // 循环遍历 contentList  把相应的 都应该创建



}

//  这里的 function 少了 前面的处理部分
/*
 addLocalStorageDataToDom (){

 }
 }
 //console.log( TaskLiFather);
 if ( TaskLiFather == null ){
 TaskLiFather = Center_taskListModel.cloneNode(true);
 TaskLiFather.setAttribute("title", LeftClassLi_id   );
 TaskLiFather.setAttribute("class","notShowEd");
 var spanValueNode = document.createTextNode( LeftClassLi_id );   //  给 span 传个 text，显示
 //console.log( spanValueNode.nodeValue);
 TaskLiFather.getElementsByTagName("span")[0].appendChild(spanValueNode);
 Center_taskList.appendChild(   TaskLiFather);
 }
 //console.log( TaskLiFather);
 TaskLiFather.getElementsByClassName("fxxkFather")[0].appendChild(newLi);  // 把 刚才创建的newLi 添加进去

 // 先 询问 左侧div  到底有没有存在
 var newLeft_Div ;
 if( document.getElementById( LeftClassLiDiv_id)){  // 在询问 右侧 div 到底　存不存在,create it　　
 newLeft_Div = document.getElementById(LeftClassLiDiv_id);
 } else {
 newLeft_Div = Left_classModel .cloneNode(true);
 Left_classList.appendChild(newLeft_Div);
 newLeft_Div.setAttribute("title","0");
 newLeft_Div.setAttribute("id",LeftClassLiDiv_id);
 var newLeft_DivSpanNameValue = document.createTextNode(LeftClassLiDiv_id);
 newLeft_Div.getElementsByClassName("className")[0].appendChild(newLeft_DivSpanNameValue)
 }
 var   newLeftLi;
 console.log(document.getElementById( LeftClassLi_id )  );
 if ( !document.getElementById( LeftClassLi_id ) ){   //  询问 li 是否存在  不存在 ，那就得创建

 newLeftLi  =  newLeft_Div.getElementsByClassName("LiModel")[0].cloneNode(true);
 newLeftLi.setAttribute("id",LeftClassLi_id );

 newLeftLi.setAttribute("class","");
 var newLeft_LiNameValue = document.createTextNode(LeftClassLi_id);
 newLeftLi.insertBefore(newLeft_LiNameValue, newLeftLi.firstChild)
 }else {
 newLeftLi =document.getElementById( LeftClassLi_id );
 }
 newLeft_Div.getElementsByClassName("taskList")[0].appendChild(    newLeftLi);
 }*/
/*
(function writeDefaultTaskToLocalStorage(){
    var needwriteContentnameValue = "this is default",
        needwriteContenttimeValue = "this is default",
        needwriteContentcontentValue = "this is default",
        needwirteContetnLeftClassli_id = "defaulttask",
        needwirteContetnLeftClassLiDiv_id = "defaultTask",
        needwirteContetncomplete = "not";

    var newObj = new MakeContent(needwriteContentnameValue,needwriteContenttimeValue,needwriteContentcontentValue, needwirteContetnLeftClassli_id, needwirteContetnLeftClassLiDiv_id ,needwirteContetncomplete );


    var newJSonText = JSON.stringify(newObj);
    localStorage.setItem(newObj.nameV,newJSonText );

    contentList[newObj.nameV] = newObj;
})()
*/


addEvent( Left_classAdd,"click",createClass);
addEvent(Left_classList,"click",decideWhichHeighLight);
addEvent(Center_taskAdd ,"click",toShowCreateContent);
addEvent(Center_taskList,"click",decideWhichChoosed);
addEvent( Right_sureToCreateContent ,"click",toCreateTask);
addEvent(Right_editBtn,"click",editContent);
addEvent( Right_content,"click",sureEdit);
addEvent(Right_okBtn,"click",completeTask);
addEvent(Left_classList,"click",deleteLeftOrCenter);
addEvent(Center_taskList,"click",deleteLeftOrCenter);
    addEvent(  allBtn  ,"click",changeAllTask  );
    addEvent(notBtn ,"click",changeNotTask);
    addEvent( completeBtn,"click",changeCompleteTask);



