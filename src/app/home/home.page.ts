import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre" ];
	dayNames= [ "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi" ];
	newDate = new Date();

  constructor(private router: Router) {
	}

  ngOnInit() {
		this.setCalendar();
		this.setChart();
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

	setChart() {
		var canvas = <HTMLCanvasElement> document.getElementById("myChart");
		var ctx = canvas.getContext("2d");
		var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
						labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
						datasets: [{
								label: '# of Votes',
								data: [12, 19, 3, 5, 2, 3],
								backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'
								],
								borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'
								],
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
