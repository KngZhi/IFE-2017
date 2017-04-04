var radios = document.querySelectorAll('input[name=fenlei]'),
    target = document.getElementById('college'),
    source = document.getElementById('local');
    len = radios.length;

function toggle() {
    work = document.getElementById('work'),
    sch = document.getElementById('school');
    if (this.value == 1) {
        sch.className = '';
        work.className = 'hidden';
    } else {
        sch.className = 'hidden';
        work.className = '';
    };
}

function add() {
    for (var i=0;i<len; i++) {
        radios[i].addEventListener('click', toggle)
    };
}

function select() {
    var data = {
        bj: ["北京大学", "清华大学"],
        sh: ["南开大学", "上海大学"]
    }
        selected = source.options[source.selectedIndex].value;
    target.innerHTML = "";
    for (var i=0; i<data[selected].length; i++) {
        var opt = document.createElement('option');
        opt.value = data[selected][i];
        opt.innerHTML = data[selected][i];
        target.appendChild(opt);
    }
}
source.onchange = select;

window.onload = add();
