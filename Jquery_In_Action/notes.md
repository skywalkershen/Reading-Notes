# **Reading notes for 《JQUERY In Action》**    
## **Useage**    
1. ### **Document ready handler**    
   Should use ````$(document).ready```` rather than ````window.onload```` since we only need to wait till DOM loaded, not entire page fully loaded. The frequent use case:     
   ```js
    $(function() {
        $("table tr:nth-child(even)").addClass("even");
    });
   ```
   By passing a function to ````$()````, the browser is instructed to wait till DOM fully loaded. Multiple use in the same HTML will leads to the execution of functions in the order they are declared.    
   ***
2. ### **Extend jQuery for custom needs, serve as namespace       for global utility functions**    
    ***
3. ### **Selector for wrapping DOM elements**    
   ***
4. ### **Create DOM elements from HTML markup**
   ***
## **Selector**
1. ### **Can use child, container, attribute selectors**    
   Selector | Description
   --- | ---
   ````*````| Maches any element.
   E | Matches all element with tag name E.
   E F | Matches all elements with tag name F that are descendents of E.
   E > F | Matches all elements with tag name F that are direct children of E.
   E + F | Matches all elements F immediately preceded by sibling E.
   E ~ F | Matches all elements F preceded by any sibling E.
   E:has(F) | Matches all elements with tag name E that have at least one descendent with tag name F.
   E.C | Matches all elements E with class name C. Omitting E is the same as *.C.
   E#I | Matches element E with id of I. Omitting E is the same as *#I.
   E[A] | Matches all elements E with attribute A of any value.
   E[A=V] | Matches all elements E with attribute A whose value is exactly V.
   E[A^=V] | Matches all elements E with attribute A whose value begins with V.
   E[A$=V] | Matches all elements E with attribute A whose value ends with V.
   E[A*=V] | Matches all elements E with attribute A whose value contains V.
   ***
2. ### **Select by position, note the nth-child starts from 1 while other selectors start from 0.**  
   Selector | Description
   --- | ---
   :first | The first match of the page. li a:first returns the first link also under a list item.
   :last | The last match of the page. li a:last returns the last link also under a list item.
   :first-child | The first child element. li:first-child returns the first item of each list.
   :last-child | The last child element. li:last-child returns the last item of each list.
   :only-child | Returns all elements that have no siblings.
   :nth-child(n) | The nth child element. li:nth-child(2) returns the second list item of each list.
   :nth-child(even/odd) | Even or odd children. li:nth-child(even) returns the even children of each list.
   :nth-child(Xn+Y) | The nth child element computed by the supplied formula. If Y is 0, it may be omitted. li:nth-child(3n) returns every third item, whereas li:nth-child(5n+1) returns the item after every fifth element.
   :even and :odd | Even and odd matching elements page-wide. li:even returns every even list item.
   :eq(n) | The nth matching element.
   :gt(n) | Matching elements after (and excluding) the nth matching element.
   :lt(n) | Matching elements before (and excluding) the nth matching element.
   ***
3. ### **Custom jQuery selectors**
   Selector | Description
   --- | ---
   :animated |   Selects elements that are currently under animated control. Chapter 5 will cover animations and effects.
   :button | Selects any button (input[type=submit], input[type=reset], input[type=button], or button).
   :checkbox | Selects only check box elements (input[type=checkbox]).
   :checked | Selects only check boxes or radio buttons that are checked (supported by CSS).
   :contains(foo) | Selects only elements containing the text foo.
   :disabled | Selects only form elements that are disabled in the interface (supported by CSS).
   :enabled  | Selects only form elements that are enabled in the interface (supported by CSS).
   :file | Selects all file elements (input[type=file]).
   :header | Selects only elements that are headers; for example: ````<h1> through <h6> elements````.
   :hidden | Selects only elements that are hidden.
   :image | Selects form images (input[type=image]).
   :input | Selects only form elements (input, select, textarea, button).
   :not(filter) | Negates the specified filter.
   :parent | Selects only elements that have children (including text), but not empty elements.
   :password | Selects only password elements (input[type=password]).
   :radio | Selects only radio elements (input[type=radio]).
   :reset | Selects reset buttons (input[type=reset] or button[type=reset]).
   :selected | Selects option elements that are selected.
   :submit | Selects submit buttons (button[type=submit] or input[type=submit]).
   :text | Selects only text elements (input[type=text]).
   :visible | Selects only elements that are visible.
