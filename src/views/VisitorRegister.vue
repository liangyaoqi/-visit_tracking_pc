<template>
    <div class="register">
        <a-form :model="form" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onSubmit">
            <a-form-item label="姓名" name="name" :rules="[{ required: true, message: '请输入姓名!' }]">
                <a-input v-model:value="form.name" placeholder="请输入姓名" />
            </a-form-item>

            <a-form-item label="身份证号码" name="idcard" :rules="[{ required: true, message: '请输入身份证号码!' }]">
                <a-input v-model:value="form.idcard" placeholder="请输入身份证号码" />
            </a-form-item>

            <a-form-item label="体温" name="temperature" :rules="[{ required: true, message: '请输入体温!' }]">
                <a-input v-model:value="form.temperature" placeholder="请输入体温" />
            </a-form-item>

            <a-form-item label="车牌号" name="vehicleid">
                <a-input v-model:value="form.vehicleid" placeholder="请输入车牌号" />
            </a-form-item>

            <a-form-item label="访客单位" name="companyname" :rules="[{ required: true, message: '请选择访客单位!' }]">
                <a-select v-model:value="form.companyname" :options="depts" />
            </a-form-item>

            <a-form-item label="来访事由" name="reason">
                <a-input v-model:value="form.reason" placeholder="请输入来访事由" />
            </a-form-item>

            <a-form-item label="是否来自疫区" name="isepidemicarea">
                <a-radio-group v-model:value="form.isepidemicarea" :rules="[{ required: true, message: '请选择信息!' }]">
                    <a-radio :value="true">是</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item name="enter" label="入口" :rules="[{ required: true, message: '请输入入口!' }]">
                <a-select v-model:value="form.enter" :options="enters" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 10, span: 16 }" class="btn-group">
                <a-button type="primary" html-type="submit">登记</a-button>
                <a-button @click="onAutoInput" class="btn-right">自动录入</a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup>
import { addVisitor, todayVisitor, getEcharsData } from '../request/visitor';
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue'
import { getDept } from '../request/dept';
import { getBlacklist } from '../request/blacklist';


// 初始化获取数据
onMounted(async () => {
    // 获取部门数据
    const dept = await getDept();
    dept.data.forEach(item => {
        depts.value.push({ label: item.deptName, value: item.deptName })
    })
})

const depts = ref([])

let form = reactive({
    name: "",
    idcard: "",
    temperature: "",
    vehicleid: "",
    companyname: "",
    reason: "",
    isepidemicarea: false,
    enter: "A"
});

const enters = ref([{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }])

const onSubmit = async () => {
    if (form.name == "" || form.idcard == "" || form.temperature == "" || form.companyname == "" || form.reason == "") {
        message.error('请填写完整信息')
        return;
    } else {
        if (form.temperature > 37.3) {
            message.error('体温过高')
            return;
        } else if (form.name) {
            form.isepidemicarea ? form.isepidemicarea = 1 : form.isepidemicarea = 0;
            const result = await addVisitor(form);
            if (result.success) {
                //查看是否是黑名单中的人
                const result = await getBlacklist(form.idcard);
                if (result.data.filter(item => item.idcar == form.idcard).length > 0) {
                    message.error('黑名单中的人')
                    return;
                }
                message.success('登记成功')
                form = {
                    name: "",
                    idcard: "",
                    temperature: "",
                    vehicleid: "",
                    companyname: "",
                    reason: "",
                    isepidemicarea: false,
                    enter: "A"
                }
            } else {
                message.error('登记失败')
                return
            }
        }
    }

}

const onAutoInput = () => {
    form.name = getUserName();
    form.idcard = generateIdCard();
    form.temperature = "36.5";
    form.vehicleid = generateLicensePlate();
    form.companyname = "深圳市腾讯计算机系统有限公司";
    form.reason = "上班";
    form.isepidemicarea = false;
    form.enter = "A";
}

