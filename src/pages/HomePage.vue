<template>
    <div id="home">
        <div id="search-wrapper">
            <div id="search-input-wrapper">
                <span class="iconfont icon-search"></span>
                <input id="search-input"/>
            </div>
            <span class="iconfont icon-add"></span>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref,reactive} from 'vue';
    export default defineComponent({
        name: 'Home',
        components:{},
        async setup() {
            return {}
        }
    })
</script>
<style lang="less" scoped>
    @import "../common/style/variable.less";
    #home{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        #search-wrapper{
            border-radius: @box-border-radius;
            background: @module-bg-color;
            padding: @box-padding;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            #search-input-wrapper{
                flex: 1;
                display: flex;
                background: #efefef;
                border-radius: @btn-border-radius;
                padding: @btn-padding;
                margin-right: @btn-padding;
                #search-input{
                    flex: 1;
                    background: transparent;

                }
            }
            #icon-add{
                width: 25px;
                height: 25px;
            }
        }
    }

</style>
