<template>
    <ul class="home-ul">
        <li class="li-item" @click="to('/home/rigistered')">
            <user-outlined :style="{ fontSize: '100px' }" />
            <span class="nav-text">
                访客登记
            </span>
        </li>
        <li class="li-item" @click="to('/home/statistical')">
            <rise-outlined :style="{ fontSize: '100px' }" />
            <span class="nav-text">
                访客流量统计
            </span>
        </li>
        <li class="li-item" @click="to('/home/search')">
            <monitor-outlined :style="{ fontSize: '100px' }" />
            <span class="nav-text">
                来访检索
            </span>
        </li>
        <li class="li-item" @click="to('/home/blacklistCheck')">
            <warning-outlined :style="{ fontSize: '100px' }" />
            <span class="nav-text">
                黑名单
            </span>
        </li>
        <li class="li-item" @click="to('/home/personal')">
            <user-outlined :style="{ fontSize: '100px' }" />
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
        case '/home/blacklistCheck':
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
        /* 每行最多展示 4 个元素 */
        flex: 1 0 calc(45% - 10px);
        margin: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 150px;
        border: 1px solid #f4f4f4;
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;
        background-color: #f0f2f5;

        .nav-text {
            margin-top: 10px;
            font-size: large;
        }
    }
}
</style>
