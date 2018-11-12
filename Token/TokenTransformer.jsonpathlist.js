var ValueTransformer = function () {
    
    this.displayName = "JSON Path List Value";
    this.shortDescription = "Extract key value pairs from json responses or nodes using jsonPath.";
    this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
    this.parameters = function (config) {
        
        if (config == null) {
            return [];
        }
		
		// Parameters Tab
		
		var defaultValue = null;
		
		var userValues = DocumentModel.getUserParameterValue("JsonPathList.values");
		if (userValues) {
			defaultValue = userValues;
		}
		
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
		
		if (defaultValue !== null) {
			keyValueListUI.defaultValue = defaultValue;
		}
		
		// Setup Tab
		
		var allNodes = [];
        try {
            allNodes = DocumentModel.getProjectIdList();
        } catch (e) {
            allNodes = [];
        }
		
        if (allNodes.length == 0) {
            var urlSection = {
                name: "urlSection",
                type: "Section",
                displayName: "No Projects found ",
                description: "You do not have any project nodes yet"
            };
            return [urlSection];
        }
        
        var popupDefaultValue = [];
		
		for (var i = 0; i<allNodes.length; i++) {
			var item = allNodes[i];
            popupDefaultValue.push({
                displayName: item.displayName,
                value: item.projectId,
				imageName: item.imageName
            });
		}
        
        var popupUIParam = {
            name: "projectId",
            type: "Popup",
            displayName: "Project Identifier",
            description: "Select Project Identifier",
            defaultValue: popupDefaultValue
        };
        
        var jsonPathKey = { 
            type: "JsonPath",
            name: "jsonPathKey", 
            displayName: "Key Json Path",
            description: "Use space to initiate a json path search or use $ to access root element.",
			placeholder: "Use space to traverse",
            defaultValue: "",
			scriptsDisabled: true,
			userInfo: { projectIdParameterName : "projectId" }
        };
		
		var jsonPathValue = { 
            type: "JsonPath",
            name: "jsonPathValue", 
            displayName: "Value Json Path",
            description: "Use space to initiate a json path search or use $ to access root element.",
			placeholder: "Use space to traverse",
            defaultValue: "",
			scriptsDisabled: true,
			userInfo: { projectIdParameterName : "projectId" }
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

		var segmentsOutputUIParam = {
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
				parameters: [popupUIParam, jsonPathKey, jsonPathValue, output, outputFormat, multiselection, segmentsOutputUIParam]
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
        
    }
    
    this.transform = function (inputValue, parameters, userInfo) {
        
		// Parameters
        var projectId = parameters.projectId;
        var jsonPathKey = parameters.jsonPathKey;
		var jsonPathValue = parameters.jsonPathValue;
		var outputType = (Array.isArray(parameters.outputFormat) == true) ? "format" : parameters.outputFormat;
		var outputFormat = parameters.format || '%k=%v';
		outputFormat = DocumentModel.getTokensValue(outputFormat, userInfo.projectNode, pluginIdentifier)
		var joiner = parameters.joiner || '&';
		var keyValueArray = parameters.dictionary || [];
        
        if (projectId == undefined || projectId == "") { return "Error-Project-id-parameter-is-undefined-x"; };
        
		var keyList = [];
		var valueList = [];
		
        var keyList = DocumentModel.jsonPath(projectId,jsonPathKey);
        if (keyList == undefined) { keyList = [];};
        if (keyList.count == 0) { keyList = [];};
		
		var valueList = DocumentModel.jsonPath(projectId,jsonPathValue);
        if (valueList == undefined) { valueList = [];};
        if (valueList.count == 0) { valueList = [];};	
		
		
		var changeHash = projectId + ":" + jsonPathKey + ":" + jsonPathValue;
		var lastChangeHash = DocumentModel.getUserParameterValue("JsonPathList.changeHash");
		
		// DocumentModel.log('changeHash: ' + changeHash + ' lastChangeHash: ' + lastChangeHash);
		
		var keys = [];
		
		if ((changeHash !== lastChangeHash) || keyValueArray === []) {
			// Create new values
			
			keyValueArray = [];
			
			for(var index in keyList) {
				var itemKey = keyList[index];
				var keyOutput = null;
				if (itemKey.isContainer == 1) {
					keyOutput = itemKey.toJavascriptValue();
            		keyOutput = JSON.stringify(keyOutput);
				} else {
					keyOutput = itemKey.value;
				}
				
				keyValueArray.push({ key: keyOutput, value: '', enabled: false});
			}			
			
			for(var index in valueList) {
				var itemValue = valueList[index];
				var valueOutput = null;
				if (itemValue.isContainer == 1) {
					valueOutput = itemValue.toJavascriptValue();
            		valueOutput = JSON.stringify(valueOutput);
				} else {
					valueOutput = itemValue.value;
				}
				
				if (index < valueList.length) {
					var item = keyValueArray[index];
					item.value = valueOutput;
				} else {
					keyValueArray.push({ key: '', value: valueOutput, enabled: false});
				}
			}	
			
			DocumentModel.setUserParameterValue("JsonPathList.values", keyValueArray);
			DocumentModel.setUserParameterValue("dictionary", keyValueArray);
			DocumentModel.setUserParameterValue("JsonPathList.changeHash", changeHash);
		}
        
		var value = "";
		
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
        
		if (value === undefined) {
			value = 'Error-undefined-value-x';
		}
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
        return "Error-invalid-parameters-x";
    };
    
    function getRandomArbitrary(min, max) {
        var doubleValue =  Math.random() * (max - min) + min;
        return parseInt(doubleValue);
    };
}

function sjeClass() {
    return new ValueTransformer();
}
