var ValueTransformer = function () {

    this.displayName = "Getty Images";
    this.shortDescription = "Load testing images from Getty Images API.";
    this.disableLiveRefresh = true;
    this.disabledValueTypes = [3,4];
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-GettyImages";
    
    this.parameters = function () {

        var stringUIParam = {
            name: "phraze",
            type: "String",
            displayName: "Search Phraze",
            description: "Search phraze for remote service",
            defaultValue: "hollyday"
        };

        var segmentsDefaultValues = [
            { displayName: "Sequencial", enabled: 1},
            { displayName: "Random", enabled: 0 }
        ];
        
        var segmentsUIParam = {
            name: "segments",
            type: "Segments",
            displayName: "Index",
            description: "More info...",
            defaultValue: segmentsDefaultValues
        };

        var requestParam = {
            name: "loadRequest",
            type: "Action",
            displayName: "Load Images",
            description: "Press this button every time you change your parameters to call remote service and update the data.",
            defaultValue: "",
            userInfo: {
                actionName: "pluginaction_loadRequest",
                buttonTitle: "Remote Request"
            }
        };

        return [stringUIParam, segmentsUIParam, requestParam];
    };

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var response = DocumentModel.responseForId(parameters.loadRequest);
        if (response == undefined) {
            return "Error: Set parameters and Load Request first.";
        }

        var path = "$.images[*].display_sizes[0].uri";
        var jsonObject = JSON.parse(response)

        var urlArray = jsonPath(jsonObject, path);
        var index = 0;

        if (parameters.segments[0].enabled == 1) {
            index = arrayIndex % urlArray.length;
        }

        if (parameters.segments[1].enabled == 1) {
            index = getRandomArbitrary(0, urlArray.length);
        }

        var item = urlArray[index];
        return item;

        return "Error: Set parameters and Load Request first.";
    };

    this.request = function (parameters, info) {

        var apiKey = "pytq9sjnksbuw7fhry8sat4j";

        var request = Request.instance();
        request.scheme = "https"
        request.host = "api.gettyimages.com";
        request.pathComponents = ["v3", "search", "images"];
        request.urlParameters = {
            phrase: parameters.phraze,
            fields: "display_set"
        };
        request.headers = {
            "Api-Key": apiKey
        };
        return request;
    };

    function getRandomArbitrary(min, max) {
        var doubleValue = Math.random() * (max - min) + min;
        return parseInt(doubleValue);
    };
}

function sjeClass() {
    return new ValueTransformer();
}
