<template>
    <div id="home">
        <div id="search-wrapper">
            <div id="search-input-wrapper">
                <span class="iconfont icon-search"></span>
                <input id="search-input"/>
            </div>
            <span class="iconfont icon-add" @click="goRouter"></span>
        </div>
        <div id="article-view" ref="articleView" @scroll="useScroll">
            <ul id="artice-list" ref="articeList">
                <li class="article-wrapper" :key="'article-wrapper'+index" v-for="item,index in listData">
                    <div class="article-header">
                        <img class="avater" :src="`/static/user/avater/${item.userId}.jpg`">
                        <div class="username-wrapper">
                            <span class="username">{{item.username}}</span>
                            <span class="time">{{formateDate(item.createTime)}}</span>
                        </div>
                    </div>
                    <div class="content">{{item.content}}</div>
                    <ul class="imgs-wrapper" v-if="item.imgs">
                        <li class="img-item">
                            <img :src="img" v-for="img,idx in item.imgs" :key="'img'+index+idx">
                        </li>

                    </ul>
                    <ul class="footer-wrapper">
                        <li class="footer-item">
                            <i class="iconfont icon-view"></i>
                            <span class="count">{{item.viewCount}}</span>
                        </li>
                        <li class="footer-item">
                            <i class="iconfont icon-comment"></i>
                            <span class="count">{{item.commentCount}}</span>
                        </li>
                        <li class="footer-item">
                            <i class="iconfont icon-like"></i>
                            <span class="count">{{item.favoriteCount}}</span>
                        </li>
                    </ul>
                </li>
                <div id="loading">{{totalRows === listData.length ? "已经到底了" : "正在加载..."}}</div>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive,Ref,onMounted} from 'vue';
    import {getArticleService, getCircleArticleCountService} from '@/service/homeService';
    import {formateDate} from "@/utils"
    import {ArticleInterface} from '@/types'
    import {useRouter} from "vue-router";
    import emitter from "../utils/emitter";

    export default defineComponent({
        name: 'HomePage',
        components: {},
        async setup() {
            const router = useRouter();
            let pageNum:number = 1;
            const keyword = ref<string>("");
            const articleView:Ref<HTMLElement | null> = ref(null);
            const articeList:Ref<HTMLElement | null> = ref(null);
            let listData = reactive<Array<ArticleInterface>>([]);
            const totalRows = ref<number>(0);

            /**
             * @author: wuwenqiang
             * @description: 获取列表数据，并加载浏览量评论量
             * @date: 2022-12-02 21:25
             */
            const useGetArticleList = async () => {
                const result: any = await getArticleService(pageNum,keyword.value);
                const queue = result.data.map((item: any) => {
                    return getCircleArticleCountService(item.id)
                });
                totalRows.value = result.total;
                Promise.all(queue).then((res: any) => {
                    const list = result.data.map((item: any, index: number) => {
                        item.commentCount = res[index].commentCount;
                        item.favoriteCount = res[index].favoriteCount;
                        item.viewCount = res[index].viewCount;
                        if(item.imgs)item.imgs = item.imgs.split(";");
                        return item;
                    });
                    listData.push(...list);
                });
            };

            /**
             * @author: wuwenqiang
             * @description: 上拉加载更多
             * @date: 2022-12-02 21:25
             */
            const useScroll = ()=>{
                const articleViewEle:HTMLElement = articleView.value as HTMLElement;
                const articeListEle:HTMLElement = articeList.value as HTMLElement;
                if(articleViewEle.scrollTop >= articeListEle.offsetHeight - articleViewEle.offsetHeight && totalRows.value > listData.length){
                    pageNum++;
                    useGetArticleList();
                }
            };

            /**
             * @author: wuwenqiang
             * @description: 跳转到说说页面
             * @date: 2022-12-02 21:28
             */
            const goRouter = ()=>{
                router.push({name: 'Say',});
            };

            onMounted(()=>{
                emitter.$on("refresh",()=>{
                    pageNum = 1;
                    listData.splice(0,listData.length)
                    useGetArticleList();
                });
            });

            useGetArticleList();

            return {pageNum, listData, formateDate,useScroll,articleView,articeList,totalRows,goRouter};
        }
    })
</script>
<style lang="less" scoped>
    @import "../common/style/variable.less";

    #home {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        #search-wrapper {
            border-radius: @search-btn-border-radius;
            background: @module-bg-color;
            padding: @box-padding;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            #search-input-wrapper {
                flex: 1;
                display: flex;
                background: #efefef;
                border-radius: @search-btn-border-radius;
                padding: @btn-padding;
                margin-right: @btn-padding;

                #search-input {
                    flex: 1;
                    background: transparent;

                }
            }

            #icon-add {
                width: 25px;
                height: 25px;
            }
        }

        #article-view{
            flex: 1;
            overflow: auto;
            #artice-list{
                .article-wrapper {
                    margin-top: @box-padding;
                    border-radius: @box-border-radius;
                    background: @module-bg-color;
                    padding: @box-padding;
                    box-sizing: border-box;

                    .article-header {
                        display: flex;

                        .avater {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }

                        .username-wrapper {
                            padding-left: @small-margin;
                            justify-content: space-between;
                            display: flex;
                            flex-direction: column;

                            .username {
                                font-size: @main-fontsize;
                            }

                            .time {
                                color: @tip-color;
                            }
                        }
                    }

                    .content {
                        padding-top: @small-margin;
                        color: @main-color;
                    }
                    .imgs-wrapper{
                        display: flex;
                        flex-wrap: wrap;
                        .img-item{
                            margin-top: @small-margin;
                            margin-right: @small-margin;
                            width: calc((100% - @small-margin*2)/3);
                            height: auto;
                            &:nth-child(3n){
                                margin-right: 0;
                            }
                            img{
                                width: 100%;
                                height: auto;
                            }
                        }
                    }
                    .footer-wrapper {
                        display: flex;
                        padding-top: @small-margin;

                        .footer-item {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .iconfont {
                                font-size: @icon-fontsize;
                            }

                            .count {
                                font-size: @normal-fontsize;
                                padding-left: @small-margin;
                                color: @sub-color;
                            }
                        }
                    }
                }
            }
            #loading{
                color: #ddd;
                text-align: center;
                padding: 10px;
            }
        }


    }

</style>
