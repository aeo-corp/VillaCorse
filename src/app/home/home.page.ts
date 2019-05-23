import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { Chart } from 'chart.js';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	weights = [];

	date = [];
	weight = [];
	color = [];

	monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre" ];
	dayNames= [ "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi" ];
	newDate = new Date();

  constructor(private router: Router, private data: DataService) {
	}

  ngOnInit() {
		this.setCalendar();
		this.getWeights();
  }

	account() {
		this.router.navigateByUrl('/profile');
	}

	setCalendar() {
		this.newDate.setDate(this.newDate.getDate());
		setInterval(() => {
			var hours = new Date().getHours();
			$(".hour").html(( hours < 10 ? "0" : "" ) + hours);
    	var seconds = new Date().getSeconds();
			$(".second").html(( seconds < 10 ? "0" : "" ) + seconds);
    	var minutes = new Date().getMinutes();
			$(".minute").html(( minutes < 10 ? "0" : "" ) + minutes);

	    $(".month span,.month2 span").text(this.monthNames[this.newDate.getMonth()]);
	    $(".date span,.date2 span").text(this.newDate.getDate());
	    $(".day span,.day2 span").text(this.dayNames[this.newDate.getDay()]);
	    $(".year span").html(String(this.newDate.getFullYear()));
		}, 100);
	}

	getWeights() {
		this.data.getWeights()
							.subscribe(
								success => {
									this.weights = success.body;
									this.setArrays();
									this.setChart();
								},
								error => {
									console.log(error);
								}
							)
	}

	setArrays() {
		this.date = new Array();
		this.weight = new Array();
		for (let i = 0; i < this.weights.length; i++) {
			this.date.push(this.weights[i].date)
			this.weight.push(this.weights[i].value)
			if (i != 0 && this.weights[i].value > this.weights[i - 1].value)
				this.color.push('rgba(255, 99, 132, 1)')
			else
				this.color.push('rgba(75, 192, 192, 1)')
		}
	}

	setChart() {
		var canvas = <HTMLCanvasElement> document.getElementById("myChart");
		var ctx = canvas.getContext("2d");
		var myChart = new Chart(ctx, {
				type: 'line',
				data: {
						labels: this.date,
						datasets: [{
								label: 'poids(kg)',
								data: this.weight,
								borderColor: this.color,
								borderWidth: 1
						}]
				},
				options: {
						scales: {
								yAxes: [{
										ticks: {
												beginAtZero: true
										}
								}]
						}
				}
		});
	}

}
