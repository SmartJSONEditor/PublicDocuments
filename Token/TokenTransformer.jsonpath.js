var ValueTransformer = function () {
    
    this.displayName = "JSON Path";
    this.shortDescription = "Extract value from json responses or nodes using jsonPath.";
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
        
        var jsonPath = { 
            type: "JsonPath",
            name: "jsonPath", 
            displayName: "Json Path",
            description: "Use space to initiate a json path search or use $ to access root element.",
			placeholder: "Use space to traverse",
            defaultValue: "",
			scriptsDisabled: true,
			userInfo: { projectIdParameterName : "projectId" }
        };
		
		 var segmentsDefaultValues = [
            { displayName: "First Found", enabled: 1 }, 
            { displayName: "Random" , enabled: 0 }
        ];
		
		var segmentsUIParam = { 
            type: "Segments",
            name: "segments", 
            displayName: "Relative index",
            description: "For relative jsonPaths, use first or random value index.",
            defaultValue: segmentsDefaultValues
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
        
        return [popupUIParam, jsonPath, segmentsUIParam, segmentsOutputUIParam];
    }
    
    this.transform = function (inputValue, parameters, userInfo) {
        
        var projectId = parameters.projectId;
        var jsonPath = parameters.jsonPath;
        
        if (projectId == undefined || projectId == "") { return "Error-Project-id-parameter-is-undefined"; };
        if (jsonPath == undefined || jsonPath == "") { return "Error-JSON-Path-parameter-is-undefined"; };
        
        var result = DocumentModel.jsonPath(projectId,jsonPath)
        if (result == undefined) { return "Error-JSON-Path-produced-undefined-results";};
        if (result.count == 0) { return "Error-JSON-Path-produced-0-results";};
		
		var index = 0;
        
        if (parameters.segments[0].enabled == 1) {
            index = 0;
        }
        
        if (parameters.segments[1].enabled == 1) {
            index = getRandomArbitrary(0,result.length);
        }
        
        var jsonNode = result[index];
        if (jsonNode == undefined) {return "Error-JSON-Path-undefined-results"; }
        
		var value = "";
        if (jsonNode.isContainer == 1) {
			value = jsonNode.toJavascriptValue();
            value = JSON.stringify(value);
		} else {
			value = jsonNode.value;
		}
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
        return ""
    };
    
    function getRandomArbitrary(min, max) {
        var doubleValue =  Math.random() * (max - min) + min;
        return parseInt(doubleValue);
    };
}

function sjeClass() {
    return new ValueTransformer();
}
