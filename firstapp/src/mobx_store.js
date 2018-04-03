import { observable, action, computed, useStrict } from 'mobx';
import FileMap from './articlesHelper/fileMap.json';

let allPaths = getAllpath(FileMap);
const FILE_MAP = observable(FileMap);
class Store {
    @observable currentTag = null;
    @observable displayMode = 'normal';
    @computed get FileMap() {
        return FILE_MAP;
    }
    @computed get FileMapCount() {
        console.log('get count');
        return Object.keys(FILE_MAP).reduce(((prev, current) => {
            prev[current] = Object.keys(FILE_MAP[current]).length;
            return prev;
        }), {});
    }

    @action.bound changeTag(tag) {
        this.currentTag = tag;
    }
    @action.bound triggerDisplayModeNormal() {
        this.displayMode = 'normal';
    }
}

function getAllpath(fmap) {
    let paths = [];
    function getPath(obj, currentpath) {
        if (typeof obj !== 'object') {
            paths.push(currentpath);
            return;
        }
        Object.keys(obj).map(key => {
            getPath(obj[key], currentpath + '/' + key);
        });
    }
    getPath(fmap, './articles');
    return paths;
}

export default new Store();