'use strict';
var form = document.getElementById('form');
form.addEventListener('focusin', toggleInfo);
form.addEventListener('focusout', testInput);
var btn = document.querySelector('button');
btn.addEventListener('click', function(){
    var content = document.getElementsByTagName('input');
    for (var i = 0, len = content.length; i < len; i++) {
        content[i].focus();
    }
    btn.focus();
    var notes = document.getElementsByClassName('right');
    if (notes.length > 4) {
        alert('格式输入正确');
    } else alert('格式输入错误');
    return false;
});

function testInput() {
    toggleInfo();
    var position = event.target
    var tishi = position.parentNode.lastElementChild;
    console.log(tishi)
    var char = position.value.trim();
    var filter = {
        name: /^\d{5,16}$/,
        psd: /^\d{6,14}/,
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        tel: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/
    };
    function test(filter){
        if (filter.test(char)) {
            tishi.textContent = '格式正确';
            tishi.className = 'right';
        } else {
            tishi.textContent = '格式错误';
            tishi.className = 'wrong';
        }
    }
    switch (position.name) {
        case 'psd':
            test(filter.psd);
            break;
        case 'repsd':
            testRePsd(char);
            break;
        case 'email':
            test(filter.email);
            break;
        case 'tel':
            test(filter.tel);
        break;
        default:
            getStrLen(char);
            test(filter.name);
    }
}

function getStrLen(str) {
    var len = 0;
    var input_len = str.length;
    for (var i=0; i < input_len; i++) {
        var char = str[i].charCodeAt();
        if (char < 0xFF) {
            len++;
        } else len += 2
    }
     return len;
}

function testRePsd(value) {
    var org_psd = document.getElementById('psd').value;
    if (!org_psd) {
        notice('原密码尚未输入', 'wrong');
    } else if (value === org_psd) {
        notice('两次密码一致', 'right');
    } else notice('密码不一致', 'wrong');
}

function toggleInfo() {
    var info = event.target.nextElementSibling;
    info.className = 'showup';
    var msg = info.nextElementSibling;
    msg.className = 'hidden';
    if(event.type == 'focusout') {
        info.className = 'hidden';
    }
}

function notice(msg, style) {
    var position = event.target.parentNode.lastElementChild;
    position.textContent = msg;
    position.className = style;
}
