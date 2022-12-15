<template>
    <Suspense>
        <router-view #default="{Component}" v-if="isLogin">
            <keep-alive>
                <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
        </router-view>
    </Suspense>
</template>

<script lang="ts">
    import {defineComponent,ref} from 'vue';
    import {getUserDataService} from "./service/appService";
    import {useRoute,RouteLocationNormalizedLoaded} from "vue-router";
    export default defineComponent({
        setup () {
            const isLogin = ref<boolean>(false);
            const route:RouteLocationNormalizedLoaded = useRoute();
            const {token=""} = route.query;
            getUserDataService(token).then(() => {
                isLogin.value = true;
            });

            return {
                isLogin
            }
        }
    })
</script>

<style lang="less">
    @import "common/style/variable.less";
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: @page-bg-color;
        padding: @box-padding;
        box-sizing: border-box;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
