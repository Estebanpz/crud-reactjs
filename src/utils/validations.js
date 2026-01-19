export function validateEmpityFields(item){
    if(!item.name || item.name.length == 0){
        return false;
    };

    if(!isNaN(item.price) || item.price <= 0 || parseFloat(item.price)<=0){
        return false;
    }

    return true;
}