4. ### **Use XPath(XML)**
***
## **Manipulating selected wrapped sets**
Check doc and book for details
1. ### **Using relationships**
   Selector | Description
   --- | ---
    children() | Returns a wrapped set consisting of all unique children of the wrapped elements.
    contents() | Returns a wrapped set of the contents of the elements, which may include text nodes, in the wrapped set. (Frequently used to obtain the contents of ````<iframe>```` elements.)
    next() | Returns a wrapped set consisting of all unique next siblings of the wrapped elements.
    nextAll() | Returns a wrapped set containing all the following siblings of the wrapped elements.
    parent() | Returns a wrapped set consisting of the unique direct parents of all wrapped elements.
    parents() | Returns a wrapped set consisting of the unique ancestors of all wrapped elements. This includes the direct parents as well as the remaining ancestors all the way up to, but not including, the document root.
    prev() | Returns a wrapped set consisting of all unique previous siblings of the wrapped elements.
    prevAll() | Returns a wrapped set containing all the previous siblings of the wrapped elements.
    siblings() | Returns a wrapped set consisting of all unique siblings of the wrapped elements.   
    ***
2. ### **Managing jQuery chains**
   ````$('img').clone().appendTo('#somewhere');````    
   In the statement above, the operand for ````appendTo()```` is the wrapped set generated by ````clone()````.    
       
   If want to operate on the original set, **use ````end()```` in jQuery chain to back up to previous set.**
    
   ````andSelf()```` can be used to merge two previous wrapped sets in command chain.
   ***
3. ### **Notes for ````appendTo()````**
   When there is only one target element, the original source element will be moved instead of copied and moved.
   ```js
    <fieldset id="source">
        <legend>Source elements</legend>
        <img id="flower" src="flower.png"/>
        <img id="car" src="car.png"/>
    </fieldset>   
    <fieldset id="targets">
        <legend>Target elements</legend>
        <p><img src="dragonfly.png"/></p>
        <p><img src="dragonfly.png"/></p>
        <p><img src="dragonfly.png"/></p>
    </fieldset>
   ```
   ```js
    $('#flower').appendTo('#targets p')
    $('#car').appendTo('#targets p:first')
   ```
   In this example, the ````#car```` will be moved instead of leaving a copy at its original position, since there is only one target element.    
    
   Other methods like this:    
   ````append(), prepend(), prependTo(), before(), insertBefore(), after(), insertAfter()````
   ***
## **EventHandler**
1. ### **EventListener execution order**
   Code example:
   ```js
    $(function(){
        var element = $('#vstar')[0];
        element.addEventListener('click',function(event) {
            say('Whee once!');
        },false);
        element.addEventListener('click',function(event) {
            say('Whee twice!');
        },false);
        element.addEventListener('click',function(event) {
            say('Whee three times!');
        },false);
    });
    function say(text) {
        $('#console').append('<div>'+text+'</div>');
    }   
   ```
   Although the execution result is 
   ```
   Whee once!
   Whee twice!
   Whee three times!
   ```
   There is no guarantee the by the standard the execuction order is the same as the order of binding the eventhandlers. So never rely on this order.
   ***
2. ### **jQuery event model features**
   * Provides a unified method for establishing event handlers.
   * Allows multiple handlers for each event type on each element.
   * Uses standard event-type names: for example, click or mouseover.
   * Makes the Event instance available as a parameter to the handlers.
   * Normalizes the Event instance for the most often used properties.
   * Provides unified methods for event canceling and default action blocking.
  ***
