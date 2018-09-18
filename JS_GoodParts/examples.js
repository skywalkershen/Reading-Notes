// ############# 1. Function module use anonymous function ####################
var expPinSet = {
    start: 'Pentagon',
    end: 'Arlington',
    next: 'Crystal City',
    another: 'Herndon'
}

var pinFuncs = (function () {
    var defaultPins = {
        start: 'home',
        end: 'company'
    };
    var getPins = function (pinSet) {
        var result = {};
        if (!pinSet.start) {
            result.start = defaultPins.start;
        }
        if (!pinSet.end) {
            result.end = defaultPins.end;
        }
        for (var pin in pinSet) {
            result[pin] = pinSet[pin];
        }
        return result;
    }
    var setPin = function (pinSet, key, value) {
        pinSet[key] = value;
    }
    var peekDefault = function () {
        return defaultPins;
    }
    return {
        getPins: getPins,
        setPin: setPin,
        peekDefault: peekDefault
    }
})()

pinFuncs.getPins(expPinSet);
pinFuncs.setPin(expPinSet,'onemore','Foster City');
pinFuncs.getPins(expPinSet);
pinFuncs.peekDefault();

// #################### 2. Add func to prototype with function closure #####################
Object.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
}

Object.method('zip', function (location, zip) {
    var defaultSet = {
        San_Jose: 95123,
        Fremont: 94530,
        Fairfax: 22031
    };
    if (!zip) {
        return this[location] ? location + ': ' + this[location]: defaultSet[location] ? location + ': ' + defaultSet[location]: location + ' not found.';
    } else {
        this[location] = zip;
        return location + ': ' + this[location];
    }
})

var exampleSet = {
    San_Jose: 95123,
    Mountain_View: 94534
};


