<template>
    <ul class="home-ul">
        <li class="li-item" @click="to('/home/rigistered')">
            <user-outlined />
            <span class="nav-text">
                访客登记
            </span>
        </li>
        <li class="li-item" @click="to('/home/statistical')">
            <rise-outlined />
            <span class="nav-text">
                访客流量统计
            </span>
        </li>
        <li class="li-item" @click="to('/home/search')">
            <monitor-outlined />
            <span class="nav-text">
                来访检索
            </span>
        </li>
        <li class="li-item" @click="to('/home/blacklist')">
            <warning-outlined />
            <span class="nav-text">
                黑名单
            </span>
        </li>
        <li class="li-item" @click="to('/home/personal')">
            <user-outlined />
            <span class="nav-text">
                我的信息
            </span>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'
import { UserOutlined, RiseOutlined, WarningOutlined, MonitorOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import store from '../vuex';

const router = useRouter();
const to = (path) => {
    switch (path) {
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
            store.commit('setSelectKey', ['4'])
            break;
        case '/home/personal':
            store.commit('setSelectKey', ['5'])
            break;
        default:
            break;
    }
    router.push(path);
}

</script>


<style scoped lang="scss">
.read-the-docs {
    color: #888;
}

.home-ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .li-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;

        .nav-text {
            margin-top: 10px;
        }
    }
}
</style>
