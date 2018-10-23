/* 
*  str: 字符串， type: 截取类型
*/

function subStringEOS(str,type) {
    type = type || 'EOS';
    if(!str) return;
    if(typeof(str) == 'string') {
        let index = str.indexOf(type);
        index = index ? index : str.length;
        return str.substring(0,index); 
    }
    return str;    
}

export default {
    subStringEOS
}