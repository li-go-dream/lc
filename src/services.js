import axios from 'axios'
import Vue from 'vue'
import router from './router'

const ajax = axios.create({
  baseURL: 'http://api.scxtjzwqbw.com/index.php/index/'
})

ajax.interceptors.request.use((config) => {
  var token = Boolean(JSON.parse(window.localStorage.getItem('data'))) ? JSON.parse(window.localStorage.getItem('data')).token : '';
  config.data.token = token;
  return config
})

ajax.interceptors.response.use((resp) => {
  var Router = router
  if(resp.data.status === 2){
    window.localStorage.removeItem('data');
    Vue.prototype.$message({
      message: resp.data.msg,
      type: 'warning',
      duration: 1000,
      onClose:function(){
        Router.push({
          path: '/login'
        })
      }
    })
    return false;
  }
  return resp
})

export const login = (data) => ajax.post('login/index',data)
export const projectlist = (data) => ajax.post('regulation/getInfo',data) 
export const getleaderList = (data) => ajax.post('regulation/leaderInfo',data)
export const getareainfoList = (data) => ajax.post('regulation/areainfo',data)//地区列表
export const getstateinfo = (data) => ajax.post('regulation/stateInfo',data)//项目市场状态
export const getstageinfo = (data) => ajax.post('regulation/stageInfo',data)//目前跟踪阶段
export const getmethodsInfo = (data) => ajax.post('regulation/methodsInfo',data)//预计承揽方式
export const getresultInfo = (data) => ajax.post('regulation/resultInfo',data)//预计承揽结果
export const getimportance = (data) => ajax.post('regulation/importance',data)//项目重要性
export const addorupdate = (data) => ajax.post('regulation/change',data)//新增项目信息

export const get_list = (data) => ajax.post('user/get_list',data)//查看人员列表 
export const addpeople = (data) => ajax.post('user/add',data)//新增项目信息
export const getdictionary = (data) => ajax.post('dictionary/check',data)//字典查看
export const addorupdate_dic = (data) => ajax.post('dictionary/info',data)//字典添加或修改
export const delete_dic = (data) => ajax.post('dictionary/delete',data)//字典删除
export const lookAuth = (data) => ajax.post('user/lookAuth',data)//授权查看user/memberEmpower
export const code_export = (data) => ajax.post('regulation/code_export',data)//导出
export const addpermission = (data) => ajax.post('user/memberEmpower',data)//人员授权
export const areapermission = (data) => ajax.post('user/areaEmpower',data)//地区授权

