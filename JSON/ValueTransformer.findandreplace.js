var ValueTransformer = function () {

    this.displayName = "Find and replace";
    this.shortDescription = "Find & replace text using text or regular expression.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-FindAndReplace";
    
    this.parameters = function () {
        
        var popupDefaultValue = [
            { displayName: "String", value: "string" },
            { displayName: "Regular Expression", value: "format" },
        ];

        var popupUIParam = {
            name: "popup",
            type: "Popup",
            displayName: "Find & Replace type",
            description: "Select between simple string replacement or javascript regular expression.",
            defaultValue: popupDefaultValue
        };
        
        var inputUIParam = {
            type: "String",
            name: "search",
            displayName: "Search  String / Format",
            description: "Input your search string or regular expression format such /blue/gi",
            defaultValue: ""
        };
        
        var replacementUIParam = {
            type: "String",
            name: "replace",
            displayName: "Replace with",
            description: "Input your replacement string",
            defaultValue: ""
        };
        
        return [popupUIParam, inputUIParam, replacementUIParam ];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
        
        var type = (parameters.type === undefined) ? "string" : parameters.type;
        var search = parameters.search;
        var replace = parameters.replace;
        
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