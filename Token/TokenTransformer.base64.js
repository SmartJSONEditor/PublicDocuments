var ValueTransformer = function () {

	this.displayName = "Base 64 Encoder / Decoder";
	this.shortDescription = "Encode or decode base64 strings.";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var type = [
			{
				displayName: "Encode",
				value: "encode"
			},
			{
				displayName: "Decode",
				value: "decode"
			}
		];

		var popupUIParam = {
			name: "type",
			type: "Popup",
			displayName: "Base64 Function",
			description: "Select Encoder or decoder",
			defaultValue: type
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


		return [popupUIParam, segmentsUIParam];
	}

	this.transform = function (inputValue, parameters, userInfo) {
		
		var encodingType = (Array.isArray(parameters.type) == true) ? "encode" : parameters.type;
		
		var value = "";
		if (encodingType == "encode") {
			value = DocumentModel.base64Encode(inputValue);
		}

		if (encodingType == "decode") {
			value = DocumentModel.base64Decode(inputValue);
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
		return "Error-invalid-parameters";
	};
}

function sjeClass() {
	return new ValueTransformer();
}
