window.onload=function(){
	var userName    = document.getElementById('userName');
	var myPassword  = document.getElementById('myPassword');
	var myPasswords = document.getElementById('myPasswords');
	var myName  	= document.getElementById('myName');
	var myNumber 	= document.getElementById('myNumber');
	var btnYz 		= document.getElementById('btn-yz');
	btnYz.onclick  =  function(){
		 yzLength (userName,4,16);
		 yzLength (myPassword,6,16);
		 yzPasswords();
         keyText(myName);
         yzLength(myNumber,18,18);
//      验证都是哪一项输入错误，提示报错！
         var ii = document.getElementsByTagName('input');
		 var inputName =[];
         for (var i = 0; i < ii.length;i++){
             if(ii[i].getAttribute('alt')==2){
                inputName[i]=ii[i].parentNode.getElementsByTagName('label')[0].innerHTML;
			 }
		 }if(inputName.length==0){
            alert('全部正确');
		 }else{
            alert(inputName.join("、")+'输入不正确，请重新输入');
		}
	}
//		失去焦点时验证输入内容是否正确
	jiaodian(userName,4,16);
    jiaodian(myPassword,6,16);
    jiaodian(myNumber,18,18);
	function jiaodian(obj,min,max){
	    obj.onfocus=function () {
            obj.parentNode.getElementsByTagName('p')[0].style.display	=  'block';
        }
	    obj.onblur=function () {
            yzLength (obj,min,max);
        }
	}
	(function () {
        myPasswords.onblur=function () {
            yzPasswords();
            myPasswords.onfocus=function () {
                myPasswords.parentNode.getElementsByTagName('p')[0].style.display	=  'block';
            }
		}
    })();
    (function () {
        myName.onblur=function () {
            keyText(myName);
            myName.onfocus=function () {
                myName.parentNode.getElementsByTagName('p')[0].style.display	=  'block';
            }
        }
    })();

//		判断input框内输入的字符长度，并限定最大值最小值，
	function yzLength (obj,min,max) {
		 if(obj.value.length < min  ||  obj.value.length > max){
            prompt(obj,false);
		}else{
            prompt(obj,true);
		}
	}
//		根据判定修改当前状态
    function prompt(obj,pro){
        if(!pro){
            obj.style.borderColor  =  'red';
            obj.parentNode.getElementsByTagName('p')[0].style.color		=  'red';
            obj.parentNode.getElementsByTagName('p')[0].style.display	=  'block';
            obj.parentNode.getElementsByTagName('span')[0].style.color	=  'red';
            obj.parentNode.getElementsByTagName('span')[0].innerHTML	=  '×';
            obj.setAttribute("alt","2");
        }else{
            obj.style.borderColor  =  'greenyellow';
            obj.parentNode.getElementsByTagName('p')[0].style.color		=  'greenyellow';
            obj.parentNode.getElementsByTagName('span')[0].style.color	=  'greenyellow';
            obj.parentNode.getElementsByTagName('span')[0].innerHTML  	=  '√';
            obj.setAttribute("alt","1");
        }
    }

//		判断密码确认框内输入的值是否等于第一个密码框内的值
	function yzPasswords (){
		var passWord  = myPassword.value;
		var passWords = myPasswords.value;
		if(passWords == 0){
            prompt(myPasswords,false);
            myPasswords.parentNode.getElementsByTagName('p')[0].innerHTML =  '该项不可以为空值';
		}
		else if(passWords == passWord && passWords.length >= 6 && passWords.length <= 16){
            prompt(myPasswords,true);
		}else{
            prompt(myPasswords,false);
				myPasswords.parentNode.getElementsByTagName('p')[0].innerHTML =  '必须与原密码一致，并符合密码规范';
		}
	}
//		检测输入的是否为汉字
	function keyText(obj){
	    var val = obj.value;
        reg = /^[\u4E00-\u9FA5]{2,4}$/;
        if(!reg.test(val)){
            prompt(obj,false);
            }else{
            prompt(obj,true);
            }
        }
}
