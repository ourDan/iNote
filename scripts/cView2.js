//  cView2 ,移动端的一些页面切换，比较交互操作不一样了
//  因为dom结构的问题，需要 重写一个添加按钮,这个负责视图切换的模块 ，总之有点大杂烩的意思了
define(["baseMo","cView1","objData"],function(baseMo,cView1,objData){
	(function(){
	    var newADD = document.createElement("div");
	    newADD.innerHTML = "<div class='BtnPlaceholder'></div> <p>aaa<img src='./images/add.png' class='ImgAdd'></p>"
	    document.body.getElementsByClassName("good")[0].appendChild(newADD);
	    newADD.setAttribute("id","neewAdd");


	})();

	var dd = $("#neewAdd");
	console.log(dd)

	// 写这个 函数 ，根据函数名来猜，好像
	function showCenterTaskDiv(taskDivTitle){
	    var centerTaskDivList = Center_taskList.getElementsByTagName("div"),
	        centerTaskDiv;
	    for (var i= 0,len = centerTaskDivList.length;i<len;i++){
	        if (centerTaskDivList[i].getAttribute("title") == needTitle){
	            centerTaskDiv = centerTaskDivList[i];
	            break;
	        }
	    }
	}

	function decideWhichCenterTaskToShow(needTitle){
	    var centerTaskDivList = Center_taskList.getElementsByTagName("div"),
	        centerTaskDiv;
	    for (var i= 0,len = centerTaskDivList.length;i<len;i++){
	        if (centerTaskDivList[i].getAttribute("title") == needTitle){
	            centerTaskDiv = centerTaskDivList[i];
	            break;
	        }
	    }

	    showCenterTaskDiv( centerTaskDiv)

	}

	//  这个是 带 动画 效果的 大 页面之间的切换 效果 的基础函数
	function showNoShow(hiddenP,showP) {
	    showP.style.display = "block";
	    hiddenP.setAttribute("class", "backToHidden");
	    showP.setAttribute("class", "backToShow");

	    setTimeout(function () {
	        hiddenP.style.display = "none"
	    }, 400);
	}

	// 不是模式，就是一个把 控制几大页面来 滑动 返回 操作 ，判断，当前显示的是哪个 ，就可以自己控制
	(function (){
	   // console.log("why error?")
	    var position={},
	        goodPart = document.body.getElementsByClassName("good")[0];
	    //console.log(goodPart);
	    addEvent(goodPart,"touchstart",function(Event){
	        // console.log("START in touch" + " " )
	        var touch=Event.touches[0];
	        position.Xstart = touch.pageX;
	        //console.log( position.Xstart)
	    });
	    addEvent(goodPart,"touchmove",function(Event){
	        var touch = Event.touches[0];
	        position.Xp = touch.pageX;
	        position.Yp = touch.pageY;

	        if ( (position.Xp - position.Xstart )> 100  &&  baseMo.Left_class.style.display == "none" ){
	            //alert("ok")
	            console.log( baseMo.Center_task.style.display == "none" )
	            var showPart ,
	                hiddenPart;
	            if ( baseMo.Center_task.style.display == "none" ){
	                showPart =baseMo.Center_task  ;
	                hiddenPart = baseMo.Right_content;
	                showNoShow(hiddenPart,showPart);
	            }else {
	                //console.log("cnm");
	                showPart = baseMo.Left_class ;
	                hiddenPart = baseMo.Center_task ;
	                showNoShow(hiddenPart,showPart);
	            }
	        }
	    });
	})();


	// 应用在Left方面的操作 ，其实呢，这个就是监听一个 touchend，然后嗯，进入centerList，选出相应的 list就对了，再就是 一个滑动切除  ，
	(function(){
	    var maybeSome={};  // 里面是一些记录用的东西
	    //addEvent(baseMo.Left_class,"touchend",Center_task);  // 这个姑且 这么放着 ，先看看 能不能使用，
	    // 毕竟是应该放在点击  left 的某一个 li 之后，center 会有相应的变化
	    addEvent(baseMo.Left_class,"touchstart",function(event){
	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;
	        var touchE =event.touches[0];
	        if (eTarget.nodeName.toLowerCase() == "li"){  // 肯定是触发了 li， 要么是进入下一步，要么是 滑动删除
	            // 但是 为了 能够做出 滑动删除的内容，我必须记录初始触发的 位置
	            maybeSome.StartX = touchE.pageX;
	        };
	    });

	    addEvent(baseMo.Left_class,"touchmove",function(event){
	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;
	        //console.log(eTarget.nodeName.toLowerCase())
	        var touchE = event.touches[0];
	        if (eTarget.nodeName.toLowerCase() == "li"   ){ // 就是说，一直在 li 上面 滑
	            maybeSome.moveX = touchE.pageX; // 记录现在的手指在哪里
	            if(maybeSome.StartX - maybeSome.moveX  > 100){ //  就是说，往回划拉了100px
	                maybeSome.konw = "deleteLi"; // 这里面 出现的问题 是 ，为什么我对着测试，不管是正在滑动，还是反着滑动，这里都会 被触发，草
	            }
	        }
	    });

	    addEvent(baseMo.Left_class,"touchend",function(event){
	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;
	       // console.log(eTarget);
	        // 在手指离开屏幕的时候触发，通过累积记录前面的操作数，再去判断
	        if ( !maybeSome.moveX  ){  // 说明 ，没有滑动动作 ，那就是进入
	            showNoShow(baseMo.Left_class,baseMo.Center_task); // 先 切换 大页面效果
	            // 再 调用 切换 组内的东西
	            var needShowCenterTaskDivTitle = eTarget.getAttribute("id"),
	                needShowCenterTaskDiv = baseMo.findCenterTaskDiv(needShowCenterTaskDivTitle);
	            console.log(needShowCenterTaskDivTitle)
	            // 把现在 showEd 的给隐藏，把目标给显示了，
	            baseMo.Center_taskList.getElementsByClassName("showEd")[0].setAttribute("class","notShowEd");
	            needShowCenterTaskDiv.setAttribute("class","showEd");
	        }
	        else if ( maybeSome.StartX - maybeSome.moveX  > 100  &&  eTarget.nodeName.toLowerCase() == "li"  ){  // 写 删除
	            alert(" i should delete it !");
	            console.log(eTarget)
	            cView1.deleteAlist(eTarget);
	        }
	    });
	})();

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

	function deleteAContent(){
		var e = window.event || arguments[0];
		var eTarget = e.target || e.srcElement;

		if(eTarget.getAttribute("class") == "deleteBtnCenter"){
			var deleteName = eTarget.parentNode.getAttribute("id").toLowerCase();
			var deleteObj = findObj(deleteName);
			deleteObj.deletefunc();
		}
	}

	//  应用在 那个 Right的操作（其实就是一个 滑动返回）
	(function (){
	    var recodeSome = {};

	    addEvent(baseMo.Right_content,"touchstart",function(event){
	        var touch = event.touches[0];
	        recodeSome.startX = touch.pageX;
	    });

	    addEvent(baseMo.Right_content,"touchmove",function(event){
	        var touch = event.touches[0];
	        recodeSome.moveX = touch.pageX;
	    });

	    addEvent(baseMo.Right_content,"touchend",function(){
	        var touch = event.touches[0];

	        if (  recodeSome.moveX - recodeSome.startX  > 150 ){  // 往右滑动 是 返回上一层次页面

	            showNoShow(baseMo.Right_content,baseMo.Center_task)
	        }

	    });
	})();

	// 大框架应该没错
	// 应用在 那个 那个 center  切换 别的页面 可进，可退，还得滑动删除 相关的操作里面了
	(function (){  // 一个测试版，所有的触发，其实都在”touchend",这样的话可能会好一些
	    var maybeSome={};  // 里面是一些记录用的东西

	    // 毕竟是应该放在点击 center 的某一个 li 之后，content会有相应的变化
	    addEvent(baseMo.Center_task,"touchstart",function(event){
	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;
	        var touchE =event.touches[0];

	        if (eTarget.nodeName.toLowerCase() == "li"){  // 肯定是触发了 li， 要么是进入下一步，要么是 滑动删除
	            // 但是 为了 能够做出 滑动删除的内容，我必须记录初始触发的 位置
	            maybeSome.StartX = touchE.pageX;
	        }
	    });

	    addEvent(baseMo.Center_task,"touchmove",function(event){
	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;

	        //console.log(eTarget.nodeName.toLowerCase())
	        var touchE = event.touches[0];
	        if (eTarget.nodeName.toLowerCase() == "li"){ // 就是说，一直在 li 滑动
	            maybeSome.moveX = touchE.pageX; // 记录现在的手指在哪里

	            if(maybeSome.StartX - maybeSome.moveX  > 100){ //  就是说，往回划拉了100px
	                alert(maybeSome.StartX - maybeSome.moveX);
	                alert("i should delete this li");
	                maybeSome.konw = "deleteLi"; // 这个写法我现在咋看看不懂，这个是调用的手法？
	                //console.log( maybeSome.konw);

	            }
	            else if (maybeSome.moveX - maybeSome.StartX  > 100 ){  //就是说 ，虽然触发在li上面，但是，滑动方向是用来返回的
	                maybeSome.konw = "backToLast";
	            }
	        }
	        else if (eTarget.getAttribute("id") == "taskListFather" || eTarget.nodeName.toLowerCase() == "div" ){
	         // 那就是说，并没有在滑动删除 ，而是在滑动返回上一菜单
	           // alert("i should get back to Left")
	            maybeSome.konw = "backToLast"
	        }
	    });

	    addEvent(baseMo.Center_task,"touchend",function(event){
	    // 在手指离开屏幕的时候触发，通过累积记录前面的操作数，再去判断

	        var e = window.event || arguments[0],
	            eTarget = e.target || e.srcElement;

	        if ( maybeSome.konw == "deleteLi"){  // 执行 删除
	            alert("maybeSome.konw = 'deleteLi' ");
	            var needDeleteObj = baseMo.getObj(eTarget.getAttribute("title"));
	            needDeleteObj.deletefunc();
	        }
	        else if ( maybeSome.konw == "backToLast"){
	            alert(" maybeSome.konw = 'backToLeft'");
	            showNoShow(baseMo.Center_task,baseMo.Left_class);
	        }
	        else {
	            //alert("next"); 就是普通的点击l
	            // 好歹 先切换到 right页面啊
	            eTarget.setAttribute("class","choosed")
	            showNoShow(baseMo.Center_task,baseMo.Right_content)
	            var needShowObj =baseMo.findObj(eTarget.getAttribute("title"));
	            needShowObj.showContent();
	        }
	    });
	})();


	// 这个是用来显示 content的 ，touch之后
	function touchToShowContent(event){
	    var e = window.event || arguments[0],
	        eTarget = e.target || e.srcElement;

	    console.log("touchToShowContent(")
	    if (eTarget.nodeName.toLowerCase() ==  "li" ){
	        //alert(1)
	        baseMo.Right_content.setAttribute("class","prepareShow");
	        baseMo.Right_content.style.display = "block";

	        baseMo.Center_task.setAttribute("class","canvasHidden");
	        Right_content.setAttribute("class","needShow");
	        setTimeout(function(){
	            Center_task.style.display = "none"
	        },400);
	        // 接下来，改变 content里面的
	        //  但是 ，这次要 分离 eventListener 结构那一类的东西了 就是 ，技法上面的东东。。。

	        var needShowObj,
	            needShowObjV = element.getAttribute("title");
	        needShowObj = baseMo.findObj(needShowObjV);
	        // 展示出来
	        needShowObj.showContent;

	    }
	}

	var addBTn = document.getElementById("neewAdd");
	addEvent(addBTn,"touchend",function(Event){
	    //console.log(baseMo.Left_class.style.display =="none")
	    Event.preventDefault();
	        //  因为实在不太好操作，只能将dom在移动端和pc做了不同的调整，所以说，添加动作，需要做在哪里添加的 区分
	        if ( baseMo.Left_class.style.display !== "none"){   //  那就是说，中间的那页并没有显示 ，就是在LeftList 上面 要 添加 分类喽，
	            cView1.createClass();
	        }
	        else if (baseMo.Left_class.style.display == "none") {  // 好了 ，这里是添加task
	            // 这里和移动端就有很大的不同了
	            // 就得先把  Right的页面显示了，而且显示的是 填写的页面
	         //   touchToShowContent();
	            (function (){
	               baseMo.Right_content.setAttribute("class","prepareShow");
	               baseMo.Right_content.style.display = "block";
	
	               baseMo.Center_task.setAttribute("class","canvasHidden");
	               baseMo.Right_content.setAttribute("class","needShow");

	               setTimeout(function(){
	               baseMo.Center_task.style.display = "none"
	               },400);

	            })();
	            // 显示 填写的
	            baseMo.Right_FaultContent.style.display = "none"
	            baseMo.Right_createTaskContent.style.display = "block";

	            //

	        }
	});
	//  因为 流程设计原因 ，这里还得写，点击确认添加 task 之后
	addEvent( baseMo.Right_sureToCreateContent ,"touchstart",  toCreateTask);

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


	


})


