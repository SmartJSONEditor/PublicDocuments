var ValueTransformer = function () {

	this.displayName = "MD & SHA hashing";
	this.shortDescription = "MD & SHA Hashing string";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var type = [
			{
				displayName: "MD2",
				value: "md2"
			},
			{
				displayName: "MD4",
				value: "md4"
			},
			{
				displayName: "MD5",
				value: "md5"
			},
			{
				displayName: "SHA1",
				value: "sha1"
			},
			{
				displayName: "SHA224",
				value: "sha224"
			},
			{
				displayName: "SHA256",
				value: "sha256"
			},
			{
				displayName: "SHA384",
				value: "sha384"
			},
			{
				displayName: "SHA512",
				value: "sha512"
			},
		];

		var popupUIParam = {
			name: "type",
			type: "Popup",
			displayName: "Hash algorithm",
			description: "Select hash algorithm",
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
				
		var hashType = (Array.isArray(parameters.type) === true) ? "md2" : parameters.type;

		var hash = DocumentModel.getHash(hashType, inputValue);

		if (parameters.output[0].enabled == 1) {
			return hash + inputValue;
		}
		if (parameters.output[1].enabled == 1) {
			return hash;
		}
		if (parameters.output[2].enabled == 1) {
			return inputValue + hash;
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
