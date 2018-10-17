var ValueTransformer = function () {
    
    this.displayName = "Static Text";
    this.shortDescription = "Prepend, replace or append a static text."
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-StaticText";
    
    this.parameters = function () {
        
		var stringUIParam = { 
            type: "String",
            name: "text",
            displayName: "Text",
            description: "Input static text.", 
            defaultValue: ""
        };
        
		var segmentsDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsUIParam = {
            type: "Segments",
            name: "output", 
            displayName: "Output",
            description: "Select how to output the value.", 
            defaultValue: segmentsDefaultValues 
        };

        return [stringUIParam,segmentsUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
		if (parameters.output[0].enabled == 1) { return parameters.text + inputValue; }
		if (parameters.output[1].enabled == 1) { return parameters.text; }
		if (parameters.output[2].enabled == 1) { return inputValue + parameters.text; }
        return "Error: Invalid parameters";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
