import {observable,computed,action} from 'mobx'

class Mob {
    @observable index = 0;
    @observable obj = {};

    @computed get generate(){
        console.log('computed');
        return this.index;
    }
    @action.bound generate1(){
        this.index ++;
    }
}
class Mob2 {
    get asd(){
        console.log('sadasd');
        return 123
    }
}

export const store = new Mob;
export const store2 = new Mob2;