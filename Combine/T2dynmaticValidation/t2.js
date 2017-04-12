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
    var char = position.value.trim();
    var filter;
    function test(){
        if (filter.test(char)) {
            tishi.textContent = '格式正确';
            tishi.className = 'right';
        } else {
            tishi.textContent = '格式错误';
            tishi.className = 'wrong';
        }
    }
    switch (poition.name) {
        case 'psd':
            filter = /^\d{6,14}/;
            test();
            break;
        case 'repsd':
            testRePsd(char);
            break;
        case 'email':
            filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            test();
            break;
        case 'tel':
            filter = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
            test();
        break;
        default:
            getStrLen(char);
            filter = /^\d{5,16}$/
            test();
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
