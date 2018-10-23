/* 
*   arr 数组对象，id选择过滤条件，对象type选择属性值
*   eg: 选取val[type] == id
*/
function filterArrayToObj(arr,id,type) {
    if(!arr) return;
    type = type || 'id';
    if(arr instanceof Array && arr.length>0) {
        let selectedArr = arr.filter(val => {
            return val[type] == id;
        })
        return selectedArr[0]
    }
}
export default {
    filterArrayToObj
}