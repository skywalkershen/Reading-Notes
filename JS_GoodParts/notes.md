# **Reading notes for 《Javascript - The Good Parts》**
## **Some important concepts**
1. ### **Global abatement with object**    
   Can use single global variable:    
   ```js
   var Myapp = {};
   Myapp.stooge = {
       'fist-name': 'Joe',
       'last-name': 'Howard'
   };
   Myapp.flight = {
       airline: 'Oceanic',
       number: 815,
       departure: {
           IATA: 'SYD',
           time: '2004-09-23 10:32',
           city: 'Sydney'
       },
       arrival: {
           IATA: 'LAX',
           time: '2004-09-23 10:42',
           city: 'Los Angeles'
       }
   };
   ```
   ***
2. ### **Function module**    
   Module is a function or object that presents an interface while hiding state and implementation. By using function and closure to make modules, we can avoid using global variables.    
   A regular sugar used in this example:
   ```js
   Object.prototype.method = function (name, func) {
       if (!this.prototype[name]) {
           this.prototype[name] = func;
       }
   }
   ```
   ```js
   String.method('deentityfy', function () {
       var entity = {
           quot: '"',
           lt: '<', 
           gt: '>'
       };
       return function () {
           return this.replace(
            /&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
       }
   }());
   ```
   The general pattern of module is a function with private variables and functions, only the returned function has access to private variables and functions. Below is an example that returns an privilidged object for accessing the private variables:
   ```js
   var serial_maker = function () {
       var prefix = '',
           seq = 0;
       return {
           set_prefix: function (p) {
               prefix = String(p);
           },
           set_seq: function (s) {
               seq = s;
           },
           gensym: function () {
               var result = prefix + seq;
               seq += 1;
               return result;
           };
       };
   };
   var seqer = serial_maker();
   ```
   ````seqer```` is mutable, yet the private variables can only be changed via the functions provided.
   ***
