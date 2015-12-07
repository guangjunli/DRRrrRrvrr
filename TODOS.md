
* XMLHttpRequest cannot load http://ancient-anchorage-9224.herokuapp.com/zombify?q=public%20void%20proce…;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20}. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8000' is therefore not allowed access. The response had HTTP status code 414.

* Browser 'Back' button from http://localhost:8000/#/list, then 'Forward' to http://localhost:8000/#/list
got this error:
  Uncaught TypeError: window.authGoogleApi is not a function on this line:
  
	```javascript
	var gapiOnLoadCallback = function() {
	  //the global authGoogleApi is defined in googleAuthButton directive
	==  window.authGoogleApi();
	};
	```


* indicate loading error on UI through failedToLoad field in DocumentListController
