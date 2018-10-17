var ValueTransformer = function () {

	this.displayName = "Value List";
	this.shortDescription = "Select value from pre-defined list";
	this.isEditingDisabled = false;

	this.parameters = function () {

		// TAB Setup
		
		// Group A Parameters
		var valueGroupA = { 
			name: "value-groupA-tab1",
			type: "String", 
			displayName: "Value Group A", 
			description: "", 
			defaultValue: "" 
		};
		
		// Group B Parameters
		var valueGroupB = { 
			name: "value-groupB-tab1",
			type: "String", 
			displayName: "Value Group B", 
			description: "", 
			defaultValue: "" 
		};
		
		// Group UI Parameter
		var groupItems = [
            {
                id: "GROUPA",
                displayName: "Group A",
                parameters: [valueGroupA]
            },
            {
                id: "GROUPB",
                displayName: "Group B",
                parameters: [valueGroupB]
            }
        ];

        var GroupUI = {
            name: "group",
            type: "Group",
            displayName: "Select Group To Configure",
            defaultValue: groupItems
        };
		
		
		// TAB Select
		
		var select = { 
			name: "selectValue",
			type: "String", 
			displayName: "Select", 
			description: "", 
			defaultValue: "" 
		};
		
		
		 // Tabs
        var tabItems = [
            {
                id: "SETUP",
                displayName: "Setup",
                parameters: [GroupUI]
            },
            {
                id: "SELECT",
                displayName: "Select",
                parameters: [select]
            },
		];

        var tabs = {
            name: "mainTabs",
            type: "Tabs",
            displayName: "Tabs",
            defaultValue: tabItems,
        };

        return [tabs];
	}

	this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

		DocumentModel.log("Parameters: " + JSON.stringify(parameters));
        return JSON.stringify(parameters);
	};
	
	function randomArrayIndex(max) {
    	return Math.floor(Math.random() * max);
	}
}

function sjeClass() {
	return new ValueTransformer();
}
