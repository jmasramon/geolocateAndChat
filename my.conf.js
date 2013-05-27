// Karma configuration
// Generated on Fri May 10 2013 01:56:54 GMT+0200 (CEST)

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    {pattern: 'client/index.html', watched: false, included: false, served:true},
    'client/js/vendor/jquery.min.js',
    'client/js/vendor/underscore.js',
    'client/js/vendor/backbone.js',
    'client/js/vendor/less.min.js',
    'client/js/vendor/socket.io.js',
    // 'client/js/*.js',
    'client/js/chatapp.js',
    'client/js/models.js',
    'client/js/connection.js',
    'client/js/view.inputarea.js',
    'client/js/view.messagelist.js',
    'client/js/view.userlist.js',
    'client/js/view.welcome.js',
    'client/js/view.esperando.js',
    'client/js/application.js',    // 'ChatServer.js',
    'src/*.js',
    'src/*.coffee',
    // 'client/js/*.js',
    'test/*.jasmine.js',
    'test/*.jasmine.coffee',
    'client/test/*.jasmine.js',
    // {pattern: 'test/*.jasmine.js', included: false}
];

// list of files to exclude
exclude = [

];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress' , 'growl'];

// web server port
port = 9876;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Firefox'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

preprocessors = {
    '**/*.coffee': 'coffee'
};

// growl = true;

// growlLogLevel = LOG_INFO;
