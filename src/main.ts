import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (environment.production) {
  enableProdMode();
}

// Firebase Config
const firebaseConfig = {
	apiKey: "AIzaSyCHIITNQ3YhM3MrtCXXuVLWw_ywwPyE0HE",
	authDomain: "alecs-bike-blog.firebaseapp.com",
	projectId: "alecs-bike-blog",
	storageBucket: "alecs-bike-blog.appspot.com",
	messagingSenderId: "585148816145",
	appId: "1:585148816145:web:e5e8a6f7257c11f1830ab0",
	measurementId: "G-F2W8DH71NC"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