3. ### **Grouping event handlers**
   Unlike conventional namespacing (which assigns namespaces via a prefix), the event names are namespaced by adding a suffix to the event name separated by a period character.    
   ```js
   $('#thing1').bind('click.editMode',someListener);
   $('#thing2').bind('click.editMode',someOtherListener);
   ...
   $('#thingN').bind('click.editMode',stillAnotherListener);
   // Remove all click bindings in the namespace editMode
   $('*').unbind('click.editMode');
   ```
   ***
4. ### **Event type name**
   ■ blur ■ change ■ click ■ dblclick ■ error ■ focus ■ keydown ■ keypress ■ keyup ■ load ■ mousedown ■ mousemove ■ mouseout ■ mouseover ■ mouseup ■ resize ■ scroll ■ select ■ submit ■ unload    
       
   Note that when using these shortcut methods, we cannot specify a data value to be placed in the event.data property.
   ***
5. ### **Stop event propagation**
   Use ````stopPropagation()```` to prevent bubbling up the DOM tree, ````preventDefault()```` to cancel semantic action the event might cause. To do both, return ````false```` in listener function.
   ***
6. ### **Triggering event handler**
   Using ````trigger()```` doesn't actually trigger the event and have it propagated. It is just a call to the event handler function.    
    
   Note since there is no event triggered, properties that report values has no value, location for mouse event for example.    
   ***
## **JQuery animation**
1. ### **Note for ````show(), hide()````**
   For element with init ````display```` property set to ````none````, ````show()```` will turn its ````display````, even if it is inline element.    
    
   If the element starts out without an explicitly declared ````display```` value, and we use the jQuery ````hide()```` command to hide it, the ````show()```` command will remember the original value and restore it to that original ````display```` state.    
    
   Thus, don't use ````style```` attributes on the elements we want initially hidden, but to apply the ````hide()```` command to them in the page’s ready handler. 
   ***
## **JQuery Utility Functions**
1. ### **Object detection**
   Note this method is still should be avoided in lieu of browser detection. It is put here for the idea behind it to approach to a problem by figuring out the core issue behind it.   
    
   Browser detection is unreliable and unnecessary, what matters is different browsers provides different methods for establishing listeners. So, the issue can be solved by checking the existance of certain methods.
   ***
2. ### **Avoid conflict with ````$````**
   * Use ````$.noConflict()````. After the execution of other library using ````$````, use ````jQuery```` instead. Or define another alias, for example:
   ```js
    var $j = jQuery;
   ```
   * Create an environment where ````$```` is scoped to refer to ````jQuery```` object. 
    
     The function declaration is enclosed in parentheses and turned to an expression,  resulting in a reference to the anonymous function being returned as the value of the expression. The parameter passed in will be deemed as ````$```` inside the scope. The ````(jQuery)```` performs the function call.
   ```js
    (function($) { /* function body here */ })(jQuery);
   ```
   * An variation of previous method    
     Pass a function as parameter to ````jQuery```` function, make it a ready handler. Since the ````jQuery```` always passes a reference to ````jQuery```` to ready handler as its only parameter, it guarantees that ````$```` refers to ````jQuery```` inside handler inspite it might be defined otherwise outside the handler.
    ```js
    jQuery(function($) {
        alert("I'm ready!");
    });
    ```

## Reference
1. **[JS: attribute vs. property](http://lucybain.com/blog/2014/attribute-vs-property/)**
2. **[Difference between property and atribute in jQuery](https://www.c-sharpcorner.com/UPLOADFILE/97FC7A/DIFFERENCE-BETWEEN-PROP-AND-ATTR-IN-JQUERY/)**
3. **[Attributes and properties](https://javascript.info/dom-attributes-and-properties)**


