var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "String Component Alphabetical Order";
    this.shortDescription = "Separate and order string";
    this.isEditingDisabled = false;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		
		var outputFormatUI = {
			type: "String",
			name: "separator",
			displayName: "Alphabetically order using separator sign:",
			description: "Separate string into array list using the separator",
			defaultValue: ","
		};
		
		var segmentsOutputDefaultValues = [
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

		var segmentsOutputUI = {
			type: "Segments",
			name: "output",
			displayName: "Output",
			description: "Prepend, replace or append value.",
			defaultValue: segmentsOutputDefaultValues
		};
		
		
		// Construct your parameters
        return [outputFormatUI, segmentsOutputUI];
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
		// Process inputValue
		// Separate by 
		
		var separator = parameters.separator || ",";
		
		var valueArray = inputValue.split(separator);
		valueArray.sort();
		var value = valueArray.join(separator);
		
		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		};
		if (parameters.output[1].enabled == 1) {
			return value;
		};
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		};

		return "Error-invalid-parameters-x";
    };
}

function sjeClass() {
    return new ValueTransformer();
}

