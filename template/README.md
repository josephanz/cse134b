Homework 5:

	Work Done:
		
		Although we all had different parts, we all helped each throughout the process.  
		Everytime we met, we had a coding circle and we can vouch that we all did a fair amount
		of work respectively.  We love each other.  Team SnackOverFlow <3
	

	We used parse as our backend and as a way to track the usage data and errors on our webapp.
	We also used RollBar as another way to track errors and Google Anaylytics for more detailed usage data.

	hosted website link:


	Image Spriting:
		For the add and edit page, we have default images that the user can select from to put an icon for their habit. These images are all spritied together. 

	Minification: 
		We used grunt to minify our html, css, and javascript files. These minified files are the ones we hosted on our github url link. 

		The grunt dependiences we used are grunt-contrib-concat, grunt-contrib-uglify, grunt-minify-polymer, and grunt-contrib-cssmin. These can be seen in the Grunt file.  

	Rollbar Account:
		username: snackoverflow
		password: cse134bfa15

	Parse:
		username: snackoverflow1@gmail.com
		password: snackattack

	Google Analytics:
		username: snackoverflow1@gmail.com
		password: snackattack

	Packages (dropbox link - ):
		Android:
			We packaged our web app into an android app(.apk), found in the "template/platforms/" directory along with a few screenshots. The android app currently has log-in issues with Parse, because we are using the JavaScript API key instead of the Android API key to access the database. We have provided screenshots of using the Phonegap developer application to connect to the server we hosted our app on as proof of concept. 

		iOS:
			We were not able to create an iOS application because we do not have an Apple developer's key. However, we were also able to connect to the server where we hosted our web app throuhg the Phonegap developer app on an iOS device. Proof of concept screenshots for the iOS device is also provided.    

		Linux: 
			Linux port packaged using electron. No issues encountered. 

		Windows:
			Windows executable packaged using electron. No issues encountered. 

		Our web app is packaged as an android application, mac application, window application, and linux application.  These can be found in the platform directory inside the zip or github.  We were not able to create an ios application because we did not have an Apple developer's key. However, we do have screenshots when using the Phonegap application to display our webapp on ios for a poc. The android application currently does not work with Parse, this is because we are using the javascript api instead of an android api.  Similarly, we have screenshots of the android application using the phonegap application on an android device.

	Issues:
		Notifications do not work properly when they are packaged for other platforms.  On Internet Explorer, the web app has to be hosted on a server for the Internet Explorer's pinned sites to work.  


		Some issues we encountered were

			The intended use of the icon image upload is: our application gives the user two default icons and the option for the user to upload his or her own image. The uploaded image overwrites the previously user-uploaded image if one exists.  

			If you select one of our default images, and then go to edit. In the image selection, it would show that image selected twice. One refers to the original image, the other refers to what is currently selected. 

Homework 4:
	Work Done:
		Joseph Anz - list page with update frequencies and animations
		Navjot Cheema - Edit page, backend functionality, add javascript, account recovery
		Chao Pan - Login page, edit page, login backend login, ie conformance testing
		Orion Ou - Welcome page, add page, general css, password recovery page
		Dan Thai - notifications functionality, add page, conformance testing, debugging
		
		Although we all had different parts, we all helped each throughout the process.  
		Everytime we met, we had a coding circle and we can vouch that we all did a fair amount
		of work respectively.  We love each other.  Team SnackOverFlow <3
		
		
	Notes:
		Since internet explorer does not support html5 notification, we made a custom popup that 
		displays on the page along with the internet explore native pin site notification.  In addition,
		for the notification feature we added a toggle to enable or disable notifications in the add/edit a habit page, 
		and a time selector for when the notification will be displayed.  We removed the option to have specify a daily
		frequency greater than 3, added a log out button, added a close button on the add/edit page, added account recovery 
		functionality.  The progress bar in the habit list is based on the amount of times the habit was done out of the 
		daily frequency for that day.








		