var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "Key : Value list";
    this.shortDescription = "Key value list with custom output formatting.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
		
		var keyValueListUI = {
            name: "dictionary",
            type: "Dictionary",
            displayName: "Key : Value list",
            description: "",
            userInfo: {
                keyPlaceholder: "Key",
                valuePlaceholder: "Value"
            },
			tokenScripts: true
        };
		
		var outputDefaultValue = [
			{ displayName: "Using Format", value: "format" },
            { displayName: "Key", value: "key" },
            { displayName: "Value", value: "value" }
        ];

        var output = {
            name: "outputFormat",
            type: "Popup",
            displayName: "Output format",
            description: "Select between key, value or format.",
            defaultValue: outputDefaultValue
        };
        
        var outputFormat = {
            type: "String",
            name: "format",
            displayName: "Output string format",
            description: "Define your output format using %k, %v tokens such %k:%v",
            defaultValue: "%k=%v",
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
				parameters: [keyValueListUI]
            },
			{
				id: "SETUP",
				displayName: "Setup",
				parameters: [output, outputFormat, multiselection, segmentsUIParam]
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
				
		var outputType = (Array.isArray(parameters.outputFormat) == true) ? "format" : parameters.outputFormat;
		var outputFormat = parameters.format || '%k=%v';
		outputFormat = DocumentModel.getTokensValue(outputFormat, userInfo.projectNode, pluginIdentifier)
		var joiner = parameters.joiner || '&';
		var keyValueArray = parameters.dictionary || [];
		
		var keys = [];
		var values = [];
				
		for(var index in keyValueArray) {
			var item = keyValueArray[index];
			if (item.enabled === true) {
				keys.push(item.key);
				var value = DocumentModel.getTokensValue(item.value, userInfo.projectNode, pluginIdentifier);
				values.push(value);
			}
		}

		var value = "";
		
		if (outputType == 'key') {
			if (keys.length > 1) {
				value = keys.join(joiner);
			} else {
				value = keys[0];
			}
		}
		if (outputType == 'value') {
			if (values.length > 1) {
				value = values.join(joiner);
			} else {
				value = values[0];
			}
		}
		if (outputType == 'format') {
			
			var chunks = [];
			for (var i in keys) {
				
				var key = keys[i];
				var value = values[i];
				var formatString = outputFormat;
				var replaceKey = formatString.replace(eval("/" + "%k" + "/g"), key);
				var replaceValue = replaceKey.replace(eval("/" + "%v" + "/g"), value);
				chunks.push(replaceValue);
			}
			
			value = chunks.join(joiner);
		}
				
		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return value;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		}
		return "Error-invalid-parameters";
    };
}

function sjeClass() {
    return new ValueTransformer();
}

