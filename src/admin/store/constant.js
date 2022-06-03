//为每个页面定义一个命名空间，避免产生常量冲突
const nameSpace = "COMMON"

export const CHANGE_SCHEMA = `${nameSpace}/CHANGE_SCHEMA`;
export const ADD_PAGE_CHILDREN = `${nameSpace}/ADD_PAGE_CHILDREN`;
export const CHANGE_PAGE_CHILDREN = `${nameSpace}/CHANGE_PAGE_CHILDREN`;
export const DELETE_PAGE_CHILD = `${nameSpace}/REMOVE_PAGE_CHILDREN`;
export const CHANGE_PAGE_CHILD_POSITION = `${nameSpace}/CHANGE_PAGE_CHILD_POSITION`;
export const CHANGE_PAGE_ATTRIBUTES = `${nameSpace}/CHANGE_PAGE_ATTRIBUTES`;