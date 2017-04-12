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
    var char = position.value.trim();
    switch (position.name) {
        case 'psd':
            testPsd(char)
            break;
        case 'repsd':
            testRePsd(char);
            break;
        case 'email':
            testEmail(char);
            break;
        case 'tel':
            testTel(char);
        break;
        default:
            var len = getStrLen(char);
            testChar(len);
    }
}

function testChar(len) {
    var sg = '请参照正确格式书写';
    var right = '姓名格式正确';
    var wrong = '姓名不能为空';
    if (len == 0) {
        notice(wrong, 'wrong');
    } else if (len > 4 && len < 17) {
        notice(right, 'right');
    } else notice(sg, 'wrong');
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

function testPsd(value) {
    var psd_reg = /^\d{6,14}/;
    if (psd_reg.test(value)) {
        notice('密码格式正确', 'right');
    } else notice('请按格式要求输入内容', 'wrong');
}

function testRePsd(value) {
    var org_psd = document.getElementById('psd').value;
    if (!org_psd) {
        notice('原密码尚未输入', 'wrong');
    } else if (value === org_psd) {
        notice('两次密码一致', 'right');
    } else notice('密码不一致', 'wrong');
}

function testEmail(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        notice('输入正确!', 'right');
    } else notice('请按格式要求输入内容', 'wrong');
}

function testTel(value) {
    var filter = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
    if (filter.test(value)) {
        notice('输入正确', 'right');
    } else notice('请按格式要求输入内容', 'wrong')
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
