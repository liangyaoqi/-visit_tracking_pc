<template>
    <div class="personal">
        <div v-if="!edit">

            <div class="avatar">
                <a-avatar :size="120">
                    <template #icon>
                        <UserOutlined />
                    </template>
                </a-avatar>
            </div>
            <div class="user-info">
                <a-descriptions title="User Info" bordered>
                    <a-descriptions-item label="姓名">{{ user.name }}</a-descriptions-item>
                    <a-descriptions-item label="邮箱">{{ user.email }}</a-descriptions-item>
                    <a-descriptions-item label="部门">{{ user.deptid }}</a-descriptions-item>
                    <a-descriptions-item label="手机">{{ user.phonenumber }}</a-descriptions-item>
                </a-descriptions>
            </div>
        </div>
        <a-form-item :wrapper-col="{ offset: 11, span: 16 }" style="margin-top: 20px;">
            <a-button type="primary" @click="onEdit">修改个人信息</a-button>
        </a-form-item>
        <div class="edit" v-if="edit">
            <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
                @finish="onSubmit">
                <a-form-item label="昵称" name="name">
                    <a-input v-model:value="form.name" />
                </a-form-item>

                <a-form-item label="手机" name="phonenumber">
                    <a-input v-model:value="form.phonenumber" />
                </a-form-item>

                <a-form-item label="邮箱" name="email">
                    <a-input v-model:value="form.email" />
                </a-form-item>

                <a-form-item label="部门" name="deptid">
                    <a-input v-model:value="form.deptid" />
                </a-form-item>

                <a-form-item label="地区" name="position">
                    <a-input v-model:value="form.position" />
                </a-form-item>

                <a-form-item label="密码" name="password">
                    <a-input v-model:value="form.password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from "vue"
import { updateOperator } from "../request/operator";
import { useStore } from "vuex";
import { Detection } from '@icon-park/vue-next';

const form = ref({
    deptid: '',
    email: '',
    name: "",
    password: "",
    phonenumber: '',
    position: '',
});

const edit = ref(false)


const store = useStore();

const user = store.state.user;

const onEdit = () => {
    console.log("edit");
    edit.value = !edit.value;
    console.log(user);
    form.value = user;
}
const onSubmit = async () => {
    const result = await updateOperator(form.value);
    if (result.success) {
        message.success('修改成功')
        console.log(user.operatorid);
        store.commit('updateUser', user.operatorid)
        setTimeout(() => {
            user.value = store.state.user;
        }, 500)
        edit.value = false;
        console.log(store.state.user)
    } else {
        message.error('修改失败')
    }
}
</script>

<style lang="scss" scoped>
.personal {
    .avatar {
        margin-top: 3vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .user-info {
        margin-top: 30px;
    }

    .edit {
        margin-top: 30px;
    }

    .operator-msg {
        margin-top: 20px;
    }
}
</style>