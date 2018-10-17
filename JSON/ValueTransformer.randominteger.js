var ValueTransformer = function () {
    
    this.displayName = "Random Integer";
    this.shortDescription = "Generate random integer number with min/max range."
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-RandomInteger";
    
    this.parameters = function () {
        
		var minUIParam = { 
            type: "Number", 
            name: "min",
            displayName: "Min", 
            description: "Minimum",
            defaultValue: "0"
        };
        
        var maxUIParam = { 
            type: "Number",
            name: "max",
            displayName: "Max", 
            description: "Maximum",
            defaultValue: "100" 
        };

		var segmentsDefaultValues = [
            { displayName: "Prepend", enabled: 0 }, 
            { displayName: "Replace" , enabled: 1 }, 
            { displayName: "Append" , enabled: 0 }
        ];
        
        var outputUIParam = { 
            type: "Segments", 
            name: "output", 
            displayName: "Output",
            description: "Select how to output the value.", 
            defaultValue: segmentsDefaultValues 
        };

        return [minUIParam,maxUIParam,outputUIParam];
    }

    this.transform = function (inputValue, jsonValue, arrayIndex, parameters, info) {
		
        var minRaw = parameters.min;
        var maxRaw = parameters.max;
        var minValue = minRaw;
        var maxValue = maxRaw;
        
        if (minRaw > maxRaw) {
            minValue = maxRaw;
            maxValue = minRaw;
        }
        
        var randomInt = randomIntFromInterval(minValue,maxValue);
        
		// Output
        
		if (parameters.output[0].enabled == 1) {
			return inputValue + randomInt;
		}
		if (parameters.output[1].enabled == 1) {
			return randomInt;
		}
		if (parameters.output[2].enabled == 1) {
			return randomInt + inputValue;
		}
        return "Error: Invalid parameters";
        
    };
    
    function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}

function sjeClass() {
    return new ValueTransformer();
}
