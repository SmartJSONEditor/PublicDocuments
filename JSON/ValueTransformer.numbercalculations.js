var ValueTransformer = function () {

    this.displayName = "Number Calculations";
    this.shortDescription = "Perform basic calculations.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-NumberCalculations";
    
    this.parameters = function () {
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
            defaultValue: "0"
        };
        
        return [popupUIParam, numberUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        
        var value = Number(inputValue);
		var type = (Array.isArray(parameters.type) == true) ? "add" : parameters.type;
		var number = Number(parameters.number);
		
		if (type == "add") {
			value = (value + number);
		}
		if (type == "subtract") {
			value = (value - number);
		}
		if (type == "multiply") {
            value = (value * number);
		}
		if (type == "divide") {
            if (number == 0) {
                number = 1
            }
			value = (value / number);
		}
        if (type == "remainder") {
			value = value % number;
		}
	
        return value;
    };
}

function sjeClass() {
    return new ValueTransformer();
}