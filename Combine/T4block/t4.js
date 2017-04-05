var stone = document.getElementById('key');

function createColumn() {
    var rows = document.getElementsByClassName('row');
    var len = rows.length;
    for (var i = 0; i < len; i++) {
        for (var j=0; j < 10;j++) {
            var num = j+1;
            rows[i].innerHTML += '<div class="column" value="' + num  + '"></div>';
        }
    }
}

var btn = document.getElementById('btn');
btn.onclick = key;

function key() {
    var order = document.getElementById('input').value;
    // var fanxiang;
    switch (order) {
        case 'go':
            go();
            break;
        case 'lef':
            tunLef();
            break;
        case 'rig':
            tunRight();
            break;
        case 'bac':
            tunBac();
            break;
        default:
    }
}

function go() {
    left = parseInt(stone.style.left, 10);
    num = parseInt(stone.style.top, 10);
    switch (fanxiang) {
        case 'left':
            if (left < 23) return false;
            stone.style.left = left - 60 + "px";
            break;
        case 'right':
            if (left > 502) return false;
            stone.style.left = left + 60 + "px";
            break;
        case 'bottom':
            if (num > 502) return false;
            stone.style.top = num + 60 + "px";
            break;
        default:
            if (num < 23) return false;
            stone.style.top = num - 60 + "px";
    }
}

function tunLef() {
    stone.style.border = 0;
    stone.style.borderLeft = "5px solid lightblue";
    fanxiang = 'left';

}
function tunRight() {
    stone.style.border = 0;
    stone.style.borderRight = "5px solid lightblue";
    fanxiang = 'right';
    console.log(fanxiang)
}
function tunBac() {
    stone.style.border = 0;
    stone.style.borderBottom = "5px solid lightblue";
    fanxiang = 'bottom'
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(createColumn());
addLoadEvent(key())
