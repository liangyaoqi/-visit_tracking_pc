<template>
    <div class="home">
        <a-layout style="height: 100%;">
            <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
                <div class="logo">
                    <span class="name">{{ user.name }}</span>
                    <a-button v-if="!user.operatorid" @click="to('/login')">
                        <template #icon>
                            <login-outlined style="font-size: large;" />
                        </template>
                        登陆
                    </a-button>
                    <a-button v-else @click="logout">
                        <template #icon>
                            <logout-outlined style="font-size: large;" />
                        </template>
                        注销
                    </a-button>
                </div>
                <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                    <a-menu-item key="0" @click="to('/home/main')">
                        <home-outlined />
                        <span class="nav-text">
                            首页
                        </span>
                    </a-menu-item>
                    <a-menu-item key="1" @click="to('/home/rigistered')">
                        <user-outlined />
                        <span class="nav-text">
                            访客登记
                        </span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="to('/home/statistical')">
                        <rise-outlined />
                        <span class="nav-text">
                            访客流量统计
                        </span>
                    </a-menu-item>
                    <a-menu-item key="3" @click="to('/home/search')">
                        <monitor-outlined />
                        <span class="nav-text">
                            来访检索
                        </span>
                    </a-menu-item>
                    <a-menu-item key="4" @click="to('/home/blacklistCheck')">
                        <warning-outlined />
                        <span class="nav-text">
                            黑名单
                        </span>
                    </a-menu-item>
                    <a-menu-item key="5" @click="to('/home/personal')">
                        <user-outlined />
                        <span class="nav-text">
                            我的信息
                        </span>
                    </a-menu-item>
                    <a-sub-menu key="6" :disabled="!(user.isadmin === '1')">
                        <template #title>
                            <span>
                                <team-outlined />
                                <span>管理员</span>
                            </span>
                        </template>
                        <a-menu-item key="7" @click="to('/home/manage')">
                            管理操作员
                        </a-menu-item>
                        <a-menu-item key="8" @click="to('/home/announced')">
                            发布公告
                        </a-menu-item>
                        <a-menu-item key="9" @click="to('/home/blacklist')">
                            查看黑名单
                        </a-menu-item>
                        <a-menu-item key="10" @click="to('/home/dept')">
                            单位管理
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header class="header" :style="{ background: '#fff', padding: 0 }">来访人员登记追溯系统</a-layout-header>
                <a-layout-content :style="{ margin: '24px 16px 0' }">
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                        <RouterView />
                    </div>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    Visit Tracking ©2023 Created by ZKT
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script setup>
import { UserOutlined, MonitorOutlined, RiseOutlined, WarningOutlined, TeamOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, ref, } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();

const store = useStore();

const user = ref(store.state.user);

// const selectedKeys = ref(['0']);

const to = (path) => {
    switch (path) {
        case '/home/main':
            store.commit('setSelectKey', ['0'])
            break;
        case '/home/rigistered':
            store.commit('setSelectKey', ['1'])
            break;
        case '/home/statistical':
            store.commit('setSelectKey', ['2'])
            break;
        case '/home/search':
            store.commit('setSelectKey', ['3'])
            break;
        case '/home/blacklist':
            store.commit('setSelectKey', ['9'])
            break;
        case '/home/personal':
            store.commit('setSelectKey', ['5'])
            break;
        case '/home/manage':
            store.commit('setSelectKey', ['7'])
            break;
        case '/home/announced':
            store.commit('setSelectKey', ['8'])
            break;
        case '/home/blacklistCheck':
            store.commit('setSelectKey', ['4'])
            break;
        case '/home/dept':
            store.commit('setSelectKey', ['10'])
            break;

        default:
            break;
    }
    router.push(path);

}

const selectedKeys = computed(() => store.state.selectKey)


const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
};
const onBreakpoint = broken => {
    // console.log(broken);
};

const logout = () => {
    localStorage.removeItem('token')
    store.commit('clearUser')
    router.push('/login')
}

console.log(selectedKeys.value);
</script>
<style scoped lang="scss">
.home {
    height: 100vh;



    .header {
        text-align: center;
        font-size: large;
        font-weight: 600;
    }

    .logo {
        display: flex;
        justify-content: space-between;
        height: 32px;
        background: white;
        margin: 16px;
        text-align: center;
        color: black;

        .name {
            padding-top: 5px;
        }
    }
}
</style>