function generateLicensePlate() {
    // 车牌号码格式定义
    const licensePlateFormats = [
        '京A#####', '津A#####', '沪A#####', '渝A#####', '冀A#####',
        '豫A#####', '云A#####', '辽A#####', '黑A#####', '湘A#####',
        '皖A#####', '鲁A#####', '新A#####', '苏A#####', '浙A#####',
        '赣A#####', '鄂A#####', '桂A#####', '甘A#####', '晋A#####',
        '蒙A#####', '陕A#####', '吉A#####', '闽A#####', '贵A#####',
        '粤A#####', '青A#####', '藏A#####', '川A#####', '宁A#####',
        '琼A#####', '使######' // 使馆车牌号码格式
    ]

    // 随机选择车牌号码格式并生成对应的车牌号码
    const licensePlateFormat = licensePlateFormats[Math.floor(Math.random() * licensePlateFormats.length)]
    let licensePlate = ''
    for (let i = 0; i < licensePlateFormat.length; i++) {
        if (licensePlateFormat.charAt(i) === '#') {
            licensePlate += String(Math.floor(Math.random() * 10))
        } else if (licensePlateFormat.charAt(i) === '使') {
            licensePlate += '使'
            break
        } else {
            licensePlate += licensePlateFormat.charAt(i)
        }
    }

    return licensePlate
}

function generateIdCard() {
    // 随机生成前 6 位地区码（根据中华人民共和国民政部公布的行政区划代码）
    const areas = ["110000", "120000", "130000", "140000", "150000", "210000", "220000", "230000", "310000", "320000", "330000", "340000", "350000", "360000", "370000", "410000", "420000", "430000", "440000", "450000", "460000", "500000", "510000", "520000", "530000", "540000", "610000", "620000", "630000", "640000", "650000"]
    const areaCode = areas[Math.floor(Math.random() * areas.length)]

    // 随机生成出生年月日
    const birthYear = Math.floor(Math.random() * (2002 - 1950 + 1)) + 1950
    const birthMonth = Math.floor(Math.random() * 12) + 1
    const maxDaysInMonth = new Date(birthYear, birthMonth, 0).getDate()
    const birthDay = Math.floor(Math.random() * maxDaysInMonth) + 1

    // 随机生成顺序码和校验码
    const orderCode = String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    const checkCode = getCheckCode(`${areaCode}${birthYear}${String(birthMonth).padStart(2, '0')}${String(birthDay).padStart(2, '0')}${orderCode}`)

    // 拼接身份证号码并返回
    return `${areaCode}${birthYear}${String(birthMonth).padStart(2, '0')}${String(birthDay).padStart(2, '0')}${orderCode}${checkCode}`
}

// 计算身份证校验码
function getCheckCode(idCard) {
    const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
    const checksum = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对应值
    let sum = 0
    for (let i = 0; i < coefficient.length; i++) {
        sum += Number(idCard.charAt(i)) * coefficient[i]
    }
    return checksum[sum % 11]
}

function getUserName() {
    //百家姓 
    var familyNames = new Array("赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹");
    //名称 
    var givenNames = new Array("星辰", "美丽", "翔", "淑华", "晶莹", "云浩", "正气", "雨涵", "嘉怡", "佳毅", "皓月", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", "子璇", "淼", "国栋", "夫子", "悦心", "甜", "敏", "尚", "国贤", "贺祥", "越峰", "昊轩", "启悦", "皓然", "建国", "益冉", "瑾春", "月仙", "雅芬", "章章", "文昊", "大东", "雄霖", "浩晨", "熙涵", "切瑞", "枫叶", "欣欣", "宜豪", "欣慧", "建业", "建林", "亦菲", "皓轩", "冰洁", "佳欣", "涵涵", "月辰", "淳美", "恩铭", "伟洋", "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌", "佳怡", "欧莱", "晨茜", "晨璐", "运昊", "梦欣", "淑君", "晶滢", "润莎", "榕汕", "乐毅", "佳玉", "晓庆", "一鸣", "语晨", "添池", "田心", "雨泽", "雅晗", "雅涵", "美欣", "树佳", "文轩", "檀丽", "欣源", "梦雅", "榕润", "欣汝", "慧嘉", "建新",);
    var i = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    var j = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    return familyNames[i] + givenNames[j];
}

</script>

<style lang="scss" scoped>
.register {
    .btn-group {
        display: flex;
        justify-content: center;
        align-items: center;

        .btn-right {
            margin-left: 10px;
        }
    }
}
</style>
