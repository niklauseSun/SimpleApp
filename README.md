# MedicationCalculation

#### 介绍
用药计算仓库

#### 软件架构


##### 入口

App.js由此进入

##### 路由

```
./src/routers
```
所有的路由都在这个地方配置，即用户数据跳转等

##### 数据请求

```
./src/uitls/AxiosUtil.js统一处理所有数据

actionUtil(type, data) // 请求统一由这个来调用

ActionTypes 定义请求的类型
```

##### 请求中间件

```
./src/sagas

CalculateMiddleware.js // 计算类的请求
LoginMiddleware.js // 登录类的请求

index.js // 将请求的类型和具体请求绑定
```

##### 容器

containers 里面包含所有界面容器

```
./scr/home 包含首页tab中的所有界面
./src/home/HomeContainer.js 首页界面
./scr/home/CalculatePage.js 计算界面
./src/home/CalculateResult.js 计算结果界面

./src/dataContainer/ 中包含所有的数据中的界面
./scr/dataContainer/DataContainer.js 数据界面的

./src/my/ 包含所有我的界面
./src/EditPassword.js 修改密码界面
./src/MyContainer.js 我的界面

./src/login/ 包含所有登录逻辑的界面
./src/login/Login.js 登录界面 手机密码及微信登录
./src/login/BindLogin.js 绑定微信和账号的界面
./src/login/Logout.js 登出界面
./src/login/ForgotPassword.js 忘记密码界面
```

#### 界面

components 包含所有的可复用性的界面view


#### 其他

```
./src/assets/ 中包含了所有的图片元素

./src/config/ 包含了环境变量等设置
```



#### 软件依赖
```
"axios": "^0.18.0"
"lodash": "^4.17.11",
"react": "16.6.3",
"react-native": "0.57.8",
"react-native-gesture-handler": "^1.0.12",
"react-navigation": "^3.0.8",
"react-navigation-redux-helpers": "^2.0.8",
"react-redux": "^6.0.0",
"redux": "^4.0.1",
"redux-axios-middleware": "^4.0.0",
"redux-saga": "^0.16.2"
```


#### 安装教程

```
yarn // 安装node_modules 包

react-native run-ios // 启动iOS
react-native run-android // 启动安卓
```