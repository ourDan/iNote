/**
 * Created by yyc on 2015/10/4.
 */
var needHiddenEle = document.getElementById("LeftClassList"),
    needShowEle = document.getElementById("CenterTaskList");

function moveToChange (event){
    // event.preventDefault();
    needShowEle.setAttribute("class","prepareShow");

    needHiddenEle.setAttribute("class","canvasHidden");

    needShowEle.setAttribute("class","needShow");
    console.log("1")

}
//canvas.addEventListener("touchmove",touchMoveToDelete,false)
needHiddenEle.addEventListener("touchmove",moveToChange,false);

console.log("11111111")

function showCenterList(){

}

// ����϶�Ҫ��д�����ٵ������� ��1 ��֧�� ���е� click�����������������һ�������˵Ĵ�������������2 ��д func���Ͼ�Ҫ���� Ҫ��Ȼ���ع���ͳ��ҳ���
// 2 ����ĽṹҲ��̫�ø�  ��  ��дһ��   ��ʵ���� ����������Щ�л��õģ�ֻ���������ǣ��� touchstart ��������һ�� Ȼ�� ����touchmove ������ ����