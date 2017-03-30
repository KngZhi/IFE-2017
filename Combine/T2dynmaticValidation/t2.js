// BUG: 无法在 testAll 中重复使用, 因为 f:notice 无法调用 info
function testChar(char) {
    // var info = document.getElementById('info');
    // var char = document.getElementById('input').value;
    var len = getStrLen(char);

    if (len === 0) {
        notice('姓名不能为空','help');
    } else if (len > 3 && len < 17) {
        notice('姓名格式正确', 'bang');
    } else {
        notice('请参照正确格式书写', '');
    }
}


// function notice(msg, style) {
//     info.textContent = msg;
//     info.className = style;
// }

// BUG:
function testAll() {
    var content = document.getElementsByTagName('input');
    for (var i=0, len=content.length; i<len ; i++) {
        // Thing: 无需点击直接触发事件 x.event();
        content[i].focus();
    }
    var note = document.getElementsByTagName('span');
    notes = []
    for (var i=0, len=note.length;i<len; i++) {
        notes.push(note[i].className);
    }
    for (var j=0, len = notes.length; j<len ; j++) {
        if (notes[j] === 'wrong') {
           alert("输入有误");
           break;
        } else {
            alert("输入正确");
        }
    }
}

var btn = document.getElementsByTagName('button')[0];
btn.addEventListener('click', testAll);

addListeners('focus', showInfo);
addListeners('focusout', testInput);

function testInput() {
    var info = this.nextElementSibling;
    function notice(msg, style) {
        info.textContent = msg;
        info.className = style;
    }
    var type = this.name;
    var char = this.value;

    switch (type) {
        case 'name':
            var len = getStrLen(char);
            if (len === 0) {
                notice('姓名不能为空','wrong');
            } else if (len > 3 && len < 17) {
                notice('姓名格式正确', 'right');
            } else {
                notice('请参照正确格式书写', 'wrong');
            }
            break;
        case 'psd':
            // BUG: 正则表达式的问题依然存在
            // TODO: 重新学习正则表达式
            var regexp = /[0-9]{1,4}/
            if (regexp.test(char)) {
                notice('密码格式正确', 'right');
            } else {
                notice('密码格式错误', 'wrong');
            }
            break;
        case 'repsd':
            var org_psd = document.getElementById('psd').value
            if (org_psd === '') return false;
            if (char === org_psd) {
                notice('两次密码一致', 'right')
            } else {
                notice('密码不一致', 'wrong')
            }
            break;
        default: return false;
    }
}



/*
 * 验证姓名的长度
 */
//BUG: 可否将查询长度的功能让密码查询也使用
function getStrLen(str) {
    var enLen = 0;
    var zhLen = 0;
    var input_len = str.length;
    for (var i=0; i < input_len; i++) {
        // 返回字符在 UTF-16 中的位置;
        var char = str[i].charCodeAt();
        // 如果字符的位置小于256(0~255 即为 ASCII 码);
        if (char < 0xFF) {
            enLen++;
        } else {
            zhLen++;
        }
    }
    return enLen + zhLen * 2;
}

/**
 * 给 Span 添加 .showup;
 * @return {[type]} [description]
 */
//BUG: 在 outfocus 检测之后,再 focus 时不出现提示的内容;
function showInfo() {
    var hook, ele;
    // 疑问如何获得 EventTarget 作为参数呢?
    hook = this.getAttribute('id')
    ele = document.getElementById(hook).nextElementSibling;
    ele.className = 'showup';
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


a = 1;
b =2
a
++
b
