var ValueTransformer = function () {

    this.displayName = "Random Characters";
    this.shortDescription = "Generate characters or define yours to use.";
    this.isEditingDisabled = true;
    this.disabledValueTypes = [3,4];
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-RandomCharacters";

    this.parameters = function () {

        var numberUIParam = {
            type: "Number",
            name: "characterCount",
            displayName: "Character Count",
            description: "Count of characters.",
            defaultValue: 1
        };

        var popupDefaultValue = [
            { displayName: "Lowercase characters", value: "lower" },
            { displayName: "Uppercase characters", value: "upper" },
            { displayName: "Numbers", value: "numbers" },
            { displayName: "Symbols", value: "symbols" },
            { displayName: "Lowercase & Uppercase", value: "lower_upper" },
            { displayName: "Lowercase & Uppercase & Numbers", value: "lower_upper_numbers" },
            { displayName: "Lowercase & Uppercase & Numbers & Symbols", value: "lower_upper_numbers_symbols" },
            { displayName: "Custom Pool", value: "pool" }
        ];

        var popupUIParam = {
            name: "popupParam",
            type: "Popup",
            displayName: "Character Type",
            description: "Select Character type",
            defaultValue: popupDefaultValue
        };

        var stringUIParam = {
            type: "String",
            name: "pool",
            displayName: "Custom Pool",
            description: "Define your set of character to use for randomization.",
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

        return [numberUIParam, popupUIParam, stringUIParam, segmentsOutputUIParam];
    }
    
    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var NUMBERS = '0123456789';
        var CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
        var CHARS_UPPER = CHARS_LOWER.toUpperCase();

        var SYMBOLS = "!@#$%^&*()[]",
            letters, pool;

        var type = (parameters.popupParam === undefined) ? "lower" : parameters.popupParam;
        var userPool = parameters.pool;
        var stringLength = (parameters.characterCount == undefined || parameters.characterCount == "") ? 1 : parameters.characterCount;

        if (type === 'lower') {
            letters = CHARS_LOWER;
        } else if (type === 'upper') {
            letters = CHARS_UPPER;
        } else if (type === 'numbers') {
            letters = NUMBERS;
        } else if (type === 'symbols') {
            letters = SYMBOLS;
        } else if (type === 'lower_upper') {
            letters = CHARS_LOWER + CHARS_UPPER;
        } else if (type === 'lower_upper_numbers') {
            letters = CHARS_LOWER + CHARS_UPPER + NUMBERS;
        } else if (type === 'lower_upper_numbers_symbols') {
            letters = CHARS_LOWER + CHARS_UPPER + NUMBERS + SYMBOLS;
        } else if (type === 'pool') {
            letters = userPool;
        } else {
            letters = CHARS_LOWER + CHARS_UPPER;
        }

        var value = "";

        for (var i = 0; i < stringLength; i++) {
            var index = integer(0, letters.length - 1);
            var stringSymbol = letters.charAt(index)
            value = value + stringSymbol;
        }
        
        if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
        
        return "Error";
    };

    function integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

function sjeClass() {
    return new ValueTransformer();
}