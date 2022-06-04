const schema = {
    name: "Page",
    attributes:{
        title: "IBlog"
    },
    children:[
       {
           name: "Banner",
           attributes: {
                title : "Test User",
                description:"This is a demo component.Now you can start writing your components!",
                showSmallPic:true,
                smallPicUrl:"http://serverless-project-static-file123.oss-cn-beijing.aliyuncs.com/images/IBlog.png",
                backgroundUrl: "http://serverless-project-static-file123.oss-cn-beijing.aliyuncs.com/images/yellow.png",
                backgroundHeight:"250px"
           },
           children: []
       }
    ]
}

export default schema;