const Mongoose = require('mongoose')

let schema = Mongoose.Schema
    // 创建结构 schema,包括定义数据类型以及校验
let NewsList = new schema({
    list: [{
        app_msg_ext_info: {
            audio_fileid: Number,
            author: String,
            content: String,
            content_url: String,
            copyright_stat: Number,
            coever: String,
            del_flag: Number,
            digest: String,
            duration: Number,
            fileid: Number,
            is_multi: Number,
            item_show_type: Number,
            multi_app_msg_item_list: Array,
            play_url: String,
            source_url: String,
            subtype: Number,
            title: String
        },
        comm_msg_info: {
            content: String,
            datetime: Date,
            fakeid: String,
            id: String,
            status: Number,
        }

    }]
})
module.exports = NewsList