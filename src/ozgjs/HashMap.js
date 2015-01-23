/**
var obj=new HashMap();
obj.put(key,value);(void) 存
obj.get(key);(Object) 取
obj.remove(key);(void) 删除
obj.containsKey(key);(Boolean) 是否包含Key
obj.containsValue(value);(Boolean) 是否包含Value
obj.values();(Array) 所有Value
obj.keys();(Array) 所有Key
obj.size();(int) 大小
obj.clear();(void) 清空

*/

function HashMap() {
    /** Map 大小 **/
    var size = 0;
    /** 对象 **/
    var entry = new Object();
   
    this.put = function(key, value) {
        if(!this.containsKey(key)) {
            size ++ ;
        }
        entry[key] = value;
    }
   
    this.get = function(key) {
        return this.containsKey(key) ? entry[key] : null;
    }
   
    this.remove = function(key) {
        if(this.containsKey(key) && (delete entry[key])) {
            size --;
        }
    }
   
    this.containsKey = function(key) {
        return (key in entry);
    }
   
    this.containsValue = function(value) {
        for(var prop in entry) {
            if(entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
   
    this.values = function() {
        var values = new Array();
        for(var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }
   
    this.keys = function() {
        var keys = new Array();
        for(var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }
   
    this.size = function() {
        return size;
    }
   
    this.clear = function() {
        size = 0;
        entry = new Object();
    }
}
