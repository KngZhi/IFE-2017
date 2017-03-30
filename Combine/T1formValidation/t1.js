function testInput() {
    var info = document.getElementById('info');
    var char = document.getElementById('input').value;
    var char_len = getStrLen(char);
    console.log(char_len)

    if (char_len === 0) {
        notice('姓名不能为空','help');
    } else if (char_len > 3 && char_len < 17) {
        notice('姓名格式正确', 'bang');
    } else {
        notice('请参照正确格式书写', '');
    }
}

function notice(msg, form) {
    info.textContent = msg;
    info.className = form;
}

var btn = document.getElementById('button');
btn.addEventListener('click', testInput);

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
    /* 判定 32bit 的方法;
    var i = 0,
        len = 0;
    while (i < input_len) {
        var charCode = str[i].charCodeAt();
        if (charCode < 0xFF) {
            len++;
            i++;
        } else {

            //* 前16bit 一定在 0xD800~0xdbff;
            //* 后16bit 一定在 0xDC00~0xdfff;

            if (charCode >= oxd800 && charCode <= 0xdfff) {
                len += 2;
                i += 2;
            }
        }
    }
    return len;
    */
    return enLen + zhLen * 2;
}
/**
 * [getStrLeng 判断字符数]
 * @param  {[type]} str 输入的字符串
 */
function getStrLeng(str) {
    var enLen = 0;
    var zhLen = 0;
    for (let ch of str) {
        if(isASCII(ch)) {
            enLen++;
        } else {
            zhLen++;
        }
    }
    return enLen + zhLen * 2;
}

function isASCII(str) {
    // return /^[\x00-\x7F]*$/.test(str);
    // 直接判定返回 true | false;
    return str.codePointAt(0) <= 0xFF;
}
