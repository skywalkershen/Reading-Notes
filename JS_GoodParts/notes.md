# Reading notes for 《Javascript - The Good Parts》
# Some important concepts
1. 
# Tips for coding style and things to notice
1. **position of ````{````**    
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
2. **````(````**    
    There are two uses for parentheses in Javascript, invoking function and grouping, use space to distinguish.    
    * When invoking function, there is no space between ````(```` and function name.
    * There is no space bewteen function name and arguments list.
    * There is always a space between ````(```` and other elements.
    ***
3. **````;````**    
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
4. **Combining statements**    
    Readability and robustness comes first, use different lines for different statements.
    ***
5. **Hoisting**    
    Since variables will be hoisted, put them at the beginning of the code block. 
    * Put all variable declarations at top of the function, don't declare at the site of first use.
    * Declare function before use.
    ***
6. **Global Variables**    
    The biggest con for Javascript, try to avoid using it. If have to use it, use uppercase or something easey to notice, like a prefix g.
    ***
7. **Always use ````{}```` for blocks**
    ***
8. **parseInt**    
   A function converts string to integer, it stops when meets a nondigit. Note if first character of the string is 0, the string will be evaluated in base 8 instead of base 10. Be caucious if use it for parsing dates/ time. Or use radix parameter like ````parseInt('08', 10)```` to produce ````8````.
   ***
9. **Floating point**    
    ````0.1 + 0.2```` is not ````0.3````! But integer arithmetic in floating point is exact, so decimal representation errors can be avoided by scaling.
    ***
10. **NaN**
    Stands for not a number, yet ````typeof NaN === 'number'; // true````.
    ***
11. **Phony Arrays**    
    The array is actually object with length member, the ````typeof```` does not distinguish between array and object, use ````Array.isArray()```` to check whether it is array. The length of array is not like its counterpart in other languages. 
    ```js
    var a = [];
    a.length; // 0
    a[10] = 1;
    a.length; // 11
    ```
    ***
12. **Phony values**    
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
13. **Object**    
    Javascript object is never empty since they can always pick up members from the prototype chain.




# Things to avoid
1. **````==````,  ````!=````, ````===````, ````!==````**  
   Use ````===```` and ````!==```` instead, since ````==```` will change the type of variable.
   ***
2. **with**  
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
3. **eval**     
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
4. **continue**    
   Not necessary.
   ***
5. **switch**    
   Not going to the matched case then jump to the end, it goes through each case to the end unless there is break/ return/ throw.    
   If really want to use it, add break for each case
   ***
6. **single line block**    
   use ````{}```` block, don't just use statement after ````if, while, do, for````
   ***
7. **Don't use ++ & --**    
   Use += 1 instead
   ***
8. **bitwise operator**    
   All the numbers in Javascript are saved as double float, if use bitwise operator, the compiler needs to convert number to integer first.
   ***
9. **function statement**    
   Use function expression instead for the reason of hoisting.
   ***
10. **Don't use new**    
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
   Avoid using typed wrappers with ````new````
   ***
12. **void**    
    In other strong type languages like java, ````void```` is a type, yet in Javascript, void is an operator, it takes an operand and returns undefined:    
    ```js
    void o; // undefined
    ```
    It is not useful and brings trouble, so just don't use it.    
    ***

# Reference
1. [12种不宜使用的Javascript语法 ———— 阮一峰](http://www.ruanyifeng.com/blog/2010/01/12_Javascript_syntax_structures_you_should_not_use.html)
2. [Javascript编程风格 ———— 阮一峰](http://www.ruanyifeng.com/blog/2012/04/Javascript_programming_style.html)
