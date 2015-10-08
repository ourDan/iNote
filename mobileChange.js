/**
 * Created by yyc on 2015/10/1.
 */
window.mobileUtil = (function(win,doc){
    var UA = navigator.userAgent;  // i get "Mozilla/5.0(window NT 10.0;WOW64)AppleWebkit/537.36(KHTML ,like,Geoko)Chrome/41.0.2272.89 safir/537.36" from Chrome
// else i also  LIKe "Mozilla/5.0(iPhone 0s 8_0 like Mac Os X)AppleWebkit/600 1.3 (KHTML,like Geocko) Verson/8.0 Mobile/12A43534d safair/600.1.4"
    var whichObj = {
        isMobile:UA.match(/Mobile/g) ,
        isiPhone:UA.match(/iPhone/g),
        isAndriod:UA.match(/Andriod/g)
    };

    return {

         function (){
            var metaEle = doc.querySelector("meta[name=view]"),
                metaContent = metaEle?  meta.content : "",
                metaScale = metaContent.match(/initial\-scale=([\d\.]+)/),
                metaWidth = metaContent.match(/width=([^,\s]+)/);
        }

        if (!metaEle){  // about rem

            var docEle = document.documentElement,
                docEleWidth = docEle.clientWidth,
                dpr =  window.devicePixelRatio || 1,
                metaEle = docEle.querySelector("meta[name=viewport]"),
                scale = 1 / dpr;

            metaEle = document.createElement("meat");
            metaEle.name = "viewport";

            metaEle.content = "width="+dpr * docEleWidth  +",initial-scale="+scale+",minmuim-scale="+scale+",maxmuim-scale="+scale+",user-scalable=no";
            docEle.firstElementChild.appendChild(metaEle);
            var rem = docEleWidth * dpr / 320  * 20 ;  //    chrome <10px,强制12px
            docEle.html.style.fontSize = rem + "px";

        }
        else if (whichObj.isMobile && !metaScale && (metaWidth && metaWidth[1] != "device-width")){  // second method
            var width = parseInt(metaWidth[1]),
                iw = window.innerWidth || width,
                ow = window.outerWidth || width,
                sw  = window.screen.width || width,
                saw = window.screen.availWidth || width,
                ih = window.innerHeight || width,
                oh = window.outerHeight || ih,
                ish = window.screen.Height || ih,
                sah = widow.screen.availHeight || ih,
                w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                scale = w / width;

            if (scale < 1){
                meta.content = metaContent + "," +fillScale(scale);
            }

            function fillScale(scale){
                return "initial-scale=" + scale +",maximum-scale=" +scale+",minmum-scale="+scale;
            }
        }


    }

})(window,document);



function touchMoveToDelete(event){
    event.preventDefault();
    /* 先不假设
    if (){ // 假设是某个列表

    }*/

    var touchTarget = event.touches[0],
    oldWidth = touchTarget.width,
    x = touch.pageX ;

    touchTarget.transform = "translate(" + x +"px)"

    if (X*4 > oldWidth  ){
        touchTarget.style.background = "red"

        if ( X*2 > oldWidth ){
            //
            touchTarget.display = "none";
        }
    }

}


function (){

}