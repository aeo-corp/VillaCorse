import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	medals = [{
		picture: "1",
		achievment: "run more than 1km"
	},{
		picture: "2",
		achievment: "run more than 10km"
	},{
		picture: "3",
		achievment: "run more than 50km"
	},{
		picture: "4",
		achievment: "run more than 100km"
	},{
		picture: "5",
		achievment: "run more than 200km"
	},{
		picture: "6",
		achievment: "run more than 500km"
	}
]

	weights = [{
		id: null,
		date: "11 Décembre 2019",
		weight: "56",
		diff: "12"
	},{
		id: null,
		date: "21 Décembre 2019",
		weight: "63",
		diff: "23"
	},{
		id: null,
		date: "31 Décembre 2019",
		weight: "65",
		diff: "1"
	},{
		id: null,
		date: "41 Décembre 2019",
		weight: "75",
		diff: "5"
	},{
		id: null,
		date: "51 Décembre 2019",
		weight: "79",
		diff: "9"
	},{
		id: null,
		date: "61 Décembre 2019",
		weight: "73",
		diff: "34"
	}
]

	user = {
		size: null,
		name: "",
		email: ""
	}

	password: string = "";
	password_confirmation: string = "";

	monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre" ];
	date: string;

  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit() {
		this.getMe();
		setTimeout(() => {
			this.allWeightChecked();
			this.selectAllWeight();
		}, 10)
		this.setNewDate();
  }

	setNewDate() {
		let newDate = new Date()
		this.date = newDate.getDate() + " " + this.monthNames[newDate.getMonth()] + " " + String(newDate.getFullYear());
	}

	getMe() {
		this.data.getMe()
							.subscribe(
								success => {
									this.user = success.body;
								},
								error => {
									console.log(error);
								}
							)
	}

	submitUser() {
		if (this.password.trim().length != 0)
			this.setPassword();

		this.data.putMe(this.user)
							.subscribe(
								success => {
								},
								error => {
									console.log(error)
								}
							)
	}

	setPassword() {
		this.auth.putPassword(this.password, this.password_confirmation)
							.subscribe(
								success => {
								},
								error => {
									console.log(error);
								}
							)
	}

	validCredentials() {
		let regExpEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!this.user.email.match(regExpEmail))
			return false;
		if (this.user.name.trim().length == 0)
			return false;
		if (this.password.trim().length == 0 && this.password == this.password_confirmation)
			return true;
		if (this.password.trim().length < 4 || this.password != this.password_confirmation)
			return false;
		return true;
	}

	addWeight() {
		this.weights.splice(0, 0, {id: null, date: this.date, weight: null, diff: null})
		setTimeout(() => {
			this.allWeightChecked();
			$("#mainCheckbox").prop('checked', false);
		}, 10)
	}

	selectAllWeight() {
		$('#mainCheckbox').click(function() {
 			$("input:checkbox").prop('checked', $(this).prop("checked"));
		});
	}

	weightChecked() {
		return ($('input:checkbox:checked').length > 0)
	}

	allWeightChecked() {
		$('[id^=checkbox]').click(() => {
			if ($('[id^=checkbox]:checked').length == this.weights.length)
				$("#mainCheckbox").prop('checked', true);
			else
				$("#mainCheckbox").prop('checked', false);
		});
	}

	removeWeight() {
		let remove = 0;
		$('[id^=checkbox]:checked').each(( index, element ) => {
			let nbr = element.id.substring("checkbox".length);
			$("#checkbox" + nbr).prop('checked', false);
			this.weights.splice(Number(nbr) - remove, 1);
			remove++;
			$("#mainCheckbox").prop('checked', false);
		});
	}

}
