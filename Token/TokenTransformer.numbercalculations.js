var ValueTransformer = function () {

    this.displayName = "Number Calculations";
    this.shortDescription = "Perform basic calculations.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		
        var popupDefaultValue = [
            { displayName: "Add +", value: "add" },
            { displayName: "Subtract -", value: "subtract" },
            { displayName: "Multiply *", value: "multiply" },
            { displayName: "Divide /", value: "divide" },
            { displayName: "Remainder", value: "remainder" },
        ];

        var popupUIParam = {
            name: "type",
            type: "Popup",
            displayName: "Modification Type",
            description: "Select function type",
            defaultValue: popupDefaultValue
        };
        
        var numberUIParam = { 
            type: "Number",
            name: "number",
            displayName: "By Number",
            description: "Calculations by number.", 
            defaultValue: 1,
			tokenScripts: true
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
        
        return [popupUIParam, numberUIParam, segmentsUIParam];
    }
    
     this.transform = function (inputValue, parameters, userInfo)  {
        
		inputValue = Number(inputValue);
		var calculatedValue = DocumentModel.getTokensValue(parameters.number, userInfo.projectNode, pluginIdentifier);
		 
		if (inputValue === NaN) {
			inputValue = 1;
		} 
		 
		if (calculatedValue === NaN) {
			calculatedValue = 1;
		} 
		 
		var type = (Array.isArray(parameters.type) == true) ? "add" : parameters.type;
		var number = Number(calculatedValue);
		 
		var resultValue = 0;
		
		if (type == "add") {
			resultValue = (inputValue + number);
		}
		if (type == "subtract") {
			resultValue = (inputValue - number);
		}
		if (type == "multiply") {
            resultValue = (inputValue * number);
		}
		if (type == "divide") {
            if (number == 0) {
                number = 1
            }
			resultValue = (inputValue / number);
		}
        if (type == "remainder") {
			resultValue = inputValue % number;
		}
		 
		if (parameters.output[0].enabled == 1) {
			return resultValue + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return resultValue;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + resultValue;
		}
		 
		return 0;		
    };
}

function sjeClass() {
    return new ValueTransformer();
}