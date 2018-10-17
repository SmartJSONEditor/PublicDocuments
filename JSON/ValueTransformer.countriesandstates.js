var ValueTransformer = function () {
    
    this.displayName = "Countries and States";
    this.shortDescription = "Generate countries and US states.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-CountriesAndStates";
    
	this.parameters = function () {
		
		var popupDefaultValue = [ 
			{ displayName: "Country Name", value: "country" },
			{ displayName: "Country Abbreviation", value: "country_abb" },
			{ displayName: "US States", value: "us_states" },
			{ displayName: "US State Abbreviation", value: "us_state_abbreviation" },
		];
    	var popupUIParam = { 
			name: "type", 
			type: "Popup", 
			displayName: "Generate type", 
			description: "Select option you like.",
			defaultValue: popupDefaultValue 
		};
		
		
		var segmentsOutputDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
			{ displayName: "Replace", enabled: 1 },
            { displayName: "Append", enabled: 0 }
        ];

        var segmentsOutputUIParam = {
            type: "Segments",
            name: "output",
            displayName: "Output",
            description: "Prepend, replace or append value.",
            defaultValue: segmentsOutputDefaultValues
        };

		return [popupUIParam, segmentsOutputUIParam];
	}
	
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
		var value = "";
		var type = (parameters.type.constructor == Array) ? "country" : parameters.type;
		var separator = parameters.separator;
		var listName = [];
		var listSurname = [];
		var hasName = true
		var hasSurname = false;
		
		if (type == "country") {
			value = DocumentModel.randomValueDatabase("country");
		}
		if (type == "country_abb") {
			value = DocumentModel.randomValueDatabase("countryCode");
		}
		if (type == "us_states") {
            value = DocumentModel.randomValueDatabase("USState");
		}
		if (type == "us_state_abbreviation") {
			value = DocumentModel.randomValueDatabase("USStateCode");
		}
	
		if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };

        return inputValue;
    };
}

function sjeClass() {
    return new ValueTransformer();
}