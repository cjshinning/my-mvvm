function Compile(el, vm){
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function(){
        if(this.el){
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }else{
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function(el){
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while(child){
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement: function(el){
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node){
            var reg = /\{\{\s*(.*?)\s*\}\}/;
            var text = node.textContent;
            if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
                self.compileText(node, reg.exec(text)[1]);
            }

            if(node.childNodes && node.childNodes.length){
                self.compileElement(node);  //继续递遍历子节点
            }
        })
    },
    compileText: function(node, exp){
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function(value){
            // console.log(exp);
            self.updateText(node, value);
        })
    },
    updateText: function(node, value){
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}