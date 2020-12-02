/**
 * 安装依赖
 * npm install axios --save
 */
import axios from 'axios'

/**
 * 普通post提交，x-www-form-urlencoded
 * @param url
 * @param data
 * @param config
 * @returns {Promise<unknown>}
 * @private
 */
const _post = function (url,data,config){
    data = data || {}
    config = config || {}
    config = {
        headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},
        responseType: 'json',
        ...config,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            let searchParams = new URLSearchParams();
            for (let i in data){
                if (Object.prototype.hasOwnProperty.call(data,i)){
                    searchParams.append(i,data[i]);
                }
            }
            return searchParams;
        }],
    }
    return new Promise(function (resolve,reject){
        axios.post(url,data,config).then(function (response){
            if (response.status === 200){
                resolve(response.data);
            } else {
                resolve({code:501,data:{},msg:response.data});
            }
        }).catch(function (error){
            console.log(error);
            reject(error);
        });
    });
}

/**
 * formData方式提交
 * @param url
 * @param data
 * @param config
 * @returns {Promise<unknown>}
 * @private
 */
const _formPost = function (url,data,config){
    data = data || {}
    config = config || {}
    config = {
        headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'multipart/form-data'},
        responseType: 'json',
        ...config,
        transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            let formData = new FormData();
            for (let i in data){
                if (Object.prototype.hasOwnProperty.call(data,i)){
                    formData.append(i,data[i]);
                }
            }
            return formData;
        }],
    }
    return new Promise(function (resolve,reject){
        axios.post(url,data,config).then(function (response){
            if (response.status === 200){
                resolve(response.data);
            } else {
                resolve({code:501,data:{},msg:response.data});
            }
        }).catch(function (error){
            console.log(error);
            reject(error);
        });
    });
}

/**
 * get提交
 * @param url
 * @param data
 * @param config
 * @returns {Promise<unknown>}
 * @private
 */
const _get = function (url,data,config) {
    data = data || {}
    config = config || {}
    config = {
        headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},
        responseType: 'json',
        params:{
            ...data
        },
        ...config
    }
    return new Promise(function (resolve,reject){
        axios.get(url,config).then(function (response){
            if (response.status === 200){
                resolve(response.data);
            } else {
                resolve({code:501,data:{},msg:response.data});
            }
        }).catch(function (error){
            console.log(error);
            reject(error);
        });
    });
}

const get = _get;
const formPost = _formPost;

/**
 * 开发模式，post转get
 * 因开发模式，请求本地apiData数据，不支持post，故此处post按get方式组建数据提交
 */
let devMode = false;

const post = devMode?_get:_post;

export default {
    post,
    get,
    formPost
}