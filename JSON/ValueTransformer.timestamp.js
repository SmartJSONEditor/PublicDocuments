var ValueTransformer = function () {

    this.displayName = "Timestamp";
    this.shortDescription = "Unix Timestamp";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-Timestamp";

    this.parameters = function () {

        var segmentsOutputDefaultValues = [
            { displayName: "Seconds", enabled: 1 },
            { displayName: "Seconds & Miliseconds", enabled: 0 }
        ];

        var segmentsOutputUIParam = {
            type: "Segments",
            name: "output",
            displayName: "Type",
            description: "Select between modes.",
            defaultValue: segmentsOutputDefaultValues
        };
        
        return [segmentsOutputUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var timestamp = DocumentModel.unixTimestamp();
        
        if (parameters.output[0].enabled == 1) { return parseInt(timestamp); };
        if (parameters.output[1].enabled == 1) { return timestamp; };
    };
}

function sjeClass() {
    return new ValueTransformer();
}
