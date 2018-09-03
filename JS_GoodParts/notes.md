# Things to avoid


# Things to avoid
1. **== and !=**  
   Use === and !== instead, since == will change the type.
   ***
2. **with**  
   Just never use it.
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
   All the numbers in javascript are saved as double float, if use bitwise operator, the compiler needs to convert number to integer first.
   ***
9. **function statement**    
   Use function expression instead for the reason of hoisting.
   ***
10. **Don't use new**    
    If forget new, the constructor function will be executed and create global variables, it is hard to debug. There is a work around:    
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
   ***
12. **void**    
    In other strong type languages like java, ````void```` is a type, yet in javascript, void is an operator, it takes an operand and returns undefined:    
    ```js
    void o; // undefined
    ```
    It is not useful and brings trouble, so just don't use it.    
    ***

# Reference
1. [12种不宜使用的Javascript语法 ———— 阮一峰](http://www.ruanyifeng.com/blog/2010/01/12_javascript_syntax_structures_you_should_not_use.html)
2. [Javascript变成风格 ———— 阮一峰](http://www.ruanyifeng.com/blog/2012/04/javascript_programming_style.html)
