/**
 * Created by yyc on 2015/9/27.
 */
// ��������� �Լ����Լ���װһ����С��С�� �⣬�������һЩ ���� jQuery �� ���ܵ�һЩѡ���� ����һЩ���õ�ϰ�߲����ַ� ��
//  �ð� �ҳ��� �����д��д��ȷʵ���� �����query���������ڿ� ������ٶ�ife���õ���ҵ������֮����ã�����д��ôһ�� ��������������
//  ���Ÿ��˵�ѧϰ  Ӧ�û� �𽥰� ��� query�ḻ���� ��


//  ��������һ����

// ������

//  ����ѡ������ ���

//  ---------------------------------------------���һЩ�������ݲ���----------------------------------
//   �ж�arr�Ƿ�Ϊһ�����飬
function isArray(arr) {
    //  ��Ϊ instanceof  �� isArray���������������⣬ǰ���޷���֤���frame������ ie 9���� �ù�
    if( typeof arr.isArray() !=="undefined"  ){
        return arr.isArray();
    }else{ // �� ie  ��ô ����ԭ��
        return Object.prototype.toString().call(arr) === "[object Array]"
        //  �����ֱ�ӿ��Խ�� ������ ���޷� ��֤ԭ������������ͨ
        //  ��ʵ �ұȽϺ��� Ϊɶ ��� frame���ѵ�˵ ÿ�� frame ����һ�� window�����������ǰ  ��Ƥ��������˵
    }
}

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    // j�� �ֱ�  �������漰��֪ʶ�㣺
    return  Object.prototype.toString().call(fn) === "[object Function]"
}

// �������
/*
function isRegExp(str){

}*/

// ��ȿ�¡�����Ը���һ��Ŀ����󣬷���һ������������������֡��ַ��������������ڡ����顢Object���󡣲��������������������
function cloneObject(src) {
    // your implement
    var newStr;
    if ( isFunction(src) || isRegExp(str) ){
        console.log("ll")
    }else{//��������֡��ַ��������������ڡ����顢Object����
        if ( src instanceof  Object ){ // ���ô���z
            if ( isArray(src){ //����
                 for (var i =0,len= src.length;i<src;i++){
                     newStr[i] = arguments.callee.call(src[i]);
                 }
                /*
                newArr = src.map(,,function(){
                                                   return (arguments.callee.call(src[i]));
                                                })
                **/
            }
            else{
                for(var k in src){
                    newStr[k] = arguments.callee.call(src[k])
                }
            }
        }
        else{  //������֡��ַ��������������ڡ�
            newStr = str;
        }
    }
    return newStr;
}

// ������ȥ�أ�ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
/*
function uniqArray(arr) {
    // your implement
    if ( typeof arr == Number || typeof arr === String) {
        var testObject = {};
        for ( ) {

            if () {
            }
        }

    }
    else {
            console.log("you input is not str or number");

        }

    }
 */