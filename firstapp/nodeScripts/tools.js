const fs = require('fs')
const generateFileMap = (base,maxDepth = 2) => {
    return (function getMap(depth,path){
        if(depth > maxDepth){
            return true;
        }
        let map = {}
        let files = fs.readdirSync(path);   //返回一个不包括 . 和 .. 的文件名的数组
        files.length > 0 && files.map(dir => {
            map[dir] = getMap(depth + 1,path + '/' + dir)
        })
        return map;
    })(1,base);
}

module.exports = {
    generateFileMap
}