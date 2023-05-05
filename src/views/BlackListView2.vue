<template>
    <div class="blacklist" v-if="!(user.isadmin === '1')">
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSubmit" @finishFailed="onFinishFailed">
            <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
                <a-input v-model:value="form.name" />
            </a-form-item>

            <a-form-item label="身份证号码" name="idcar" :rules="[{ required: true, message: '请输入身份证号码!' }]">
                <a-input v-model:value="form.idcar" />
            </a-form-item>

            <a-form-item label="原因" name="reason">
                <a-input v-model:value="form.reason" :rules="[{ required: true, message: '请输入原因' }]" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" html-type="submit">添加</a-button>
            </a-form-item>
        </a-form>
    </div>
    <div class="add" v-else>
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSubmit2" @finishFailed="onFinishFailed">
            <a-form-item label="昵称" name="name">
                <a-input v-model:value="form.name" />
            </a-form-item>

            <a-form-item label="身份证号码" name="idcar">
                <a-input v-model:value="form.idcar" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" html-type="submit">检索</a-button>
            </a-form-item>
        </a-form>
    </div>
    <div class="result" v-if="list.length !== 0" style="overflow: hidden">
        <a-table :columns="columns" :data-source="list" :pagination="{ pageSize: 10 }" :scroll="{ y: 340 }">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'name'">

                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <a-popconfirm v-if="list.length" title="Sure to delete?" @confirm="onDelete(record.idcar)">
                        <a>Delete</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
// import { NavBar, Divider, showConfirmDialog, CellGroup } from 'vant';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, computed, reactive } from 'vue';
import { message } from 'ant-design-vue'
import { getBlacklist, addBlacklist, deleteBlacklist } from '../request/blacklist';
import { useStore } from 'vuex';

const user = useStore().state.user;

const form = ref({
    name: '',
    reason: '',
    idcar: '',
})

const onSubmit2 = async () => {
    const result = await searchBlacklist(form.value);
    if (result.success) {
        message.success('检索成功');
        console.log(result.data);
        list.value = result.data;
    }
}

const columns = [

    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '身份证号',
        dataIndex: 'idcar',
        key: 'idcar',
    },
    {
        title: '原因',
        dataIndex: 'reason',
        key: 'reason',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
]

const list = ref([]);

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


onMounted(async () => {
    const result = await getBlacklist();
    list.value = result.data
});

const onSubmit = async () => {
    if (user.isadmin === "1") {
        message.error('您没有权限添加');
        return;
    }
    console.log(form.value);
    const result = await addBlacklist(form.value);
    list.value.push(form.value);
    console.log(result);
    if (result.success) {
        message.success('添加成功');
        form.value = {
            name: '',
            reason: '',
            idcar: '',
        }
    } else {
        message.error('添加失败');
    }
}


const onDelete = async key => {
    if (user.isadmin !== "1") {
        message.error('您没有权限删除');
        return;
    }
    console.log(key);
    const result = await deleteBlacklist(key);
    if (result.success) {
        message.success('删除成功');
        list.value = list.value.filter(item => item.idcar !== key);
    } else {
        message.error('删除失败');
    }
};

console.log(!user.isadmin === '1');
</script>

<style lang="scss" scoped>
.blacklist {
    .add-overlay {
        margin-top: 200px;
    }

    .list-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }

    .add-blacklist {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 7vh;

    }
}

.van-button {
    &.cancel-btn {
        margin-top: 10px;
    }
}

.van-form {
    margin-top: 200px;
}
</style>
