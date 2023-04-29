<template>
    <div class="add-btn">
        <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
            <a-button type="primary" @click="showAdd">{{ add ? '取消' : '添加操作员' }}</a-button>
        </a-form-item>
    </div>
    <div class="blacklist" v-if="add">
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onAdd">
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入单位名称!' }]">
                <a-input v-model:value="form.username" />
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入单位名称!' }]">
                <a-input v-model:value="form.password" />
            </a-form-item>

            <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
                <a-input v-model:value="form.name" />
            </a-form-item>

            <a-form-item label="手机" name="phonenumber">
                <a-input v-model:value="form.phonenumber" />
            </a-form-item>

            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="form.email" />
            </a-form-item>

            <a-form-item label="地区" name="position">
                <a-input v-model:value="form.position" />
            </a-form-item>

            <a-form-item label="部门" name="phonenumber">
                <a-input v-model:value="form.deptid" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" html-type="submit">添加</a-button>
            </a-form-item>
        </a-form>
    </div>
    <div class="manage-operator" v-else="add">
        <div class="operator-list" v-if="list.length !== 0" style="overflow: hidden">
            <a-table :columns="columns" :data-source="list" :pagination="{ pageSize: 10 }" :scroll="{ y: 340 }">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'operation'">
                        <a-popconfirm v-if="list.length" title="Sure to delete?" @confirm="onDelete(record.operatorid)">
                            <a>Delete</a>
                        </a-popconfirm>
                    </template>
                    <template v-if="column.dataIndex === 'edit'">
                        <!-- <a-popconfirm v-if="list.length" title="Sure to Edit?" @confirm="onEdit(record)">
                            <a>Edit</a>
                        </a-popconfirm> -->
                        <a @click="onEdit(record)">Edit</a>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
    <div class="edit">
        <a-drawer title="编辑操作员" :placement="placement" :closable="false" :visible="visible" @close="onClose">
            <a-form :model="popItem" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入单位名称!' }]">
                    <a-input v-model:value="popItem.username" />
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入单位名称!' }]">
                    <a-input v-model:value="popItem.password" />
                </a-form-item>

                <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
                    <a-input v-model:value="popItem.name" />
                </a-form-item>

                <a-form-item label="手机" name="phonenumber">
                    <a-input v-model:value="popItem.phonenumber" />
                </a-form-item>

                <a-form-item label="邮箱" name="email">
                    <a-input v-model:value="popItem.email" />
                </a-form-item>

                <a-form-item label="地区" name="position">
                    <a-input v-model:value="popItem.position" />
                </a-form-item>

                <a-form-item label="部门" name="phonenumber">
                    <a-input v-model:value="popItem.deptid" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                    <a-button type="primary" html-type="submit" @click="onEditSubmit">提交</a-button>
                </a-form-item>
            </a-form>
        </a-drawer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
// import { NavBar, Divider, CellGroup, showConfirmDialog, Overlay } from 'vant';
import { listOprator, deleteOperator, updateOperator, registry } from '../request/operator';

//抽屉方向
const placement = ref('right');
const visible = ref(false);
const showDrawer = () => {
    visible.value = true;
};
const onClose = () => {
    visible.value = false;
};

const onEditSubmit = async () => {
    console.log(popItem.value);
    const result = await updateOperator(popItem.value)
    if (result.success) {
        list.value = list.value.map(item => {
            if (item.operatorid === popItem.value.operatorid) {
                return popItem.value;
            }
            return item;
        })
        message.success('修改成功')
        onClose();
    } else {
        message.error('修改失败')
    }
    onClose();
}

const popItem = ref({});

const onEdit = (operator) => {
    console.log(operator);
    popItem.value = operator;
    showDrawer();
}

const add = ref(false);
const showAdd = () => {
    add.value = !add.value;
};

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '手机号',
        dataIndex: 'phonenumber',
        key: 'phonenumber',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '地区',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
    {
        title: '操作',
        dataIndex: 'edit',
    }
]

const list = ref([]);


onMounted(async () => {
    const result = await listOprator();
    if (result.success) {
        list.value = result.data;
    }
})

const show = ref(false);
const showPopup = () => {
    show.value = true;
};

const onAdd = async () => {
    const result = await registry(form.value);
    if (result.success) {
        message.success('添加成功');
        list.value.push(result.data);
    } else {
        message.error('添加失败');
    }
}

const onSubmit = async (values) => {
    console.log(values);
    await updateOperator(popItem.value);
    list.value = list.value.map((x) => {
        if (x.operatorid == popItem.value.operatorid) {
            return popItem.value;
        }
        return x;
    });
    // }

    show.value = false;
}

const onDelete = async (operatorid) => {

    const result = await deleteOperator(operatorid);
    if (result.success) {
        message.success('删除成功');
        list.value = list.value.filter((x) => x.operatorid != operatorid);
    } else {
        message.error('删除失败');
    }

}

const form = ref({
    deptid: "",
    email: "",
    name: "",
    password: "",
    phonenumber: "",
    position: "",
    username: "",
})
</script>

<style lang="scss" scoped>
.operator-list {
    margin-top: 0px;

    .pop-form {
        margin-top: 20px;
    }

    .list {


        .list-content {
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            align-items: center;

            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .van-button {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
