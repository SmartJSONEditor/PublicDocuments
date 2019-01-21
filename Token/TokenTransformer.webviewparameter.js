var ValueTransformer = function () {
    
    this.displayName = "Webview URL Parameter";
    this.shortDescription = "Extract url parameter value from OAuth web views and similar";
    this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
    this.parameters = function (config) {
        
        if (config == null) {
            return [];
        }
        
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
		
		var urlParameterUIParam = { 
            type: "String", 
            name: "urlParameterName",
            displayName: "URL Parameter Name", 
            description: "Url parameter name of resulting web view", 
            defaultValue: "",
			tokenScripts: true
        };
		
		var cacheUIParam = {
			name: "cache",
			type: "Bool",
			displayName: "Cache Found value",
			description: "If enabled, value will be cached even resulting WebView is removed or do not exists.",
			defaultValue: false
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
        
        return [popupUIParam, urlParameterUIParam, cacheUIParam, segmentsOutputUIParam];
    }
    
    this.transform = function (inputValue, parameters, userInfo) {
        
        var projectId = parameters.projectId;
        var parameterName = DocumentModel.getTokensValue(parameters.urlParameterName, userInfo.projectNode, pluginIdentifier);
		
		if (parameters.cache == 0) {
			DocumentModel.removeUserParameterValue("webview_parameter_storedValue");
		}
        
        if (projectId == undefined || projectId == "") { return "Error-Project-id-parameter-is-undefined-x"; };
        
        var urlParameters = DocumentModel.getWebViewURLParameters(projectId);
		// DocumentModel.log('Url Parameters:' + JSON.stringify(urlParameters));
        if (urlParameters.count == 0) { return "Error-no-parameters-found-x";};
		var value = DocumentModel.getUserParameterValue("webview_parameter_storedValue");
		
		for (var i = 0; i < urlParameters.length; i++) {
    		var parameterDic = urlParameters[i];
			if (parameterDic[parameterName] !== undefined && parameterDic[parameterName] !== null) {
				value = parameterDic[parameterName];				
				if (parameters.cache == 1) {
					DocumentModel.setUserParameterValue("webview_parameter_storedValue", value);
				}
				break;
			}
		}
		
		if (value == null) {
			value = "Error-no-value-found-x";
		}
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
    };
}

function sjeClass() {
    return new ValueTransformer();
}