<template>
  <div>
    <el-row>
      <el-col :span="2" :push="22">
        <el-button @click="addpeople" type="primary">添加人员</el-button>
      </el-col>
    </el-row>
    <div style="height:20px;border-bottom:1px solid rgba(0, 0, 0, .12);margin-bottom:20px;"></div>
    <el-table
    v-loading="loading"
    :data="tableData"
    border>
      <el-table-column
        fixed
        align="center"
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="position"
        label="职务"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="account"
        label="账号"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pwd"
        label="密码"
        width="200">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="Update(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:30px;"></div>
    <div>
      <div style="display:inline-block;float:right;margin-right:20px;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="totalpage">
        </el-pagination>
      </div>
    </div>
    <Addpeople @add="isadd" ref="isAddpeople"></Addpeople>
    <Addpermission ref="isAddpermission"></Addpermission>
  </div>
</template>

<script>
import Addpeople from './Addpeople'
import Addpermission from './Addpermission'
export default {
  data(){
    return{
      tableData:[
        {
          id:1,
          name:'',
          position:'',
          account:'',
          pwd:'',
        }
      ],
      currentPage:1,
      size:10,
      totalpage:1,
      loading:true
    }
  },
  components:{
    Addpeople,
    Addpermission
  },
  mounted:function(){
    var data = {
      page: this.page,
      size: this.size
    }
    this.getlist(data);
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var data={
        page:val,
        size:this.size
      }
      this.getlist(data);
    },
    isadd(msg){
      var data = {
        page: this.page,
        size: this.size
      }
      if(msg){
        this.getlist(data);
      }
    },
    getlist(data){
      this.loading = true;
      this.$ajax.get_list(data)
      .then(res => {
        if(res.data.status === 0){
          this.tableData=res.data.data;
          this.loading = false;
          this.totalpage =res.data.count;
        }
      })
    },
    Update(e){
      this.$refs['isAddpermission'].init(e.id);
    },
    addpeople(){
      this.$refs['isAddpeople'].init();
    }
  }
}
</script>

<style>

</style>
