<template>
    <div id="say-wrapper">
        <div class="say-section">
            <div id="say-header">
                <div id="cancle">取消</div>
                <div id="send" class="disabled-send">发布</div>
            </div>
            <textarea placeholder="这一刻的想法..." id="say-textarea"></textarea>
            <ul id="say-img-wrapper">
               <li class="img-item" id="add-img-btn">+</li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'SayPage'
    }
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
        }

    }
</style>
