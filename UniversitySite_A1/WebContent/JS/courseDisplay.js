/**
 * Displays all available courses in alphabetical order
 * Since we are currently only using local storage and haven't covered how to create our own JSON files yet, 
 * on the very first loading of the page the script takes all the courses that are hardcoded and adds them to local storage.
 * 
 * catalogueArray stores the keys for the actual course catalogue data.
 * @author Alex Gillis 
 */

function createCatalogueTable(){
	var catalogueTbl = document.getElementById("courses");
	var catalogueKeys = getCatalogueArray();
	var allCourseEntries = getSortedCatalogueEntries(catalogueKeys);
	
	//Destory Previous Table rows
	while(catalogueTbl.hasChildNodes()){
		catalogueTbl.removeChild(catalogueTbl.lastChild);
	}

	//Create Table Headers
	var tblHeaderTxt = ["Course Name", "Course Number", "Room Number", "Time Slot"];
	var headerRow = document.createElement("tr");
	for(var x = 0; x < tblHeaderTxt.length; x++){
		
		var headerth = document.createElement('th');
		var textNode = document.createTextNode(tblHeaderTxt[x]);
		headerth.appendChild(textNode);
		headerRow.appendChild(headerth);
	}
	catalogueTbl.appendChild(headerRow);

	//Add Course Entries to the table
	for(var i = 0; i < allCourseEntries.length; i++){
		var courseRow = document.createElement("tr");
		var entry = allCourseEntries[i];
		var entryData = Object.values(entry);
		
		for(var j = 0; j < 4; j++){
			var course_td = document.createElement('td');
			var txtNode = document.createTextNode(entryData[j]);
			course_td.appendChild(txtNode);
			courseRow.appendChild(course_td);
		}
		catalogueTbl.appendChild(courseRow);
	}
}

//Alphabetical sorting function
function compare(entry1,entry2){
	if(entry1.name < entry2.name)
		return -1;
	if(entry1.name > entry2.name)
		return 1;
	return 0;
}

function storeHardcodedCourses(){
	
	var catalogueArray = getCatalogueArray();
	
	if(catalogueArray.length < 1){ //True if first time viewing the page. 
		var catalogue = document.getElementById("courses");
		
		//Iterates through the table row by row, and td by td.
		for(var i = 1, row; row = catalogue.rows[i]; i++){ //Skip row 1 since it contains table headers
			
			var info = [];
			
			for(var j = 0, cell; cell = row.cells[j]; j++){
				info.push(cell.innerText);
			}
			
			var entry = new catalogueEntry(info[0],info[1],info[2],info[3]);
			var catalogueKey = createCatalogueKey(entry);
			
			if( addCatalogueArray(catalogueKey) ){ //Returns true if successfully set
				
				entry = JSON.stringify(entry);
				localStorage.setItem(catalogueKey, entry); //Stores catalogue entry into local storage with catalogueKey
			}
		}
	}
}

//The Key is all the course text concatenated together
function createCatalogueKey(entry){
	
	var key;
	var values = Object.values(entry);
	key = values[0];
	for(var i = 1; i < values.length; i++){
		key += values[i];
	}
	return key;
}

function getCatalogueArray(){
	
	var catalogueArray = localStorage.getItem("catalogueArray");
	if(!catalogueArray){
		catalogueArray = [];
		localStorage.setItem("catalogueArray", JSON.stringify(catalogueArray));
	}
	else{
		catalogueArray = JSON.parse(catalogueArray);
	}
	return catalogueArray;
}

function getSortedCatalogueEntries(catalogueKeys){
	
	var allCourseEntries = [];
	for(i = 0; i < catalogueKeys.length; i++){
		var currKey = catalogueKeys[i];
		var courseEntry = JSON.parse(localStorage[currKey]);
		allCourseEntries.push(courseEntry);
	}
	
	allCourseEntries.sort(compare); //Sorts alphabetically
	return allCourseEntries;
}

//Add to the array of catalogue keys for which the student has registered. 
//Returns True if successfully set, False otherwise
function addCatalogueArray(key){
	
	var catalogueArray = getCatalogueArray();
	
	if(catalogueArray.includes(key)){ //Check if already registered
		alert("This course is already in the catalogue.")
		return false;
	}
	else{
		catalogueArray.push(key);
		localStorage.setItem("catalogueArray", JSON.stringify(catalogueArray));
		return true;
	}
}

//Object that defines a entry into the catalogue. IE) One row in the courses table
function catalogueEntry(courseName, courseNum, roomNum, timeSlot){
	this.name = courseName;
	this.num = courseNum;
	this.room = roomNum;
	this.slot = timeSlot;
}




















