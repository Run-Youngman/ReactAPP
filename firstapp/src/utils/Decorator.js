export const SimpleAutoBind = myDecorator;
export const debounceIntervalDecorator = makeDebounce;
export const waitingForDecorator = waitingFor;

/*
    应用场景比如，在DOM组件中传入了一个方法，这个方法赋值给了一个变量，this的链就断了。
    功能同bind(this),将this指向DOM节点。
    target就是当前类的prototype
*/
function myDecorator(target, name, { value: fn, configurable, enumerable }) {
    if (!name) {  //如果是作用于类，不会传入name参数
        throw new Error('this decorator must be used for class property');
    }
    return {
        configurable,
        enumerable,
        get() { //get和value方法在调用该装饰方法的时候触发
            if (target.isPrototypeOf(this)) {  //比如实现了继承，B继承了A,把方法也继承了过去，这个时候this指向b的实例，target是A.prototype,第一层判断 可以过滤掉 A.prototype.fun()这样的调用
                //如果target是this 的 原型
                if (!this.hasOwnProperty('constructor')) {  //避免B.prototype.fun()这样的调用  注：B为A的子类
                    //确保this是一个实例
                    return fn.bind(this)
                }
            }
            throw new Error('the symbol this is not a instance');
        }
    }
}
function makeDebounce(step = 100) {
    return function debounce(target, name, { value: fn }) {
        if (!name) {
            throw new Error('this decorator must be used for class property');
        }
        let lastTimer = null;
        function getTimmer() {
            return lastTimer;
        }
        return {
            value: function (...args) {
                if (lastTimer) {
                    clearInterval(lastTimer);
                }
                lastTimer = setInterval(fn.bind(this, getTimmer, ...args), step);
            }
        }
    }
}

function waitingFor(target, name, { value: fn }) {
    if (!name) {
        throw new Error('this decorator must be used for class property');
    }
    let busying = false;
    function finish(){
        busying = false;
    }
    return {
        value: function (...args) {
            if(busying){
                // console.log('busying,waiting please',args);
                return;
            }
            busying = true;
            fn.apply(this,[finish,...args]);
        }
    }
}