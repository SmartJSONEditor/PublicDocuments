var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "Token Transformer";
    this.shortDescription = "Click edit buton to write / update your script";
    this.isEditingDisabled = false;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
        return [];
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
		// Process inputValue
        return inputValue;
    };
}

function sjeClass() {
    return new ValueTransformer();
}
