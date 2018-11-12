var ValueTransformer = function () {

	this.displayName = "API Variables";
	this.shortDescription = "Return variable value defined in current API tree";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
        
        var allVariables = [];
        try {
            allVariables = DocumentModel.getVariablesList(config.projectNode, pluginIdentifier);
        } catch (e) {
            
        }
        
		if (allVariables.length == 0 ) {
			var urlSection = {
            	name: "urlSection",
            	type: "Section",
            	displayName: "No API Variables Found",
            	description: "Define variables in current APIEndpoint or parents APIGroups."
        	};
			return [urlSection];
		}

		var popupDefaultValue = [];

		for (var i in allVariables) {
            var name = allVariables[i];
			popupDefaultValue.push({
				displayName: name,
				value: name
			});
		}

		var popupUIParam = {
			name: "popup",
			type: "Popup",
			displayName: "API Variables",
			description: "Select variable value",
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
            return "Error-no-variable-value-x";
		};
        
        var value = "";
        try {
            value = DocumentModel.getVariableValue(propertyName, userInfo.projectNode, pluginIdentifier);
        } catch (e) {
            value = "Error-no-variable-value-found-x>"
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