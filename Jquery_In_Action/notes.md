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
2. ### **Extend JQuery for custom needs, serve as namespace for global utility functions**    
    ***
3. ### **Selector for wrapping DOM elements**    
   ***
4. ### **Create DOM elements from HTML markup**
   ***
## **Selector**
1. ### **Can use child, container, attribute selectors**    
   Selector | Description
   --- | ---
   * | Maches any element.
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
3. ### **Custom JQuery selectors**
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
   