// Initialize app

var isAndroid = Framework7.prototype.device.android === true;
var $$ = Dom7;

var intSaveDays;							// Number of days to keep on file before deletion
var strLastDate;							// Last available folder based on today and intSaveDays
var strCurrentDate;							// Currently selected date. App start = today
var strRootFolder = "ReminderPics"			// Base picture folder name
var strMainColor;							// Base color of scheme


// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//

function onDeviceReady() {
	createFolder(""); 									// Create base folder if it doesn't exist
	strCurrentDate = getFolderDate();					// Gets today's date on startup
	setCameraSettings();								// Set up camera basics
	getSaveDays();										// Load number of days to save into intSaveDays
	getLastDate();										// Sets strLastDate to last avai;ab;e folder date
	divCurrentSelectedDate.innerHTML = strCurrentDate 	// Set date on header();
	gatherPictures();									// Gets today's pictures, if any
	cleanOldFolders();									// Deletes folders older than intSaveDays
//	getColors();
//	setColors();
}


// Change class
$$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
// And move Navbar into Page
$$('.view .navbar').prependTo('.view .page');

// If we need to use custom DOM library, let's save it to $$ variable:

var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: true
    // Enable Template7 pages
    //template7Pages: true
});

// Add view
var mainView = myApp.addView('.view-main', {
    // Material doesn't support it but don't worry about it
    // F7 will ignore it for Material theme
    dynamicNavbar: true
});;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


