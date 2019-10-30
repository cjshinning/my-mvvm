function SelfVue(options){
    var self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key){
        self.proxyKeys(key);    //绑定代理属性
    })

    observe(this.data);
    // el.innerHTML = this.data[exp];  //初始化模板数据的值
    // new Watcher(this, exp, function(value, oldValue){
    //     el.innerHTML = value;
    // });
    new Compile(options.el, this.vm);
    return this;
}

SelfVue.prototype = {
    proxyKeys: function(key){
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter(){
                return self.data[key];
            },
            set: function proxySetter(newVal){
                self.data[key] = newVal;
            }
        })
    }
}

