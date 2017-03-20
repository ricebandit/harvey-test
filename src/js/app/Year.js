function Year( yearNum ){
	var data = [];
	var id = yearNum;


	/* ============================== 
	PUBLIC 
	============================== */
	this.getToday = function(){
		var month = data[ Date.today().getMonth() ];
		var day = month.getToday();

		monthIndex = Date.today().getMonth();

		return {year: yearNum, month: month, day:day }
	}

	this.getData = function(monthID){

		var month = data[ monthID ];

		return {year: yearNum, month:month};
	}

	this.getYear = function(){
		return yearNum;
	}

	/* ============================== 
	PRIVATE 
	============================== */

	function init(){

		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		]

		//console.log("------------- NEW YEAR: " + id)

		for(var mth = 0; mth < 12; mth++){
			var monthData = new Month( id, mth, months[mth] );

			data.push(monthData);
			data[ months[mth] ] = monthData;
		}


	}

	init();

	return this;
}