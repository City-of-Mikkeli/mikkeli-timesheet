(function(){
	'use strict';
	
	$(document).ready(function(){
        $('.time-period-picker-0').datetimepicker();
        $('.time-period-picker-1').datetimepicker();
        $('.time-period-picker-0').on('dp.change',function (e) {
           $('.time-period-picker-1').data('DateTimePicker').setMinDate(e.date);
        });
        $('.time-period-picker-1').on('dp.change',function (e) {
           $('.time-period-picker-0').data('DateTimePicker').setMaxDate(e.date);
        });
	});
	
})();