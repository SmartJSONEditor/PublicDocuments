var ValueTransformer = function () {
    // https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer
     this.displayName = "Random Location with Radius";
    this.shortDescription = "Generate Latitude & Longitude values in circle with radius";
    this.isEditingDisabled = true;
    this.infoUrl = "https://github.com/SmartJSONEditor/PublicDocuments/wiki/Token-Value-Transformer";
    
	// https://github.com/SmartJSONEditor/PublicDocuments/wiki/UIParameters
    this.parameters = function (config) {
		
		if (config == null) {
			return [];
		}
		// Construct your parameters
        var mapDefaultValues = {
            latitude: 25.781925,
            longitude: -80.1303897,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
            mapType: 0
        }
        var mapParameter = {
            name: "locationMap",
            displayName: "Map Location",
            description: "Zoom and center region on map, to pan use mouse movement, to zoom use shift + mouse movement.",
            type: "Map",
            defaultValue: mapDefaultValues
        };

        var radius = {
            name: "radius",
            displayName: "Radius",
            description: "Select random radius in meters, use 0 for pinpoint location",
            type: "Number",
            defaultValue: 1000
        };
        
        var stringUIParam = { 
			name: "separator", 
			type: "String", 
			displayName: "Latitude & Longitude separated by", description: "In case of joined Latitude & Longitude output, separator will be used.", 
			defaultValue: ","
		};
        
        var popupDefaultValue = [ 
			{ displayName: "Latitude", value: "lat" },
			{ displayName: "Longitude", value: "lon" },
			{ displayName: "Latitude & Longitude using separator", value: "lat_sep_lon" },
			{ displayName: "longitude & Latitude using separator", value: "lon_sep_lat" },
		];
    	var popupUIParam = { 
			name: "outputtype", 
			type: "Popup", 
			displayName: "Output as", 
			description: "Select output options. If separator is used, your value type must be String type.",
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


        return [mapParameter, radius, stringUIParam, popupUIParam, segmentsOutputUIParam];
    };
    
    this.transform = function (inputValue, parameters, userInfo) {
		// Process inputValue
    	var latitude = parameters.locationMap.latitude;
        var longitude = parameters.locationMap.longitude;
        var radius = parameters.radius;
        var output = (Array.isArray(parameters.outputtype) == true) ? "lat" :  parameters.outputtype;
        var separator = (parameters.separator === undefined) ? "," : parameters.separator;

        var r = radius / 111300,
            y0 = latitude,
            x0 = longitude,
            u = Math.random(),
            v = Math.random(),
            w = r * Math.sqrt(u),
            t = 2 * Math.PI * v,
            x = w * Math.cos(t),
            y1 = w * Math.sin(t),
            x1 = x / Math.cos(y0)

        var newLatitude = y0 + y1
        var newLongitude = x0 + x1        

		var value = '';
		
        if (output == "lat") { return newLatitude; }
        if (output == "lon") { return newLongitude; }
        if (output == "lat_sep_lon") { 
            value = newLatitude + separator + newLongitude;
        }
        if (output == "lon_sep_lat") {
            value = newLongitude + separator + newLatitude; 
        }
		
		if (parameters.output[0].enabled == 1) { return value + inputValue; };
        if (parameters.output[1].enabled == 1) { return value; };
        if (parameters.output[2].enabled == 1) { return inputValue + value; };
		
        return "Error-invalid-parameters-x";
    };
}

function sjeClass() {
    return new ValueTransformer();
}
