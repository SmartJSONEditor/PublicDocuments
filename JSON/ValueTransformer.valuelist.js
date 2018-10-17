var ValueTransformer = function () {

	this.displayName = "Value List";
	this.shortDescription = "Select value from pre-defined list";
	this.isEditingDisabled = true;
	this.parameters = function () {

		var userValues = [];
        try {
            userValues = DocumentModel.getUserParameterValue("values");
        } catch (e) {
            userValues = [];
        }
        if (userValues === null || userValues.length === 0) {
			userValues = [];
        }
		
		
		var valuesUI = {
			name: "values",
			type: "Options",
			displayName: "Select value",
			description: "Define your values in setup tab.",
			defaultValue: userValues,
		};
		
		if (userValues.length === 0) {
			 valuesUI = {
                name: "urlSection",
                type: "Section",
                displayName: "No Values Defined",
                description: "Define your values in Setup Tab."
            };
		}


		// Output
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

		// Setup Tab

		var dividedByUIParameter = {
			name: "divider",
			type: "String",
			displayName: "Create list by separating:",
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
			defaultValue: "OptionA, OptionB, OptionC",
			userInfo: { hasSaveButton: true }
		};

		// Tabs
		var tabItems = [
			{
				id: "SELECT",
				displayName: "Select",
				parameters: [valuesUI]
            },
			{
				id: "SETUP",
				displayName: "Setup",
				parameters: [dividedByUIParameter, booleanUIParam, textUIParam,  segmentsUIParam]
            },
		];

		var tabs = {
			name: "mainTabs",
			type: "Tabs",
			displayName: "Tabs",
			defaultValue: tabItems,
			userInfo: { minimalUI: true }
		};

		return [tabs];
	}

	this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
		if (parameters.output === null) {
			return "";
		}
		
		var dividor = parameters.divider || ",";
		var valueList = parameters.text || "";
		var trim = parameters.trim || true;
		var values = parameters.values;

		var storedList = DocumentModel.getUserParameterValue("storedList") || [];
		var storedValues = DocumentModel.getUserParameterValue("values") || [];

		var value = "Error:No-Values-Defined";
		var list = valueList.split(dividor);

		if (valueList != storedList) {
			var storedValues = [];
			for (var i in list) {
				var item = list[i];
				var row = {};
				row.displayName = item.trim();
				row.enabled = 0
				storedValues.push(row);
			}

			DocumentModel.setUserParameterValue("storedList", list);
			DocumentModel.setUserParameterValue("values", storedValues);
			
			values = storedValues;
		}
		
		for (var i in values) {
			var item = values[i];
			if (item.enabled == 1) {
				value = item.displayName;
			}
		}

		// Output
		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return value;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		}
	};
}

function sjeClass() {
	return new ValueTransformer();
}