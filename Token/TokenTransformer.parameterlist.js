var ValueTransformer = function () {

	this.displayName = "Request Parameter List";
	this.shortDescription = "Return values of any request parameters";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";

	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		// Get type value if defined previously
		var typeValue = DocumentModel.getUserParameterValue("popup");

		var allParameterNames = [];
		try {
			allParameterNames = DocumentModel.getAllParameterNames(typeValue, config.projectNode, pluginIdentifier);
		} catch (e) {

		}

		var popupDefaultValue = [{
				displayName: "Request Headers",
				value: "headers"
			}, {
				displayName: "Request URL Parameters",
				value: "urlParameters"
			}, {
				displayName: "Request Body Parameters",
				value: "bodyParameters"
			}, {
				displayName: "Request Variables",
				value: "variables"
			}, {
				displayName: "Request Method",
				value: "method"
			}, {
				displayName: "Request URL (No URL Encoding)",
				value: "url"
			} , {
				displayName: "Request URL & URL Parameters (No URL Encoding)",
				value: "fullUrl"
			}
		];

		var popupUI = {
			name: "popup",
			type: "Popup",
			displayName: "Request Parameter Type",
			description: "Select Parameter Type, use Refresh button to actualize values.",
			defaultValue: popupDefaultValue
		};

		// Get enabled keys of parameters
		var displayArray = DocumentModel.getUserParameterValue("selectionlist");
		if (displayArray == null || displayArray.length == 0) {

			var displayArray = [];
			for (var index in allParameterNames) {
				var item = allParameterNames[index];
				if (item) {
					var displayListItem = {
						value: item,
						enabled: false
					}
					displayArray.push(displayListItem);
				}
			}
		}
		
		var multiselectionUI = {
			name: "selectionlist",
			type: "Multiselection",
			displayName: "Include Parameters",
			description: "Use Refresh button to refetch updated definitions, plugin cache its keys.",
			userInfo: {
				valuePlaceholder: "Value",
				refreshButton: true
			},
			tokenScripts: true,
			defaultValue: displayArray
		};

		var outputFormatUI = {
			type: "String",
			name: "format",
			displayName: "Output string format",
			description: "Define your output format using %k, %v tokens such %k:%v",
			defaultValue: "%k=%v",
			tokenScripts: true
		};

		var multiselectionJoinerUI = {
			type: "String",
			name: "joiner",
			displayName: "Join multiple items with:",
			description: "Multiple options join character",
			defaultValue: "&"
		};

		var sortDefaultValue = [{
				displayName: "No Sort",
				value: "none"
			}, {
				displayName: "Sort by Key:Value Alphabethically",
				value: "alphabethical"
			}
		];

		var sortUI = {
			name: "sort",
			type: "Popup",
			displayName: "Sort Parameters",
			description: "Sort Parameters",
			defaultValue: sortDefaultValue
		};
		
		var urlEncodeUI = {
			name: "urlencode",
			type: "Bool",
			displayName: "URL Encode values",
			description: "Enable to URL encode values",
			defaultValue: false
		};

		var segmentsOutputDefaultValues = [
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

		var segmentsOutputUI = {
			type: "Segments",
			name: "output",
			displayName: "Output",
			description: "Prepend, replace or append value.",
			defaultValue: segmentsOutputDefaultValues
		};

		// If no parameters found, show error
		if (allParameterNames == null || allParameterNames.length == 0) {
			var errorUI = {
				name: "listSection",
				type: "Section",
				displayName: "No Values Found",
				description: "Current request has no parameters defined for type."
			};
			return [popupUI, errorUI, segmentsOutputUI];
		}

		return [popupUI, multiselectionUI, outputFormatUI, multiselectionJoinerUI, sortUI, urlEncodeUI, segmentsOutputUI];
	};

	this.transform = function (inputValue, parameters, userInfo) {

		// Parameters
		var type = parameters.popup;
		if (type == undefined || type == "") {
			return "Error-no-type-value-x";
		};

		var outputType = (Array.isArray(parameters.outputFormat) == true) ? "format" : parameters.outputFormat;
		var outputFormat = parameters.format || '%k=%v';
		outputFormat = DocumentModel.getTokensValue(outputFormat, userInfo.projectNode, pluginIdentifier)
		var joiner = parameters.joiner || '&';
		var sortType = parameters.sort || 'none';
		var urlEncode = parameters.urlencode;

		// Check disabled keys
		var keyArray = parameters.selectionlist || [];
		var enabledKeysArray = [];
		for (var index in keyArray) {
			var item = keyArray[index];
			if (item.enabled === true) {
				enabledKeysArray.push(item.value);
			}
		}

		// Set disabled parameter keys

		var allParameters = DocumentModel.getAllParameterValues(type, enabledKeysArray, userInfo.projectNode, pluginIdentifier);
		if (allParameters == null || allParameters.length == 0) {
			return "";
		}

		var value = "";
		var chunks = [];

		if (sortType == 'alphabethical') {
			var keys = Object.keys(allParameters);
			keys.sort();
			for (var i = 0; i < keys.length; i++) { // now lets iterate in sort order
				var key = keys[i];
				var value = allParameters[key];
				
				if (urlEncode === true) {
					value = DocumentModel.urlEncode(value);
				}
				var formatString = outputFormat;
				var replaceKey = formatString.replace(eval("/" + "%k" + "/g"), key);
				var replaceValue = replaceKey.replace(eval("/" + "%v" + "/g"), value);
				chunks.push(replaceValue);
			}
		} else {
			for (var propertyName in allParameters) {

				var key = propertyName;
				var value = allParameters[key];
				if (urlEncode === true) {
					value = DocumentModel.urlEncode(value);
				}

				var formatString = outputFormat;
				var replaceKey = formatString.replace(eval("/" + "%k" + "/g"), key);
				var replaceValue = replaceKey.replace(eval("/" + "%v" + "/g"), value);
				chunks.push(replaceValue);
			}
		}

		value = chunks.join(joiner);

		if (parameters.output[0].enabled == 1) {
			return value + inputValue;
		};
		if (parameters.output[1].enabled == 1) {
			return value;
		};
		if (parameters.output[2].enabled == 1) {
			return inputValue + value;
		};

		return "Error-invalid-parameters-x";
	};
}

function sjeClass() {
	return new ValueTransformer();
}
