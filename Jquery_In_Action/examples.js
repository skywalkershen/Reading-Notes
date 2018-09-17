// For jQuery 1.2.1
// ########## 1. Event bubbling with chapter4/jquery.propagation.html #################

$('*').unbind();
(function () {
    $('#vstar')
    .click(function () {
        say('img clicked, bubbling~');
    });

    $('#pops')
    .click(function () {
        say('Bubbling at #pops.');
    });

    $('#grandpa')
    .click(function () {
        say('Bubbling at parent div.');
    });

    $('#greatgrandpa')
    .click(function () {
        say('Bubbling at root div.');
    });

    function say(text) {
        $('#console').append('<div>'+text+'</div>');
    }
})();



// ######### 2. Event grouping and unbinding with chapter4/jquery.propagation.html ###################

$('*').unbind();
(function () {
    eventBinding('vstar');
    eventBinding('pops');
    eventBinding('grandpa');
    eventBinding('greatgrandpa');
    $('#greatgrandpa').dblclick(function () {
        $('*').unbind('click.group');
        $('#console').append('<div> Events unbinded.</div>');
    })
    function eventBinding(elemName) {
        $('#' + elemName)
        .bind('click.group', {name: elemName}, function (e) {
            say(e.data.name);
        });
    }
    
    function say(elemName) {
        $('#console').append('<div>'+ 'Bubbling at ' + elemName +'</div>');
    }

})();



// ######### 3. Extend jQuery function with option params ##############

(function ($) {
    $.divTxt = function (txt) {
        var settings = $.extend({
            0: 'This',
            1: 'is',
            2: 'default',
            3: 'text'
        }, txt || {});
        console.log('Settings: ' + JSON.stringify(settings));
        var output = '';
        for (var prop in settings) {
            output = output + ' ' + settings[prop];
        };
        console.log('output: ' + output);
        $('body').append('<div>' + output + '</div>')
    };
})(jQuery);

$.divTxt(); // 'This is default text'
$.divTxt('test'); // 't e s t'

// ######### 4. Extend jQuery wrapper function ##############

(function ($) {
    var settings;
    $.fn.appendDivTxt = function (input) {
        settings = $.extend({
            div1Txt: "I'm div1~",
            div2Txt: 'This is div2.',
            div3Txt: 'Div3 NO.1!'
        }, input || {});

        var inputTxt = '';
        for (var prop in settings) {
            if (prop !== 'div1Txt' && prop !== 'div2Txt' && prop !== 'div3Txt') {
                inputTxt = inputTxt + settings[prop];
            }       
        };

        $('<div id="div1">' + settings.div1Txt + '</div>').appendTo(this);
        $('<div id="div2">' + settings.div2Txt + '</div>').appendTo(this);
        $('<div id="div3">' + settings.div3Txt + '</div>').appendTo(this);
        $('<div id="divInputTxt">' + inputTxt + '</div>').appendTo(this);
    };
    
})(jQuery);

$('div :first').appendDivTxt("I'm the input text~");

// ######### 5. Extend jQuery wrapper function with ajax ##############
(function ($) {
    var settings;
    $('body').prepend('<div id="desc1">Gaode Map GeoCoding api, use  $.fn.geoCoding(param1, param2), param1 is string for a city name, param2 is an object. </div>');
    $('#desc1').after('<div id="desc2">param2 options: key - string, batch - boolean for if there are other cities, other fields for other city names</div>');
    $('#desc2').after('<div id="inputDiv">The input is:</div>');
    $('#inputDiv').append('<p id="inputConsole"></p>');
    $('#inputDiv').after('<div id="outputDiv"></div>');
    $('#outputDiv').append('<p id="outputConsole"></p>');
    // Gaode Map GeoCoding api, options: batch (true/ false for multiple addresses), other addresses, just use city name here.
    $.fn.geoCoding = function (city, options) {
        settings = $.extend({
            url: 'https://restapi.amap.com/v3/geocode/geo', 
            key: 'a1264640b67bafc796ecdc12ec06e381',
            address: city
        }, options || {});
        if (settings.batch) {
            for (var param in settings) {
                if (param !== 'key' && param !== 'address' && param !== 'batch' && param !== 'url') {
                    settings.address = settings.address + '||' + settings[param];
                }
            }
        }
        var resObj = [];
        $('#inputConsole').text(JSON.stringify(settings));
        $.get(settings.url, 
            {
                key: settings.key,
                address: settings.address,
                batch: false || settings.batch
            }, function (res) {
                console.log('Response received.')
                console.log(res);
                var output = '';
                for (var loc in res.geocodes) {
                    output = output + ' || ' + res.geocodes[loc].formatted_address + ': ' + res.geocodes[loc].location;
                }
                console.log('output: ' + output);
                $('#outputConsole').text(output);
                console.log('Done.')
            }, 'json');
        
    };
})(jQuery);
