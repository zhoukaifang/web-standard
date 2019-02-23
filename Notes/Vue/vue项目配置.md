## rem
```javascript
/*
    1. 下载
    npm install lib-flexible --save
    npm install px2rem-loader
    2.  使用
        A：在 main.js 入口文件中引入  import 'lib-flexible/flexible'
        B：在 build/util.js 中配置
          const cssLoader = {
                loader: 'css-loader',
                options: {
                minimize: process.env.NODE_ENV === 'production',
                sourceMap: options.sourceMap
                }
            }
            const px2remLoader = {
                loader: 'px2rem-loader',
                options: {
                remUnit: 75
                }
            }
          在generateLoaders方法中添加px2remLoader
            function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader,px2remLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

*/
```

## stylus
```javascript
/*
    1. 下载
    npm install stylus stylus-loader --save
    2.  使用
    <style lang='stylus' scoped>
    // @import './my.styl'
    </style>
*/
```

## axios
```javascript
/*
  1.npm install axios
  2.GET
    // Make a request for a user with a given ID
    axios.get('/user?ID=12345')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
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
      .catch(function (response) {
        console.log(response);
      });
      
      ======================================

    POST
      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
      
      =========================================

    多个并发
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

      ===========================================

    axiosAPI
      // Send a POST request
      axios({
        baseURL,method,url,transformRequest,transformResponse,headers,params:obj,timeout:number,responseType:string,progress:fn
      });

*/
```

## 组件懒加载
```javascript
/*
  
*/
```
