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
            <div id="swipper-wrapper">
                <ul id="swipper-list">
                    <li class="swipper-items">
                        <div class="swipper-item">独行月球</div>
                        <div class="swipper-item">明日战记</div>
                        <div class="swipper-item">扫黑行动</div>
                        <div class="swipper-item">流浪地球2</div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="say-section">
            <div class="say-title">
                <span class="line"></span>
                <span>热门榜单</span>
            </div>
            <ul id="hot-wrapper">
                <li class="hot-item">
                    <span class="hot-main-title">1.世间有她</span>
                    <span class="hot-sub-title">——周迅许娣婆媳互斗</span>
                </li>
                <li class="hot-item">
                    <span class="hot-main-title">2.独行月球</span>
                    <span class="hot-sub-title">——沈腾马丽爆笑出击</span>
                </li>
                <li class="hot-item">
                    <span class="hot-main-title">3.长津湖之水门桥</span>
                    <span class="hot-sub-title">——吴京千玺热血开战</span>
                </li>
                <li class="hot-item">
                    <span class="hot-main-title">4.新蝙蝠侠</span>
                    <span class="hot-sub-title">——黑暗骑士重磅回归</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,onMounted,ref,Ref} from 'vue';
    export default defineComponent({
        name: 'SayPage',
        setup(){
            const imageWidth = ref<number>(0);
            const addImgBtn:Ref<HTMLElement | null> = ref(null);

            onMounted(()=>{
                const addImgBtnEle = addImgBtn.value as HTMLElement;
                imageWidth.value = addImgBtnEle.offsetWidth;
            });

            return {addImgBtn,imageWidth}
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
            #swipper-wrapper{
                #swipper-list{
                    display: flex;
                    flex-wrap: nowrap;
                    .swipper-items{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        .swipper-item{
                            width: calc((100% - @box-padding)/2);
                            padding: @box-padding;
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
            #hot-wrapper{
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
</style>
