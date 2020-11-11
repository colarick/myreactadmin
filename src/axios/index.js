import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在'); 
            break;
        default:
            console.log(other);   
        }}

// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12,
    withCredentials: false,//表示跨域请求时是否需要使用凭证,是true的时候，
    //开启withCredentials后，服务器才能拿到你的cookie，当然后端服务器也要设置允许你获取你开启了才有用
    });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {        
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        const token = store.state.token;        
        token && (config.headers.Authorization = token);    
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }    
        return config;    
    },    
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
               store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });

export default instance;

// 作者：愣锤
// 链接：https://juejin.im/post/6844903652881072141
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

import axios from 'axios'
import qs from "qs"
import Vue from "vue"

let VUE = new Vue();
let baseURL = '';
console.log(axios)
// 设置本地dev环境的baseURL，用于本地web服务器的代理的拦截名
if (process.env.NODE_ENV === 'development') {
    baseURL = './PB_API';
}

// 设置线上环境的baseURL
if (process.env.NODE_ENV === 'production') {
    baseURL = document.location.protocol + '//' + location.host + location.pathname + 'PBServerAPI/'; // 正式环境
}

const service = axios.create({
    baseURL: baseURL,
    timeout: 60000, //响应时长可根据业务需求自行设置
    responseType: "json",//请求数据类型包括  'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    withCredentials: false,//表示跨域请求时是否需要使用凭证,是true的时候，开启withCredentials后，服务器才能拿到你的cookie，当然后端服务器也要设置允许你获取你开启了才有用
    headers: {
        'Content-Type': 'application/json'
    }
})

//请求拦截器
service.interceptors.request.use(config => {
    // config.headers.Authorization = "Bearer " + store.state.token
    if (config.headers.contentType === 'code') {
        // form表单格式提交需要qs处理下请求参数
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
    } else {
    }
    if (config.method == 'get') {
        // get请求加上时间戳
        config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
        }
    }
    return config
}, error => {
    return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
}, error => {
    if (error.response.data.code == 500) {
        VUE.$message({
            type: 'error',
            message: error.response.data.message
        })
    }
    return Promise.reject(error)
})

export default service

// // 发送 POST 请求
// axios({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   });
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Make a request for a user with a given ID 
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as 
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  function getUserAccount() {
    return axios.get('/user/12345');
  }
  
  function getUserPermissions() {
    return axios.get('/user/12345/permissions');
  }
  
  axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
      // Both requests are now complete 
    }));