<template>
    <div class="">
        <div class="blacklist">
            <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
                @finish="onSubmit">
                <a-form-item label="单位名称" name="deptName" :rules="[{ required: true, message: '请输入单位名称!' }]">
                    <a-input v-model:value="form.deptName" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                    <a-button type="primary" html-type="submit">添加</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="result" v-if="list.length !== 0" style="overflow: hidden">
            <a-table :columns="columns" :data-source="list" :pagination="{ pageSize: 10 }" :scroll="{ y: 340 }">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'name'">

                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <a-popconfirm v-if="list.length" title="Sure to delete?" @confirm="onDelete(record.deptId)">
                            <a>Delete</a>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { message } from 'ant-design-vue'
import { getDept, addDept, deleteDept } from "../request/dept";

const form = ref({
    deptName: '',
    deptId: '',
})

const columns = [

    {
        title: '单位名称',
        dataIndex: 'deptName',
        key: 'deptId',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
]

const list = ref([]);

onMounted(async () => {
    const res = await getDept();
    list.value = res.data;
})

const onDelete = async (deptId) => {

    const result = await deleteDept(deptId);
    list.value = list.value.filter((x) => x.deptId !== deptId);
    if (result.success) {
        message.success('删除成功')
    } else {
        message.error('删除失败')
    }

};

const onSubmit = async () => {
    const result = await addDept(form.value);
    if (result.success) {
        message.success('添加成功');
        list.value.push({ deptName: form.value.deptName });
        form.value.deptName = '';
    } else {
        message.error('添加失败');
    }
}
</script>

<style lang="scss" scoped></style>