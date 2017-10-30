/**
 * Enrolls a student in the selected course.
 * Currently assumes there is only one student in the school, as per assignment instructions.
 * 
 * courseArray stores the keys for the actual course registration data
 * @author Alex Gillis 
 */

function registerBtnClicked(){
	
	var courseSelect = document.getElementById("courseNumber");
	var sectionSelect = document.getElementById("section");
	
	var courseNum = courseSelect.options[courseSelect.selectedIndex].text;
	var sectionNum = sectionSelect.options[sectionSelect.selectedIndex].text;
	
	var courseInfo = new course(courseNum,sectionNum);
	
	saveCourseInfo(courseInfo);
	
	alert("You have registered for " + courseNum);
}

function saveCourseInfo(course){
	
	var key = course.courseNum + course.sectionNum;
	var value = JSON.stringify(course);
	
	if( addCourseArray(key) ){ //Returns true if successfully set
		localStorage.setItem(key, value);
		
		//TESTING
//		var courseArray = getCourseArray();
//		for(i = 0; i < courseArray.length; i++){
//			var currKey = courseArray[i];
//			var courseInfo = JSON.parse(localStorage[currKey]);
//			alert(courseInfo.courseNum + " " + courseInfo.sectionNum);
//		}
	}
}

//Course Object Constructor
function course(num, section){
	
	this.courseNum = num;
	this.sectionNum = section;
}

//Gets the array of course keys for which the student has registered from local storage. 
function getCourseArray(){
	
	var courseArray = localStorage.getItem("courseArray");
	if(!courseArray){
		courseArray = []
		localStorage.setItem("courseArray", JSON.stringify(courseArray));
	}
	else {
		courseArray = JSON.parse(courseArray); //Turns JSON string back into a JavaScript object
	}
	return courseArray;
}

//Add to the array of course keys for which the student has registered. 
//Returns True if successfully set, False otherwise
function addCourseArray(key){
	
	var courseArray = getCourseArray();
	
	if(courseArray.includes(key)){ //Check if already registered
		alert("You are already registered for this course.")
		return false;
	}
	else{
		courseArray.push(key);
		localStorage.setItem("courseArray", JSON.stringify(courseArray));
		return true;
	}
}





















