function CalendarDataManager(){
	var year;
	var month;
	var year_index;
	var month_index;

	/* ============================== 
	PUBLIC 
	============================== */
	this.getTodaysDateData = function(){
		var todayData = data[ 1 ].getToday();

		year = todayData.year;
		year_index = 1;

		month = todayData.month;
		month_index = month.getID();

		// Select date
		todayData.day.select();

		return todayData;
	}

	this.getNextMonthData = function(){

		month_index += 1;

		if(month_index > 11){
			month_index = 0;
			year_index += 1;

			if(year_index > 2){
				year_index = 2;
			}
		}

		return data[year_index].getData( month_index );
	}

	this.getPrevMonthData = function(){

		month_index -= 1;

		if(month_index < 0){
			month_index = 11;
			year_index -= 1;

			if(year_index > 0){
				year_index = 0;
			}
		}

		return data[year_index].getData( month_index);
	}

	this.getYearData = function(){
		return data;
	}
	

	/* ============================== 
	PRIVATE 
	============================== */
	function init(){
		createData();
	}

	function createData(){

		// Previous Year
		var prevYear = new Year( Date.today().add({year: -1}).getFullYear() );
		var thisYear = new Year( Date.today().getFullYear() );
		var nextYear = new Year( Date.today().add({year: 1}).getFullYear() );

		// Make data accessible by both id number and year number
		data.push(prevYear);

		data.push(thisYear);

		data.push(nextYear);
	}

	init();

	return this;
}