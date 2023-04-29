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
                        <rise-outlined />
                        <span class="nav-text">
                            访客登记
                        </span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="to('/home/statistical')">
                        <user-outlined />
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
                    <a-menu-item key="4" @click="to('/home/blacklist')">
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
                <a-layout-header class="header" :style="{ background: '#fff', padding: 0 }"></a-layout-header>
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
import { onMounted, ref, } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();

const store = useStore();

const user = ref(store.state.user);

const to = (path) => {
    router.push(path);
}

onMounted(() => {
    console.log(user.value);

})




const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
};
const onBreakpoint = broken => {
    // console.log(broken);
};
const selectedKeys = ref(['0']);

const logout = () => {
    localStorage.removeItem('token')
    store.commit('clearUser')
    router.push('/login')
}
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