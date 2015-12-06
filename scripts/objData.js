// baseObjData.js 用来写那些和 obj数据相关的各种


define(["baseMo"],function(baseMo){

	var contentList = {}; // 就是用来存储 出具的一个{}

	// 利用参数写 obj 
	function MakeContent(nameValue ,dateValue,contentValue ,LeftClassli_id,LeftClassLiDiv_id,complete){ // 接受参数，制作每个函数的
	    this.LeftClassLiDiv_id = LeftClassLiDiv_id ;
	    this.LeftClassLi_id = LeftClassli_id;
	    this.CenterTaskDiv_title = LeftClassli_id;
	    this.Centerli_title = nameValue ;
	    this.RightContetnt_id = nameValue;
	    this.nameV = nameValue;
	    this.dateV = dateValue;
	    this.contentV = contentValue;
	    this.complete = complete;
	}

	// 写 创建一个任务content  红皮书里说这样写 不讨，待会儿再看 

	MakeContent.prototype.createContent = function (){
	    //  调用 复制使用的模板结构  是不是可以不用这么麻烦 ，毕竟  我们可以读取数据，然后直接把显示的那个的数据给显示出来  element。innerHtml = xxValue ，这样可以减少操作
	    //  先创建根据填写内容 创建要用的text节点


	    var nameValueNode = document.createTextNode(this.nameV),
	        dateValueNode = document.createTextNode(this.dateV ),
	        contentValueNode = document.createTextNode(this.contentV );

	    var needChangeContentTaskName = baseMo.Right_FaultContent.getElementsByClassName("taskName")[0],
	        needChangeContentTaskTime = baseMo.Right_FaultContent.getElementsByClassName("taskTime")[0],
	        needChangeContentTaskContent = baseMo.Right_FaultContent.getElementsByClassName("taskContent")[0];

	    var shouldAddTaskName = "<span>"+"任务名称"+"</span>"+this.nameV,
	        shouldAddTaskTime = "<span>"+"任务时间"+"</span>"+this.dateV,
	        shouldAddTaskContent = "<span>"+"任务内容"+"</span>"+this.contentV ;

	    needChangeContentTaskName.innerHTML = shouldAddTaskName;
	    needChangeContentTaskTime.innerHTML = shouldAddTaskTime;
	    needChangeContentTaskContent.innerHTML =  shouldAddTaskContent;
	    // 把相应的挂钩，加上，其实现在来看好像必要性已经不大了 待会儿看看有没有要删除的必要
	    needChangeContentTaskName.setAttribute("title",this.nameV);
	    needChangeContentTaskTime.setAttribute("title",this.dateV);
	    needChangeContentTaskContent.setAttribute("title",this.contentV);
	    baseMo.Right_FaultContent.style.display = "block"
	    //  清空  ，清空 ，把 填写的那个web清空 ，
	    baseMo.Right_createTaskContent.style.display= "none";
	    $("#name").value = "";
	    $("#date").value = "";
	    $("#nnn").value = "";
	    // then think about Center,so
	    var newLi = document.createElement("li"),
	        newnameValueNode =  nameValueNode.cloneNode(true) ;
	        newnameValueString = this.nameV + "<span classs='deleteBtnRight'>delete</span>";
	        console.log(newnameValueString);
	    var newLiContent = document.createTextNode(newnameValueString);
	    newLi.innerHTML = newnameValueString

	   //newLi.appendChild( newnameValueNode);
	   	//newLi.innerHTML =  newnameValueNode +"<span classs='deleteBtnRight'>delete</span>"
	   	console.log(newnameValueNode +"<span classs='deleteBtnRight'>delete</span>")
	    newLi.setAttribute("title",this.nameV);
	    newLi.setAttribute("name","not");

	    var needHiddenLiFather =  baseMo.Center_taskList.getElementsByClassName("showEd")[0],
	        needHiddenLi =  needHiddenLiFather.getElementsByClassName("choosed")[0];

	    if(needHiddenLi){
	        needHiddenLi.setAttribute("class","noChoosed");
	    }

	    var needAddGrandfather =   baseMo.Center_taskList.getElementsByClassName("showEd")[0];
	    var needAddFather = needAddGrandfather.getElementsByClassName("fxxkFather")[0];
	    needAddFather.appendChild(newLi);
	    newLi.setAttribute("class","choosed");
	    newLi.setAttribute("name",this.complete);

	};


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

	    localStorage.removeItem(this.nameV);
	    
	    this.addToLocalStorage();
	}

	MakeContent.prototype.showContent = function(){

	    var taskName = baseMo.Right_FaultContent.getElementsByClassName("taskName")[0],
	           taskDate = baseMo.Right_FaultContent.getElementsByClassName("taskTime")[0],
	           taskContent = baseMo.Right_FaultContent.getElementsByClassName("taskContent")[0];

	    var taskNameV = "<span>"+"任务名称"+"</span>"+ this.nameV,
	        taskDateV = "<span>"+"任务时间"+"</span>"+ this.dateV,
	        taskContentV = "<span>"+"任务内容"+"</span>"+this.contentV;

	    console.log(taskName)
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
	    var needDeleteCenterLiDivList = baseMo.Center_taskList.getElementsByTagName("div"),
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

	

	return { // 放出来的 各个接口 
		contentList : contentList,
		MakeContent : MakeContent,

	}

})