let host = "http://192.168.0.103:3003";// 打包之后在nginx里面配置端口和域名
if(process.env.NODE_ENV === "development"){
    host = ""
}
export default {
    getUserData: `${host}/service/circle/getUserData`,//获取用户信息
    getCircleArticleList: `${host}/service/circle/getCircleArticleList`,//获取电影圈列表
    getCircleArticleCount: `${host}/service/circle/getCircleArticleCount`,//获取电影圈列表
    getHotCommentMovie: `${host}/service/circle/getHotCommentMovie`,//获取热门影评
    getLastModifyMovie: `${host}/service/circle/getLastModifyMovie`,//获取最近更新的电影
    saveSay: `${host}/service/circle-getway/saveSay`,//保存说说
}
