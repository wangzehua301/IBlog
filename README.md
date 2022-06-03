{
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
}