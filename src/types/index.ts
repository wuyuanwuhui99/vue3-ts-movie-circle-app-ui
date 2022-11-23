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
    type: string,
    content: string,
    userId: string,
    createDate: string,
    updateDate: string,
    commentCount: number,
    favoriteCount: number,
    viewCount: number
}



