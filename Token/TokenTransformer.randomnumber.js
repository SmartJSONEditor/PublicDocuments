var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
    this.displayName = "Random Number";
    this.shortDescription = "Generate random Integer/Float number with min/max and fixed floating points.";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
        var minUIParam = { 
            type: "Number",
            name: "min",
            displayName: "Min",
            description: "Minimum", 
            defaultValue: "0",
			tokenScripts: true
        };
        
        var maxUIParam = { 
            type: "Number",
            name: "max", 
            displayName: "Max",
            description: "Maximum",
            defaultValue: "100",
			tokenScripts: true
        };
        
        var floatingUIParam = {
            type: "Number", 
            name: "fixed", 
            displayName: "Floating points", 
            description: "Fixed floating points, use O for Integer values",
            defaultValue: "4",
			tokenScripts: true
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
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
		// Process inputValue
		
		var minRaw = DocumentModel.getTokensValue(parameters.min, userInfo.projectNode, pluginIdentifier);
		var maxRaw = DocumentModel.getTokensValue(parameters.max, userInfo.projectNode, pluginIdentifier);
		var fixed = DocumentModel.getTokensValue(parameters.fixed, userInfo.projectNode, pluginIdentifier);
		
        var minValue = minRaw;
        var maxValue = maxRaw;
        
        if (minRaw > maxRaw) {
            minValue = maxRaw;
            maxValue = minRaw;
        }
		
		if(isNaN(minRaw) || isNaN(maxRaw) || isNaN(fixed) ) {
			return "Error-parameter-values-are-not-numbers-x";
		}
                
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
        return "Error-invalid-parameters-x";
    };
	
	function integer(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    function float(optionsMin,optionsMax,optionsFixed) {
        
		
		if(typeof optionsMin !== 'number' || typeof optionsMax !== 'number' || typeof optionsFixed !== 'number') {
			return 0;
		}
        var MAX_INT = 9007199254740992;
        var MIN_INT = -MAX_INT;
        
        var num;
        var fixed = Math.pow(10, optionsFixed);
        
        var max = MAX_INT / fixed;
        var min = -max;
        
        num = integer(optionsMin * fixed, optionsMax * fixed);
		var calculation =  (num / fixed);
        var num_fixed = calculation.toFixed(optionsFixed);
        
        return parseFloat(num_fixed);
    }
}

function sjeClass() {
    return new ValueTransformer();
}