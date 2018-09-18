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

// ################## 3. Inheritance, pseudoclassical pattern #######################
var objExtend = function (child, parent) {
    var Temp = function () {};
    Temp.prototype = parent.prototype;
    child.prototype = new Temp()
    child.prototype.constructor = child;
}

var Kenshi = function () {};
Kenshi.prototype = {
    name: 'Miyazaki Masahiro',
    gender: 'male',
    age: '50',
    rank: 8,
    shogo: 'Kyoshi',
    dojo: 'Kanagawa Tokuren',
    tokuiwaza: 'men',
    getWaza: function () {
        console.log('Tokuiwaza: ' + this.tokuiwaza);
    },
    getName: function () {
        console.log('Name: ' + this.name);
    },
    getRank: function () {
        console.log('Kendo ' + this.shogo + ' ' + this.rank + ' dan');
    },
    getDojo: function () {
        console.log('Dojo: ' + this.dojo);
    }
}

var Tokuren = function (name, shushin, waza) {
    this.name = name;
    this.shushin = shushin;
    this.tokuiwaza = waza;
    this.occupation = 'police';
}
var Kaeshain = function (name, company, rank) {
    this.name = name;
    this.company = company;
    this.rank = rank;
}

objExtend(Tokuren, Kenshi);
objExtend(Kaeshain, Kenshi);

var miyamoto = new Tokuren('Miyamoto Yuta', 'Gokushikan Daigaku', 'men');
var umegatani = new Kaeshain('Umegatani Kakeru', 'Nishi Nippon City Bank', '4');

miyamoto.getDojo();
umegatani.getDojo();
Kenshi.prototype.dojo = 'Unknown';
miyamoto.getDojo();
umegatani.getDojo();
Tokuren.prototype.dojo = 'Keishicho';
miyamoto.getDojo();
umegatani.getDojo();

// ################ 4. Inheritance, functional pattern ####################
// Note, although no need of using prototype chain, constructor and 'new', it has downside for performance since each object is unique.

// The pro is it is possilbe to take advantage of the closure.
var kenshi = function (name) {
    var that = {};
    that.name = name || '';
    that.rank = 3;
    that.shogo = '';
    that.tokuiwaza = 'men';
    that.dojo = 'Kyushugakuin';
    that.getDojo = function () {
        console.log('Dojo: ' + that.dojo);
    };
    that.getRank = function () {
        console.log('Rank: ' + that.shogo + ' ' + that.rank + ' Dan');
    }
    return that;
}

var tokuren = function (name, shushin, dojo) {
    var that = kenshi(name);
    that.occupation = 'Police';
    that.shushin = shushin;
    that.dojo = dojo;
    return that;
} 
var kaeshain = function (name, company, rank) {
    var that = kenshi(name);
    that.dojo = company;
    that.rank = rank;
    return that;
}
var takenouchi = tokuren('takenouchi', 'Tsukuba Daikaku', 'Keishicho');
var umegatani = kaeshain('umegatani', 'nishi-nippon city bank', 4);
takenouchi.getDojo();
umegatani.getDojo();

// ################# 5. Inheritance, prototypal pattern ######################
var kenshi = {
    name: '',
    dan: 3,
    tokuiwaza: 'men',
    dojo: 'Washinkan',
    shinsa: function (result) {
        if (result === 'pass') {
            console.log('Promoted from ' + this.dan + 'dan to ' + (this.dan + 1) + 'dan.');
            this.dan += 1;
        } else {
            console.log('Shinsa failed, still ' + this.dan + 'dan.');
        }
    },
    waza: function (newWaza) {
        if (newWaza) {
            console.log('Tokuiwaza changed from ' + this.tokuiwaza + ' to ' + newWaza);
            this.tokuiwaza = newWaza;
        } else {
            console.log('Tokuiwaza: ' + this.tokuiwaza);
        }
    },
    dojoInfo: function (newDojo) {
        if (newDojo) {
            console.log('Changed dojo from ' + this.dojo + ' to ' + newDojo);
            this.dojo = newDojo;
        } else {
            console.log('Dojo: ' + this.dojo);
        }
    }
};
var hoshiko_kita = Object.create(kenshi,{
    name: {
        value: 'Hoshiko Kita'
    },
    shushin: {
        value: 'Kyushu Gakuin'
    },
    dojo: {
        value: 'Tsukuba Daigaku'
    },
    friend: {
        value: 'Kashitani Hyuya'
    }
});
hoshiko_kita.shinsa('pass');
hoshiko_kita.waza('Tsuki');
hoshiko_kita.dojo('Kumamoto Tokuren');