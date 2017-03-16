var input = document.getElementsByTagName("input");
var state = [];

rightin.onclick = function rightIn(){
    var div = addDiv();
}

leftin.onclick = function leftIn() {
    addDiv()
}

leftout.onclick = function leftOut() {
    if (container.firstElementChild) {
        alert(container.firstElementChild.textContent)
        container.removeChild(container.firstElementChild);
    } else {
        alert("队列中已不存在数值");
    }
}

rightout.onclick = function rightOut() {
    if (container.lastElementChild) {
        alert(container.lastElementChild.textContent);
        container.removeChild(container.lastElementChild);
    } else {
        alert("队列中已不存在数值");
    }
}

function addDiv() {
    var container = document.getElementById("container");
    var div_count = container.getElementsByTagName("*");
    if (div_count.length > 60 ) {
        alert("队列内容大于60，请清除队列");
           return false;
    }
    var i, div, j,
        values = document.body.firstElementChild.value;
        console.log(typeof values)
        seg = /[\s ;,，、 ]/;
        value = values.split(seg);
        console.log(value)
    for (i=0; i<value.length; i++) {
        container.innerHTML += "<div>" + value[i] + "</div>";
    }
    var numbox = container.querySelectorAll("div");
    for (j=0; j<numbox.length ; j++) {
        numbox[j].setAttribute("class","item");
        numbox[j].addEventListener("click", remove);
    }

    return numbox
}

function remove() {
    alert("移除的数值为"+ this.innerHTML);
    this.parentNode.removeChild(this);
}


function getAndSort() {
    var divs = container.getElementsByTagName("*");
    var divs_value = [];
    for (var i=0; i< divs.length; i++) {
        value = divs[i].textContent;
        divs_value.push(value);
    }
    for (var i = divs_value.length-1; i>0;i--) {
        for (var j = 0; j < i; j++) {
            if (divs_value[j] > divs_value[j+1]) {
                var smaller = divs_value[j+1];//bigger 为小的那个
                divs_value[j+1] = divs_value[j];//小的放到左边
                divs_value[j] =  smaller;//[疑问]这个什么意思？
                //将每一次交换的数组存到 state 中，state 是数组的数组
                state.push(JSON.parse(JSON.stringify(divs_value)))//为什么放外面?[疑惑]为什么一定要 JSON 放前面?
                // state.push(divs_value)
            }
        }
    }
    console.log(state)
    // return state;
}

sort.onclick = function() {
    getAndSort();
    // 每500毫秒运行一次 imgBubbles 函数
    var int = setInterval(imgBubbles, 500);
    function imgBubbles(){
        //获取 container
        var box = document.getElementById("container");
        // 清空 container
        //这个 [] 目的貌似为了防止无限循环;不是很明白为什么?
        var s = state.shift() || [];
        console.log(s)
        // 默认的情况下第一次是3 第二次是0,本来不应该出现最后一次的.
        console.log(s.length)
        // 如果 s.length > 1则将 box 清空,然后放入下一列的内容
        if (s.length > 1) {
            box.innerHTML = "";
            for (var i=0; i<s.length; i++) {
                box.innerHTML += "<div>" + "</div>";
                var dataDiv = box.querySelectorAll("div");
                dataDiv[i].style.height = s[i]*5 + "px";
                dataDiv[i].setAttribute("class","item")
            }
        } else {
            clearInterval(int)
        }
    }
}

// research

var gobutton = document.getElementById("go");
var keywordInput = document.getElementById("input");
//遍历节点来修改
function research() {
    var box = document.getElementById("container"),
        boxchilds = box.childNodes,
        len = boxchilds.length,
        key = keywordInput.value,
        markedKey = "<mark>" + key + "</mark>"
        reg = new RegExp(key);
    for (var i = 0; i < boxchilds.length; i++) {
        if (boxchilds[i].nodeType == 3) {
            boxchilds[i].parentNode.removeChild(boxchilds[i])
        }
        // 消除所有标记
        boxchilds[i].innerHTML = boxchilds[i].innerText;
        boxchilds[i].innerHTML = boxchilds[i].innerHTML.replace(reg,markedKey)
    }
}

gobutton.onclick = research();
