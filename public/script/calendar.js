(function(){
	'use strict';
	
	var renderedEvents = {};
	var locked = false;
	
	var getColor = function(str){
		for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
		for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
		return colour;
	};
	
	$(document).ready(function(){
		
		$('#mainCalendar').fullCalendar({
			defaultView: 'basicWeek',
			aspectRatio: 2.1,
			firstDay: 1,
			dayClick: function(date, jsEvent, view) {
				if(!locked){
					$('#addWorkDateInput').val(new Date(date.format()).getTime());
					$('#addWorkModal').modal('show');	
				}
			},
			events: function(start, end, timezone, callback) {
			$.ajax({
			    url: '/work/'+start+'/'+end,
				dataType: 'json',
				method: 'GET',
				success: function(works) {
					var events = [];
					var day = new Date(start).getDay();
					var startoffset = 0;
					var weekTotal = 0;
					var dayTotals = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
					renderedEvents = {};
					locked = false;
					for(var i = 0; i < works.length;i++){
						var work = works[i];
						if(work.locked){
							locked = true;
						}
						var color = getColor(work.project_id);
						renderedEvents[work._id] = work;
						events.push({
							_id: work._id,
							title: work.project_id,
							start: work.day + startoffset,
							end: work.day + startoffset + (3600000 * work.hours),
							color: color,
							orig_object: work
						});
						weekTotal += work.hours;
						dayTotals[new Date(work.day).getDay()] += work.hours;
						startoffset += (3600000 * work.hours);
						if(day !== new Date(work.day).getDay()){
							day = new Date(work.day).getDay();
							startoffset = 0;
						}
					}
					if(locked){
						$('#weekStateSpan').text('Tämä viikko on lukittu');
					} else {
						$('#weekStateSpan').text('');
					}
				    $('#totalWeekHours').text(weekTotal+'h');
					$('#mainCalendar').find('.fc-day-header.fc-mon').text($('#mainCalendar').find('.fc-day-header.fc-mon').text()+' ('+dayTotals[1]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-tue').text($('#mainCalendar').find('.fc-day-header.fc-tue').text()+' ('+dayTotals[2]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-wed').text($('#mainCalendar').find('.fc-day-header.fc-wed').text()+' ('+dayTotals[3]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-thu').text($('#mainCalendar').find('.fc-day-header.fc-thu').text()+' ('+dayTotals[4]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-fri').text($('#mainCalendar').find('.fc-day-header.fc-fri').text()+' ('+dayTotals[5]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-sat').text($('#mainCalendar').find('.fc-day-header.fc-sat').text()+' ('+dayTotals[6]+'h)');
					$('#mainCalendar').find('.fc-day-header.fc-sun').text($('#mainCalendar').find('.fc-day-header.fc-sun').text()+' ('+dayTotals[0]+'h)');
				    callback(events);
				}
			  });
			},
			eventRender: function(event, element) {
				$(element).css('height', (event.orig_object.hours * 15)+'px');
				$(element).find('.fc-time').text(event.orig_object.hours+'h');
				$.ajax({
					url: '/project/'+event.title,
					dataType: 'json',
					method: 'GET',
					success: function(project){
						$(element).find('.fc-title').html('<b>'+project.name+'</b><br/><p>'+event.orig_object.description+'</p>');
			        }
			    });
			},
			eventClick: function(event, jsEvent, view){ //TODO: fix this shit
				$('#addWorkIdInput').val(event._id);
				$('#addWorkModal').modal('show', event);
		    }
		});
		
		$('#lockWeekHoursBtn').click(function(){
			var lock = confirm('Oletko varma että haluat lukita tunnit?\nTämän jälkeen et voi enää muokata niitä.');
			if(lock){
				for(var e in renderedEvents){
					$.getJSON( '/lockwork/'+e, function( work ) {
						renderedEvents[e] = work;
					});
				}
			}
		});
		
	});
})();
