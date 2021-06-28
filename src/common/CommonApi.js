export default class CommonApi{
    static SetProperties(InputName, event){
        var field = {};
        
        switch(event.target.type){
            case "checkbox":
                field[InputName] = event.target.checked ? 1 : 0;
                break;
            case "select-one":
                field[InputName] =event.target.value;
                break;
            case "radio":
                alert("Não sei o que fazer ainda!");
                break;
            default :
                field[InputName] =event.target.value;
        }

        return field;
    }

    static FormatDate(date, formatType= 2, separator ="/", originalType = 1){
        /* 
            originalType
            1 = aaaa-mm-dd
            2 = dd-mm-aaaa
            3 = mm-dd-aaaa
        */
        /*
            formatType 
            1 = aaaa-mm-dd
            2 = dd-mm-aaaa
            3 = mm-dd-aaaa
        */
        date = date.split("-").join("").split("/").join("");
        
        let formatedDate = "";

        switch (formatType) {
            case 1:
                if(originalType === 1)
                    formatedDate = date.substring(0,4)+separator+date.substring(4,6)+separator+date.substring(6,8);
                else if(originalType === 2)
                    formatedDate = date.substring(4,8)+separator+date.substring(2,4)+separator+date.substring(0,2);
                break;
            case 2:
                formatedDate = date.substring(6,8)+separator+date.substring(4,6)+separator+date.substring(0,4);
                break;
            case 3:
                formatedDate = date.substring(4,6)+separator+date.substring(6,8)+separator+date.substring(0,4);
            break;
            default:
                formatedDate = date.substring(6,8)+separator+date.substring(4,6)+separator+date.substring(0,4);
                break;
        }

        return formatedDate; 
    }

    static FireNotification(title, message, Icon, callbackAction,parameter){
        if("Notification" in window){
            var ask = Notification.requestPermission();
            ask.then(permission =>{
                if(permission === "granted"){
                    var msg = new Notification(title, {
                        body: message,
                        icon: Icon
                    });
                    msg.addEventListener("click", event =>{
                        if(callbackAction !== null)
                            callbackAction(parameter);
                        msg.close();
                        window.focus();
                    });
                }
            });
    
        }
    }

    static CompareArrays(value, other) {
        var self = this;
        
        // Get the value type
        var type = Object.prototype.toString.call(value);
    
        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) return false;
    
        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    
        // Compare the length of the length of the two items
        var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) return false;
    
        // Compare two items
        var compare = function (item1, item2) {
    
            // Get the object type
            var itemType = Object.prototype.toString.call(item1);
    
            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!self.CompareArrays(item1, item2)) return false;
            }
    
            // Otherwise, do a simple comparison
            else {
    
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(item2)) return false;
    
                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) return false;
                } else {
                    if (item1 !== item2) return false;
                }
    
            }
        };
    
        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) return false;
            }
        } else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) return false;
                }
            }
        }
    
        // If nothing failed, return true
        return true;
    
    }

    static ArrayRemove(arr, value){
        return arr.filter(function(ele){
            return ele !== value;
        });
    }

    static GenerateMonthList(){
        let Months = [
            {number: 1, month: 'Janeiro'},
            {number: 2, month: 'Feveiro'}, 
            {number: 3, month:'Março'},
            {number: 4, month:'Abril'}, 
            {number: 5, month:'Maio'}, 
            {number: 6, month:'Junho'}, 
            {number: 7, month:'Julho'}, 
            {number: 8, month:'Agosto'}, 
            {number: 9, month:'Setembro'}, 
            {number: 10, month:'Outubro'}, 
            {number: 11, month:'Novembro'}, 
            {number: 12, month:'Dezembro'}
            ];

        return Months;
    }

    static GenerateWeekList(){
        let WeekDays = [
            {number: 0, weekDay: 'Domingo'},
            {number: 1, weekDay: 'Segunda'}, 
            {number: 2, weekDay:'Terça'},
            {number: 3, weekDay:'Quarta'}, 
            {number: 4, weekDay:'Quinta'}, 
            {number: 5, weekDay:'Sexta'}, 
            {number: 6, weekDay:'Sábado'}
            ];

        return WeekDays;
    }

    static GenerateDaysList(month){
        let now = new Date();
        let lastDay = month === -1 ? 31 : new Date(now.getFullYear(), month, 0).getDate();
        let days = [];

        for(let i =0; i < lastDay; i++)
            days.push(i+1);
        
        if(month === 2)
            days.push(29);

        return days;
    }

    static GenerateHourList(){
        let hours = [];

        for(let i =0; i<24; i++){
            hours.push({
                number: i, hour: i < 10 ? '0'+i : i
            });
        }

        return hours;
    }

    static GenerateMinutesList(){
        let minutes = [];

        for(let i = 0; i<=60; i++){
            minutes.push({
                number: i, minute: i < 10 ? '0'+i : i
            });
        }

        return minutes;
    }
}