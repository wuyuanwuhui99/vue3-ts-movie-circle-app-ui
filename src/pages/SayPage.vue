<template>
    <div id="say-wrapper">
        <div class="say-section">
            <div id="say-header">
                <div id="cancle">取消</div>
                <div id="send" class="disabled-send">发布</div>
            </div>
            <textarea placeholder="这一刻的想法..." id="say-textarea"></textarea>
            <ul id="say-img-wrapper">
               <li :style="{height:imageWidth+'px'}" class="img-item" ref="addImgBtn" id="add-img-btn">+</li>
            </ul>
        </div>

        <ul class="say-section type-section">
            <li class="type-icon-item">
                <img src="../assets/icon-preview.png" class="type-icon"/>
                <span>预告</span>
            </li>
            <li class="type-icon-item">
                <img src="../assets/icon-article.png" class="type-icon">
                <span>文章</span>
            </li>
            <li class="type-icon-item">
                <img src="../assets/icon-answer.png" class="type-icon">
                <span>问答</span>
            </li>
            <li class="type-icon-item">
                <img src="../assets/icon-video.png" class="type-icon">
                <span>视频</span>
            </li>
        </ul>

        <div class="say-section">
            <div class="say-title">
                <span class="line"></span>
                <span>热门影评</span>
            </div>
            <div class="scroll-wrapper">
                <div id="swipper-wrapper" ref="swipperWrapper">
                    <ul id="swipper-list" :style="{width:100 * (hotCommentMovie.length+2) + '%'}">
                        <li class="swipper-items" :key="'swipper-items'+index" v-for="items,index in hotCommentMovie" :style="{width:100/(hotCommentMovie.length+2)+'%'}">
                            <div class="swipper-item" :key="'swipper-item'+index+idx" v-for="item,idx in items">{{item.movieName}}</div>
                        </li>
                    </ul>
                </div>
                <ul class="dots">
                    <li :key="'dot'+index" :class="{active:index === activeHotIndex}" v-for="item,index in hotCommentMovie" class="dot"></li>
                </ul>
            </div>
        </div>

        <div class="say-section">
            <div class="say-title">
                <span class="line"></span>
                <span>最近更新</span>
            </div>
            <div class="scroll-wrapper">
                <div id="last-modify-wrapper" ref="lastModifyWrapper">
                    <div id="last-modify-list" :style="{width:100*(lastModifyMovie.length + 2) + '%'}">
                        <ul v-for="items,index in lastModifyMovie" :key="'hot-wrapper'+index" :style="{width:100/(lastModifyMovie.length+2) + '%'}" class="hot-wrapper">
                            <li class="hot-item" v-for="item,idx in items" :key="'hot-item'+index+idx">
                                <span class="hot-main-title">{{item.rank}}.{{item.movieName}}</span>
                                <span class="hot-sub-title">{{item.label}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="dots">
                    <li :key="'dot'+index" :class="{active:index === activeLastModifyIndex}" v-for="item,index in lastModifyMovie" class="dot"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,onMounted,ref,Ref,onUnmounted} from 'vue';
    import {getHotCommentMovieService,getLastModifyMovieService} from '@/service/sayService';
    import {HotCommentMovieInterface} from '@/types';
    import BScroll from 'better-scroll';
    export default defineComponent({
        name: 'SayPage',
        setup(){
            const imageWidth:Ref<number> = ref<number>(0);
            const activeHotIndex:Ref<number> = ref<number>(0);
            const activeLastModifyIndex:Ref<number> = ref<number>(0);
            const addImgBtn:Ref<HTMLElement | null> = ref(null);
            const swipperWrapper:Ref<HTMLElement|null> = ref(null);
            const lastModifyWrapper:Ref<HTMLElement|null> = ref(null);
            const hotCommentMovie:Ref<Array<Array<HotCommentMovieInterface>>> = ref([]);// 二维数组
            const lastModifyMovie:Ref<Array<Array<HotCommentMovieInterface>>> = ref([]);// 二维数组
            let hotBs:BScroll,lastModifyBs:BScroll;

            onMounted(()=>{
                const addImgBtnEle = addImgBtn.value as HTMLElement;
                imageWidth.value = addImgBtnEle.offsetWidth;
            });

            onUnmounted(()=>{
                hotBs.destroy();
                lastModifyBs.destroy();
            });

            let items:Array<HotCommentMovieInterface> = [];

            /**
             * @author: wuwenqiang
             * @description: 获取热门影评
             * @date: 2022-12-03 16:51
             */
            getHotCommentMovieService().then((res:any)=>{
                res.forEach((item:any)=>{
                    if(items.length < 4){
                        items.push(item);
                        if(items.length === 4){
                            hotCommentMovie.value.push(items);
                        }
                    }else{
                        items = [];
                        items.push(item);
                    }
                });

                setTimeout(()=>{
                    hotBs = new BScroll(swipperWrapper.value as HTMLElement,{
                        scrollX:true,
                        scrollY:false,
                        click:true,
                        probeType:3,
                        slide: {
                            loop:true,
                        }
                    });
                    hotBs.on("scrollEnd",()=>{
                        activeHotIndex.value = hotBs.getCurrentPage().pageX;
                    });
                },1000)
            });

            /**
             * @author: wuwenqiang
             * @description: 获取最近更新的电影
             * @date: 2022-12-03 16:51
             */
            getLastModifyMovieService().then((res:any)=>{
                res.forEach((rItem:any)=>{
                    let items:Array<HotCommentMovieInterface> = lastModifyMovie.value.find((cItem)=>{
                        cItem  = cItem as Array<HotCommentMovieInterface>;
                       return cItem[0].classify === rItem.classify;
                    });
                    if(!items){
                        items = [];
                        lastModifyMovie.value.push(items)
                    }
                    items.push(rItem);
                });
                setTimeout(()=>{
                    lastModifyBs = new BScroll(lastModifyWrapper.value as HTMLElement,{
                        scrollX:true,
                        scrollY:false,
                        click:true,
                        probeType:3,
                        slide: {
                            loop:true,
                        }
                    });
                    lastModifyBs.on("scrollEnd",()=>{
                        activeLastModifyIndex.value = hotBs.getCurrentPage().pageX;
                    });
                },1000)
            });
            return {
                addImgBtn,
                imageWidth,
                hotCommentMovie,
                lastModifyMovie,
                swipperWrapper,
                lastModifyWrapper,
                activeHotIndex,
                activeLastModifyIndex
            }
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    #say-wrapper{
        font-size: @normal-fontsize;
        .say-section{
            background: #fff;
            border-radius: @box-border-radius;
            background: @module-bg-color;
            padding: @box-padding;
            margin-bottom: @box-padding;
            #say-header{
                display: flex;
                justify-content: space-between;
                #cancle{
                    color: @disabled-color;
                    border: 1px solid @disabled-color;
                    width: @btn-width;
                    height: @btn-height;
                    border-radius: @normal-btn-border-radius;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #send{
                    color: #fff;
                    background: @active-color;
                    width: @btn-width;
                    height: @btn-height;
                    border-radius: @normal-btn-border-radius;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &.disabled-send{
                        background: @disabled-active-color;
                    }
                }
            }
            #say-textarea{
                border-radius: @big-border-radius;
                background: @page-bg-color;
                border: none;
                margin-top: @box-padding;
                width: 100%;
                height: 120px;
                padding: @box-padding;
                box-sizing: border-box;
                overflow: auto;
            }
            #say-img-wrapper{
                display: flex;
                flex-wrap: wrap;
                margin-top: @box-padding;
                .img-item{
                    width: calc((100% - @small-margin*2)/3);
                    &#add-img-btn{
                        background: @page-bg-color;
                        height: 100px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: @big-border-radius;
                        font-size: 50px;
                        color: @disabled-color;
                    }
                }
            }
            &.type-section{
                display: flex;
                .type-icon-item{
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .type-icon{
                        margin-right: @small-margin;
                        width: 25px;
                        height: 25px;
                    }
                }
            }
            .say-title{
                display: flex;
                align-items: center;
                .line{
                    width: 4px;
                    height: 15px;
                    background: @active-color;
                    margin-right:@min-margin;
                }
            }
            .scroll-wrapper{
                position: relative;
                #swipper-wrapper{
                    overflow: hidden;
                    position: relative;
                    #swipper-list{
                        display: flex;
                        flex-wrap: nowrap;
                        .swipper-items{
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            .swipper-item{
                                width: calc((100% - @box-padding)/2);
                                padding-left: @box-padding;
                                height: 50px;
                                display: flex;
                                align-items: center;
                                box-sizing: border-box;
                                background: @page-bg-color;
                                margin-top: @box-padding;
                                border-radius: @normal-btn-border-radius;
                                &:nth-child(2n){
                                    margin-left: @box-padding;
                                }
                            }
                        }
                    }
                }
                #last-modify-wrapper{
                    overflow: hidden;
                    #last-modify-list{
                        display: flex;
                        flex-wrap: nowrap;
                        .hot-wrapper{
                            .hot-item{
                                padding-top: @box-padding;
                                .hot-sub-title{
                                    padding-left: @min-margin;
                                    color:@sub-color
                                }
                            }
                        }
                    }

                }
                .dots{
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    bottom: -@small-margin;
                    .dot{
                        border-radius: 3px;
                        width: 12px;
                        height: 4px;
                        background: @page-bg-color;
                        margin-left: 3px;
                        &:first-child{
                            margin-left: 0;
                        }
                        &.active{
                            background: @active-color;
                        }
                    }
                }
            }
        }
    }
</style>
