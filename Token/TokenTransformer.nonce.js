var ValueTransformer = function () {

	this.displayName = "Nonce Generator";
	this.shortDescription = "Get random nonce.";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

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


		return [segmentsUIParam];
	}

	this.transform = function (inputValue, parameters, userInfo) {
				
		var value = DocumentModel.getNonce();

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