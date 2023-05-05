<template>
    <div class="search">
        <a-form :model="state" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSearch" @finishFailed="onFinishFailed">
            <a-form-item label="名称" name="name">
                <a-input-search v-model:value="state.name" :loading="state.loading" enter-button />
            </a-form-item>

            <a-form-item name="area" label="入口">
                <a-select v-model:value="state.enter" :options="enters" />
            </a-form-item>

            <a-form-item name="date-picker" label="来访问日期">
                <a-date-picker v-model:value="state.visittime" value-format="YYYY-MM-DD" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
        </a-form>
    </div>
    <div class="result" v-if="list.length !== 0" style="overflow: hidden">
        <a-table :columns="columns" :data-source="list" :pagination="{ pageSize: 5 }" :scroll="{ y: 340 }" />
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import { getVisitorByName } from '../request/visitor'

const columns = [

    {
        title: '身份证号',
        dataIndex: 'idcard',
        key: 'idcard',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '车牌号',
        dataIndex: 'vehicleid',
        key: 'vehicleid',
    },
    {
        title: '来访时间',
        dataIndex: 'visittime',
        key: 'visittime',
    },
    {
        title: '访问单位',
        dataIndex: 'companyname',
        key: 'companyname',
    },
    {
        title: '入口',
        dataIndex: 'enter',
        key: 'enter',
    },
    {
        title: '是否来自疫区',
        key: 'isepidemicarea',
        dataIndex: 'isepidemicarea',
    },
    {
        title: '来访原因',
        key: 'reason',
        dataIndex: 'reason',
    },
    {
        title: '体温',
        key: 'temperature',
        dataIndex: 'temperature',
    },
];

const state = reactive({
    loading: false,
    name: '',
    enter: '',
    showPicker: false,
    visittime: ''
})

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const list = ref([])

const enters = ref([{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }, { label: '', value: null }])
const onSearch = async () => {
    console.log(state.input)
    state.loading = true
    const result = await getVisitorByName(state)
    console.log(result);
    if (result.success) {
        list.value = result.data
        console.log(list.value);
        message.success(result.message)
        state.loading = false
    } else {
        message.error(result.message)
        state.loading = false
    }
}



</script>

<style lang="scss" scoped>
.search {
    .result {
        overflow: hidden;
    }
}

.search-list {
    font-size: 14px;
    color: #908c8c;

    .more {
        background-color: #a6a1a1;
    }

    .list-content {
        // .line-one {}

        .line-two {
            display: flex;
            justify-content: end;


        }
    }

    .list-divider {
        margin: 0;
        padding: 0;
    }

    .warning {
        background-color: rgb(219, 85, 85);
    }
}
</style>
