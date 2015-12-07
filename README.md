### Name

Guangjun Li

### Project description

This application retrieves Google documents and translate it based on zombie rules.

There are two views, the list view that shows list of documents as hyperlinks, and the document content view in both plain text and zombified content.

The number of documents to retrieve can be changed by user. The default is 5.

Initially the user needs to authorize this application to access user's documents. If user has not authenticated, then the usual Google login process will kick in. This applies even if user accesses a specific document through bookmark.

### Build the application

Go to the base folder,

`npm install`

`bower install`

`gulp build`

### Run the tests
Comprehensive unit tests for the directive, service and controllers can be run with:

`gulp test`

### Start server and run the application

Go to the base folder,

`gulp`

Open the Web UI in browser at:

`http://localhost:8000/`
