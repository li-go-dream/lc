<template>
  <el-dialog class="addper" :visible.sync="dialogFormVisible" width="500px" :show-close="false">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="片区授权" name="first">
       <div class="table_box">
          <table cellspacing="0">
            <thead>
              <td>
                <el-checkbox v-model="allchecked" @change="isallchecked"></el-checkbox>
              </td>
              <td style="80px;">片区名称</td>
              <td>查看</td>
              <td>修改</td>
            </thead>
            <tbody>
              <tr v-for="(item,index) in area" :key="item.name+index">
                <td>
                  <el-checkbox v-model="item.isall" @change="checked=>c_allchange(checked,index,item)"></el-checkbox>
                </td>
                <td>{{item.name}}</td>
                <td>
                  <el-checkbox v-model="item.read" @change="checked=>readchange(checked,index,item)"></el-checkbox>
                </td>
                <td>
                  <el-checkbox v-model="item.write" @change="checked=>writechange(checked,index,item)"></el-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
       </div>

        <div style="height:15px;"></div>
        <el-row >
          <el-col :span="12" :push="8">
            <el-button type="primary" @click="areasubmit">保存</el-button>
            <el-button @click="dialogFormVisible=false">关闭</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="人员授权" name="second">
        <div class="table_box">
          <table cellspacing="0">
            <thead>
              <td>
                <el-checkbox v-model="allchecked1" @change="checked=>isallchecked1(checked,index,item)"></el-checkbox>
              </td>
              <td style="80px;">人员名称</td>
              <td>查看</td>
              <td>修改</td>
            </thead>
            <tbody>
              <tr v-for="(item,index) in member" :key="item.name+index">
                <td>
                  <el-checkbox v-model="item.isall" @change="checked=>c_allchange1(checked,index,item)"></el-checkbox>
                </td>
                <td>{{item.name}}</td>
                <td>
                  <el-checkbox v-model="item.read" @change="checked=>readchange1(checked,index,item)"></el-checkbox>
                </td>
                <td>
                  <el-checkbox v-model="item.write" @change="checked=>writechange1(checked,index,item)"></el-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="height:15px;"></div>
        <el-row >
          <el-col :span="12" :push="8">
            <el-button type="primary" @click="membersubmit">保存</el-button>
            <el-button @click="dialogFormVisible=false">关闭</el-button>
          </el-col>
        </el-row>        
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
export default {
  data(){
    return{
      bind:0,
      allchecked:false,
      allchecked1:false,
      dialogFormVisible:false,
      activeName:'first',
      allselect:[],
      area:[],
      member:[]
    }
  },
  mounted:function(){
    
  },
  methods:{
    isallchecked(e){
      this.area.map(item => {
        item.read = e;
        item.write = e;
        item.isall = e;
      })
    },
    datafilter(){
      var i=0
      this.area.map(item => {
        if(item.isall){
          i++;
        }
      })
      if(i === this.area.length){
        this.allchecked = true;
      }else{
        this.allchecked = false;
      }
    },
    init(id){
      this.dialogFormVisible=true;
      this.bid =id;
      this.lookAuth(id)
    },
    c_allchange(e,id,item){
      console.log('改变')
      Vue.set(this.area,id,{'bid':item.bid,'aid':item.aid,'mid':item.mid,'id':item.id,'name':item.name,'read':e,'write':e,'isall':e})
      this.datafilter()
    },
    readchange(e,id,item){
      if(e && item.write){
        item.isall = true;
      }else{
        item.isall = false;
      }
      Vue.set(this.area,id,{'bid':item.bid,'aid':item.aid,'mid':item.mid,'id':item.id,'name':item.name,'read':e,'write':item.write,'isall':item.isall})
      this.datafilter()
    },
    writechange(e,id,item){
       if(e && item.read){
        item.isall = true;
      }else{
        item.isall = false;
      }
      Vue.set(this.area,id,{'bid':item.bid,'aid':item.aid,'mid':item.mid,'id':item.id,'name':item.name,'read':item.read,'write':e,'isall':item.isall})
      this.datafilter()
    },
    //人员授权
    isallchecked1(e){
      this.member.map(item => {
        item.re1ad = e;
        item.write = e;
        item.isall = e;
      })
    },
    datafilter1(){
      var i=0
      this.member.map(item => {
        if(item.isall){
          i++;
        }
      })
      if(i === this.member.length){
        this.allchecked1 = true;
      }else{
        this.allchecked1 = false;
      }
    },
    c_allchange1(e,id,item){
      Vue.set(this.member,id,{'bid':item.bid,'uid':item.uid,'mid':item.mid,'id':item.id,'name':item.name,'read':e,'write':e,'isall':e})
      this.datafilter1()
    },
    readchange1(e,id,item){
      if(e && item.write){
        item.isall = true;
      }else{
        item.isall = false;
      }
      Vue.set(this.member,id,{'bid':item.bid,'uid':item.uid,'mid':item.mid,'id':item.id,'name':item.name,'read':e,'write':item.write,'isall':item.isall})
      this.datafilter1()
    },
    writechange1(e,id,item){
       if(e && item.read){
        item.isall = true;
      }else{
        item.isall = false;
      }
      Vue.set(this.member,id,{'bid':item.bid,'uid':item.uid,'mid':item.mid,'id':item.id,'name':item.name,'read':item.read,'write':e,'isall':item.isall})
      this.datafilter1()
    },

    lookAuth(id){
      var data ={
        id: id
      }
      this.$ajax.lookAuth(data)
      .then(res => {
          console.log(res,0)
        if(res.data.status === 0){
          console.log(res,1)
          res.data.data['area'].map(item => {
            item.read = Boolean(item.read);
            item.write = Boolean(item.write);
          })
          res.data.data['member'].map(item => {
            item.read = Boolean(item.read);
            item.write = Boolean(item.write);
          })
          this.area = res.data.data['area'];
          this.member = res.data.data['member']
          this.area.map(item => {
            if(item .read && item.write){
              item.isall = true;
            }else{
              item.isall = false;
            }
          })
          this.member.map(item => {
            if(item .read && item.write){
              item.isall = true;
            }else{
              item.isall = false;
            }
          })
          console.log(this.area)
          this.datafilter()
          this.datafilter1()
        }
      })
    },
    areasubmit(){
      // this.area.map(item => {
      //   if(item.read){
      //     item.read = 1;
      //   }else{
      //     item.read = 0;
      //   }
      //   if(item.write){
      //     item.write = 1;
      //   }else{
      //     item.write = 0;
      //   }
      // })
      var x = this.area;
      x.map(item => {
        delete item.isall;
        delete item.name;
        delete item.id;
      })
      var data ={
        bid:this.bid,
        id: Boolean(window.localStorage.getItem('data')) ? (JSON.parse(window.localStorage.getItem('data')).area)[0]['mid'] : '',
        data:x
      }
      this.$ajax.areapermission(data)
      .then(res => {
        if(res.data.status === 0){
          this.$message.success('操作成功')
          this.dialogFormVisible=false
        }else{
          this.$message.error('操作失败')
        }
      })
      
    },
    membersubmit(){
      this.member.map(item => {
        delete item.isall;
        delete item.name;
        delete item.id
      })
      var data ={
        bid:this.bid,
        id: Boolean(window.localStorage.getItem('data')) ? (JSON.parse(window.localStorage.getItem('data')).area)[0]['mid'] : '',
        data:this.member
      }
      this.savedata(data);
    },
    savedata(data){
      this.$ajax.addpermission(data)
      .then(res => {
        console.log(res)
        if(res.data.status === 0){
          this.dialogFormVisible=false
          this.$message.success('操作成功')
        }else{
          this.$message.error('操作失败')
        }
      })
    },
    handleClick(tab, event) {
    },
    
  }
}
</script>

<style lang="scss">
  .addper{
    .el-tabs{
      border:1px solid #E4E7ED;
      .el-tabs__content{
        margin: 0 15px 15px;
      }
    }
    .el-tabs__nav-wrap{
      border-bottom:1px solid #E4E7ED;
    }
    .el-dialog__header{
      display: none;
    }
    .el-tabs__header{
      border: none;
    }
    .el-tabs__nav{
      width: 100%;
      border: none !important;
      #tab-first{
        width: 50%;
        text-align: center;
      }
      #tab-second{
        text-align: center;
        width: 50%;
      }
    }
    .el-tabs__content{
      height: 300px;
      .table_box{
        height: 240px;
        overflow: auto;
      }
    }
    table{
      width:100%; 
      border-color:"#E4E7ED";
      td{
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #E4E7ED;
      }
    }
  }
</style>
