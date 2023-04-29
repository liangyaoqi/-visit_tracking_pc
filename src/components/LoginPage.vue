<template>
    <div class="login">
        <a-form :model="form" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            class="login-form" @finish="handleSubmit" @finishFailed="onFinishFailed">
            <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="form.username" />
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="form.password" />
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { message } from 'ant-design-vue';
import { login } from '../request/operator'

const form = reactive({
    username: "",
    password: "",
});

const router = useRouter();

const store = useStore();

const onFinishFailed = errorInfo => {
    message.error('登录失败:', errorInfo);
};

const handleSubmit = async () => {
    // 这里可以添加登录逻辑
    const result = await login(form)
    if (result) {
        store.commit('saveUser')
        if (result.code === 200) {
            message.success("登陆成功");
            // 将用户信息保存到vuex
            store.commit('saveUser')
            localStorage.setItem("token", result.data);
            // 登陆成功，跳转到首页
            router.push('/home')
        } else {
            message.error('登录失败:', result.message)
        }
    }
};
</script>

<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .login-form {

        width: 400px;
        margin: auto;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .login-title {
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
    }

    .login-btn {
        width: 100%;
        margin-top: 20px;
    }

    .login-footer {
        text-align: center;
        margin-top: 30px;
    }
}
</style>