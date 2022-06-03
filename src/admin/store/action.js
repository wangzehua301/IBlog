import { CHANGE_SCHEMA , 
    ADD_PAGE_CHILDREN , 
    CHANGE_PAGE_CHILDREN ,
    DELETE_PAGE_CHILD,
    CHANGE_PAGE_CHILD_POSITION,
    CHANGE_PAGE_ATTRIBUTES
} from './constant'


export const getChangeSchemaAction = (schema) => {
    return {
        type: CHANGE_SCHEMA,
        value: schema
    }
}

export const getAddPageChildrenAction = () => {
    return {
        type: ADD_PAGE_CHILDREN,
        value: {}
    }
}

export const getChangePageChildAction = (index,schema) => {
    return {
        type: CHANGE_PAGE_CHILDREN,
        index,
        value: schema   
    }
}

export const getDeletePageChildAction = (index) => {
    return {
        type: DELETE_PAGE_CHILD,
        value: index   
    }
}

export const getChangePageChildPositionAction = (oldIndex, newIndex) => {
    return { type: CHANGE_PAGE_CHILD_POSITION, oldIndex, newIndex };
  }

  export const getChangePageAttributesAction = (key, value) => {
    return { type: CHANGE_PAGE_ATTRIBUTES, key, value };
  }