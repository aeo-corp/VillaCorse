import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	name: string = "";
	email: string = "";
	password: string = "";
	password_confirmation: string = "";

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});
  }

	register() {
		this.auth.createAccount({email: this.email, name: this.name, password: this.password, password_confirmation: this.password_confirmation})
							.subscribe(
								success => {
								},
								error => {
									console.log(error);
								}
							)
	}

	login() {
		this.auth.login(this.email, this.password)
					.subscribe(
						success => {
							this.router.navigateByUrl('/home');
						},
						error => {
							console.log(error);
						}
					)
	}

	validLoginCredentials() {
		let regExpEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.email.match(regExpEmail))
			return false;
		if (this.password.trim().length < 4)
			return false;
		return true;
	}

	validRegisterCredentials() {
		let regExpEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.email.match(regExpEmail))
			return false;
		if (this.password.trim().length < 4 || this.password != this.password_confirmation)
			return false;
		if (this.name.trim().length <= 1)
			return false;
		return true;
	}

}
