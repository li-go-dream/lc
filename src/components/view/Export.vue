<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <el-row>
      <el-col :span="8" :push="8">
        <el-button @click="fun='总表';isfun=1">总表</el-button>
        <el-button class="endbtn" @click="fun='分项表';isfun=0">分项表</el-button>
      </el-col>
    </el-row>
    <div style="height:40px"></div>
    <el-row class="bottom_row">
      <el-col :span="8" :push="8">
        <el-input v-model="fun" disabled >
          <el-button slot="append" @click="save(msg)">保存</el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props:{
    msg:{
      type:Array,
    }
  },
  data(){
    return{
      fun:'总表',
      isfun:1,
      leader:[],
      dialogFormVisible:false
    }
  },
  methods:{
    init(data){
      console.log(data)
      if(data){
        this.leader = data.leader
      }
      this.dialogFormVisible=true;
    },
    save(id){
      if(this.isfun){
        var data={
          leader:[],
        }
      }else{
        var data={
          leader:id,
        }
      }
      this.$ajax.code_export(data)
      .then(res => {
        console.log(res)
        if(res.data !=''){
          this.download(res.data)
        }
      })
    },
    request(){
      const req = new XMLHttpRequest();
      req.open('POST', '<接口地址>', true);
      req.responseType = 'blob';
      req.setRequestHeader('Content-Type', 'application/json');
      req.onload = function() {
        const data = req.response;
        const blob = new Blob([data]);
        const blobUrl = window.URL.createObjectURL(blob);
        download(blobUrl);
      };
      req.send('<请求参数：json字符串>');
    },
    download(blobUrl){
      const a = document.createElement('a');
      a.target="_blank";
      a.href = blobUrl;
      a.click();
    } 
  }
}
</script>

<style lang="scss">
  .el-row .endbtn{
    float: right;
  }
  .bottom_row{
    margin-bottom: 40px;
  }
</style>
