// Initialize app

var isAndroid = Framework7.prototype.device.android === true;
var $$ = Dom7;
var intSaveDays;
var strLastDate;
var strCurrentDate;

var strMainColor;

var strRootFolder = "ROC ADHD Helper"


// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//

function onDeviceReady() {
	getSettings();
	createFolder("");
	createFolder(getFolderDate());
	cleanOldFolders();
	setCurrentPictures();
	setCameraSettings();
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


