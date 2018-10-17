var ValueTransformer = function () {

    this.displayName = "Lorempixel.com";
    this.shortDescription = "Generate testing image urls.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-LoremPixel";
    
    this.parameters = function () {
        
        var widthUIParam = { 
            name: "width",
            type: "Number",
            displayName: "Image Width",
            description: "Define image width", 
            defaultValue: 200
        };
        
        var heightUIParam = { 
            name: "height",
            type: "Number",
            displayName: "Image Height",
            description: "Define image height", 
            defaultValue: 150
        };
        
        var isGreyUIParam = { 
			name: "isGrey",
			type: "Bool", 
			displayName: "Grey Image", 
			description: "Toggle on if you preffer greyscale image.", 
			defaultValue: false 
		};
        
        var popupDefaultValue = [ 
			{ displayName: "No category", value: "none" },
			{ displayName: "Abstract", value: "abstract" },
			{ displayName: "Animals", value: "animals" },
			{ displayName: "Business", value: "business" },
			{ displayName: "Cats", value: "cats" },
			{ displayName: "Food", value: "food" },
			{ displayName: "Nightlife", value: "nightlife" },
            { displayName: "Fashion", value: "fashion" },
            { displayName: "People", value: "people" },
            { displayName: "Nature", value: "nature" },
            { displayName: "Sports", value: "sports" },
            { displayName: "Technics", value: "technics" },
            { displayName: "Transport", value: "transport" },
		];
    	var popupUIParam = { 
			name: "category", 
			type: "Popup", 
			displayName: "Category", 
			description: "Select image theme category.",
			defaultValue: popupDefaultValue 
		};
        
        return [widthUIParam, heightUIParam, isGreyUIParam, popupUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        
        var width = isUndefinedValue(parameters.width, 200);
        var height = isUndefinedValue(parameters.height, 150);
        var category = isUndefinedPopupValue(parameters.category, "none");
        var isGreyscale = isUndefinedValue(parameters.isGrey, false);
        
        var url = "http://lorempixel.com/";
		
        if (isGreyscale === true ){
            url = url + "g" + "/";
        }
		
        url = url + width + "/";
        url = url + height + "/";
        
        if (category != "none" && isGreyscale == false) {
            url = url + category + "/";
        }
        return url;
    };
    
    this.randomArrayIndex = function (count) {
        return Math.floor(Math.random() * count);
    };
    
    function isUndefinedValue(v, d) {
        if (v === "" || v === undefined || v === null) {
            return d;
        }
        else {
            return v;
        }
    }
    function isUndefinedPopupValue(v, d) {
        if (Array.isArray(v) == true) {
            return d;
        }
        else {
            return v;
        }
    }
}

function sjeClass() {
    return new ValueTransformer();
}