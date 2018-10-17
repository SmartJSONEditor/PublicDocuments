// Range includes max

function integer(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArrayIndex(max) {
    return Math.floor(Math.random() * max);
}
   
function float(optionsMin,optionsMax,optionsFixed) {
    
    var MAX_INT = 9007199254740992;
    var MIN_INT = -MAX_INT;
    
    var num;
    var fixed = Math.pow(10, optionsFixed);
    
    var max = MAX_INT / fixed;
    var min = -max;
    
    num = integer(optionsMin * fixed, optionsMax * fixed);
    var num_fixed = (num / fixed).toFixed(optionsFixed);
    
    return parseFloat(num_fixed);
}

function timeCodeString(secondsNumber) {
	var sec_num = parseInt(secondsNumber, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

