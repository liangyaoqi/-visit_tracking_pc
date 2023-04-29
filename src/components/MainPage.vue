<template>
    <ul class="home-ul">
        <li class="li-item">
            <user-outlined />
            <span class="nav-text">
                访客登记
            </span>
        </li>
        <li class="li-item">
            <rise-outlined />
            <span class="nav-text">
                访客流量统计
            </span>
        </li>
        <li class="li-item">
            <monitor-outlined />
            <span class="nav-text">
                来访检索
            </span>
        </li>
        <li class="li-item">
            <warning-outlined />
            <span class="nav-text">
                黑名单
            </span>
        </li>
        <li class="li-item">
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



const count = ref(0)
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
        width: 300px;
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
