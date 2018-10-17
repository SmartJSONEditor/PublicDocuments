var ValueTransformer = function () {

    this.displayName = "Tokenized Characters";
    this.shortDescription = "Random characters using defined token format.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-TokenizedCharacters";

    this.parameters = function () {

        var popupDefaultValue = [
            { displayName: "Custom", value: "custom" },
        ];

        var typeUIParam = {
            name: "galleryformat",
            type: "Popup",
            displayName: "Modification Type",
            description: "Select modification type.",
            defaultValue: popupDefaultValue
        };

        var indexUIParam = {
            type: "String",
            name: "customformat",
            displayName: "Custom Format",
            description: "Define your format, click on info button to see the possible format symbols and detailed description.",
            defaultValue: "[A][A][A]-[#][#][#]"
        };
        
        var segmentsDefaultValues = [
            { displayName: "Prepend", enabled: 0 },
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var segmentsUIParam = {
            type: "Segments",
            name: "output", 
            displayName: "Output",
            description: "Select how to output the value.", 
            defaultValue: segmentsDefaultValues 
        };

        return [typeUIParam, indexUIParam, segmentsUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var galleryFormat = (Array.isArray(parameters.galleryformat) == true) ? "custom" : parameters.galleryformat;
        var customFormat = parameters.customformat;

        var value = "";
        var format = galleryFormat;

        if (galleryFormat == "custom") {
            format = customFormat;
        }

        var tokens = [];
        var string = "";
        var currentToken = "";
        var inToken = false;

        for (var i = 0; i < format.length; i++) {
            var character = format.charAt(i);

            if (character == "[") {
                inToken = true;
                continue;
            }

            if (character == "]") {
                inToken = false;
                var processedToken = processToken(currentToken);
                if (processedToken === undefined) { processedToken = "";}
                string = string + processedToken;
                currentToken = "";
                continue;
            }

            if (inToken == true) {
                currentToken = currentToken + character;
            } else {
                string = string + character;
            }
        }
        
        if (parameters.output[0].enabled == 1) { return string + inputValue; }
		if (parameters.output[1].enabled == 1) { return string; }
		if (parameters.output[2].enabled == 1) { return inputValue + string; }

        return "Error";
    };

    function processToken(token) {

        var subTokens = token.split(",")

        var pool = [];

        for (var i = 0; i < subTokens.length; i++) {
            var subtoken = subTokens[i];
            var subtokenPool = poolForSubtoken(subtoken);
            pool = pool.concat(subtokenPool);
        }
        var index = randomArrayIndex(pool.length);
        var character = pool[index];
        return character;
    }

    function poolForSubtoken(subtoken) {

        var token = subtoken;
        var isNegation = false
        var type = "";
        var negateList = [];
        var pool = [];

        if (subtoken.charAt(0) == "^") {
            isNegation = true;
            token = token.substring(1);
        }

        var theType = token.charAt(0);

        if (theType == "#") {
            type = "number";
        }
        if (theType == "a") {
            type = "lowercase";
        }
        if (theType == "A") {
            type = "uppercase";
        }
        if (theType == "*") {
            type = "symbol";
        }
        if (theType == "{") {
            type = "pool";
        }

        var inNegation = false;
        if (isNegation == true) {

            for (var i = 0; i < token.length; i++) {
                var character = token.charAt(i);

                if (character == "(") {
                    inNegation = true;
                    continue;
                }

                if (character == ")") {
                    inNegation = false;
                    continue;
                }

                if (inNegation == true) {
                    negateList.push(character);
                }
            }
        }

        var inPool = false;
        if (type == "pool") {
            for (var i = 0; i < token.length; i++) {

                var character = token.charAt(i);

                if (character == "{") {
                    inPool = true;
                    continue;
                }

                if (character == "}") {
                    inPool = false;
                    continue;
                }

                if (inPool == true) {
                    pool.push(character);
                }
            }
        }

        return generatePool(type, negateList, pool)
    }

    function generatePool(type, negationList, pool) {

        var NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var CHARS_LOWER = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var CHARS_UPPER = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var SYMBOLS = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "{", "}", "[", "]"];

        var thePool = [];

        if (type == "number") {
            thePool = NUMBERS;
        }

        if (type == "lowercase") {
            thePool = CHARS_LOWER;
        }

        if (type == "uppercase") {
            thePool = CHARS_UPPER;
        }

        if (type == "symbol") {
            thePool = SYMBOLS;
        }

        if (type == "pool") {
            thePool = pool;
        }

        for (var i = 0; i < negationList; i++) {
            var negateItem = negationList[i];
            var index = thePool.indexOf(negateItem);
            if (index > -1) {
                thePool = thePool.splice(index, 1);
            }
        }
        return thePool;
    }

    function randomArrayIndex(count) {
        return Math.floor(Math.random() * count);
    }
}

function sjeClass() {
    return new ValueTransformer();
}