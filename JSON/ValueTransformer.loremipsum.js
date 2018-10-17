var ValueTransformer = function () {

    this.displayName = "Lorem Ipsum Generator";
    this.shortDescription = "Generate fake text in popular format.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-LoremIpsum";

    this.parameters = function () {

        var itemsUIParameter = {
            type: "Number",
            name: "items",
            displayName: "Number of items",
            description: "Select number of items you want to generate",
            defaultValue: 5
        };

        var popupDefaultValue = [
            { displayName: "Words", value: "words" },
            { displayName: "Sentences", value: "sentences" },
            { displayName: "Paragraphs", value: "paragraphs" },
            { displayName: "Random", value: "random" }
        ];

        var popupUIParam = {
            name: "popup",
            type: "Popup",
            displayName: "Item Type",
            description: "Select Character type",
            defaultValue: popupDefaultValue
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

        return [itemsUIParameter, popupUIParam, segmentsOutputUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {

        var timestamp = DocumentModel.unixTimestamp();

        var numberOfItems = parameters.items;
        var type = (Array.isArray(parameters.popup) == true) ? "words" :  parameters.popup;
        var value = "";

        if (type == "words") {
            value = generateWords(numberOfItems);
        }
        if (type == "sentences") {
            value = generateSentences(numberOfItems);
        }
        if (type == "paragraphs") {
            value = generateParagraphs(numberOfItems);
        }
        if (type == "random") {
            value = generateRandom(numberOfItems);
        }

        if (parameters.output[0].enabled == 1) {
            return value + inputValue;
        };
        if (parameters.output[1].enabled == 1) {
            return value;
        };
        if (parameters.output[2].enabled == 1) {
            return inputValue + value;
        };
    };

    function generateWords(count) {
        
        var items = [];
        for (var i = 0; i < count; i++) {
            var item = DocumentModel.randomValueDatabase("loremIpsum");
            items.push(item);
        }

        return items.join(" ");
    }

    function generateSentences(count) {
        
        var minCount = 4;
        var maxCount = 16;
        var items = [];
        for (var i = 0; i < count; i++) {
            var words = generateWords(randomInteger(minCount, maxCount));
            words = capitalizeFirstLetter(words);
            words = words + ".";

            items.push(words);
        }

        return items.join(" ");
    }

    function generateParagraphs(count) {

        var minCount = 3;
        var maxCount = 9;

        var items = [];
        for (var i = 0; i < count; i++) {
            var sentences = generateSentences(randomInteger(minCount, maxCount));
            items.push(sentences);
        }

        return items.join("\n\n");
    }

    function generateRandom(count) {
        
        var randomItem = randomIndex(3);
        if (randomItem == 0) {
            var minCount = 1;
            var maxCount = 8;
            return generateWords(randomInteger(minCount, maxCount));
        }
        if (randomItem == 1) {
            var minCount = 1;
            var maxCount = 5;
            return generateSentences(randomInteger(minCount, maxCount));
        }
        if (randomItem == 2) {
            var minCount = 1;
            var maxCount = 6;
            return generateParagraphs(randomInteger(minCount, maxCount));
        }
    }

    // Helpers

    function randomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function sjeClass() {
    return new ValueTransformer();
}