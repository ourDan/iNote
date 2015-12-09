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





	addEvent( baseMo.Right_editBtn,"click",cView1.editContent);

	addEvent( baseMo.Right_sureToCreateContent,"click",function(){

		
		cView1.toCreateTask()
	});

	addEvent( baseMo.Right_sureToEdit,"click",cView1.sureEdit);


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


	cView1.addLocalStorageToDom();
})