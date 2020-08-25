# A simple starter template application integrating Spring 5.2.4, Spring Boot 2.2.5, Thymeleaf templates, React, and Webpack 4

## Goal
Create a starter template that incorporates the major tools necessary to build a modern web application.
* Java
* Thymeleaf
* Spring MVC
* Spring Boot
* Webpack
* Gulp
* Bootstrap
* React
  
I was trying to bring all of these tools together and ran into a few pitfalls along the way. Figured it was worthwhile 
writing it up so that others could avoid the mistakes that I made. 

## Build Requirements
* Java 11 sdk
* Apache Maven 3.1.0 or later.

## Building
Build the application.
```
mvn clean package
```
This may take a few minutes the first time as it will pull down a local copy of node/npm and necessary modules.

Start the spring boot application.

```
./generic-site/target/generic-site.jar --spring.profiles.active=prod
```
View the application in your browser.
```
http://localhost:8100
```
## Dev Build
Build the application
```
mvn clean package
```
Start the spring boot application with the dev profile active.
```
./generic-site/target/generic-site.jar --spring.profiles.active=dev
```
Then in a second terminal window
```
cd generic-site/src/main/javascript
```
Start the webpack dev server.
```
gulp
```
This will run the webpack dev server. This way when you make changes to the javascript code they'll be reflected in the browser quickly. 

View the application in your browser.
```
http://localhost:8080
```
