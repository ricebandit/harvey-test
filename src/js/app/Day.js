function Day( year, monthID, dayID){
	var id = dayID;
	var selected = false;
	var thisDayData;

	/* ============================== 
	PUBLIC 
	============================== */
	this.select = function(){
		selected = true;
	}
	
	this.unselect = function(){
		selected = false;
	}

	this.isSelected = function(){
		return selected;
	}

	this.getID = function(){
		return id;
	}

	this.getData = function(){
		return thisDayData;
	}

	/* ============================== 
	PRIVATE 
	============================== */
	function init(){

		var thisDay = new Date( year, monthID, dayID + 1 );
		
		thisDayData = thisDay.toString().split(" ");
	}

	init()

	return this;
}