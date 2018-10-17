var ValueTransformer = function () {

    this.displayName = "Bool with chance";
    this.shortDescription = "Generate true values with percentage chance.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-BoolWithChance";


    this.parameters = function () {
        
        var numberUIParam = {
            type: "Number",
            name: "likehood",
            displayName: "True percentage",
            description: "0-100 range of true percentage.",
            defaultValue: 50
        };
        
        return [numberUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var chance = (Math.random() * 100);

        if (parameters.likehood === undefined) {

            if (info.jsonNode.type == 2) { return "Error: Y must provide likehood percentage."; }
            if (info.jsonNode.type == 3) { return 0; }
            if (info.jsonNode.type == 4) { return 0; }
        }

        return (chance < parameters.likehood);
    };
}

function sjeClass() {
    return new ValueTransformer();
}