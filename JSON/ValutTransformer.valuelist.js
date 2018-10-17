var ValueTransformer = function () {

	this.displayName = "Value List";
	this.shortDescription = "Select value from pre-defined list";
	this.isEditingDisabled = false;

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}
			
		var dividedByUIParameter = { 
			name: "divider",
			type: "String", 
			displayName: "Separated By", 
			description: "Select your separator such ( , ; )", 
			defaultValue: "," 
		};
		
		var booleanUIParam = { 
			name: "trim",
			type: "Bool", 
			displayName: "Trim White Space", 
			description: "If enabled, separated values will be trimmed.", 
			defaultValue: true 
		};

		var textUIParam = { 
			name: "text", 
			type: "Text", 
			displayName: "List Values", 
			description: "List your values separated by your separator sign.",
			defaultValue: "Value1, Value2, Value3, Value4"
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
		
		 // Tabs

        var tabItems = [
            {
                id: "SETUP",
                displayName: "Setup",
                parameters: [dividedByUIParameter, booleanUIParam, textUIParam]
            },
            {
                id: "SELECT",
                displayName: "Select Value",
                parameters: [segmentsUIParam]
            },
		];

        var tabs = {
            name: "mainTabs",
            type: "Tabs",
            displayName: "Tabs",
            defaultValue: tabItems,
        };

        return [tabs];
	}

	this.transform = function (inputValue, parameters, userInfo) {

		DocumentModel.log("Parameters: " + JSON.stringify(parameters));
		
		var dividor = (parameters.divider === undefined) ? "," : parameters.divider;
		var valueList = parameters.text;
		var trim = parameters.trim;
		var value = "";
		
		var list = valueList.split(dividor); 
		var index = randomArrayIndex(list.length);
		value = list[index];
		if (trim == true) {
			value = value.trim();
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

        return parameters.paramName;
	};
	
	function randomArrayIndex(max) {
    	return Math.floor(Math.random() * max);
	}
}

function sjeClass() {
	return new ValueTransformer();
}
