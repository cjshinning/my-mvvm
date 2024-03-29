function Watcher(vm, exp, cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();
}

Watcher.prototype = {
    update: function(){
        this.run();
    },
    run: function(){
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if(value !== oldValue){
            this.value = value;
            this.cb.call(this.vm, value, oldValue)
        }
    },
    get: function(){
        Dep.target = this;  //缓存自己
        var value = this.vm.data[this.exp]; //强制执行监听器里的get函数
        Dep.target = null;  //释放自己
        return value;
    }
}