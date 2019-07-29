<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="5">
        <el-col :span="7">
          <el-form-item label="市场负责人:">
            <el-popover
              placement="top"
              width="100%"
              v-model="visible">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div class="check_box">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city.id" :key="city.name">{{city.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="nocheckedbtn">取消</el-button>
                <el-button type="primary" size="mini" @click="checkedbtn">确定</el-button>
              </div>
              <el-input  slot="reference" :disabled="true" style="color:#606266;" class="resetcss" type="text" v-model="leader" placeholder="请选择负责人"></el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="更新时间:">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="开始日期" v-model="form.date_min" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束时间" v-model="form.date_max" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业主单位:">
            <el-input v-model="form.unit" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="7">
          <el-form-item label="片区:">
            <el-select v-model="form.area" placeholder="请选择片区">
              <el-option v-for="item in arealist" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="项目名称:">
            <el-input v-model="form.project	" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="operation">
      <el-col :span="4" :push="20">
        <el-button type="primary" @click="Add">新增</el-button>
        <el-button type="success" @click="Export">导出</el-button>
      </el-col>
    </el-row>
    <el-table
    v-loading="loading"
    :height="550"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      align="center"
      prop="id"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      align="center"
      prop="leader"
      label="市场负责人"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="project"
      label="项目名称"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="project_details"
      label="项目概况"
      width="300">
    </el-table-column>
    <el-table-column
      align="center"
      prop="market_dynamics"
      label="项目状态"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="owner_unit"
      label="业主单位"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="contact_name"
      label="联系人"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="contact_phone"
      label="联系电话"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="track_stage"
      label="跟踪阶段"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="area"
      label="所属片区"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="update_time"
      label="更新时间"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="first_input_time"
      label="录入时间"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="project_investment"
      label="项目投资额(万元)"
      width="140">
    </el-table-column>
    <el-table-column
      align="center"
      prop="estimated_contract_amount"
      label="预计合同额(万元)"
      width="140">
    </el-table-column>
    <el-table-column
      align="center"
      prop="contract_way"
      label="预计承揽方式"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="contract_time"
      label="预计承揽时间"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="competitor"
      label="竞争对手"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="project_importance"
      label="项目重要性"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="development_process_description"
      label="开发进展描述"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="contract_result"
      label="承揽结果"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="Update(scope.row)">更新</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="History(scope.row)">历史</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="height:30px;"></div>
  <!-- <div>
    <div style="display:inline-block;float:right;margin-right:20px;">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="count">
      </el-pagination>
    </div>
  </div> -->
  <AddorUpdate @func="getmessage" ref="isAddorUpdate"></AddorUpdate>
  <History ref="isHistory"></History>
  <Export :msg="exportid" ref="isExport"></Export>
  </div>
</template>

<script>
import AddorUpdate from './AddorUpdate'
import History from './history'
import Export from './Export'

export default {
  data(){
    return{
      cities:[],
      checkAll:false,
      checkedCities:[],
      visible:false,
      isIndeterminate:true,
      arealist:[],
      leader:'',
      form:{
        leader:[],
        date_min:'',
        date_max:'',
        unit:'',
        area:'',
        project	:''
      },
      tableData:[],
      currentPage:1,
      // size:6,
      count:0,
      loading:true,
      exportid:[]
    }
  },
  components:{
    AddorUpdate,
    History,
    Export
  },
  mounted:function(){
    var data={
      page:1,
      // size:this.size
    }
    this.getprojectlist(data);
    this.getleaderlist();
    this.getareainfoList();
  },
  methods:{
    getmessage(msg){
      if(msg){
        var data={
          page:1,
          // size:this.size
        }
        this.getprojectlist(data);
      }else{
        
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var data={
        page:val,
        // size:this.size
      }
      this.getprojectlist(data);
    },
    getareainfoList(){
      this.$ajax.getareainfoList({})
      .then((res) => {
        if(res.status === 200){
          if(res.data.status === 0){
            this.arealist = res.data.data;
          }
        }
      })
    },
    getprojectlist(data){
      this.loading = true;
      this.$ajax.projectlist(data)
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          if(res.data.status === 0){
            this.tableData = res.data.data;
            this.tableData.map(item => {
              this.exportid.push(item.mid)
            })
            var anotherArr = []
            this.exportid.forEach(function(item){
                if(anotherArr.indexOf(item) === -1) {
                    anotherArr.push(item)
                }
            })
            this.exportid=anotherArr
            this.loading = false;
            this.count = res.data.count
          }
        }
      })
    },
    getleaderlist(){
      this.$ajax.getleaderList({})
      .then((res) => {
        if(res.status === 200){
          if(res.data.status === 0){
            this.cities = res.data.data;
          }
        }
      })
    },
    handleCheckAllChange(val){
      var cityOptions = [];
      this.cities.map(item => {
        cityOptions.push(item.id)
      })
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    checkedbtn(){
      this.visible = false;
      console.log(this.checkedCities)
      var checkedName =[];
      this.cities.map(item => {
        if(this.checkedCities.includes(item.id)){
          checkedName.push(item.name);
        }
      })
      this.form.leader=this.checkedCities;
      this.leader = checkedName.join(",");
    },
    nocheckedbtn(){
      this.visible = false;
      this.checkedCities=[];
      this.leader='';
      this.form.leader=[];
    },
    onSubmit(){
      if(this.form.date_max != ''){
        var maxyear = (new Date(this.form.date_max)).getFullYear();
        var maxmonth = (new Date(this.form.date_max)).getMonth() + 1;
        var maxday = (new Date(this.form.date_max)).getDate();
        this.form.date_max = maxyear + '-' + maxmonth + '-' + maxday;
      }
      if(this.form.date_min != ''){
        var minyear = (new Date(this.form.date_min)).getFullYear();
        var minmonth = (new Date(this.form.date_min)).getMonth() + 1;
        var minday = (new Date(this.form.date_min)).getDate();
        this.form.date_min = minyear + '-' +minmonth + '-' + minday;
      }
      this.getprojectlist(this.form)
    },
    Add(){
      this.$refs['isAddorUpdate'].init();
    },
    Export(){
      this.$refs['isExport'].init(this.form);
    },
    Update(x){
      this.$refs['isAddorUpdate'].init(x);      
    },
    History(x){
      this.$refs['isHistory'].init(x);
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-select{
    width: 100%;
  }
  .line{
    text-align: center;
  }
  .none{
    background-color: black;
  }
  .operation{
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }
  .check_box{
    width: 100%;
    height: 100px;
    overflow: auto;
    .el-checkbox-group{
      .el-checkbox{
        display: block;
        height: 20px;
        line-height: 20px;
      }
    }
  }
</style>
