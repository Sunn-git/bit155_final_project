var draggedEventIsAllDay;
var activeInactiveWeekends = true;

function getDisplayEventDate(event) {
	console.log("getDisplayEventDate")
	console.log(event)
// console.log("너는 언제오니?")
// console.log(event)
  var displayEventDate;

  if (event.allDay == false) {
    var startTimeEventInfo = moment(event.start).format('HH:mm');
    var endTimeEventInfo = moment(event.end).format('HH:mm');
    displayEventDate = startTimeEventInfo + " - " + endTimeEventInfo;
  } else {
    displayEventDate = "하루종일";
    console.log("와우")
  }
  return displayEventDate;
 
}

// function filtering(event) {
// var show_username = true;
// var show_type = true;
//
// var username = $('input:checkbox.filter:checked').map(function () {
// return $(this).val();
// }).get();
// var types = $('#type_filter').val();
//
// show_username = username.indexOf(event.username) >= 0;
//
// if (types && types.length > 0) {
// if (types[0] == "all") {
// show_type = true;
// } else {
// show_type = types.indexOf(event.type) >= 0;
// }
// }
//
// return show_username && show_type;
// }

function calDateWhenResize(event) {
console.log(event)
  var newDates = {
    startDate: '',
    endDate: ''
  };

  if (event.allDay) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  } else {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}

