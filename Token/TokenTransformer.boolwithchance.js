var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "Bool with chance";
    this.shortDescription = "Generate true values with percentage chance.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
         var numberUIParam = {
            type: "Number",
            name: "likehood",
            displayName: "True percentage",
            description: "0-100 range of true percentage.",
            defaultValue: 50,
			tokenScripts: true
        };
		
		var outputTypeDefault = [
			{
				displayName: "True/False",
				enabled: 1
			},
			{
				displayName: "1/0",
				enabled: 0
			},
        ];

		var outputTypeUIParam = {
			type: "Segments",
			name: "outputType",
			displayName: "Output Type",
			description: "Output true/false or 1/0 value option.",
			defaultValue: outputTypeDefault
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

        
        return [numberUIParam, outputTypeUIParam, segmentsUIParam];
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
		// Process inputValue
        var chance = (Math.random() * 100);
		var likehood = DocumentModel.getTokensValue(parameters.likehood, userInfo.projectNode, pluginIdentifier);

        if (likehood === undefined) {
            return "Error: Y must provide likehood percentage.";
        }

        var value =  (chance < likehood);
		if (parameters.outputType[0].enabled == 1) {
			value = (value === true) ? 'true' : 'false';
		}
		if (parameters.outputType[1].enabled == 1) {
			value = (value === true) ? 1 : 0;
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
		return "Error-invalid-parameters-x";
    };
}

function sjeClass() {
    return new ValueTransformer();
}