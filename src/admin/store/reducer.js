//这个reducer主要存储和修改schema

//引入immer，让可以避免重复生成相同的对象，加大内存的消耗。有助于提高性能以及稳定,但是也有问题就是之后修改得用深拷贝
import { produce , original } from 'immer';
import store from '.';
import { CHANGE_SCHEMA ,ADD_PAGE_CHILDREN , CHANGE_PAGE_CHILDREN , DELETE_PAGE_CHILD , CHANGE_PAGE_CHILD_POSITION , CHANGE_PAGE_ATTRIBUTES} from './constant'



const initialSchema = {
    name: "Page",
    attributes:{title: ''},
    children: [{}]
}
    

const defaultState = {
    schema: initialSchema
}
//根据接收到的action来修改store里面的数据
//draft里面的数据就相当于是store里面的数据
const reducer = (state = defaultState , action) => produce(state, (draft) => {
    switch(action.type){
        case CHANGE_SCHEMA:
            console.log('action',action)
            draft.schema = action.value;
            break;
        case ADD_PAGE_CHILDREN: 
            draft.schema.children.push(action.value);
            break;
        case CHANGE_PAGE_CHILDREN: 
            draft.schema.children.splice(action.index,1,action.value);
            break;
        case DELETE_PAGE_CHILD:
            draft.schema.children.splice(action.value, 1);
            break;
        case CHANGE_PAGE_ATTRIBUTES:
            console.log('store',store)
            draft.schema.attributes[action.key] = action.value
            
            break;
        case CHANGE_PAGE_CHILD_POSITION:
            const copy = original(draft.schema.children);
            draft.schema.children.splice(action.oldIndex, 1);
            draft.schema.children.splice(action.newIndex, 0, copy[action.oldIndex]);
            break;
        default:
        break;
    }
})


export default reducer;