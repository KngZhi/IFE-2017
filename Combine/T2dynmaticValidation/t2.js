// BUG: 检验的方式比较 dirty , 有没有别的检验方式?
// Sov: 将每一个检验剥离为一个函数, 函数返回 false 或 true , 若有任何一个函数返回了 false 则报错;
function testAll() {
    var content = document.getElementsByTagName('input');
    for (var i=0, len=content.length; i<len ; i++) {
        // Thing: 无需点击直接触发事件 x.event();
        content[i].focus();
    }
    var note = document.getElementsByTagName('span');
    console.log(note);
    notes = []
    for (var i=0, len=note.length;i<len; i++) {
        if (note[i].className === 'wrong') {
            alert("输入有误");
            break;
        } else if (note[len] === 'right') {
            alert("Boom!")
        }
    }
}


function testChar(char) {
    var len = getStrLen(char),
        sg = '请参照正确格式书写',
        right = '姓名格式正确',
        wrong = '姓名不能为空'
    if (len === 0) {
        notice(wrong, 'wrong');
    } else if (len > 3 && len < 17) {
        notice(right, 'right');
    } else {
        notice(sg, '');
    }
}

function testRePsd() {
    if (org_psd === '') {
        notice('原密码尚未输入', 'wrong')
    }else if (char === org_psd) {
        notice('两次密码一致', 'right')
    } else {
        notice('密码不一致', 'wrong')
    }
}

function testEmail() {
    var emailID = document.getElementById('email').value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
        notice('请输入正确的格式', 'wrong');
    } else {
        notice('输入正确!', 'right');
    }
}

var btn = document.getElementsByTagName('button')[0];
// 点击 btn 时自动跳转到最后一项 Input 中
btn.onclick = function(event) {
    testAll();
    event.preventDefault();
}

// btn.addEventListener('click', testAll);

addListeners('focus', toggleInfo);
addListeners('focusout', testInput);

var info, char;
function notice(msg, style) {
    info.textContent = msg;
    info.className = style;
}


function testInput() {
    var vanish_one = this.nextElementSibling.className;
    char = this.value
    tel_reg = /[0-9]{1,4}/,
    psd_reg = /[0-9]{1,4}/,
    org_psd = document.getElementById('psd').value
    info = this.parentNode.lastElementChild;
    type = this.name;

    switch (type) {
        case 'name':
            this.nextElementSibling.className = 'sgtion';
            testChar(char);
            break;
        case 'psd':
            // BUG: 正则表达式的问题依然存在
            // TODO: 重新学习正则表达式
            this.nextElementSibling.className = 'sgtion';
            if (psd_reg.test(char)) {
                notice('密码格式正确', 'right');
            } else {
                notice('密码格式错误', 'wrong');
            }
            break;
        case 'repsd':
            this.nextElementSibling.className = 'sgtion';
            testRePsd()
            break;
        case 'email':
            this.nextElementSibling.className = 'sgtion';
            testEmail();
            break;
        case 'tel':
            this.nextElementSibling.className = 'sgtion';
            if (tel_reg.test(char)) {
                notice('电话号码格式正确', 'right');
            } else {
                notice('电话号码格式错误', 'wrong');
            }
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
        } else {
            len += 2
        }
    }
    return len
}

/**
 * 给 Span 添加 .showup;
 * @return {[type]} [description]
 */
function toggleInfo() {
    hook = this.nextElementSibling;
    biaoji = hook.className;
    next_hook = hook.nextElementSibling;
    // 同时检测两项指标
    switch (biaoji) {
        case 'sgtion':
            hook.className = 'showup';
            // break;
        case 'showup':
            next_hook.className = 'sgtion'
            break;
        default: ;
    }
}

/**
 * 给元素组批量注册事件
 * @param {[type]} event 注册时事件
 * @param {[type]} func  事件触发时的启动的函数
 */

function addListeners(event, func) {
    lists = document.getElementsByTagName('input');
    for (var i=0, len=lists.length; i<len;i++) {
        lists[i].addEventListener(event, func, false);
    }
}
