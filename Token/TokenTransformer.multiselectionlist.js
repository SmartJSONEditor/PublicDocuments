var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "Multiselection list";
    this.shortDescription = "Toggle multiple values with custom output formatting.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
		
		var multiselectionUI = {
            name: "selectionlist",
            type: "Multiselection",
            displayName: "Selection List",
            description: "",
            userInfo: {
                valuePlaceholder: "Value"
            },
			tokenScripts: true
        };
			
		
		var multiselection = {
            type: "String",
            name: "joiner",
            displayName: "Join multiple selection items with:",
            description: "Multiple options join character",
            defaultValue: "&"
        };		
		
		var segmentsDefaultValues = [
			{
				displayName: "Prepend",
				enabled: 0
			},
			{
				displayName: "Replace",
				enabled: 1
			},
			{
				displayName: "Append",
				enabled: 0
			}
        ];

		var segmentsUIParam = {
			type: "Segments",
			name: "output",
			displayName: "Output",
			description: "Select how to output the value.",
			defaultValue: segmentsDefaultValues
		};
		
		// Tabs
		var tabItems = [
			{
				id: "SELECT",
				displayName: "Select",
				parameters: [multiselectionUI, segmentsUIParam]
            },
			{
				id: "SETUP",
				displayName: "Setup",
				parameters: [multiselection]
            },
		];

		var tabs = {
			name: "mainTabs",
			type: "Tabs",
			displayName: "Tabs",
			defaultValue: tabItems,
			userInfo: { minimalUI: true }
		};

		
        return [tabs];
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
				
		var joiner = parameters.joiner || '&';
		var valueArray = parameters.selectionlist || [];
		
		var values = [];
				
		for(var index in valueArray) {
			var item = valueArray[index];
			if (item.enabled === true) {
				var value = DocumentModel.getTokensValue(item.value, userInfo.projectNode, pluginIdentifier);
				values.push(value);
			}
		}

		var value = "";
		
		value = values.join(joiner);
				
		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return value;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		}
		return "Error-invalid-parameters-x";
    };
}

function sjeClass() {
    return new ValueTransformer();
}