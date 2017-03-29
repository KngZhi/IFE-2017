function testInput() {
    var info = document.getElementById('info');
    var input_text = document.getElementById('input').value;
    var inputchar_len = getStrLeng(input_text);
    console.log(inputchar_len)
    if (input_text == '') {
        info.textContent = '姓名不能为空';
        info.setAttribute('class', 'help')
    } else if (inputchar_len > 3 && inputchar_len < 17) {
        info.textContent = '姓名格式正确';
        info.setAttribute('class', 'bang');
    } else {
        info.textContent = '请参照正确格式填入';
        info.setAttribute('class', '');
    }
}

var button = document.getElementById('button');
button.addEventListener('click', testInput);

function getStrLen(str) {
    var enLen = 0;
    var zhLen = 0;
    var input_len = str.length;
    for (var i=0; i < input_len; i++) {
        // 返回字符在 UTF-16 中的位置;
        var char = str[i].charCodeAt();
        // 如果字符的位置小于256(0~255 即为 ASCII 码);
        if (char < 256) {
            enLen++;
        } else {
            zhLen++;
        }
    }
    return enLen + zhLen * 2;
}

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
    return str.codePointAt(0) <= 0xFF;
}
