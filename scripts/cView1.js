// 主要覆辙pc端的基础页面跳转 视图变化 
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
	   // console.log(eTarget.nodeName)

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
	        var needCLi = getElementsByClass(baseMo.Center_taskList ,"choosed")[0];
	        console.log(needCLi)
	        needCLi.setAttribute("class","notChoosed");
	        

	        var needChoosedGrandfather =   baseMo.Center_taskList.getElementsByClassName("showEd")[0];
	        //console.log(needChoosedGrandfather);

	        //var needChoosedFather = getElementsByClass(needChoosedGrandfather,"fxxkFather")[0];
	        //var needHiddenLi = getElementsByClass(needChoosedFather,"choosed")[0];
	        
	        

	        eTarget.setAttribute("class","choosed");
	        var needShowContentObjectId = eTarget.getAttribute("title"),
	            newObj;
	        //console.log( needShowContentObjectId)
	        // can not use like it
	        for (var k in objData.contentList){
	           	//console.log(objData.contentList[k].Centerli_title);
	           	//console.log(objData.contentList[k])
	            if (objData.contentList[k].Centerli_title === needShowContentObjectId){
	                newObj = objData.contentList[k];
	                //console.log(objData.contentList[k])
	            }
	        }
	        //console.log(newObj );
	        newObj.showContent();
	    }
	    //else { console.log("nothing happened)  }
	}

	
	// 添加task    待会儿调用给 事件 添加  绑了  点击 确认添加之后的 发生
	function toCreateTask (){
	    //  得到要创建的值 从填写的那页获取
	    var nameValue = $("#name").value;
	    var dateValue =$("#date").value;
	    var contentValue = $("#nnn").value;
	    //  获取 相关的leftLi  和 center Li  的数据
	    var LeftClassLi_id  ,
	        LeftClassLiDiv_id ;

	    var LeftClassDivLIst = getElementsByClass(baseMo.Left_classList,"ClassTask");
	    for ( var t= 0,len = LeftClassDivLIst.length;t<len;t++ ){  //对于当前 创建的content ,其对应的 left可以肯定的是 div的title=1
	        if ( LeftClassDivLIst[t].getAttribute("title") == "1" ){
	            LeftClassLiDiv_id =  LeftClassDivLIst[t].getAttribute("id");
	        }
	    }
	    // console.log(  LeftClassLiDiv_id );
	    var needShowContent = getElementsByClass(baseMo.Center_taskList,"showEd")[0];   // 对于 当前 ，反正，center的 都是 showed，只要找到就敲定了
	    LeftClassLi_id = needShowContent.getAttribute("title");  //  this is in center  ,the div;'s title == the li's id(in left)
	    // 调用 构造函数 创
	    var  newObject = new objData.MakeContent(nameValue ,dateValue,contentValue,LeftClassLi_id,LeftClassLiDiv_id,"not");
	    newObject.createContent();  //  调用 方法 创建 一个content
	    newObject.addToLocalStorage();  // 调用方法  把相关的数据 可以放进localStorage去了
	    //console.log( newObject.addToLocalStorage)
	    objData.contentList[nameValue] = newObject;  //  把这个object藏好 ，后面肯定要调用 然后 ，咕噜^-^!
	    //  因为在 点击 “添加任务" 的时候  把 content给隐藏了，同时显示的的
	    baseMo.Right_FaultContent.display = "block";
	    console.log(objData.contentList)
	}

	// 开始进入编辑页面
	function editContent(){
	    // display:none   让  现在 showed 的  content none了

	    var needEditContent = getElementsByClass(baseMo.Right_contentList,"showtask")[0];


	    var needEditNameValue = getElementsByClass(needEditContent,"taskName")[0].getAttribute("title"),
	        needEditDatevalue = getElementsByClass(needEditContent,"taskTime")[0].getAttribute("title"),
	        needEditContentValue = getElementsByClass(needEditContent,"taskContent")[0].getAttribute("title"),
	        needEditNameValueNode = document.createTextNode(needEditNameValue),
	        needEditDatevalueNode = document.createTextNode(needEditDatevalue),
	        needEditContentValueNode = document.createTextNode(needEditContentValue);
	        //console.log( needEditNameValue +"  "+  needEditDatevalue+"   " +needEditContentValue  );

	        newContent = baseMo.Right_TaskContentEditModel;
	        newContentName = $("#editName"),
	        newContentDate = $("#editDate"),
	        newContentV = $("#editNnn");

	    newContentName.setAttribute("value",needEditNameValue);
	    newContentDate.appendChild(needEditDatevalueNode);
	    newContentV.appendChild(needEditContentValueNode);

	    newContent.style.display = "block"
	    //newContent.setAttribute("id","new"+ needEditNameValue);
	    needEditContent.style.display = "none";
	    //Right_contentList.removeChild( needEditContent);
	   // 因为 dom结构有问题 这里得把 “编辑”按钮隐藏
	    baseMo.Right_editBtn.style.visibility= "hidden";
	    baseMo.Right_okBtn.style.visibility= "hidden";
	    //  console.log("ccc   none")

	    // 在开始进入编辑页面的时候，就可以认为这条数据 已经 可以 在 contentLiss里面被修改 ，在localstorage
	    localStorage.removeItem(needEditNameValue);


	    for(var key in objData.contentList){
	    	//console.log(key)
	    	if(objData.contentList[key].nameV == needEditNameValue){
	    		delete (objData.contentList)[key];
	    	}
	    }
	    //console.log(objData.contentList)

	    // 这时候就可以再删除 中间的那个li
	};

	// 确认修改 
	function sureEdit (){
	    var e = window.event ||  arguments[0];
	    var eTarget = e.srcElement || e.target;
	    //console.log(eTarget.getAttribute("id"));

	    if ( eTarget.getAttribute("id") == "sureEdit" ){
	        var newNameValue = $("#editName").value ,
	            newDateValue =  $("#editDate").value ,
	            newContentValue = $("#editNnn").value ;

	        // 我操 这玩意儿是以前的设计思路和解决办法 一点意义都没有 
	        // 它还在用 clone node 的那一套，完全没有考虑到 现在是要修改 contentList里面的obj 以及 相关的  来完成修改 
	        $("#editName").value = "";
	        $("#editDate").value = "";
	        $("#editNnn").value  = "";
	        baseMo.Right_TaskContentEditModel.style.display="none";

	        // 直接将 这三个数据以及相关的数据 组成一个obj，然后去 contentList里面搞定一个 
	        // then creat li in center
	        var newLi = document.createElement("li"),
	            nameValueNode = document.createTextNode(newNameValue),
	            oldLi =  baseMo.Center_taskList.getElementsByClassName("showEd")[0].getElementsByClassName("choosed")[0];
	        newLi.appendChild(  nameValueNode);
	        newLi.setAttribute("title",newNameValue);
	        newLi.setAttribute("class","choosed");

	        var needAddGrandfather =   baseMo.Center_taskList.getElementsByClassName("showEd")[0];
	        var needAddFather = needAddGrandfather.getElementsByClassName("fxxkFather")[0];
	        needAddFather.replaceChild(newLi,oldLi);

	        // then create object  ,and then create JSON in localStorage
	        // 因为dom结构 这里得把“编辑”按钮 显示
	        baseMo.Right_editBtn.style.visibility = "visible";
	        baseMo.Right_okBtn.style.visibility = "visible";

	        //怎么说 ，就是相当于重新搞定一个数据 
	        // 既要重新写 contentlist 也要重新写 
	        // then createNew Dom  and li
	        
	        var newObject ={};
	        newObject.typeV = "object";
	        newObject.nameV = newNameValue;
	        newObject.dateV = newDateValue;
	        newObject.contentV = newContentValue;
	        newObject.complete = "not";  // 用来存储completed的空间
	        newObject.CenterTaskLi_id = newNameValue; // 就是中间的那个  li  的title  ，对应的是详细的content的  namevalue
	        var  LeftClassLiDiv_id ;
	        for ( var t= 0,len = baseMo.Left_classList.getElementsByClassName("showtask").length;t<len;t++ ){  //  对于当前 创建的content  ，其对应的left可以肯定的是 div的title=1
	            if ( Left_classList[t].getAttribute("title") == "1" ){
	                LeftClassLiDiv_id = Left_classList[t].getAttribute("id")
	            }
	        }

	        newObject.LeftClassLiDiv_id  =  LeftClassLiDiv_id  ;

	        var needShowContent =  baseMo.Center_taskList.getElementsByClassName("showEd")[0];   // 对于 当前 ，反正，center的 都是 showd，只要找到就敲定了
	        newObject.LeftClassLi_id = needShowContent.getAttribute("title");  //  this  is in center  ,the div;'s title == the li's id(in left)
	        var JsonText = JSON.stringify(newObject);
	        localStorage.setItem(newNameValue,JsonText);

	        var newAddObj = new objData.MakeContent(newNameValue,newDateValue,newContentValue,newObject.LeftClassLi_id,LeftClassLiDiv_id,"not");
	        console.log(newAddObj);
	        console.log(newNameValue);
	        console.log(objData.contentList)
	        objData.contentList[newNameValue]= newAddObj;

	        console.log(objData.contentList);

	        baseMo.Right_FaultContent.style.display = "block";

	        newAddObj.showContent();
	    }
	}

	function addLocalStorageToDom(){
		// 对于 content  就是，只用重新创建object，到时候读obj的数据直接添加即可
		var ls = localStorage;
		for (var key in ls){
			var newObjJSON =localStorage.getItem(key);
			if( JSON.parse(newObjJSON) ){
				//console.log(localStorage.getItem(key));
				newObj = JSON.parse(newObjJSON);
				var finallyObj = new objData.MakeContent(newObj.nameV,newObj.dateV,newObj.contentV ,newObj.LeftClassLi_id,newObj.LeftClassLiDiv_id,newObj.complete);
				console.log( finallyObj );
				objData.contentList[finallyObj.nameV] = finallyObj;
			}
		}

		//  shit contentList is object ,i forget it ,and i really forget it
		for (var key in objData.contentList){
		   // console.log(contentList[key])
		    var objCenterTaskDiv_title = objData.contentList[key].LeftClassLi_id,
		        objCenterli_title = objData.contentList[key].CenterTaskLi_title,
		        objLeftClassLiDiv_id = objData.contentList[key].LeftClassLiDiv_id,
		        objLeftClassLi_id = objData.contentList[key].LeftClassLi_id,
		        objComplete = objData.contentList[key].complete;

		    //console.log(contentList[key].nameV + " " + objLeftClassLi_id+" "+objComplete )
		    var LeftClassLi = null,
		        LeftClassLiDiv = null,
		        CenterTaskDiv = null,
		        Centerli = null; //  oh 这里要每次清零，草 ，找了半天的bug，这里面还是在一个作用域，并没有执行以下就回收


		    var centerTaskDivList = baseMo.Center_taskList.getElementsByTagName("div") ;
		    // Left
		    // leftDiv,
		    if (document.getElementById(objLeftClassLiDiv_id)){
		        LeftClassLiDiv = document.getElementById(objLeftClassLiDiv_id);
		    }
		    else {  // 那就是没有，得自己创建
		        LeftClassLiDiv = baseMo.Left_classModel.cloneNode(true);
		        //console.log(baseMo.Left_classModel)
		      	//console.log(LeftClassLiDiv );
		        baseMo.Left_classList.appendChild(LeftClassLiDiv);

		        LeftClassLiDiv.setAttribute("title","0");
		        LeftClassLiDiv.setAttribute("id",objLeftClassLiDiv_id);

		        var newLeft_DivSpanNameValue = document.createTextNode(objLeftClassLiDiv_id); // 为了底下能够显示 id的名称，还得再这么搞一个
		        LeftClassLiDiv.getElementsByClassName("className")[0].appendChild(newLeft_DivSpanNameValue);
		    }
		        //console.log(LeftClassLiDiv)
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
		    //console.log(  LeftClassLi )

		    // center
		    for (var t= 0,leng=centerTaskDivList.length;t<leng;t++){
		        if (centerTaskDivList[t].getAttribute("title") == objCenterTaskDiv_title){
		            CenterTaskDiv = centerTaskDivList[t];
		        }
		    }
		    if (! CenterTaskDiv  ) {
		        CenterTaskDiv =  baseMo.Center_taskListModel.cloneNode(true);
		        CenterTaskDiv.setAttribute("title", objCenterTaskDiv_title );
		        CenterTaskDiv.setAttribute("class","notShowEd");

		        var spanValueNode = document.createTextNode(objCenterTaskDiv_title);   //  给 span 传个 text，显示

		        CenterTaskDiv.getElementsByTagName("span")[0].appendChild(spanValueNode);
		        baseMo.Center_taskList.appendChild(CenterTaskDiv);
		    }

		    var CenterliList = CenterTaskDiv.getElementsByTagName("li");

		    for (var r = 0,lengt = CenterliList.length;r<lengt;r++){

		        if (CenterliList[r].getAttribute("title") ===  objCenterli_title ){
		            Centerli = CenterliList[r];
		        }
		    }

		    if (!Centerli){

		        Centerli = document.createElement("li");
		        Centerli.innerHTML = objData.contentList[key].nameV + "<span class='deleteBtnRight'>"+"删除"+"</span>";
		        //var newLi_textContent =document.createTextNode(contentList[key].nameV);


		        Centerli.setAttribute("class","notChoosed");
		        Centerli.setAttribute("title",objData.contentList[key].nameV);
		        Centerli.setAttribute("name", objComplete);

		        CenterTaskDiv.getElementsByClassName("fxxkFather")[0].appendChild(Centerli);  // 把 刚才创建的newLi 添加进
		    }
		    //console.log(  Centerli)

		}

	}

	function deleteAlist(xxk){

		
		//console.log(arguments[0]);
		var e = window.event || arguments[0];
		console.log(e.type)
		var eTarget = e.target || e.srcElement;
		console.log(eTarget)

		if( eTarget.getAttribute("class") == "deleteBtnLeft" ){
			var deleteLiId = eTarget.parentNode.getAttribute("id").toLowerCase();
			alert(deleteLiId)
			for( var key in objData.contentList ){
				if ( (objData.contentList)[key].LeftClassLi_id == deleteLiId ){
					(objData.contentList)[key].deletefunc();
				}
			}
		}
		 else if(e.type == "touchend"  && eTarget.nodeName.toLowerCase() == "li"){
			//alert("a");
			var deleteLiId = eTarget.getAttribute("id").toLowerCase();
			alert(deleteLiId);
			console.log(objData.contentList)
			for( var key in objData.contentList ){
				if ( (objData.contentList)[key].LeftClassLi_id == deleteLiId ){
					(objData.contentList)[key].deletefunc();
				}
			}
		}
	}

	function deleteAContent(){
		var e = window.event || arguments[0];
		var eTarget = e.target || e.srcElement;

		if(eTarget.getAttribute("class") == "deleteBtnCenter"){
			var deleteName = eTarget.parentNode.getAttribute("id").toLowerCase();
			var deleteObj = findObj(deleteName);
			deleteObj.deletefunc();
		}
	}

	return {
		changeCompleteTask:changeCompleteTask,
		changeAllTask:changeAllTask,
		changeNotTask:changeNotTask,
		createClass:createClass,
		decideWhichHeighLight:decideWhichHeighLight,
		toShowCreateContent:toShowCreateContent,
		decideWhichChoosed:decideWhichChoosed,
		toCreateTask:toCreateTask,
		editContent:editContent,
		sureEdit:sureEdit,
		addLocalStorageToDom:addLocalStorageToDom,
		deleteAlist:deleteAlist,
		deleteAContent:deleteAContent
	}
})