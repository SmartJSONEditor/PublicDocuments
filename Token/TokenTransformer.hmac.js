var ValueTransformer = function () {

	this.displayName = "HMAC hashing";
	this.shortDescription = "HMAC Hashing string";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var type = [
			{
				displayName: "HMAC-MD5",
				value: "HMAC-MD5"
			},
			{
				displayName: "HMAC-SHA1",
				value: "HMAC-SHA1"
			},
			{
				displayName: "HMAC-SHA224",
				value: "HMAC-SHA224"
			},
			{
				displayName: "HMAC-SHA256",
				value: "HMAC-SHA256"
			},
			{
				displayName: "HMAC-SHA384",
				value: "HMAC-SHA384"
			},
			{
				displayName: "HMAC-SHA512",
				value: "HMAC-SHA512"
			}
		];

		var popupUIParam = {
			name: "type",
			type: "Popup",
			displayName: "Hash algorithm",
			description: "Select hash algorithm",
			defaultValue: type
		};
		
		var keyUIParam = {
			type: "String",
			name: "key",
			displayName: "Hash key",
			description: "Compose hash key.",
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


		return [popupUIParam, keyUIParam, segmentsUIParam];
	}

	this.transform = function (inputValue, parameters, userInfo) {
				
		var hashType = (Array.isArray(parameters.type) === true) ? "md2" : parameters.type;
		var hashKey =  DocumentModel.getTokensValue(parameters.key, userInfo.projectNode, pluginIdentifier);
		
		var hash = DocumentModel.getHMACHash(hashType, inputValue, hashKey);

		if (parameters.output[0].enabled == 1) {
			return hash + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return hash;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + hash;
		}
		return "Error-invalid-parameters-x";
	};
}

function sjeClass() {
	return new ValueTransformer();
}