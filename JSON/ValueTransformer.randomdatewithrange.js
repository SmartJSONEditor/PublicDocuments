var ValueTransformer = function () {

    this.displayName = "Random Date with Range";
    this.shortDescription = "Creates random date string with format within defined range";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-RandomDateWithRange";
    
    this.parameters = function () {
        var popupDefaultValue = [
            { displayName: "Timestamp in seconds | parse() * 1000", value: "timestamp_seconds" },
            { displayName: "Timestamp in miliseconds | parse()", value: "timestamp_miliseconds" },
            { displayName: "Mon Jan 01 2000 | toDateString()", value: "toDateString" },
            { displayName: "2000-01-01T00:00:00.000Z | toISOString()", value: "toISOString" },
            { displayName: "01/01/2000 | toLocaleDateString()", value: "toLocaleDateString" },
            { displayName: "Mon Jan 01 200 00:00:00 GMT-00600 (CST) | toString()", value: "toString" },
            { displayName: "Mon, 01 Jan 2000 00:00:00 GMT | toUTCString()", value: "toUTCString" },
            { displayName: "Swift DateFormatter Format", value: "dateformatter" }
        ];

        var popupUIParam = {
            name: "type",
            type: "Popup",
            displayName: "Date Output Format",
            description: "Select date output format.",
            defaultValue: popupDefaultValue
        };
        
        var mindateUIParam = { 
            type: "String",
            name: "minDate",
            displayName: "Min Date",
            description: "Minimum date in Javascript ISO format of yyyy-mm-dd", 
            defaultValue: "2017-01-01"
        };
        
        var maxdateUIParam = { 
            type: "String",
            name: "maxDate",
            displayName: "Max Date",
            description: "Maximum date in Javascript ISO format of yyyy-mm-dd", 
            defaultValue: "2017-01-30"
        };
        
        var swiftFormatUIParam = { 
            type: "String",
            name: "swiftFormatter",
            displayName: "Swift DateFormatter Format",
            description: "Using Apple Swift DateFormatter class format string.", 
            defaultValue: "yyyy-MM-dd"
        };
        
        var segmentsDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsUIParam = {
            type: "Segments",
            name: "output", 
            displayName: "Output",
            description: "Select how to output the value.", 
            defaultValue: segmentsDefaultValues 
        };
        
        return [mindateUIParam, maxdateUIParam, popupUIParam, swiftFormatUIParam, segmentsUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        
		var type = (Array.isArray(parameters.type) == true) ? "timestamp_seconds" : parameters.type;
		var minDateString = (parameters.minDate === undefined) ? "2017-01-01" : parameters.minDate;
		var maxDateString = (parameters.maxDate === undefined) ? "2017-01-30" : parameters.maxDate;
		var format = (parameters.swiftFormatter === undefined) ? "" : parameters.swiftFormatter;
		
		var minDate = new Date(minDateString).getTime();
		var maxDate = new Date(maxDateString).getTime();
		
		if (minDate > maxDate) {
		    var tempMin = minDate;
		    var tempMax = maxDate
		    minDate = tempMax;
		    maxDate = tempMin;
		}
		
		var randomTimestamp = integer(minDate, maxDate);		
		var randomDate = new Date(randomTimestamp);
        
        var value;
		
		if (type == "timestamp_seconds") { value = parseInt(Date.parse(randomDate) / 1000); }
		if (type == "timestamp_miliseconds") { value = Date.parse(randomDate); }
		if (type == "toDateString") { value = randomDate.toDateString(); }
		if (type == "toISOString") { value = randomDate.toISOString(); }
		if (type == "toLocaleDateString") { value = randomDate.toLocaleDateString(); }
		if (type == "toString") { value = randomDate.toString(); }
		if (type == "toUTCString") { value = randomDate.toUTCString(); }
		if (type == "dateformatter") { value = DocumentModel.dateTimeString(format, parseInt(Date.parse(randomDate) / 1000)); }
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };

        return "Error";
    };
    
    function integer(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

function sjeClass() {
    return new ValueTransformer();
}