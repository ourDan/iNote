/**
 * Created by yyc on 2015/10/2.
 */

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

function bgger(){
    
    var e = window.event || arguments[0],
        eTarget = e.srcElement || e.target;
    console.log(eTarget)
}

var main = document.getElementsByClassName("main")[0];
addEvent(main,"click",bgger())



function handleTouchEvent(event){
    if (event.touches.length == 1){

        var output = document.getElementById("output")
        switch(event.type){
            case "touchstart":
                output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.changeTouches[0].clientY + ")";
                break;
            case"touchend":
                output.innerHTML += "<brTouch ended (" + event.changedTouches[0].clientX + "," + event.changeedTouches[0].clientY + ")";
            case "touchmove":

                event.preventDefault();
                output.innerHTML += "<br>Touch moved(" + event.changedTouches[0].clientX +"," +event.changedTouches[0].clientY+")"
        }
    }
}