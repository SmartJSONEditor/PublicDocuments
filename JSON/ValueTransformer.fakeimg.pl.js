var ValueTransformer = function () {

    this.displayName = "Fakeimg.pl - Fake Images";
    this.shortDescription = "Fakeimg.pl - Generate fake image urls.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-Fakeimg.pl";

    this.parameters = function () {
        
        var widthParam = {
            name: "width",
            displayName: "Image Width",
            description: "Set fake image width.",
            type: "Number",
            defaultValue: "200"
        };
        
        var heightParam = {
            name: "height",
            displayName: "Image Height",
            description: "Set fake image height.",
            type: "Number",
            defaultValue: "150"
        };
        
        var colorParam = {
            name: "color",
            displayName: "Color hex code",
            description: "Set background color hex code such: ffffff / 000000.",
            type: "String",
            defaultValue: ""
        };
        
        var textParam = {
            name: "text",
            displayName: "Placeholder text",
            description: "Set placehoder text",
            type: "String",
            defaultValue: ""
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

        return [widthParam, heightParam, colorParam, textParam, segmentsOutputUIParam];
    };

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters) {
        
        var url = "http://fakeimg.pl/";
        url = url + parameters.width + "x";
        url = url + parameters.height + "/";
        if (parameters.color != "") {
            url = url + parameters.color + "/";
        }
        if (parameters.text != "") {
            url = url + "?text=" + parameters.text;
        }
        if (parameters.output[0].enabled == 1) {
            return url + inputValue;
        };
        if (parameters.output[1].enabled == 1) {
            return url;
        };
        if (parameters.output[2].enabled == 1) {
            return inputValue + url;
        };

    };
}

function sjeClass() {
    return new ValueTransformer();
}