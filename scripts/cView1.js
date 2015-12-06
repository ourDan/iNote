// 主要覆辙页面跳转 视图变化 
define(["baseMo","objData"],function(baseMo,objData){

	// 筛选 功能用 的 ，对于 不同的 端，有click绑定，也有 touchStart？ 还是用
	function changeCompleteTask() {
	    //console.log("complete");
	    var needChangeList = getElementsByClass(baseMo.Center_taskList,"showEd")[0].getElementsByTagName("li");
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

	    getElementsByClass(baseMo.Center_sreened,"clicked")[0].setAttribute("class","");
	    console.log(eTarget.nodeName)

	    if (eTarget.nodeName.toLowerCase() == "p"){

	        eTarget.parentNode.setAttribute("class", "clicked");
	    }else{
	        eTarget.setAttribute("class", "clicked")
	    }
	}
	function changeAllTask() {
	    var needChangeList = getElementsByClass(baseMo.Center_taskList,"showEd")[0].getElementsByTagName("li");
	    for (var t = 0, len = needChangeList.length; t < len; t++) {
	        needChangeList[t].style.display = "block";
	    }
	    var e = document.event  || arguments[0],
	        eTarget = e.target || e.srcElement;
	    getElementsByClass(baseMo.Center_sreened,"clicked")[0].setAttribute("class","");
	    if (eTarget.nodeName.toLowerCase()  == "p"){
	        eTarget.parentNode.setAttribute("class", "clicked");
	    }
	    else{
	        eTarget.setAttribute("class", "clicked")
	    }
	}
	function changeNotTask() {
		console.log( $(".showEd")[0])
	    var needChangeList = getElementsByClass(baseMo.Center_taskList,"showEd")[0].getElementsByTagName("li");

	    for (var t = 0 , len = needChangeList.length ; t < len; t++) {
	        if (needChangeList[t].getAttribute("name") == "complete") {
	            needChangeList[t].style.display = "none";
	        }else {
	            needChangeList[t].style.display = "block";
	        }
	    }

	    var e = document.event  || arguments[0],
	        eTarget = e.target || e.srcElement;
	    getElementsByClass(baseMo.Center_sreened,"clicked")[0].setAttribute("class","");
	    console.log(eTarget)
	    if (eTarget.nodeName.toLowerCase()  == "p"){
	        console.log("1")
	        eTarget.parentNode.setAttribute("class", "clicked");
	    }else{
	        eTarget.setAttribute("class", "clicked")
	    }
	}

	//  用来创建 左侧列表中 的 函数  先判断 谁被点击，再在被点击的子元素中 创建
	function createClass (){
	    // 调用 对话框
	    var name = prompt("Please enter your name", "");
	    if(name !== null && name != "") {   // 在 只有 标题 为 有 填写的时候 才会 创建 吧 如果没有的话就 不创建了
	        var NameText = document.createTextNode(name);
	    };

	    // 先要 判断 出来 是 添加 一个 div  还是 添加 一个li
	    // 添加 给 div  的时候 采用 titlie = 0/1 如果 都是0  则 要 添加 div ; 如果有一个 是title = 1  ,则 在 其下 添加一个 li
	    // 先默认targetFatherToAdd 为 div的父级 
	    var targetFatherToAdd = baseMo.Left_classList;
	    for (var i=0,len=baseMo.Left_classList.childNodes.length;i<len;i++){// 遍历
	        if (baseMo.Left_classList.childNodes[i].nodeType == "1" &&  baseMo.Left_classList.childNodes[i].getAttribute("title") == "1" ) {//   就是看看有没有被 “展开”的
	            targetFatherToAdd =  baseMo.Left_classList.childNodes[i];     // sure which is fatherNode will appendchild 如果有被展开的div，那就是 直接在这个div底下展开
	            break;
	        }
	    }
	    if (targetFatherToAdd  ==  baseMo.Left_classList) {  // 就是 说 说 没有找到 一个 title=1的
	        //  这时候 就要 创建 div 的结构了
	        // 复制一个 提前写好的 模板dom节点  ，是个div结构 ，只用找位置去插
	        //console.log(baseMo.Left_classModel);
	        var addClass = baseMo.Left_classModel.cloneNode(true);
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
	        //console.log( targetFatherToAdd);
	        var addFather = getElementsByClass(targetFatherToAdd,"taskList")[0];
	        //console.log(addFather);
	        var newLi = getElementsByClass(addFather,"LiModel")[0].cloneNode(true);
	        newLi.insertBefore(NameText,newLi.firstChild);
	        newLi.setAttribute("class","");
	        newLi.setAttribute("id", name);

	        addFather.appendChild(newLi);
	        // as we konw  the className == what you input in Classcreat ,then the div(whisch id =  what you input) in centerTaskList
	        // change  fatherList's title and backgrond-color
	        // shit i forget create in CenterTaskList
	        var newTaskListInCenter = baseMo.Center_taskListModel.cloneNode(true),
	            cloneNameText = NameText.cloneNode(true);
	        newTaskListInCenter.getElementsByTagName("span")[0].appendChild( cloneNameText); // 就是 这句话 让我的 left——li  无法展示nameText,直到 在 debug 一下午之后 我他妈的终于想起来  NameNode是个node节点，dom节点都是指针啊，换了指令方向就没有啦 ，真是把大黑狗给操了  草  太傻逼了

	        newTaskListInCenter.setAttribute("title",name);
	        newTaskListInCenter.removeAttribute("id");
	        baseMo.Center_taskList.appendChild(newTaskListInCenter);
	        //newTaskListInCenter.getElementsByTagName("span")[0].appendChild(NameText );
	    }
	}


	// 在 左侧 的一些切换 点击了谁，谁就是蓝色的高亮背景
	function decideWhichHeighLight (){
	    var e = window.event || arguments[0];        // actually  i really forget what will code behind \\
	    var eTarget = e.srcElement || e.target;

	    if ( eTarget.nodeName.toLowerCase() == "li"){

	        var needClearLiList = baseMo.Left_classList.getElementsByTagName("li");
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
	        var needShowTaskList = baseMo.Center_taskList.getElementsByClassName("notShowEd"),
	            needShowTask;
	        // console.log("needShowList" +needShowTaskList[0].getAttribute("title")+needShowTaskList[1].getAttribute("title"));
	        for (var t= 0,len= needShowTaskList.length;t<len;t++){
	            if (needShowTaskList[t].getAttribute("title") == needShowTaskLstId ){
	                needShowTask =  needShowTaskList[t];
	            }
	        }
	        var needHiddenTaskList = baseMo.Center_taskList.getElementsByClassName("showEd")[0];
	        needHiddenTaskList.setAttribute("class","notShowEd");
	        needShowTask.setAttribute("class","showEd");
	    }
	    else if (eTarget.nodeName.toLowerCase() == "p"){
	        // wo konw wo shouls chang it parentNode backgroud-Color;
	        if (eTarget.parentNode.getAttribute("title") == "1"){
	            eTarget.parentNode.setAttribute("title","0");
	        }else{
	            var needCleanList = baseMo.Left_classList.getElementsByClassName("ClassTask");
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

	function toShowCreateContent(){
		
	    var needHiddenContent =   getElementsByClass(baseMo.Right_contentList,"showtask")[0];
	    needHiddenContent.style.display = "none";
	    baseMo.Right_createTaskContent.style.display= "block";
	}

	// 用来显示，right的content的 内容变化 ，cccc
	function decideWhichChoosed(){
	    var e = window.event  ||  arguments[0];
	    var eTarget = e.srcElement || e.target;
	    // 判断 在 center 点击的 是 li  还是 p  ，要是 点击了p  就啥事也没有最好 ，
	    if (eTarget.nodeName.toLowerCase() == "li"){     // 判断 在 center 点击的 是 li
	        //  这个怎么说呢，先根据 eTarget  得到 li_title,然后，在再 调用方法，showContent，
	        var needChoosedGrandfather =   baseMo.Center_taskList.getElementsByClassName("showEd")[0];
	        var needChoosedFather = getElementsByClass(needChoosedGrandfather,"fxxkFather")[0];
	        var needHiddenLi = getElementsByClass(needChoosedFather,"choosed")[0];
	        if (needHiddenLi){
	            needHiddenLi.setAttribute("class","notChoosed");
	        }
	        eTarget.setAttribute("class","choosed");
	        var needShowContentObjectId = eTarget.getAttribute("title"),
	            newObj;
	        //console.log( needShowContentObjectId)
	        // can not use like it
	        for (var k in objData.contentList){
	            console.log(objData.contentList[k].Centerli_title);
	            console.log(objData.contentList[k])
	            if (objData.contentList[k].Centerli_title === needShowContentObjectId){
	                newObj = objData.contentList[k];
	                console.log(objData.contentList[k])
	            }
	        }
	        console.log(newObj );
	        newObj.showContent();
	    }
	    //else { console.log("nothing happened)  }
	}

	

	return {
		changeCompleteTask:changeCompleteTask,
		changeAllTask:changeAllTask,
		changeNotTask:changeNotTask,
		createClass:createClass,
		decideWhichHeighLight:decideWhichHeighLight,
		toShowCreateContent:toShowCreateContent,
		decideWhichChoosed:decideWhichChoosed
	}
})