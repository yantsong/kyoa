const Mongoose = require('mongoose');

let cheerIo = require('cheerio')
let Request = require('request')
const DB = require('../database/createConnection')
const Newlist = require('../database/newsList.js')

module.exports = (name) => {
        const URL = `http://weixin.sogou.com/weixin?type=1&query=${name}`
            //获取body的html
        let getbody = new Promise((resolve, rej) => {
            Request(URL, (err, response, body) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(body)
                }
            })
        })

        function getNamebody(nameUrl) {
            // 通过解析出的nameUrl来获取新的html
            return new Promise((reslove, reject) => {
                Request(nameUrl, (err, response, body) => {
                    if (err) {} else {
                        reslove(body)
                    }
                })
            })
        }
        // 根据name得到解析后的json
        async function getname() {
            let parseBody = await getbody
            let nameUrl2 = analysisName(parseBody)
            let contentBody = await getNamebody(nameUrl2)
            analyData(contentBody)
        }
        getname()
    }
    //
function analysisName(body) {
    let $ = cheerIo.load(body)
    let nameUrl = $('.news-list2 li').find('.img-box a').eq(0).attr('href')
    return nameUrl
}

function analyData(data) {
    console.log(typeof data, data);
    let $2 = cheerIo.load(data)
    let scr = $2('body').find('script').eq(-2).html()
    let arr = scr.split('msgList = ')
    let json, json1
    if (!arr[1]) {
        console.log('去输一下验证码');
        return
    }
    json = arr[1].split('sea')[0]
    json1 = JSON.parse(json.slice(0, json.length - 10))
    UpdateNewsList(json1)
}

function UpdateNewsList(json) {
    // 连接DB
    //创建schema
    //创建model
    let List = Mongoose.model('List', Newlist)
        //初始化doc
    let listData = new List(json)
        //updateOne
    List.updateOne({}, listData, { upsert: true }, (err, data) => {
        console.log(data);
    })
}