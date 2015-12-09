// mainPc.js ，就是这次的pc端的js主模块入口 
// 我认为 util这里是不用再作为 依赖的一个分支了吧，毕竟怎么说，这是对于dom的一些补充，直接推到全局变量更方便吧



define(["baseMo","cView1","objData"],function(baseMo,cView1,objData){
	
	// 一些写在主模块里面的操作

	// 基础类型的绑定
	
	    // 关于切换页面的一些操作 （中间的 任务list的分类）
	addEvent( baseMo.allBtn,"click",cView1.changeAllTask);
	
	addEvent( baseMo.notBtn,"click",cView1.changeNotTask);

	addEvent( baseMo.completeBtn,"click",cView1.changeCompleteTask);

	addEvent( baseMo.Left_classList,"click",cView1.decideWhichHeighLight);

	addEvent( baseMo.Center_taskAdd,"click",cView1.toShowCreateContent);

	addEvent( baseMo.Center_taskList,"click",cView1.decideWhichChoosed)
		// 关于绑定 添加 
	addEvent( baseMo.Left_classAdd,"click",cView1.createClass);	
	// else 



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


	addEvent( baseMo.Right_editBtn,"click",editContent);

	addEvent( baseMo.Right_sureToCreateContent,"click",toCreateTask);

	addEvent( baseMo.Right_sureToEdit,"click",sureEdit);


	// 和删除有关
	addEvent( baseMo.Left_classList,"click",deleteAlist)

	function deleteAlist(){
		var e = window.event || arguments[0];
		var eTarget = e.target || e.srcElement;

		if(eTarget.getAttribute("class") == "deleteBtnLeft"){

			var deleteLiId = eTarget.parentNode.getAttribute("id").toLowerCase();
			alert(deleteLiId)
			for( var key in objData.contentList ){
				if ( (objData.contentList)[key].LeftClassLi_id == deleteLiId ){
					(objData.contentList)[key].deletefunc();
				}
			}
		}
	}
	addEvent( baseMo.Center_taskList,"click",deleteAContent);

	function deleteAContent(){
		var e = window.event || arguments[0];
		var eTarget = e.target || e.srcElement;

		if(eTarget.getAttribute("class") == "deleteBtnCenter"){
			var deleteName = eTarget.parentNode.getAttribute("id").toLowerCase();
			var deleteObj = findObj(deleteName);
			deleteObj.deletefunc();
		}
	}

	(function addLocalStorageToDom(){
		//

		// 对于 content  就是，只用重新创建object，到时候读obj的数据直接添加即可
		var ls = localStorage;
		//console.log(localStorage)
		for (var key in ls){
			var newObjJSON =localStorage.getItem(key);
			
			if( JSON.parse(newObjJSON) ){


				console.log(localStorage.getItem(key))
				
				    newObj = JSON.parse(newObjJSON);

				var finallyObj = new objData.MakeContent(newObj.nameV,newObj.dateV,newObj.contentV ,newObj.LeftClassLi_id,newObj.LeftClassLiDiv_id,newObj.complete);
				console.log(typeof finallyObj );
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
		    console.log(  Centerli)

		}

	})()
})