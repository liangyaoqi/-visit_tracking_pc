<template>
    <div class="blacklist">
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSubmit" @finishFailed="onFinishFailed">
            <a-form-item label="姓名" name="name">
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
        <a-table :columns="columns" :data-source="list" :pagination="{ pageSize: 5 }" :scroll="{ y: 340 }">
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
import { getBlacklist, addBlacklist, deleteBlacklist, searchBlacklist } from '../request/blacklist';
import { useStore } from 'vuex';

const user = useStore().state.user;

const form = ref({
    name: '',
    reason: '',
    idcar: '',
})

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
    const result = await searchBlacklist(form.value);
    if (result.success) {
        console.log(result.data);
        list.value = result.data;
        if (list.value.length === 0) {
            message.error('未检索到该用户');
        } else {
            message.success('检索成功');
        }
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
