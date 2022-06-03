
![IBlog logo]("./public/IBlog.png")

# IBlog   

## Introduction - 介绍

### Summary - 概要
一款可以定制化开发的博客前后台系统，用户仅通过小部分的配置，就可以生成独特的个人博客网站，后端
采用前沿的serverless技术部署，有效减少用户的服务支出；

### Features - 特性
响应式，配置化，去服务

## Requirements - 必要条件
node > 12.0.0
npm > 6.0.0

## Installation - 安装

npm install 
yarn

## Usage - 用法

npm run start
//打包
npm run build

## 页面schema结构    
`{
    name:'Page',
    attributes: {
        title: 'wzh的个人小站'
    },
    children: [
        {
            name: 'Banner',
            atrtributes: {
                title: '',
                description:'',
                showSmallPic:bool,
                smallPicUrl:'',
                backgroundUrl: '',
                backgroundHeight: ''
            },
            children: []
        },
        {
            name: 'List',
            attributes: {

            },
            //里外children的结构一定要保持一致
            children: [
                name: 'Item',
                attributes: {
                    {
                    title: '',
                    description: '',
                    imageUrl: '',
                    link: ''
                    }
                },
                children: []
            ]
        },
        {
            name: 'Footer',
            attributes: {
                copyright:'',
                record: ''
            },
            children: [
                name: "Item",
                attributes: {
                    title: '',
                    link: ''
                },
                children: []
            ]
        }
    ]
}`

## License - 版权信息
MIT