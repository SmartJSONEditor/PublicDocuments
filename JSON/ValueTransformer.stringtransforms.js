var ValueTransformer = function () {

    this.displayName = "String Case Transformer.";
    this.shortDescription = "Change case of text to ALLCAPITALS,lowercase, Capitalize, trim white space and substring.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-StringTransforms";
    
    this.parameters = function () {
        
        var popupDefaultValue = [
            { displayName: "UpperCase", value: "UpperCase"  },
            { displayName: "LowerCase", value: "LowerCase"  },
            { displayName: "Capitalize", value: "Capitalize"  },
            { displayName: "Trim White Space", value: "TrimWhiteSpace"  },
            { displayName: "Substring From Index", value: "SubstringFrom"  },
            { displayName: "Substring To Index", value: "SubstringTo"  },
        ];
        
        var typeUIParam = {
            name: "type",
            type: "Popup",
            displayName: "Modification Type",
            description: "Select modification type.",
            defaultValue: popupDefaultValue
        };
        
        var indexUIParam = {
            type: "Number",
            name: "index",
            displayName: "Index",
            description: "Define from or to index.",
            defaultValue: 0
        };
        
        return [typeUIParam, indexUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
       
        var type = (Array.isArray(parameters.type) == true) ? "UpperCase" : parameters.type;
        var sliceIndex = (parameters.index === undefined) ? 0 : parameters.index;
        
        var value = inputValue;
        if (type == "UpperCase") { value = inputValue.toUpperCase(); }
        if (type == "LowerCase") { value = inputValue.toLowerCase(); }
        if (type == "Capitalize") { 
          var temp = inputValue;
          temp = temp.replace(/\b\w/g, function(l){ return l.toUpperCase() });
          value = temp;
        }
        if (type == "TrimWhiteSpace") { value = inputValue.trim(); }
        if (type == "SubstringFrom") { value = inputValue.slice(sliceIndex); }
        if (type == "SubstringTo") {
           value = inputValue.slice(0,sliceIndex); 
        }

        return value;
    };
    
    this.capitalizeFirstLetter = function (string) {
        var temp = string.trim();
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        return temp;
    }
    
    this.randomArrayIndex = function (count) {
        return Math.floor(Math.random() * count);
    }
}

function sjeClass() {
    return new ValueTransformer();
}