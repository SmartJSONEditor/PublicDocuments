var ValueTransformer = function () {

	this.displayName = "Request Headers";
	this.shortDescription = "Return value of any available headers";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}

        var allHeaders = [];
        try {
            allHeaders = DocumentModel.getHeadersList(config.projectNode, pluginIdentifier);
        } catch (e) {
            
        }
        
		if (allHeaders.length == 0 ) {
			var urlSection = {
            	name: "urlSection",
            	type: "Section",
            	displayName: "No Headers Found",
            	description: "Current request has no headers defined."
        	};
			return [urlSection];
		}

		var popupDefaultValue = [];

		for (var i in allHeaders) {
            var name = allHeaders[i];
			popupDefaultValue.push({
				displayName: name,
				value: name
			});
		}

		var popupUIParam = {
			name: "popup",
			type: "Popup",
			displayName: "Request Header",
			description: "Select Header value",
			defaultValue: popupDefaultValue
		};
		
		var segmentsOutputDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsOutputUIParam = { 
            type: "Segments", 
            name: "output",
            displayName: "Output", 
            description: "Prepend, replace or append value.", 
            defaultValue: segmentsOutputDefaultValues 
        };

		return [popupUIParam, segmentsOutputUIParam];
	};

	this.transform = function (inputValue, parameters, userInfo) {
		
        var propertyName = parameters.popup;
		if (propertyName == undefined || propertyName == "") {
            return "Error-no-header-value";
		};
        
        var value = "";
        try {
            value = DocumentModel.getHeaderValue(propertyName, userInfo.projectNode, pluginIdentifier);
        } catch (e) {
            value = "Error-no-header-value-found"
        }
		
		if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
		return "Error";
	};
}

function sjeClass() {
	return new ValueTransformer();
}
