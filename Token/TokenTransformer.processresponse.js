var ValueTransformer = function () {
    
    this.displayName = "Process Text/Html Response";
    this.shortDescription = "Extract values from Text or Html responses";
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
		
		var scriptUi = { 
            type: "Text", 
            name: "script",
            displayName: "Process Script", 
            description: "Javascript code \"responseString\" variable will be injected. Assign \"value\" variable to return your result.", 
            defaultValue: "value = responseString;",
			tokenScripts: true
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
        
        return [popupUIParam, scriptUi, segmentsOutputUIParam];
    }
    
    this.transform = function (inputValue, parameters, userInfo) {
        
        var projectId = parameters.projectId;
		var processScript = parameters.script || "";
        
        if (projectId == undefined || projectId == "") { return "Error-Project-id-parameter-is-undefined-x"; };
        
        var responseString = DocumentModel.getResponseString(projectId);
		if (!responseString || responseString === "") {
			return "Error-no-value-found-x";
		}
		
		var value = eval(processScript);
				
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