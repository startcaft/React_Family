/**
 * Created by Administrator on 2018/5/17.
 */


function set(key,value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
function get(key,exp){
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time>exp) {
        console.log('信息已过期');
        //alert("信息已过期")
    }else{
        //console.log("data="+dataObj.data);
        //console.log(JSON.parse(dataObj.data));
        var dataObjDatatoJson = JSON.parse(dataObj.data)
        return dataObjDatatoJson;
    }
}


export {set as setStorage,get as getStorage};