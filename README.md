# DeliverMap

DeliverMap is a tool for analyzing clients for a delivery service. It is based on angular2/4 (using Angular CLI v1.1.1) with material design components and lots of other plugins and tools. The map use the leaflet-library and OpenStreetMaps. It currently only use LocalStorage, it may will be capable saving data also serverside (unfortunately without node.js due to companies server restrictions).

This project is in development for a certain company, therefore all settings are based on their preferences.


## Core features

* Import client data from XLS/ODS-files
* Managing stores through the app
* automatic gathering of Geocodes for the clients (using the google geocoding service)
* Display clients and stores on the map
* Different Basetiles to choose from
* Filtering clients for various data
* Display relationships between clients/stores

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
Keep in mind that you may have to change the <base href=""> tag to match your location. If you are using apache, you also have to redirect all url's to the main index.html file.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

Get in touch thourgh github or mail me on dev[@T]thoeni.me
