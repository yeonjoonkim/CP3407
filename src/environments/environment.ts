// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //added firebaseconfig
  firebase: {
    apiKey: "AIzaSyChCoEzqLpxEln1afRxvhIh4aE_ZcVgRcQ",
    authDomain: "weatherstation-1aa07.firebaseapp.com",
    databaseURL: "https://weatherstation-1aa07-default-rtdb.firebaseio.com",
    projectId: "weatherstation-1aa07",
    storageBucket: "weatherstation-1aa07.appspot.com",
    messagingSenderId: "111653536010",
    appId: "1:111653536010:web:175bb2a448ee1b24083af3",
    measurementId: "G-V989SVX8HG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
