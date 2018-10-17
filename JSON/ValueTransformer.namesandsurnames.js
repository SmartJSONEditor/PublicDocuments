var ValueTransformer = function () {
    
    this.displayName = "Name & Surname Generator";
    this.shortDescription = "Generate firstnames & lastnames.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-NamesAndSurnames";
    
	this.parameters = function () {
		
		var popupDefaultValue = [ 
			{ displayName: "Male names", value: "male" },
			{ displayName: "Female names", value: "female" },
			{ displayName: "Male & Female names", value: "male_female" },
			{ displayName: "Surname", value: "surname" },
			{ displayName: "Male names & surnames", value: "male_surname" },
			{ displayName: "Female names & surnames", value: "female_surname" },
			{ displayName: "Male, Female names & surnames", value: "male_female_surname" },
		];
    	var popupUIParam = { 
			name: "type", 
			type: "Popup", 
			displayName: "Generate type", 
			description: "Select option you like.",
			defaultValue: popupDefaultValue 
		};
		
		var stringUIParam = { 
			name: "separator", 
			type: "String", 
			displayName: "Name & Surname separated by", description: "In name & surname options the name will be separated by", 
			defaultValue: " "
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

		return [popupUIParam, stringUIParam, segmentsOutputUIParam];
	}
	
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
		var value = "";
		var type = (parameters.type.constructor == Array) ? "male" : parameters.type;
		var separator = parameters.separator;
		var listName = [];
		var listSurname = [];
		var hasName = true
		var hasSurname = false;
		
		if (type == "male") {
			value = DocumentModel.randomValueDatabase("maleNames");
		}
		if (type == "female") {
			value = DocumentModel.randomValueDatabase("femaleNames");
		}
		if (type == "male_female") {
            var chance = (Math.random() * 100);
            if (chance <= 50) {
                value = DocumentModel.randomValueDatabase("maleNames");
            }
            else {
                value = DocumentModel.randomValueDatabase("femaleNames");
            }
		}
		if (type == "surname") {
			value = DocumentModel.randomValueDatabase("surname");
		}
		if (type == "male_surname") {
			value = DocumentModel.randomValueDatabase("maleNames");
            value = value + separator + DocumentModel.randomValueDatabase("surname");
		}
		if (type == "female_surname") {
			value = DocumentModel.randomValueDatabase("femaleNames");
            value = value + separator + DocumentModel.randomValueDatabase("surname");
		}
		if (type == "male_female_surname") {
			var chance = (Math.random() * 100);
            if (chance <= 50) {
                value = DocumentModel.randomValueDatabase("maleNames");
            }
            else {
                value = DocumentModel.randomValueDatabase("femaleNames");
            }
            var surname =  DocumentModel.randomValueDatabase("surname");
            value = value + separator + surname;
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

