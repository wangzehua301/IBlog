import { createStore , combineReducers } from 'redux';
import commonReducer  from './reducer.js';

//这样的设计模式就是，让每个板块的数据分离，因为store里面只存schema
//其他的就combine起来
const reducer = combineReducers({
    common: commonReducer
})

const store = createStore(reducer)

export default store;


//store里面的数据结构
// {
//     common: {
//         name: "Page",
//         attributes: {},
//         children: []
//     }
// }