import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as $ from 'jquery';

import { FlatpickrOptions } from 'ng2-flatpickr';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
	providers: [DatePipe]
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

	weights = []
	removedWeights = [];
	weightUpdate: boolean = false;

	user = {
		size: null,
		name: "",
		email: ""
	}
	userUpdate: boolean = false;

	password: string = "";
	password_confirmation: string = "";

	date: any = this.datePipe.transform(new Date, 'dd-MM-yyyy');

	exampleOptions: FlatpickrOptions = {
		dateFormat: "d-m-Y",
		maxDate: "today",
		weekNumbers: true
	};

  constructor(private datePipe: DatePipe,
							private data: DataService,
							private auth: AuthService) { }

  ngOnInit() {
		this.getMe();
		this.getWeights();
		flatpickr.localize(French)
		this.removedWeights = new Array();
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
		this.userUpdate = true;
		if (this.password.trim().length != 0)
			this.setPassword();

		this.data.putMe(this.user)
							.subscribe(
								success => {
									this.userUpdate = false;
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

	setCalendar() {
		setTimeout(() => {
			$('[id^=calendar]').each((index, element) => {
				(<HTMLElement>document.getElementById("calendar" + index).children[0].children[0]).style.opacity = "0";
				(<HTMLElement>document.getElementById("calendar" + index).children[0].children[0]).style.width = "1px";
				document.getElementById("calendar" + index).children[0].children[0].id = "input-calendar" + index;
				$("#container-calendar" + index).click(function () {
					(<HTMLElement>document.getElementById("calendar" + index).children[0].children[0]).focus();
				})
				$("#input-calendar" + index).change((element) => {
					if (this.weights[index])
						this.weights[index].date = (<HTMLInputElement>element.currentTarget).value;
				})
			})
		}, 10)
	}

	resetCalendar() {
		setTimeout(() => {
			$('[id^=calendar]').each((index, element) => {
				$("#container-calendar" + index).unbind('click')
				$("#input-calendar" + index).unbind('change')
			})
			this.setCalendar();
		}, 10)
	}

	getWeights() {
		this.data.getWeights()
							.subscribe(
								success => {
									this.weights = success.body;
									this.setCalendar();
									setTimeout(() => {
										$('#mainCheckbox').click(function() {
											$("input:checkbox").prop('checked', $(this).prop("checked"));
										});
										$('[id^=checkbox]').click(() => {
											this.allWeightChecked();
										});
										$('[id^=weight]').keyup((element) => {
											this.changeWeight(element.currentTarget);
										});
									}, 10)
								},
								error => {
									console.log(error);
								}
							)
	}

	addWeight() {
		this.weights.splice(0, 0, {id: null, date: this.date, value: null, diff: null})
		setTimeout(() => {
			this.resetCalendar();
			(<HTMLElement>document.getElementById("calendar0").children[0].children[0]).style.opacity = "0";
			(<HTMLElement>document.getElementById("calendar0").children[0].children[0]).style.width = "1px";
			$('#checkbox0').click(() => {
				this.allWeightChecked();
			});
			$('#weight0').keyup((element) => {
				this.changeWeight(element.currentTarget);
			});
			$("#mainCheckbox").prop('checked', false);
		}, 10)
	}

	weightChecked() {
		return ($('input:checkbox:checked').length > 0)
	}

	allWeightChecked() {
		if ($('[id^=checkbox]:checked').length == this.weights.length)
			$("#mainCheckbox").prop('checked', true);
		else
			$("#mainCheckbox").prop('checked', false);
	}

	removeWeight() {
		this.resetCalendar();
		$('[id^=checkbox]:checked').each(( index, element ) => {
			let nbr = element.id.substring("checkbox".length);
			$("#checkbox" + nbr).prop('checked', false);
			this.removedWeights.push(this.weights[Number(nbr) - index]);
			this.weights.splice(Number(nbr) - index, 1);
			$("#mainCheckbox").prop('checked', false);
		});
	}

	changeWeight(element) {
		let nbr = element.id.substring("weight".length);
		if (nbr != this.weights.length - 1) {
			this.weights[nbr].diff = this.weights[nbr].value - this.weights[Number(nbr) + 1].value;
			if (nbr != 0)
				this.weights[Number(nbr) - 1].diff = this.weights[Number(nbr) - 1].value - this.weights[nbr].value;
		} else {
			this.weights[nbr].diff = 0;
			this.weights[Number(nbr) - 1].diff = this.weights[Number(nbr) - 1].value - this.weights[nbr].value;
		}
	}

	saveWeights() {
		this.weightUpdate = true;
		for (let data of this.weights) {
			if (data.id) {
				this.putWeights(data);
			} else {
				this.postWeights(data);
			}
		}
		for (let data of this.removedWeights) {
			if (data.id) {
				this.deleteWeights(data.id);
			}
		}
		this.weightUpdate = false;
	}

	postWeights(data) {
		this.data.postWeight(data)
							.subscribe(
								success => {
									console.log(success.body)
								},
								error => {
									console.log(error);
								}
							)
	}

	putWeights(data) {
		this.data.putWeight(data)
							.subscribe(
								success => {
									console.log(success.body)
								},
								error => {
									console.log(error);
								}
							)
	}

	deleteWeights(id) {
		this.data.deleteWeight(id)
							.subscribe(
								success => {
									console.log(success.body)
								},
								error => {
									console.log(error);
								}
							)
	}

}
