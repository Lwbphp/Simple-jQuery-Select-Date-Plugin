### jQuery Simple Date Plugin
```javascript
<div id="app"></div>
<button id="click">Click</button>
<script>
    $('#app').simpleDate({
        start:'2015-01-20',
        end:'2017-02-20',
        selected:'2017-01-01'   
    })

    //get  selected Date
    $('#click').click(function(){
        //get selected date 
        console.log($('#app').getSimpleDate());
        /*
            {date: "2017-1-1", year: "2017", month: "1", day: "1"}
        */
    })
</script>
```

> Set Date Element 

```javascript
    $(element).simpleDate({
        start:the set start each date,
        end: the set each end date,
        selected: current selected date   
    })

    //And the caller is the same element
    //get element date Object
    $(element).getSimpleDate()
    
```
