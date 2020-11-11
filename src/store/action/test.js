import actionType from "./actionType";
const add = (id)=>{
    return {
        type:actionType.TOTALNUM,
        payload:3
    }
}

const decement=(id)=>{
    return {
        payload:'5666'
    }
}

export {
    add,
    decement
}