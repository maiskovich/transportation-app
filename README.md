# transportation-app
Udacity Senior web developer 2st project

**Demo: https://transportation-app.firebaseapp.com/#/**

Transportation app is a web app for searching trains between different stations with features as:
* Offline first
* Responsive Design
* Angular Material Design
* ES6

Its build with angularJS and based in the [Yeoman gulp-AngularJS generator](https://github.com/Swiip/generator-gulp-angular).

The app was made to process [GTFS](https://developers.google.com/transit/gtfs/) feed data and in this case is using
 data from the Bay Area Rapid Transit (BART), the GTFS files are located in 
the `src/data/GTFS` folder, it is being parsed with [Papa Parse](http://papaparse.com/).

The GTFS files can be replace with data from [any other location](http://transitfeeds.com/) without needing additional 
actions.

## Install

After cloning the repository you should run:

`npm install`

`bower install`


##### Being inside of the directory of the project you can run:


#### `serve`

For the development phase, use the command `gulp serve` to lunch server which supports live reload of your modifications.


#### `build`

For production, use the command `gulp` or `gulp build` to optimize the files for production, they will be saved optimized in the dist directory.
[More info](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md#optimization-process)



