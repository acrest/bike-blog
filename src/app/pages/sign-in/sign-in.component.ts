import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/compat/app';
require('firebase/compat/auth')

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {

    var ui = null;
    if (firebaseui.auth.AuthUI.getInstance()) {
      ui = firebaseui.auth.AuthUI.getInstance()
    }
    else {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }

    const _this = this;
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(_authResult: any, _redirectUrl: string) {
          return true;
        },
        uiShown: function() {
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: 'https://alecs-bike-blog.web.app/',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        },
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: 'https://alecs-bike-blog.web.app/',
      // Privacy policy url.
      privacyPolicyUrl: 'https://alecs-bike-blog.web.app/'
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
