$ = function(el){ return document.querySelectorAll(el) };

function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function (callback) {
    (function recurse(currentNode){
            for (var i=0, length = currentNode.children.length; i<length ; i++) {
                recurse(currentNode.children[i]);
            }
        callback(currentNode)
    })(this._root)
};

var root_num = document.getElementById("box").getAttribute("value");
    tree = new Tree(root_num);
    branch = document.getElementsByClassName('mid');
for (var i=0; i<branch.length;i++) {
    branch_num = branch[i].getAttribute("value")
    tree._root.children.push(new Node(branch_num));
    tree._root.children[i].parent = tree;
    var leave = branch[i].getElementsByClassName("small");
    for (var j=0;j<leave.length; j++) {
        leave_num = leave[j].getAttribute('value')
        tree._root.children[i].children.push(new Node(leave_num));
        tree._root.children[i].children[j].parent = tree._root.children[i];
    }
}
console.log(tree)

Tree.prototype.traverseDF = function (callback) {
    (function recurse(currentNode){
        for (var i=0, length = currentNode.children.length; i<length ; i++) {

            recurse(currentNode.children[i]);
        }
        callback(currentNode)
    })(this._root)
};

function lightTree() {
    var int = setInterval(sortnum,1000)
    var sortnum = tree.traverseDF(function(node) {

    })
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

window.onload = lightTree;



Tree.prototype.contains = function (callback, traversal) {
    traversal.call(this, callback);
};

tree.contains(function(node){
    if (node.data === 'two') {
        console.log(node);
    }
}, tree.traverseDF);
