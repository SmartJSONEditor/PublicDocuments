var ValueTransformer = function () {

	this.displayName = "URL Encoder / Decoder";
	this.shortDescription = "Encode or decode URL compatible strings.";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var type = [
			{
				displayName: "URL Encode",
				value: "encode"
			},
			{
				displayName: "URL Decode",
				value: "decode"
			}
		];

		var popupUIParam = {
			name: "type",
			type: "Popup",
			displayName: "URL Encoder/Decoder function",
			description: "Select to encode or decode strings",
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
			value = DocumentModel.urlEncode(inputValue);
		}

		if (encodingType == "decode") {
			value = DocumentModel.urlDecode(inputValue);
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