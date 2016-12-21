;(function($, window, document, undefined){
    var CONSTS = {
        'DATE_LIMIT':'-',
        'SELECT_PREFIX_CLASS':'select_date_',
        'SELECT_CLASS':'select_date',
    };
    CONSTS['SELECT_YEAR_CLASS'] = CONSTS['SELECT_PREFIX_CLASS']+'year';
    CONSTS['SELECT_MONTH_CLASS'] = CONSTS['SELECT_PREFIX_CLASS']+'month';
    CONSTS['SELECT_DAY_CLASS'] = CONSTS['SELECT_PREFIX_CLASS']+'day';
    CONSTS['MIN_MONTH'] = 1;
    CONSTS['MAX_MONTH'] = 12;
    CONSTS['MIN_DAY']   = 1;
    CONSTS['MAX_DAY']   = 31;
    
    var DATE = new Date();

    var sameYear = false;

    var setDate = function(year, month)
    {
        var date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(0);
        return date;
    }

    var UTILS = {
        simpleDateArr:function(date)
        {
            var dateArr = date.split(CONSTS.DATE_LIMIT);
            return {
                'year':dateArr[0],
                'month':dateArr[1],
                'day':dateArr[2]
            }
        },
        simpleDateString:function(dateObj)
        {
            return dateObj['year']+CONSTS['DATE_LIMIT']+dateObj['month']
                    +CONSTS['DATE_LIMIT']+dateObj['day'];
        }
    }

    var config = 
    {
        start   :'1970-5-10',
        end     :'2017-12-05',
        selected:'2016-10-10'    
    }
    
    var startArr,endArr,selectedArr,self;


    var selects = 
    {
        'year':null,
        'month':null,
        'day':null
    }
    
    var select = 
    {
        select:function(className, start, end, selected)
        {
            var str  = '<select class="'+CONSTS['SELECT_CLASS']+' '+className+'">';
                str += this.option(start, end, selected);    
                str += '</select>';
            return str;
        },
        option:function(start, end, selected)
        {
            var str = '';
            var selectedStr = '';
            for(;start<=end;start++)
            {
                if(start == selected)
                {
                    selectedStr = 'selected';
                }else{
                    selectedStr = '';
                }
                str += '<option '+selectedStr+' value="'+start+'">'+start+'</option>';
            }
            return str;
        } 
    }

    var events = {
        init:function(yearDOM, monthDOM, dayDOM)
        {
            yearDOM.change(this.year);
            monthDOM.change(this.month);
            dayDOM.change(this.day);
        },
        year:function(e)
        {
            selectedArr['year'] = $(this).val();
            select['month'].html(createSelect.createMonth(selectedArr, startArr, endArr));
            select['day'].html(createSelect.createDay(selectedArr, startArr, endArr));
            select['month'].trigger('change');
            select['day'].trigger('change');
            setDateToDom();
        },
        month:function(e)
        {
            selectedArr['month'] = $(this).val();
            select['day'].html(createSelect.createDay(selectedArr, startArr, endArr));
            setDateToDom();
        },
        day:function(e)
        {
            selectedArr['day'] = $(this).val();
            $(this).html(createSelect.createDay(selectedArr, startArr, endArr));
            setDateToDom();
        }
    }

    var createSelect = 
    {
        year:function(start, end, selected)
        {
            return select.select(CONSTS['SELECT_YEAR_CLASS'], start, end, selected);
        },
        month:function(start, end, selected)
        {
            return select.select(CONSTS['SELECT_MONTH_CLASS'], start, end, selected);
        },
        day:function(start, end, selected)
        {
            return select.select(CONSTS['SELECT_DAY_CLASS'], start, end, selected);
        },
        createMonth:function(selectedArr, startArr, endArr)
        {
            if(startArr['year'] == endArr['year'] && startArr['month'] == endArr['month'])
            {
                return this.month(startArr['month'], endArr['month'], selectedArr['month']);
            }
            else if(selectedArr['year'] == startArr['year'])
            {   
                return this.month(startArr['month'], CONSTS['MAX_MONTH'], selectedArr['month']);
            }
            else if(selectedArr['year'] == endArr['year'])
            {
                return this.month(CONSTS['MIN_MONTH'], endArr['month'], selectedArr['month']);
            }
            else
            {
                return this.month(CONSTS['MIN_MONTH'], CONSTS['MAX_MONTH'], selectedArr['month']);
            }
        },
        createDay:function(selectedArr, startArr, endArr)
        {
            if(startArr['year'] == endArr['year'] && startArr['month'] == endArr['month'])
            {
                return this.day(startArr['day'], endArr['day'], selectedArr['day']);
            }
            else if(selectedArr['year'] == startArr['year'] && selectedArr['month'] == startArr['month'])
            {   
                var date = setDate(selectedArr['year'], selectedArr['month']);
                return this.day(startArr['day'], date.getDate(), selectedArr['day']);
            }
            else if(selectedArr['year'] == endArr['year'] && selectedArr['month'] == endArr['month'])
            {
                return this.day(CONSTS['MIN_DAY'], endArr['day'], selectedArr['day']);
            }
            else
            {
                var date = setDate(selectedArr['year'], selectedArr['month']);
                return this.day(CONSTS['MIN_DAY'], date.getDate(), selectedArr['day']);
            }
        }
    }

    var createSelectDoms = function(selectedArr, startArr, endArr)
    {
        select['year']  = $(createSelect.year(startArr['year'], endArr['year'], selectedArr['year']));
        select['month'] = $(createSelect.createMonth.apply(createSelect, arguments));
        select['day']   = $(createSelect.createDay.apply(createSelect, arguments));
    }

    var setDateToDom = function()
    {
        self.data('year',  selectedArr['year']);
        self.data('month', selectedArr['month']);
        self.data('day',   selectedArr['day']);
        self.data('date',  UTILS.simpleDateString(selectedArr));
    }

    var getDate = function(that)
    {
        return {
            'date':that.data('date'),
            'year':that.data('year'),
            'month':that.data('month'),
            'day':that.data('day')
        };
    }

    $.fn.simpleDate = function(option)
    {
        self = $(this);
        $.extend(config, option);
        startArr = UTILS.simpleDateArr(config.start);
        endArr   = UTILS.simpleDateArr(config.end);
        selectedArr = UTILS.simpleDateArr(config.selected);
        createSelectDoms(selectedArr, startArr, endArr);
        events.init(select['year'], select['month'], select['day']);
        setDateToDom($(this));
        $(this).append(select['year']).append(select['month']).append(select['day']);
    }

    $.fn.getSimpleDate = function()
    {
        return getDate($(this));
    }

})(jQuery, window, document);