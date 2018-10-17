var ValueTransformer = function () {

	this.displayName = "Static Text";
	this.shortDescription = "Static text";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var stringUIParam = {
			type: "String",
			name: "text",
			displayName: "Text",
			description: "Input static text.",
			defaultValue: "",
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

		return [stringUIParam, segmentsUIParam];
	}

	this.transform = function (inputValue, parameters, userInfo) {

		var text = DocumentModel.getTokensValue(parameters.text, userInfo.projectNode, pluginIdentifier);
		
		if (parameters.output[0].enabled == 1) {
			return parameters.text + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return parameters.text;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + parameters.text;
		}
		return "Error-invalid-parameters";
	};

	function getRandomArbitrary(min, max) {
		var doubleValue = Math.random() * (max - min) + min;
		return parseInt(doubleValue);
	};
}

function sjeClass() {
	return new ValueTransformer();
}
