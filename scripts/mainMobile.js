// mainMobile
define(["baseMo","cView2","cView1"],function(baseMo,cView2,cView1){

	//  做 切换用的，就是center那页里面 的完成 ，未完成 什么的，用来切换
	addEvent(  baseMo.allBtn  ,"touchstart",cView1.changeAllTask  );
	addEvent(baseMo.notBtn ,"touchstart",cView1.changeNotTask);
	addEvent( baseMo.completeBtn,"touchstart",cView1.changeCompleteTask);
	// 怎么说呢，上面三个都是 直接调用了cView1里面的基础的东西, 

	//  封装 一个 编辑,这个首先是要进入到 编辑页面的
	addEvent(baseMo.Right_editBtn,"touchend",function(){
	    cView1.editContent()
	});

	// 然后是  确认编辑
	addEvent(baseMo.Right_sureToEdit,"touchend",function(){
	    cView1.sureEdit();
	    baseMo.Right_TaskContentEditModel.style.display ="none"
	});

	// 封装一个 完成
	addEvent( baseMo.Right_okBtn ,"touchend",function(){
	    cView1.completeTask()
	});

	cView1.addLocalStorageToDom();







})

