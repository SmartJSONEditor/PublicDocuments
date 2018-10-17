var ValueTransformer = function () {
    
    this.displayName = "Random Float";
    this.shortDescription = "Generate random float number with min/max and fixed floating points.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/ValueTransformer-RandomFloat";
    
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
        
        var floatingUIParam = {
            type: "Number", 
            name: "fixed", 
            displayName: "Floating points", 
            description: "Fixed floating points",
            defaultValue: "4"
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
        
        return [minUIParam,maxUIParam,floatingUIParam,outputUIParam];
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
        
        var fixed = parameters.fixed;
        
        var randomFloat = float(minValue,maxValue,fixed);
        
        // Output
        
        if (parameters.output[0].enabled == 1) {
            return inputValue + randomFloat;
        }
        if (parameters.output[1].enabled == 1) {
            return randomFloat;
        }
        if (parameters.output[2].enabled == 1) {
            return randomFloat + inputValue;
        }
        return "Error: Invalid parameters";
    };
    
    function integer(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function float(optionsMin,optionsMax,optionsFixed) {
        
        var MAX_INT = 9007199254740992;
        var MIN_INT = -MAX_INT;
        
        var num;
        var fixed = Math.pow(10, optionsFixed);
        
        var max = MAX_INT / fixed;
        var min = -max;
        
        num = integer(optionsMin * fixed, optionsMax * fixed);
        var num_fixed = (num / fixed).toFixed(optionsFixed);
        
        return parseFloat(num_fixed);
    }
}

function sjeClass() {
    return new ValueTransformer();
}

