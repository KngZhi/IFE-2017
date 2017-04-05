// BUG: 检验的方式比较 dirty
// 为所有 input 添加事件
function addListeners(event, func) {
    lists = document.getElementsByTagName('input');
    for (var i=0, len=lists.length; i<len;i++) {
        lists[i].addEventListener(event, func, false);
    }
}

addListeners('focus', toggleInfo);
addListeners('blur', testInput);
var btn = document.getElementsByTagName('button')[0];
// 为什么点击 btn 时光标会自动跳转到最后一项 Input 中, 然后导致无法触发 blur 事件
btn.onclick = function () {
    testAll();
    return false;
};

var info;
var char;
function notice(msg, style) {
    info.textContent = msg;
    info.className = style;
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

function testChar(char) {
    var len = getStrLen(char);
    var sg = '请参照正确格式书写';
    var right = '姓名格式正确';
    var wrong = '姓名不能为空';
    if (len === 0) {
        notice(wrong, 'wrong');
    } else if (len > 3 && len < 17) {
        notice(right, 'right');
    } else notice(sg, '');
}

function testRePsd() {
    if (org_psd === '') {
        notice('原密码尚未输入', 'wrong');
    } else if (char === org_psd) {
        notice('两次密码一致', 'right');
    } else notice('密码不一致', 'wrong');
}

function testEmail() {
    var emailID = document.getElementById('email').value;
    var atpos = emailID.indexOf('@');
    var dotpos = emailID.lastIndexOf('.');
    if (atpos < 1 || (dotpos - atpos < 2)) {
        notice('请输入正确的格式', 'wrong');
    } else notice('输入正确!', 'right');
}

function testInput() {
    char = this.value;
    // 手机号码为13位.
    var tel_reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
    // 有一个不等的大写\小写\数字,总长度为6-13
    var psd_reg = /^\d{6,14}/;
    org_psd = document.getElementById('psd').value;
    info = this.parentNode.lastElementChild;
    var type = this.name;
    this.nextElementSibling.className = 'hidden';
    switch (type) {
        case 'name':
            testChar(char);
            break;
        case 'psd':
            if (psd_reg.test(char)) {
                notice('密码格式正确', 'right');
            } else notice('密码格式错误', 'wrong');
            break;
        case 'repsd':
            testRePsd();
            break;
        case 'email':
            testEmail();
            break;
        case 'tel':
            if (tel_reg.test(char)) {
                notice('电话号码格式正确', 'right');
            } else notice('电话号码格式错误', 'wrong');
        break;
        default: return false;
    }
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

/**
 * 给 Span 添加 .showup;
 * @return {[type]} [description]
 */

function toggleInfo() {
    var hook = this.nextElementSibling;
    var biaoji = hook.className;
    var next_hook = hook.nextElementSibling;
    // 同时检测两项指标
    switch (biaoji) {
        case 'hidden':
            hook.className = 'showup';
        case 'showup':
            next_hook.className = 'hidden'
            break;
        default:
    }
}
