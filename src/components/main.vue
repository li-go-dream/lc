<template>
  <el-container>
    <el-header>
      <h1>
        <img src="http://ku.90sjimg.com/element_pic/00/86/97/3756ec91afd891e.jpg" alt="logo">
        <a href="javascript:;">市场开发信息跟踪管理系统</a>
        <el-dropdown style="float:right;color:white;cursor:pointer" @command="exit">
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{position}}</el-dropdown-item>
            <el-dropdown-item divided command='exit'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </h1>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          default-active="/project_list"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <el-menu-item v-for="item in noitem" :index="'/'+item.path" :key="item.name">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.text}}</span>
          </el-menu-item>

          <el-submenu v-for="(it,index) in classify" :index="'/'+it.path" :key="index">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{it.father}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="item in it.menu" :index="'/'+item.path" :key="item.name">
                {{item.text}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> 
        </el-menu>
      </el-aside>
      <el-main>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import routes from '../router/routes'
export default {
  data(){
    return{
      name:Boolean(window.localStorage.getItem('data')) ? JSON.parse(window.localStorage.getItem('data'))['name'] : '',
      position:Boolean(window.localStorage.getItem('data')) ? JSON.parse(window.localStorage.getItem('data'))['position'] : '',
      classify: [],
      noitem: ((routes.filter(item => item.path === "/"))[0].children).filter(it => !it.father),
      hasitem: ((routes.filter(item => item.path === "/"))[0].children).filter(it => it.father)
    }
  },
  mounted:function(){
    this.cycle(this.hasitem)
  },
  methods: {
    exit(e){
      if(e){
        window.localStorage.removeItem('data')
        this.$router.push({path:'/login'})
      }
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    cycle(arr){
      for(var i=0;i<arr.length-1;i++){
        var brr=[];
        var classification={};
        brr.push(arr[i])
        for(var j=i+1;j<arr.length;j++){
          if(arr[i].father === arr[j].father){
            if(!brr.includes(arr[j])){
               brr.push(arr[j])
            }
          }
        }
        var b=0;
        for(var a=0;a<this.classify.length;a++){
          if((this.classify[a])["father"] != arr[i].father){
            b++;
          }
        }
        if(b === this.classify.length){
          classification["father"]=arr[i].father;
          classification["menu"]=brr;
          this.classify.push(classification)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .5s;
  // }
  // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   opacity: 0;
  // }
  .el-header{
    background-color: #409EFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    h1{
      line-height: 60px;
      font-weight: 600;
      img{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 4px;
      }
      a{
        text-decoration: none;
        color: #fff;
      }
    }
  } 
  section{
    aside{
      ul{
        height: 100%;
      }
    }
  }
</style>
