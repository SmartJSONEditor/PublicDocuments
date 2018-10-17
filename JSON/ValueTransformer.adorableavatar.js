var ValueTransformer = function () {
    
    this.displayName = "Adorable Avatars";
    this.shortDescription = "Generate adorable avatar urls using avatars.adorable.io service."
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-AdorableAvatars";
    
    this.parameters = function () {
        
		var sizeUIParam = { 
            type: "Number", 
            name: "size",
            displayName: "Avatar Size (px)", 
            description: "The square size of the avatar image in pixels.",
            defaultValue:80
        };

        return [sizeUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
        var randomInt = randomIntFromInterval(1000,10000);
        var url = "https://api.adorable.io/avatars/";
        url = url + parameters.size + "/";
        url = url + randomInt.toString();
        return url;
    };
    
    function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

function sjeClass() {
    return new ValueTransformer();
}
