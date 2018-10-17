var ValueTransformer = function () {

    this.displayName = "Base64 encoded string";
    this.shortDescription = "Generate Base64 encoded string from input string.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-Base64Encode";
	
	this.parameters = function () {
		var segmentsOutputDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace", enabled: 1 },
            { displayName: "Append", enabled: 0 }
        ];

        var segmentsOutputUIParam = {
            type: "Segments",
            name: "output",
            displayName: "Output",
            description: "Prepend, replace or append value.",
            defaultValue: segmentsOutputDefaultValues
        };
		
		return [segmentsOutputUIParam];
	}
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        var encoded = DocumentModel.base64Encode(inputValue);
		if (parameters.output[0].enabled == 1) { return encoded + inputValue; };
        if (parameters.output[1].enabled == 1) { return encoded; };
        if (parameters.output[2].enabled == 1) { return inputValue + encoded; };
        return "Error";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
