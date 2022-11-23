<template>
    <div id="home">
        <div id="search-wrapper">
            <div id="search-input-wrapper">
                <span class="iconfont icon-search"></span>
                <input id="search-input"/>
            </div>
            <span class="iconfont icon-add"></span>
        </div>
        <div class="article-wrapper" :key="'article-wrapper'+index" v-for="item,index in listData">
            <div class="article-header">
                <img class="avater" :src="`/static/user/avater/${item.userId}.jpg`">
                <div class="username-wrapper">
                    <span class="username">{{item.username}}</span>
                    <span class="time">{{formateDate(item.createTime)}}</span>
                </div>
            </div>
            <div class="content">{{item.content}}</div>
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
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive} from 'vue';
    import {getArticleService, getCircleArticleCountService} from '@/service/homeService';
    import {formateDate} from "@/utils"
    import {ArticleInterface} from '@/types'

    export default defineComponent({
        name: 'Home',
        components: {},
        async setup() {
            const pageNum = ref<number>(1);
            const listData = reactive<Array<ArticleInterface>>([]);
            const list: any = await getArticleService(pageNum.value);
            // listData.push(...res);
            const queue = list.map((item: any) => {
                return getCircleArticleCountService(item.id)
            });
            Promise.all(queue).then((res: any) => {
                const result = list.map((item: any, index: number) => {
                    item.commentCount = res[index].commentCount;
                    item.favoriteCount = res[index].favoriteCount;
                    item.viewCount = res[index].viewCount;
                    return item;
                });
                listData.push(...result);
            });
            return {pageNum, listData, formateDate};
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
            border-radius: @box-border-radius;
            background: @module-bg-color;
            padding: @box-padding;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            #search-input-wrapper {
                flex: 1;
                display: flex;
                background: #efefef;
                border-radius: @btn-border-radius;
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

</style>
