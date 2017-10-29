/**
 * Central file that handles all tasks upon page loading for all campus pages
 * @author Alex Gillis 
 */

window.onload = init;

function init(){
	
	//TESTING ONLY
	localStorage.clear();
	
	storeHardcodedCourses(); //courseDisplay.js
	createCatalogueTable(); //courseDisplay.js
	var registerBtn = document.getElementById("registerBtn");
	registerBtn.onclick = registerBtnClicked; //registration.js
	
}