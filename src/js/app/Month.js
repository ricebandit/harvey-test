function Month( year, monthID, stringName){
	var data = [];
	var numDays;


	/* ============================== 
	PUBLIC 
	============================== */
	this.getToday = function(){
		return data[ Date.today().getDate() - 1 ];

	}

	this.getTargetData = function(index){
		return data[index];
	}

	this.getData = function(){
		return data;
	}

	this.getID = function(){
		return monthID;
	}

	this.getMonthName = function(){
		return stringName;
	}

	this.getNumDays = function(){
		return numDays;
	}

	/* ============================== 
	PRIVATE 
	============================== */

	function init(){
		//console.log("Month: ", stringName, Date.getDaysInMonth( year, monthID));

		numDays = Date.getDaysInMonth( year, monthID);

		for(var day = 0; day < numDays; day++){
			data.push( new Day( year, monthID, day ) );
		}


	}

	init();

	return this;
}