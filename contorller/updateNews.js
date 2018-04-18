let cheerIo = require('cheerio')
let Request = require('request')

module.exports = (name) => {
    const URL = `http://weixin.sogou.com/weixin?type=1&query=${name}`

    let getbody = new Promise((resolve, rej) => {
        Request(URL, (err, response, body) => {
            if (err) {
                console.log(err);
                rej(err)
            } else {
                resolve(body)
            }
        })
    })

    function getNamebody(nameUrl) {
        // body
        return new Promise((reslove, reject) => {
            Request(nameUrl, (err, response, body) => {
                if (err) {
                    reject(err)
                } else {
                    reslove(body)
                }
            })
        })
    }
    async function getname() {
        let parseBody = await getbody
        let nameUrl2 = analysisName(parseBody)
        let contentBody = await getNamebody(nameUrl2)
        analyData(contentBody)
    }
    getname()

}

function analysisName(body) {
    let $ = cheerIo.load(body)
    let nameUrl = $('.news-list2 li').find('.img-box a').eq(0).attr('href')
    return nameUrl
}

function analyData(data) {
    console.log(typeof data, data);
    let $2 = cheerIo.load(data)
    let scr = $2('body').find('script').eq(-2).html()
    console.log('sssss', scr, 'sccc');
    let arr = scr.split('msgList = ')
    console.log(arr, 'arr');
    let json, json1
    if (!arr[1]) {
        console.log('稍后再试');
        // return
    }
    json = arr[1].split('sea')[0]
    json1 = json.slice(0, json.length - 10)
    console.log(json1);
}