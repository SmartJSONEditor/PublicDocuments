var ValueTransformer = function () {
    
    this.displayName = "JSON Path Selection";
    this.shortDescription = "Extract value from json responses or nodes using jsonPath.";
    this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
    this.parameters = function (config) {
        
        if (config == null) {
            return [];
        }
		// Parameters Tab
		var defaultValue = null;
		
		var userValues = DocumentModel.getUserParameterValue("JsonPathSelection.values");
		// DocumentModel.log('userValues: ' + userValues);
		
		if (userValues === null) {
			userValues = null;
		}
        var selectionUIParam = {
            name: "selectionPopup",
            type: "Popup",
            displayName: "Select JSON Path Value",
            description: "Select function type",
			defaultValue: userValues
        };
		
		var cacheUIParam = {
            name: "cache",
            type: "Bool",
            displayName: "Cache popup values",
            description: "Enable to cache values and improve performance.",
			defaultValue: false
        };
		
		
		// Setup Tab
		
		var allNodes = [];
        try {
            allNodes = DocumentModel.getProjectIdList();
        } catch (e) {
            allNodes = [];
        }
		
        if (allNodes.length == 0) {
            var error = {
                name: "urlSection",
                type: "Section",
                displayName: "No Projects found ",
                description: "You do not have any project nodes yet"
            };
            return [error];
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
        
        var jsonPathName = { 
            type: "JsonPath",
            name: "jsonPathName", 
            displayName: "Popup Display Name Json Path (Optional)",
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
				parameters: [selectionUIParam, cacheUIParam, segmentsOutputUIParam]
            },
			{
				id: "SETUP",
				displayName: "Setup",
				parameters: [popupUIParam, jsonPathName, jsonPathValue]
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
        
		DocumentModel.log(JSON.stringify(parameters));
		// Parameters
        var projectId = parameters.projectId;
        var jsonPathName = parameters.jsonPathName;
		var jsonPathValue = parameters.jsonPathValue;
		var cache = parameters.cache;
        
        if (projectId == undefined || projectId == "") { return "Error-Project-id-parameter-is-undefined-x"; };
        
		var nameList = [];
		var valueList = [];
		
        var nameList = DocumentModel.jsonPath(projectId,jsonPathName);
        if (nameList == undefined) { nameList = [];};
        if (nameList.count == 0) { nameList = [];};
		
		var valueList = DocumentModel.jsonPath(projectId,jsonPathValue);
        if (valueList == undefined) { valueList = [];};
        if (valueList.count == 0) { valueList = [];};	
		
		
		var changeHash = projectId + ":" + jsonPathName + ":" + jsonPathValue;
		var lastChangeHash = DocumentModel.getUserParameterValue("JsonPathSelection.changeHash");
		
		var value = (Array.isArray(parameters.selectionPopup) == true) ? '' : parameters.selectionPopup;
		        
		if (value === undefined) {
			value = 'Error-undefined-value-x';
		}
							
		if ((changeHash !== lastChangeHash) || cache === false) {
			// Create new values
			// DocumentModel.log('Recreating values');
			displayNameValueArray = [];
			
			for(var index in nameList) {
				var itemKey = nameList[index];
				var keyOutput = null;
				if (itemKey.isContainer == 1) {
					keyOutput = itemKey.toJavascriptValue();
            		keyOutput = JSON.stringify(keyOutput);
				} else {
					keyOutput = itemKey.value;
				}
				
				displayNameValueArray.push({ displayName: keyOutput, value: ''});
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
				
				if (index < nameList.length) {
					var item = displayNameValueArray[index];
					item.displayName = item.displayName + " : " + valueOutput;
					item.value = valueOutput;
				} else {
					displayNameValueArray.push({ displayName: valueOutput, value: valueOutput });
				}
			}
			
			// DocumentModel.log('generatedValues: ' + JSON.stringify(displayNameValueArray));
			DocumentModel.setUserParameterValue("JsonPathSelection.values", displayNameValueArray);
			DocumentModel.setUserParameterValue("JsonPathSelection.changeHash", changeHash);
		}
		
		// DocumentModel.log('value: ' + JSON.stringify(value));
		// DocumentModel.log('inputValue: ' + inputValue);
		
		if (value == null) {
			value = '';
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