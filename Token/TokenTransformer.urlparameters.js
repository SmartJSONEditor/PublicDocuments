var ValueTransformer = function () {

	this.displayName = "Request URL Parameters";
	this.shortDescription = "Return value of any url parameter";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}

        var allParameters = [];
        try {
            allParameters = DocumentModel.getParametersList(config.projectNode, pluginIdentifier);
        } catch (e) {
            
        }
        
		if (allParameters.length == 0 ) {
			var urlSection = {
            	name: "urlSection",
            	type: "Section",
            	displayName: "No URL Parameters Found",
            	description: "Current request has no url parameters defined."
        	};
			return [urlSection];
		}

		var popupDefaultValue = [];

		for (var i in allParameters) {
            var name = allParameters[i];
			popupDefaultValue.push({
				displayName: name,
				value: name
			});
		}

		var popupUIParam = {
			name: "popup",
			type: "Popup",
			displayName: "Request URL Parameter",
			description: "Select URL Parameter value",
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
            return "Error-no-parameter-value-x";
		};
        
        var value = "";
        try {
            value = DocumentModel.getParameterValue(propertyName, userInfo.projectNode, pluginIdentifier);
        } catch (e) {
            value = "Error-no-parameter-value-found-x"
        }
		
		if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
		return "Error-invalid-parameters-x";
	};
}

function sjeClass() {
	return new ValueTransformer();
}