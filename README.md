# Advance Software Assessment

### Table of Contents
- [Description](#description)
- [Deployment](#deployment)
- [How to use](#howtouse)
- [Reference](#reference)


---

## Description
Remote Control application to control weather stations and check instrument status of particular weather stations. Also has the ability to view weather forecasts.

---

## Deployment

#### Prerequisite
- Node.js [Link to Download](https://nodejs.org/en/download/) 
`node -v` is helpful to check the setting.
- npm [Link to Guideline](https://docs.npmjs.com/cli/v6/commands/npm-install) 
`npm -v` is helpful to check the setting.
- Gradle [Link to Download](https://gradle.org/releases/) 
Please download the "binary-only"

- Android Studio [Link to Download](https://developer.android.com/studio)
- Java JDK [Link to Download](https://www.oracle.com/au/java/technologies/javase-downloads.html)


#### Installation of Ionic Angular

- `npm install`
- `npm install -g cordova`
- `npm install -g ionic@latest`
- `ionic -v` to check the version of ionic
- `git clone https://github.com/yeonjoonkim/remoteControl.git remoteControl`


[Back To The Top](#advance-software-assessment)


## How to use
- `remoteControl`
- `npm install`
- `ionic serve`
- `@angular/cli? Yes` 


- Login ID: admin
- Login Password: admin

#### Problem solved [ERROR] ng has unexpectedly closed (exit code 1).
- Please delete `node_modules` file
- `npm install`

#### Problem solved [ERROR] ng has unexpectedly closed (exit code 127).

- `rm -r node_modules`
- `npm install`
- `npm aduit fix --force`
- `ionic serve`

#### Problem solved [ERROR] An unhandled exception occurred: Cannot find module ‘@angular-devkit/build-angualr/package.json’

- `npm install --save-dev @angular-devkit/build-angular`
- `ionic serve`


[Back To The Top](#advance-software-assessment)


---


### API Reference

- Openweather https://openweathermap.org/
The openweather API is used for receiving the current weather data to monitor, analyze, and modify the condition of the registered devices.

- Weatherbit
The weatherbit API is used for receiving the 5 days forecast weather data to display the weather on the home page.

- api64.ipify.org
The api64.ipify.org API used for receiving the user’s IP address for tracking the address to monitor, analyse the behaviour of the login statement to prevent the attack.

- Ngx-device-detector
The ngx-device-detector allows the device information to record in the login log to monitor what types of devices have or attempted to login.


[Back To The Top](#advance-software-assessment)

