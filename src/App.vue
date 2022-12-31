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
    import {useRoute,RouteLocationNormalizedLoaded} from "vue-router";
    import {useStore} from 'vuex'
    import {USER_DATA,TOKEN} from "@/store/mutation-types";
    export default defineComponent({
        setup: function () {
            const isLogin = ref<boolean>(false);
            const route: RouteLocationNormalizedLoaded = useRoute();
            const {token} = route.query;
            // @ts-ignore
            const userData = window.plug.getUserData();
            const store = useStore();
            store.dispatch(USER_DATA, JSON.parse(userData));
            store.dispatch(TOKEN,token);
            isLogin.value = true;
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
