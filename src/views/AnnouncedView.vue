<template>
    <div class="announced">
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSubmit">
            <a-form-item label="公告内容" name="content" :rules="[{ required: true, message: '请输入公告内容!' }]">
                <a-input v-model:value="form.content" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" html-type="submit">添加</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { addAnnounce } from '../request/announce';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { message } from 'ant-design-vue';

const form = reactive({
    content: ""
});

const store = useStore();


const onSubmit = async () => {


    const result = await addAnnounce({
        content: form.content,
        opratorid: store.state.user.operatorid
    });
    if (result.success) {
        message.success('发布成功');
    } else {
        message.error('发布失败');
    }


}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 40px;

}
</style>
