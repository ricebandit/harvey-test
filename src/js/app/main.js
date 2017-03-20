var data = [];
var cm;
var currentData;
var currentSelected;

$(document).ready(function(){

	createCalendarManager();

	currentData = cm.getTodaysDateData();

	currentSelected = cm.getTodaysDateData();

	displayCurrentYear();

	displayCurrentMonth();

	selectDate();

	activateListeners();

	$(window).resize(function(){
		resize();
	})

	resize();
});

function resize(){

	// Calculate scale
	var windowW = $(window).width();
	var windowH = $(window).height();

	var origW = 800;
	var origH = 900;

	var scale = windowW / origW;

	var left = (windowW - origW) / 2;

	if(origH * scale > windowH){
		scale = windowH / origH;
	}

	$(".wrapper").css({'transform': 'scale(' + scale + ')', 'left': left});
}

function activateListeners(){
	$(".button-circle").on('click', function(evt){

		switch(this.id){
			case "month_prev":
				gotoPrevMonth();
			break
			case "month_next":
				gotoNextMonth();
			break
			case "year_prev":
			break
			case "year_next":
			break
		}
	})
}

function gotoNextMonth(){
	currentData = cm.getNextMonthData();

	killPreviousMonth();

	displayCurrentMonth();

	displayCurrentYear();
}

function gotoPrevMonth(){
	currentData = cm.getPrevMonthData();

	killPreviousMonth();

	displayCurrentMonth();

	displayCurrentYear();
}

function deselect(){
	currentSelected.day.unselect();

	$('.selected').removeClass('selected');
}

function selectDate(){
	$(".month-grid #day_" + currentSelected.day.getID()  ).addClass('selected');

	$("#date-selected").val( currentSelected.month.getMonthName() + " " + (currentSelected.day.getID() + 1) + ", " + currentSelected.year );
}

function displayCurrentYear(){

	$("#year #label-year").html(currentData.year);
}

function killPreviousMonth(){

	$('.selected').removeClass('selected');

	$(".grid-day").unbind('click')

	// Reset grid
	$(".month-grid .container").html("");

}

function displayCurrentMonth(){

	// Reset grid
	$(".month-grid .container").html("");

	// Add days
	var monthData = currentData.month.getData();

	// Fill month label
	$("#label-month").html( currentData.month.getMonthName() );

	// Add initial fillers
	var fillerMarkup = "<a class='filler grid-day'></a>";
	$(".month-grid .container").append(fillerMarkup);

	// Add fillers to columns before days start
	var killFiller = true;

	for(var i = 0; i < monthData.length; i++ ){
		var day = monthData[i];



		if(day.getData()[0] == "Sun"){
			killFiller = false;
		}

		if(day.getData()[0] == "Sun" && i == 0){
			killFiller = true;
		}

		if(killFiller === true){
			$(".month-grid #" + day.getData()[0] + " .container .filler").addClass('kill');
		}

		var dayMarkup = "<a id='day_" + i + "' class='grid-day' data-day='" + (i - 1) + "'><div class='day-number'>" + day.getData()[2].replace(/\b0+/g, '') + "</div></a>";
		
		$(".month-grid #" + day.getData()[0] + " .container").append(dayMarkup);

		if( day.isSelected() === true){
			$(".month-grid #day_" + i ).addClass('selected');
		}
		
	}

	// Enable/disable arrow buttons
	if( (currentData.year == cm.getYearData()[0].getYear() ) && currentData.month.getID() == 0 ){
		$("#month_prev").addClass('kill');
	}else{
		$("#month_prev").removeClass('kill');
	}

	if( (currentData.year == cm.getYearData()[2].getYear() ) && currentData.month.getID() == 11 ){
		$("#month_next").addClass('kill');
	}else{
		$("#month_next").removeClass('kill');
	}

	// Activate day buttons
	$(".grid-day").on('click', function(){

		deselect();

		var monthData = currentData.month.getData();

		monthData[ $(this).data("day") + 1 ].select();

		currentSelected = { 
			year: currentData.year, 
			month: currentData.month,
			day: monthData[ $(this).data("day") + 1 ]
		}

		selectDate();
	})


}

function createCalendarManager(){
	cm = new CalendarDataManager();
}