'use strict';
// var form = document.getElementById('form');
// form.addEventListener('click', toggleInfo, false);
// form.addEventListener('blur', testInput, false);

function addListeners(event, func) {
    var lists = document.getElementsByTagName('input');
    for (var i=0, len=lists.length; i<len;i++) {
        lists[i].addEventListener(event, func, false);
    }
}

addListeners('focus', toggleInfo);
addListeners('blur', testInput);
var btn = document.getElementsByTagName('button')[0];
btn.onclick = function () {
    testAll();
    return false;
};


function notice(msg, style) {
    var position = this.parentNode.lastElementChild;
    position.textContent = msg;
    position.className = style;
}

function testAll() {
    var content = document.getElementsByTagName('input');
    for (var i = 0, len = content.length; i < len; i++) {
        // Thing: 无需点击直接触发事件 x.event();
        // BUG: 为什么 blur() 没有反应?
        content[i].focus();
    }
    // 防止光标停留在 content[len] 上
    btn.focus();
    var notes = document.getElementsByClassName('right');
    if (notes.length > 4) {
        alert('格式输入正确');
    } else alert('格式输入错误');
}

function notice(msg, style) {
    var position = this.parentNode.lastElementChild;
    position.textContent = msg;
    position.className = style;
}


// 验证输入的信息
function testInput() {
    var char = this.value.trim();
    position = this.parentNode.lastElementChild;
    this.nextElementSibling.className = 'hidden';
    switch (this.name) {
        case 'name':
            testChar(char);
            break;
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
        default: return false;
    }
}

// 验证姓名
function testChar(len) {
    var sg = '请参照正确格式书写';
    var right = '姓名格式正确';
    var wrong = '姓名不能为空';
    if (len === 0) {
        notice(wrong, 'wrong');
    } else if (len > 3 && len < 17) {
        notice(right, 'right');
    } else notice(sg, 'wrong');
}

function getStrLen(str) {
    var len = 0;
    var input_len = str.length;
    for (var i=0; i < input_len; i++) {
        // 返回字符在 UTF-16 中的位置;
        var char = str[i].charCodeAt();
        // 如果字符的位置小于256(0~255 即为 ASCII 码);
        if (char < 0xFF) {
            len++;
        } else len += 2
    }
    return len;
}

// 验证密码
function testPsd(value) {
    var psd_reg = /^\d{6,14}/;
    if (psd_reg.test(value)) {
        notice('密码格式正确', 'right');
    } else notice('请按格式要求输入内容', 'wrong');
}

// 第二次验证密码
function testRePsd(value) {
    var org_psd = document.getElementById('psd').value;
    if (!org_psd) {
        notice('原密码尚未输入', 'wrong');
    } else if (value === org_psd) {
        notice('两次密码一致', 'right');
    } else notice('密码不一致', 'wrong');
}

// 验证邮箱
function testEmail(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        notice('输入正确!', 'right');
    } else notice('请按格式要求输入内容', 'wrong');
}

// 验证手机
function testTel(value) {
    var filter = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
    if (filter.test(value)) {
        notice('输入正确', 'right');
    } else notice('请按格式要求输入内容', 'wrong')
}

// 提示信息
function toggleInfo() {
    var hook = this.nextElementSibling;
    var class_name = hook.className;
    var next_class_name = hook.nextElementSibling;
    // 同时检测两项指标
    switch (class_name) {
        case 'hidden':
            hook.className = 'showup';
        case 'showup':
            next_class_name.className = 'hidden'
            break;
        default:
    }
}