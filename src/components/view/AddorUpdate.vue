<template>
    <el-dialog :title="isadd ? '新增项目信息' : '更新项目信息'"  :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="ruleForm" :rules="rules" label-width="130px" class="addorupdate">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="市场负责人：" prop="leader">
                        <el-input v-model="form.leader"  autocomplete="off" placeholder="请输入项目负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="项目名称：" prop="project">
                        <el-input v-model="form.project" autocomplete="off" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="23">
                    <el-form-item label="项目概况：" prop="project_details">
                        <el-input v-model="form.project_details" autocomplete="off" placeholder="请输入项目概况"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="市场项目状态：" prop="market_dynamics">
                        <el-select v-model="form.market_dynamics" placeholder="请选择市场项目状态">
                            <el-option v-for="item in statelist" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="业主单位：" prop="owner_unit">
                        <el-input v-model="form.owner_unit" autocomplete="off" placeholder="请输入业主单位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="联系人:" prop="contact_name">
                        <el-input v-model="form.contact_name" autocomplete="off" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="联系电话：" prop="contact_phone">
                        <el-input v-model="form.contact_phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="所属片区：" prop="area">
                        <el-select v-model="form.area" placeholder="请选择所属片区">
                            <el-option v-for="item in arealist" :key='item.id' :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="目前跟踪阶段：" prop="track_stage">
                        <el-select v-model="form.track_stage" placeholder="请选择目前跟踪阶段">
                            <el-option v-for="item in stagelist" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="项目投资额：" prop="project_investment">
                        <el-input v-model="form.project_investment" autocomplete="off" placeholder="请输入项目投资额(万元)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="预计合同额：" prop="estimated_contract_amount">
                        <el-input v-model="form.estimated_contract_amount" autocomplete="off" placeholder="请输入预计合同额(万元)"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="录入时间：" prop="first_input_time">
                        <el-date-picker type="date" placeholder="请选择录入时间" v-model="form.first_input_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="竞争对手：" prop="competitor">
                        <el-input v-model="form.competitor" autocomplete="off" placeholder="请输入竞争对手"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="预计承揽方式：" prop="contract_way">
                        <el-select v-model="form.contract_way" placeholder="请选择预计承揽方式">
                            <el-option v-for="item in methodslist" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="预计承揽时间：" prop="contract_time">
                        <el-date-picker type="date" placeholder="请选择预计承揽时间" v-model="form.contract_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                <el-col :span="11">
                    <el-form-item label="市场进展描述：" prop="development_process_description">
                        <el-input v-model="form.development_process_description" autocomplete="off" placeholder="请输入项目进展描述"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="更新时间：" prop="update_time">
                        <el-date-picker type="date" placeholder="请选择更新时间" v-model="form.update_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="项目重要性：" prop="project_importance">
                        <el-select v-model="form.project_importance" placeholder="请选择项目重要性">
                            <el-option v-for="item in importancelist" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="承揽结果：" prop="contract_result">
                        <el-select v-model="form.contract_result" placeholder="请选择活动区域">
                            <el-option v-for="item in resultlist" :key="item.name" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
            <el-button  @click="resetForm('ruleForm')" style="margin-left:80px">关 闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        var checkphone = (rule, value, callback) => {
            var isphone0 = /^1[0-9]{10}$/;
            var isphone1 =/^([0-9]{3,4}-)?[0-9]{7,8}$/;
            if(!(isphone0.test(value)||isphone1.test(value))){
                callback('请输入正确的联系电话')
            }else{
                callback()
            }
        };
        var checkmoney = (rule, value, callback) => {
            var isnumber0 = /^[0-9]+\.?[0-9]+?$/; //小数
            var isnumber1 = /^\d+$/;
            if(!(isnumber0.test(value)||isnumber1.test(value))){
                callback('请输入正确的金额')
            }else{
                callback()
            }
        };
        return {
            arealist:[],
            statelist:[],
            stagelist:[],
            methodslist:[],
            resultlist:[],
            importancelist:[],
            dialogFormVisible: false,
            isadd:false,
            c_isadd:false,
            c_iupdate:false,
            form:{
                event_id:'', //事件id
                leader:'',    //项目负责人
                project:'',   //项目名称
                project_details:'',   //项目概况
                owner_unit:'',    //业主单位
                contact_name:'',    //联系人
                contact_phone:'',   //联系电话
                project_investment:'',    //项目投资额
                estimated_contract_amount:'',   //预计合同额
                competitor:'',    //竞争对手
                development_process_description:'',   //市场发展描述
                project_importance:'',    //项目重要性
                contract_result:'',
                market_dynamics:'',
                area:'',
                track_stage:'',
                contract_way:'',
                first_input_time: '',   //首次录入时间
                contract_time:'',//预计承揽时间
                update_time:'',//更新时间
            },
            rules:{
                leader:[
                    {
                        required: true,message:'请输入市场负责人',trigger: 'blur'
                    }
                ],    //项目负责人
                project:[
                    {
                        required: true,message:'请输入项目名称',trigger: 'blur'
                    }
                ],   //项目名称
                project_details:[
                    {
                        required: true,message:'请输入项目概况',trigger: 'blur'
                    }
                ],   //项目概况
                owner_unit:[
                    {
                        required: true,message:'请输入业主单位',trigger: 'blur'
                    }
                ],    //业主单位
                contact_name:[
                    {
                        required: true,message:'请输入联系人',trigger: 'blur'
                    }
                ],    //联系人
                contact_phone:[
                    {
                         required: true,validator: checkphone,trigger: 'blur'
                    }
                ],   //联系电话
                project_investment:[
                    {
                        required: true,validator: checkmoney,trigger: 'blur'
                    }
                ],    //项目投资额
                estimated_contract_amount:[
                    {
                        required: true,validator: checkmoney,trigger: 'blur'
                    }
                ],   //预计合同额
                competitor:[
                    {
                        required: true,message:'请输入竞争对手',trigger: 'blur'
                    }
                ],    //竞争对手
                development_process_description:[
                    {
                        required: true,message:'请输入市场进展描述',trigger: 'blur'
                    }
                ],   //市场发展描述
                project_importance:[
                    {
                        required: true,message:'请选择项目重要性',trigger: 'blur'
                    }
                ],    //项目重要性
                contract_result:[
                    {
                        required: true,message:'请选择承揽结果',trigger: 'blur'
                    }
                ],
                market_dynamics:[
                    {
                        required: true,message:'市场项目状态：',trigger: 'blur'
                    }
                ],
                area:[
                    {
                        required: true,message:'请选择所属片区',trigger: 'blur'
                    }
                ],
                track_stage:[
                    {
                        required: true,message:'请选择目前跟踪阶段',trigger: 'blur'
                    }
                ],
                contract_way:[
                    {
                        required: true,message:'请选择预计承揽方式',trigger: 'blur'
                    }
                ],
                first_input_time: [
                    {
                        required: true,message:'请选择首次录入时间',trigger: 'blur'
                    }
                ],   //首次录入时间
                contract_time:[
                    {
                        required: true,message:'请选择预计承揽时间',trigger: 'blur'
                    }
                ],//预计承揽时间
                update_time:[
                    {
                        required: true,message:'请选择更新时间',trigger: 'blur'
                    }
                ],//更新时间
            }
        }
    },
    mounted:function(){
        this.getareainfo()
        this.getstateinfo()
        this.getstageinfo()
        this.getmethodsInfo()
        this.getresultInfo()
        this.getimportance()
    },
    methods: {
        init(x,y) {
            this.dialogFormVisible=true;
            if(x){
                this.isadd = false;
                this.form = x;
            }else{
                this.isadd = true;
            }
        },
        getareainfo(){
            this.$ajax.getareainfoList({})
            .then(res => {
                if(res.data.status === 0){
                    this.arealist = res.data.data;
                }
            })
        },//所属片区
        getstateinfo(){
            this.$ajax.getstateinfo({})
            .then(res => {
                if(res.data.status === 0){
                    this.statelist = res.data.data;
                }
            })
        },//项目市场状态
        getstageinfo(){
            this.$ajax.getstageinfo({})
            .then(res => {
                if(res.data.status === 0){
                    this.stagelist = res.data.data;
                }
            })
        },//目前跟踪阶段
        getmethodsInfo(){
            this.$ajax.getmethodsInfo({})
            .then(res => {
                if(res.data.status === 0){
                    this.methodslist = res.data.data;
                }
            })
        },//预计承揽方式
        getresultInfo(){
            this.$ajax.getresultInfo({})
            .then(res => {
                if(res.data.status === 0){
                    this.resultlist = res.data.data;
                }
            })
        },//预计承揽结果
        getimportance(){
            this.$ajax.getimportance({})
            .then(res => {
                if(res.data.status === 0){
                    this.importancelist = res.data.data;
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                
                if(this.form.first_input_time != ''){
                    var maxyear = (new Date(this.form.first_input_time)).getFullYear();
                    var maxmonth = (new Date(this.form.first_input_time)).getMonth() + 1;
                    var maxday = (new Date(this.form.first_input_time)).getDate();
                    this.form.first_input_time = maxyear + '-' + maxmonth + '-' + maxday;
                }
                if(this.form.contract_time != ''){
                    var minyear = (new Date(this.form.contract_time)).getFullYear();
                    var minmonth = (new Date(this.form.contract_time)).getMonth() + 1;
                    var minday = (new Date(this.form.contract_time)).getDate();
                    this.form.contract_time = minyear + '-' +minmonth + '-' + minday;
                }
                this.$ajax.addorupdate(this.form)
                .then(res => {
                    if(res.data.status === 0){
                        this.dialogFormVisible = false 
                        this.c_isadd = true;
                        this.$emit('this.c_isadd',this.c_isadd);
                        this.c_isadd = false;
                    }
                })
            } else {
                console.log(this.form,1)                
                return false;
            }
            });
        },
        resetForm(formName) {
            this.dialogFormVisible = false
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
.dialog-footer{
    text-align: center;
}
.addorupdate .el-dialog__footer{
    text-align: center;
}
.addorupdate .el-input__inner{
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
}
</style>