3. ### **Anonymous closure module pattern**    
    ```js
    var global = 'Hello, I am a global variable :)';

    (function () {
    // We keep these variables private inside this closure scope
    
    var myGrades = [93, 95, 88, 0, 55, 91];
    
    var average = function() {
        var total = myGrades.reduce(function(accumulator, item) {
        return accumulator + item}, 0);
        
        return 'Your average grade is ' + total / myGrades.length + '.';
    }

    var failing = function(){
        var failingGrades = myGrades.filter(function(item) {
        return item < 70;});
        
        return 'You failed ' + failingGrades.length + ' times.';
    }

    console.log(failing());
    console.log(global);
    }());

    // 'You failed 2 times.'
    // 'Hello, I am a global variable :)'
    ```
    This approach enables us to use local variables instead of overiting existing global varialbes, while still having access to global variables.     
        
    Note that the parentheses around the IIFE is required since the statements start with keyword ````function```` are considered to be function declarations, and it is not allowed to have unnamed function declaration in Javascript. The surrounding parentheses will turn the statement to function expression. [Encapsulated anonymous function syntax](https://stackoverflow.com/questions/1634268/explain-the-encapsulated-anonymous-function-syntax)
***    
1. ### **Global import module pattern**    
   Like anonymous pattern, except pass in global variables as parameters.
   ***
2. ### **Object Interface module pattern**    
   Create modules using self-contained object interface:    
   ```js
    var myGradesCalculate = (function () {
        
    // Keep this variable private inside this closure scope
    var myGrades = [93, 95, 88, 0, 55, 91];
    
    var average = function() {
        var total = myGrades.reduce(function(accumulator, item) {
        return accumulator + item;
        }, 0);
        
        return'Your average grade is ' + total / myGrades.length + '.';
    };

    var failing = function() {
        var failingGrades = myGrades.filter(function(item) {
            return item < 70;
        });

        return 'You failed ' + failingGrades.length + ' times.';
    };

    // Explicitly reveal public pointers to the private functions 
    // that we want to reveal publicly

    return {
        average: average,
        failing: failing
    }
    })();

    myGradesCalculate.failing(); // 'You failed 2 times.' 
    myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
   ```    
   Like the function module, we can decide which variable/ function we want keep private by whether returning them.
   ***
3. ### **Memiozation**
    Can be used to optimising recursive function by keeping record of previous results, the idea is similar to DP.    
    TBC
    ***
4. ### **Inheritance**
## **Tips for coding style and things to notice**
1. ### **position of ````{````**    
    Use this style:    
    ```js
    block {

    }
    ```
    Since Javascript will auto add ```;``` at the end of line, seperating the block and ```return / condition terms``` might lead to problems:    
    ```js
    return 
    {
        key: value;
    }
    ```
    This will return undefined instead of the key-value pair.    
    ***
2. ### **````(````**    
    There are two uses for parentheses in Javascript, invoking function and grouping, use space to distinguish.    
    * When invoking function, there is no space between ````(```` and function name.
    * There is no space bewteen function name and arguments list.
    * There is always a space between ````(```` and other elements.
    ***
3. ### **````;````**    
    Always put ````;```` at the end of the statement.    
        
    If omitted, the ````;```` will be added automatically unless the first token of the next line falls in the following charactors:    
    ````(````, ````[````, ````/````, ````+````, ````-````    
    ```js
    x = y
    (function () {
        ...
    })();
    ```
    The code above equals to: 
    ```js
    x = y(function () {...})();
    ```
    ***
4. ### **Combining statements**    
    Readability and robustness comes first, use different lines for different statements.
    ***
5. ### **Hoisting**    
    Since variables will be hoisted, put them at the beginning of the code block. 
    * Put all variable declarations at top of the function, don't declare at the site of first use.
    * Declare function before use.
    ***
6. ### **Global Variables**    
    The biggest con for Javascript, try to avoid using it. If have to use it, use uppercase or something easey to notice, like a prefix g. Also note that using prefix can avoid namespace pollution, yet too many global variables may slow some browsers down.
    ***
7. ### **Always use ````{}```` for blocks**
    ***
8. ### **parseInt**    
   A function converts string to integer, it stops when meets a nondigit. Note if first character of the string is 0, the string will be evaluated in base 8 instead of base 10. Be caucious if use it for parsing dates/ time. Or use radix parameter like ````parseInt('08', 10)```` to produce ````8````.
   ***
9. ### **Floating point**    
    ````0.1 + 0.2```` is not ````0.3````! But integer arithmetic in floating point is exact, so decimal representation errors can be avoided by scaling.
    ***
10. ### **NaN**
    Stands for not a number, yet ````typeof NaN === 'number'; // true````.
    ***
11. ### **Phony Arrays**    
    The array is actually object with length member, the ````typeof```` does not distinguish between array and object, use ````Array.isArray()```` to check whether it is array. The length of array is not like its counterpart in other languages. 
    ```js
    var a = [];
    a.length; // 0
    a[10] = 1;
    a.length; // 11
    ```
    ***
12. ### **Phony values**    
    Value | Type
    --- | ---
    0 | Number
    NaN | Number
    '' | String
    false | Boolean
    null | Object
    undefined | Undefined
    The values above are all falsy but not interchangeable. Never use something like ````== null```` to check invalid parameter.
    ***
13. ### **Object**    
    Javascript object is never empty since they can always pick up members from the prototype chain.




## **Things to avoid**
1. ### **````==````,  ````!=````, ````===````, ````!==````**  
   Use ````===```` and ````!==```` instead, since ````==```` will do type coersion before comparing.
   ***
2. ### **with**  
   Just never use it.    
   The useage is to reduce code, yet it might introduce problems:
   ```js
   　　with (o) {
       foo = bar;
   }
   ```
   The result for the code above can be as following, depending on whether the variable is defined:
   ```js
   o.foo = bar;
   o.foo = o.bar;
   foo = bar;
   foo = o.bar;
   ```
   ***
3. ### **eval**     
   Safety and performance issue.  
   Don't use it for :  
   ```js
   eval("myValue = myObject." + myKey + ";");
   ```    
   use 
   ```js
   myValue = myObject[myKey];
   ``` 
   instead.
   ***
4. ### **continue**    
   Not necessary.
   ***
5. ### **switch**    
   Not going to the matched case then jump to the end, it goes through each case to the end unless there is break/ return/ throw.    
   If really want to use it, add break for each case
   ***
6. ### **single line block**    
   use ````{}```` block, don't just use statement after ````if, while, do, for````
   ***
7. ### **Don't use ++ & --**    
   Use += 1 instead
   ***
8. ### **bitwise operator**    
   All the numbers in Javascript are saved as double float, if use bitwise operator, the compiler needs to convert number to integer first.
   ***
9. ### **function statement**    
   Use function expression instead for the reason of hoisting.
   ***
10. ### **Don't use new**    
    If forget new, the ````this```` in constructor function will be pointed to globe, all the variables for ````this```` will become global variables, it is hard to debug. There is a work around:    
    ```js
    　Object.beget = function (o) {
    　　　var F = function (o) {};
    　　　F.prototype = o ;
    　　　return new F;
    　};    
    ```    
   Use this function to manipulate the prototype object:
   ```js
　　var Cat = {
　　　　name:'',
　　　　saying:'meow'
　　};

　　var myCat = Object.beget(Cat);

   myCat.name = 'mimi';
   ```
   Avoid using typed wrappers with ````new````.
   ***
11. ### **void**    
    In other strong type languages like java, ````void```` is a type, yet in Javascript, void is an operator, it takes an operand and returns undefined:    
    ```js
    void o; // undefined
    ```
    It is not useful and brings trouble, so just don't use it.    
    ***
12. ### **Using ````this```` to refer object being used as a namespace**    
    Example without ````this```` :
    ```js
    var myApp = {};

    myApp.message = 'hello';

    myApp.sayHello = function() {
    alert(myApp.message);
    };

    myApp.sayHello(); // works
    
    var importedfn = myApp.sayHello;

    importedfn(); // works
    ```   
    With ````this````:    
    ```js
    var myApp = {};

    myApp.message = 'hello';

    myApp.sayHello = function() {
    alert(this.message);
    };

    myApp.sayHello() // works because "this" refers to myApp object.

    var importedfn = myApp.sayHello;

    importedfn(); // error because "this" refers to global object.
    ```    
   ***

## **Reference**
1. [12种不宜使用的Javascript语法 ———— 阮一峰](http://www.ruanyifeng.com/blog/2010/01/12_Javascript_syntax_structures_you_should_not_use.html)
2. [Javascript编程风格 ———— 阮一峰](http://www.ruanyifeng.com/blog/2012/04/Javascript_programming_style.html)
3. [Javascript Modules: A Beginner's GUide](https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc)
4. [JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
5. [Learning Javascript Design Patterns ———— Adnan Osmani](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/)