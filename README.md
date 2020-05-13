## vue-fullstack-learn

> Vue + Vuex + ElementUI + axios
> 
> Express + Mongoose+MongoDB

## 三个小app：用于学习vue相关技术栈
> 一个ToDo用来学Vuex([Vuex学习总结](http://scarsu.com/vue_store_and_vuex/))
>
> 一个单词本用来做fullstack增删改查练习(需要自行更改mongodb配置)
>
> 一个基于Vue开发的[Message插件](https://www.npmjs.com/package/vue-message-plugin)，工作方式和ElementUI/Message基本一致

## project create script
```bash
npm install -g @vue/cli-init
## @vue/cli-init包作用：让vue-cli3，即@vue/cli兼容Vue-Cli 2的`vue init`命令

vue init webpack vue-fullstack-learn
## 用webpack模板创建一个新项目
```

## Build Setup

``` bash
# install dependencies
npm install

# frontend with hot reload at localhost:8080
npm run dev

# backend without hot reload at localhost:3000
npm run server

# backend node devtool mode
npm run server-dev
```