function calDateWhenDragnDrop(event) {
	console.log("DND")
	console.log(event)
  // 드랍시 수정된 날짜반영
  var newDates = {
    startDate: '',
    endDate: ''
  }

  // 날짜 & 시간이 모두 같은 경우
  if(!event.end) {
	  console.log('날짜 & 시간이 모두 같은 경우')
    event.end = event.start;
  }

  // 하루짜리 all day
  if (event.allDay && event.end === event.start) {
    console.log('하루짜리 all day')
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = newDates.startDate;
  }

  // 2일이상 all day
  else if (event.allDay && event.end !== null) {
	  console.log('2일이상 all day')
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  }

  // all day가 아님
  else if (!event.allDay) {
	  console.log(' all day가 아님')
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}





! function($) {
    "use strict";
var CalendarApp = function() {
	this.$body = $("body")
    this.$calendar = $('#calendar'),
    this.$event = ('#calendar-events div.calendar-events'),
    this.$categoryForm = $('#add-new-event form'),
    this.$extEvents = $('#calendar-events'),
    this.$modal = $('#my-event'),
    this.$saveCategoryBtn = $('.save-category'),
    this.$calendarObj = null
}; 

CalendarApp.prototype.init = function() {
	
	
var calendar = $('#calendar').fullCalendar({
	

//  eventRender: function (event, element, view) {
//	  console.log("팝오버")
//	  console.log(event)
//// console.log("이벤트 누구야")
//// console.log(event)
//// if(getDisplayEventDate(event) == "하루종일"){
//// console.log("하루종일 탈거니?111")
//// element.find(".fc-time").text(event.name)
//// // 일정에 hover시 요약
//// }
////	 
//    element.popover({
//    	 title: $('<div />', {
//    	    class: 'popoverTitleCalendar',
//    	    text: event.title
//    	   }).css({
//        'background-color': event.color
//      }),
//      content: $('<div />', {
//          class: 'popoverInfoCalendar'
//        }).append('<p><strong>등록자:</strong> ' + event.id + '</p>')
//        .append('<p><strong>시간:</strong> ' + getDisplayEventDate(event) + '</p>')
//        .append('<div class="popoverDescCalendar"><strong></strong> ' + event.description + '</div>'),
//      delay: {
//        show: "800",
//        hide: "50"
//      },
//      trigger: 'hover',
//      placement: 'top',
//      html: true,
//      container: 'body'
//    });
//
//  },
  

  header: {
    left: 'today, prevYear, nextYear',
    center: 'prev, title, next',
    right: 'month,agendaWeek,agendaDay,listWeek'
  },
  views: {
    month: {
      columnFormat: 'dddd'
    },
    agendaWeek: {
      columnFormat: 'M/D ddd',
      titleFormat: 'YYYY년 M월 D일',
      eventLimit: false
    },
    agendaDay: {
      columnFormat: 'dddd',
      eventLimit: false
    },
    listWeek: {
      columnFormat: ''
    }
  },

  /***************************************************************************
	 * 일정 받아옴 **************
	 */
  events: function (start, end, timezone, callback) {
	  
    $.ajax({
   
      url: "showCalendar.ajax",
      data: {
    	  teamNo : teamNo
      },
      success: function (response) {
    	  console.log("잘 받아오나?")
          var fixedDate = response.map(function (array) {
//            if (array.allDay && array.start !== array.end) {
//              // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
////              array.end = moment(array.end).add(1, 'days');
//            }
        	  
            console.log("array")
            console.log(array)
            return array;
          })
          console.log("fixedDate")
          console.log(fixedDate)
          callback(fixedDate);
        }
      });
    },


  eventAfterAllRender: function (view) {
    if (view.name == "month") {
      $(".fc-content").css('height', 'auto');
    }
  },

  // 일정 리사이즈 왜안되냐 ㅅ	ㅂ
//  eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
//	  
//	  console.log("일정 리사이즈")
//	
//    $('.popover.fade.top').remove();
//
//    /**
//	 * 리사이즈시 수정된 날짜반영 하루를 빼야 정상적으로 반영됨.
//	 */
//    var newDates = calDateWhenResize(event);
//
//    // 리사이즈한 일정 업데이트
//    $.ajax({
//     	 url: "updatePlan.ajax",
//		         data:{ 
//		        	 title : event.title,
//		           	 description :event.description,
//		           	 start : event.start,
//		           	 end: event.end,
//		           	 color :event.backgroundColor,
//		           	 id : currUserId,
//		           	 teamNo : teamNo,
//		           	 allDay : event.allDay,
//		           	 no : event.no
//		           	 
//		            },
//             
//              success:function(response){
//                alert("일정이 수정되었습니다.");
//                //DB연동시 중복이벤트 방지를 위한
//                $('#calendar').fullCalendar('removeEvents');
//                $('#calendar').fullCalendar('refetchEvents');
//              },error:function(){ 
//                  alert("일정수정에 실패하였습니다.");
//              }
//          });
//
//  },

  eventDragStart: function (event, jsEvent, ui, view) {
	  console.log(event.allDay)
//	  console.log(jsEvent)
	  draggedEventIsAllDay = event.allDay;
// console.log("ui")
// console.log(ui)
  },

  // 일정 드래그앤드롭
  eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
    $('.popover.fade.top').remove();
console.log(event)

//    // 주,일 view일때 종일 <-> 시간 변경불가
//    if (view.type === 'agendaWeek' || view.type === 'agendaDay') {
//      if (draggedEventIsAllDay !== event.allDay) {
//        alert('드래그앤드롭으로 종일<->시간 변경은 불가합니다.');
//        location.reload();
//        return false;
//      }
//    }

    // 드랍시 수정된 날짜반영
    var newDates = calDateWhenDragnDrop(event);
    console.log(newDates)
    // 드롭한 일정 업데이트
    $.ajax({
    
      url: "updatePlanDrag.ajax",
      data: {
        no : event.no,
        start : newDates.startDate,
        end : newDates.endDate
      },
      success: function (response) {
        alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
      }
    });

  },

  select: function (startDate, endDate, jsEvent, view) {
    $(".fc-body").unbind('click');
    $(".fc-body").on('click', 'td', function (e) {

     
      newEvent(startDate, endDate, jsEvent)
      return true;
    });
    
    var today = moment();

    if (view.name == "month") {
    	console.log("select 먼")
      startDate.set({
        hours: today.hours(),
        minute: today.minutes()
      });
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).subtract(1, 'days');

      endDate.set({
        hours: today.hours() + 1,
        minute: today.minutes()
      });
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    } else {
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    }
    console.log(today.hours())


  },

  // 이벤트 클릭시 수정이벤트
  eventClick: function (event, jsEvent, view) {
    editEvent(event);
  },

  locale: 'ko',
  timezone: "local",
  nextDayThreshold: "09:00:00",
  allDaySlot: true,
  displayEventTime: true,
  displayEventEnd: true,
  firstDay: 0, // 월요일이 먼저 오게 하려면 1
  weekNumbers: false,
  selectable: true,
  weekNumberCalculation: "ISO",
  eventLimit: true,
  views: {
    month: {
      eventLimit: 12
    }
  },
  eventLimitClick: 'week', // popover
  navLinks: true,
  timeFormat: 'HH:mm',
  defaultTimedEventDuration: '01:00:00',
  editable: true,
  minTime: '00:00:00',
  maxTime: '24:00:00',
  slotLabelFormat: 'HH:mm',
  weekends: true,
  nowIndicator: true,
  dayPopoverFormat: 'MM/DD dddd',
  longPressDelay: 0,
  eventLongPressDelay: 0,
  selectLongPressDelay: 0,
  defaultView: 'month',
  droppable: true,
});
},
$.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp
}(window.jQuery),

// initializing CalendarApp
$(window).on('load', function() {

  $.CalendarApp.init()
});