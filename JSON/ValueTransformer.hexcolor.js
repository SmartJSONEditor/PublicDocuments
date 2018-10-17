var ValueTransformer = function () {

    this.displayName = "Hex color generator";
    this.shortDescription = "Random web hex color generator.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-HexColor";
    
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
	};
	
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
		if (parameters.output[0].enabled == 1) { return color + inputValue; };
        if (parameters.output[1].enabled == 1) { return color; };
        if (parameters.output[2].enabled == 1) { return inputValue + color; };
        return "Error";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
