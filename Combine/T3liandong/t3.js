var radios = document.querySelectorAll('input[name=fenlei]'),
    len = radios.length

function toggle() {
    work = document.getElementById('work'),
    sch = document.getElementById('school');
    if (this.value == 1) {
        sch.className = '';
        work.className = 'hidden';
    } else if (this.value == 2) {
        sch.className = 'hidden';
        work.className = '';
    }
}

function add() {
    for (var i=0;i<len; i++) {
        radios[i].addEventListener('click', toggle)
    }
}

window.onload = add();
