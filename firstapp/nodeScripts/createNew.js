const inquirer = require('inquirer')
const fs = require('fs')
const moment = require('moment')
const tools = require('./tools')
const questions = [
	{
		type:'input',
		name:'post_name',
		message:'请输入您的文章名',
		validate: value => {
			if(/(\.|\*|\?|\\|\/)/gi.test(value)){
				return '不得包含特殊符号(.*?\\/),请重新输入↑↑'
			}
			return true;
		}
	},{
		type:'input',
		name:'tags',
		message:'请输入文章的标签',
		validate: value => {
			if(/(\.|\*|\?|\\|\/)/gi.test(value)){
				return '不得包含特殊符号(.*?\\/),请重新输入↑↑'
			}
			return true;
		}
	}
]

const JSON_TEMPLATE = {
	createTime: moment().format('YYYY-MM-DDTHH:mm:ss'),
	tags:'',
	markDown:''
}

inquirer
	.prompt(questions)
	.then(rst => {  //获取用户的输入
		const {post_name,tags} = rst;
        // console.log('name',post_name,'tag',tags)
        let newPost = JSON_TEMPLATE;
        JSON_TEMPLATE.tags = [...new Set(tags.split(','))];
        if(!fs.existsSync('src/articles/'+tags)){
            fs.mkdir('src/articles/'+tags,(err,rst)=>{
                if(err){
                    console.log('创建一级文章目录报错',err);
                    return;
                }
                if(!fs.existsSync('src/articles/'+tags+'/'+post_name)){
                    generateSecLevel(tags,post_name)
                }else{
                    console.log('文章目录已经存在，请重新创建')
                }
            })
        }else{
            if(!fs.existsSync('src/articles/'+tags+'/'+post_name)){
                generateSecLevel(tags,post_name)
            }else{
                console.log('文章目录已经存在，请确认后创建')
            }
        }
    })
    
    generateSecLevel = (tags,post_name) =>{
        fs.mkdir('src/articles/'+tags+'/'+post_name,(err,rst)=>{
            if(err){
                console.log('创建二级文章目录报错',err);
                return;
            }
            console.log('创建文章目录成功');
            fs.writeFile('src/articles/' + tags + '/' + post_name + '/' + 'main.md', '在此写入您的文章', (err =>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log('创建文章成功，请开始你的表演。')
            }))
            fs.writeFile('src/articlesHelper/fileMap.json',JSON.stringify(tools.generateFileMap('src/articles/')),(err => {
                if(err){
                    console.log(err);
                    return
                }
                console.log('更新文件地图成功');
            }))
            fs.writeFile('src/articles/'+tags+'/'+post_name+'/'+'basicInfo.json',JSON.stringify({
                time:JSON_TEMPLATE.createTime
            }),(err =>{
                if(err){
                    console.log(err)
                    return
                }
                console.log('创建基础信息成功');
            }))
            copyTemplate('src/articlesHelper/exposerTemplate.js', 'src/articles/' + tags + '/' + post_name + '/' + 'index.js');
        })
    }

    copyTemplate = (come,to) => {
        let rs = fs.createReadStream(come)
        let ws = fs.createWriteStream(to);
        rs.pipe(ws);
    }