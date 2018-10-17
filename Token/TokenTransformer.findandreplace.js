var ValueTransformer = function () {

	this.displayName = "Find & Replace";
	this.shortDescription = "Quick find and replace of texts";
	this.isEditingDisabled = true;
	this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
	
	this.parameters = function (config) {

		if (config == null) {
			return [];
		}

		var popupDefaultValue = [
            { displayName: "String", value: "string" },
            { displayName: "Regular Expression", value: "format" },
        ];

        var popupUIParam = {
            name: "popup",
            type: "Popup",
            displayName: "Find & Replace type",
            description: "Select between simple string replacement or javascript regular expression.",
            defaultValue: popupDefaultValue,
        };
        
        var inputUIParam = {
            type: "String",
            name: "search",
            displayName: "Search  String / Format",
            description: "Input your search string or regular expression format such /blue/gi",
            defaultValue: "",
			tokenScripts: true
        };
        
        var replacementUIParam = {
            type: "String",
            name: "replace",
            displayName: "Replace with",
            description: "Input your replacement string",
            defaultValue: "",
			tokenScripts: true
        };
        
        return [popupUIParam, inputUIParam, replacementUIParam ];
	}

	this.transform = function (inputValue, parameters, userInfo) {
		
		var type = (Array.isArray(parameters.popup) == true) ? "string" : parameters.popup;
        var search = DocumentModel.getTokensValue(parameters.search, userInfo.projectNode, pluginIdentifier);
        var replace = DocumentModel.getTokensValue(parameters.replace, userInfo.projectNode, pluginIdentifier);
        
        var value = ""; 
        
        if (type == "string") {
            value = inputValue.replace(eval("/" + search + "/g"), replace);
        }
        if (type == "format") {
            value = inputValue.replace(eval(search), replace);
        }
        
        return value;
	};
}

function sjeClass() {
	return new ValueTransformer();
}
