export interface UserDataInterface {
    userId: string,
    create_date: string,
    update_date: string,
    username: string,
    telephone: string,
    email: string,
    avater: string,
    birthday: string,
    sex: string,
    role: string,
    sign: string,
    region: string
}

export interface ArticleInterface {
    id: number,
    type: string,// 类型，电影/音乐
    content: string,// 评论类型
    userId: string,// 用户id
    createDate: string,
    updateDate: string,
    commentCount: number,// 评论数量
    favoriteCount: number,// 收藏数量
    viewCount: number// 浏览量
}

export interface HotCommentMovieInterface {
    id: number,
    movieName: string,// 影片名称
    href: string,// 影片地址
    label: string,// 影片标签 HD/已更新到xx集
    createDate: string,
    updateDate: string,
    sourceUrl: string,// 影片来源地址
    rank: number// 影片排名
}
