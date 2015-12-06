// 基础功能 和基础 数据 的书写 
define([],function(){

	//  根据 那个，将要寻找的对象的名称，从 contentList里面找到
	function findObj(objName){
	    //console.log(objName)
	    var obj;
	    for (var key in contentList){  // 这里应该不会重名吧，和一些基本的变量，我的
	        //console.log( contentList[key].nameV)
	        if ( contentList[key].nameV == objName ){
	            obj = contentList[key];
	        }
	    }
	    return obj;
	}

	// 根据，title的值，找到对应的 CenterTaskDiv
	function findCenterTaskDiv(divTitle){

	    console.log(divTitle)

	    var TaskDivList = Center_taskList.getElementsByTagName("div"),
	        needShowTask;

	    // console.log("needShowList" +needShowTaskList[0].getAttribute("title")+needShowTaskList[1].getAttribute("title"));
	    for (var t= 0,len= TaskDivList.length;t<len;t++){
	        console.log(TaskDivList[t].getAttribute("title"))
	        if (TaskDivList[t].getAttribute("title") == divTitle ){
	            needShowTask =  TaskDivList[t];
	        }
	    }
	    return needShowTask
	}

	// 根据，title的值，和已经确定了的，CenterTaskDiv，找到相应的CenterTaskLi
	function findCenterTaskLi(liTitle,TaskDiv){

	    var CenterTaskLI,
	        CenterTaskLiList = TaskDiv.getElementsByTagName("li");

	    for (var i = 0,len = CenterTaskLiList.length;i<len;i++ ){

	       	if ( CenterTaskLiList[i].getAttribute("title") == liTitle ){
	           CenterTaskLI = CenterTaskLiList[i];
	       	}

	    }

	    return CenterTaskLI;
	}


	return{
		Left_class : $("#LeftClassList"),  
	    Left_classList :$("#classListFather"),
	    Left_classDefault : $("#defaultTask"),
	    Left_classModel : $("#defaultTaskModel"),
	    Left_classAdd : $("#addClassBtn"),
		Center_task : $("#CenterTaskList"),
	    Center_sreened : $("#screened"),
	    Center_taskList : $("#taskListFather"),
	    Center_taskListModel : $("#taskListModel"),
	    Center_taskAdd : $("#addTaskBtn"),
	    Center_taskSrened : $("#screened"),
		Right_content : $("#content"),
	    Right_contentList : $("#contentList"),
	    Right_createTaskContent : $("#createTask"),
	    Right_TaskContentEditModel : $("#editTask"),
	    Right_sureToCreateContent : $("#sureToAddContent"),
	    Right_editBtn : $("#btn"),
	    Right_okBtn : $("#okBtn"),
	    Right_FaultContent : $("#rightDefaultTask"),
	    Right_sureToEdit : $("#sureEdit"),

	    allBtn:$("#chooseLeft"),
	    notBtn:$("#chooseCenter"),
	    completeBtn:$("#chooseRight"),

	    findObj:findObj,

	}

})