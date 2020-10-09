#两个属性 (非必须传)

:isAddMenDian  true 显示  false 隐藏
:defaultObj  {
    selectedQus 默认选择的店群  id数组
    selectedMds 默认选择的门店  id数组
    selectedMdObjs 默认选择的门店  对象数组 每个对象需要转换字段
    isDisabled  true 默认选择的门店禁用  
}
#回填默认值的时候 getZDmd 不传type参数  利用下边函数转换字段
export function getZDmd(arr = [], type) {
    const newArr = [];
    arr.forEach(obj => {
        newArr.push({
        label: obj.shop_name,
        key: obj.shop_id,
        disabled: false,
        mdId: obj.shop_id,
        mdQunId: obj.shop_group_id,
        mdQunName: obj.shop_group_name,
        mdName: obj.shop_name + ' ' + obj.shop_tel,
        mdLXR: obj.shop_man,
        mdAddress: type === 'all' ? obj.shop_address : obj.address,
        mdTime: obj.shop_desc
        });
    });
    return newArr;
}
#一个事件
@confirmAddMenDian 事件处理函数里可以拿到选择的门店的id数组 和 对象数组  该事件在点确认按钮触发