var ValueTransformer = function () {

    this.displayName = "Timestamp with offset";
    this.shortDescription = "Creates now date string with offset in seconds";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
	
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		
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
        
        var offsetInSeconds = { 
            type: "Number",
            name: "offsetSeconds",
            displayName: "Seconds Offset",
            description: "Offset in seconds, use negative value for earlier time", 
            defaultValue: 0,
			tokenScripts: true
        };
		
		var offsetInMinutes = { 
            type: "Number",
            name: "offsetMinutes",
            displayName: "Minutes Offset",
            description: "Offset in minutes, use negative value for earlier time", 
            defaultValue: 0,
			tokenScripts: true
        };
		
		var offsetInHours = { 
            type: "Number",
            name: "offsetHours",
            displayName: "Hours Offset",
            description: "Offset in hours, use negative value for earlier time", 
            defaultValue: 0,
			tokenScripts: true
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
        
        return [offsetInSeconds, offsetInMinutes, offsetInHours, popupUIParam, swiftFormatUIParam, segmentsUIParam];
    }
    
    this.transform = function (inputValue, parameters, userInfo) {
        
		var type = (Array.isArray(parameters.type) == true) ? "timestamp_seconds" : parameters.type;
		var offsetInSeconds = (parameters.offsetSeconds === 0) ? 0 : parameters.offsetSeconds;
		var offsetInMinutes = (parameters.offsetMinutes === 0) ? 0 : parameters.offsetMinutes;
		var offsetInHours = (parameters.offsetHours === 0) ? 0 : parameters.offsetHours;
		
		offsetInSeconds = DocumentModel.getTokensValue(offsetInSeconds, userInfo.projectNode, pluginIdentifier);
		offsetInMinutes = DocumentModel.getTokensValue(offsetInMinutes, userInfo.projectNode, pluginIdentifier);
		offsetInHours = DocumentModel.getTokensValue(offsetInHours, userInfo.projectNode, pluginIdentifier);
		
		var format = (parameters.swiftFormatter === undefined) ? "" : parameters.swiftFormatter;
		
		var offset = offsetInSeconds;
		offset = offset + (offsetInMinutes * 60);
		offset = offset + (offsetInHours * 60 * 60);
		
		var date = new Date(new Date().getTime() + (offset * 1000));
        
        var value;
		
		if (type == "timestamp_seconds") { value = parseInt(Date.parse(date) / 1000); }
		if (type == "timestamp_miliseconds") { value = Date.parse(date); }
		if (type == "toDateString") { value = date.toDateString(); }
		if (type == "toISOString") { value = date.toISOString(); }
		if (type == "toLocaleDateString") { value = date.toLocaleDateString(); }
		if (type == "toString") { value = date.toString(); }
		if (type == "toUTCString") { value = date.toUTCString(); }
		if (type == "dateformatter") { value = DocumentModel.dateTimeString(format, parseInt(Date.parse(date) / 1000)); }
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };

        return "Error-invalid-parameters-x";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
