import { Component, ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	@ViewChild('slides') slides: Slides;
	firstImg: boolean = true;
	lastImg: boolean = false;

	@ViewChild('slides1') slides1: Slides;
	firstPlan: boolean = true;
	lastPlan: boolean = false;

	imgs = [
		{ path: "assets/imgs/villa1.jpg" },
		{ path: "assets/imgs/villa2.jpg" },
		{ path: "assets/imgs/villa1.jpg" },
	]

	plans = [
		{ path: "assets/imgs/plan1.png" },
		{ path: "assets/imgs/plan2.jpg" },
	]

	situations = [
		{ body: "Plage: accessible à pieds +/- 130 mètres." },
		{ body: "Gare maritime : 22km (Ajaccio)." },
		{ body: "Aéroport: 21km (Ajaccio)." },
		{ body: "Supermarché: 21km (Géant Casino, Auchan, Leclerc, Decathlon)." },
		{ body: "Superettes, presse, tabac, glaciers, pizzeria, petits restaurants : 70 mètres." },
	]

	equipments = [
		{ body: "Réfrigérateur avec congélateur intégré" },
		{ body: "plaques électriques" },
		{ body: "four micro-ondes" },
		{ body: "four grill" },
		{ body: "lave vaisselle" },
		{ body: "lave linge" },
		{ body: "bouilloire" },
		{ body: "cafetière électrique" },
		{ body: "grille pain" },
	]

	rooms = [
		{ body: "Une salle de séjour de 16m² (vue mer)" },
		{ body: "Une cuisine de 12m² (vue mer)" },
		{ body: "Une chambre «parents» de 12m² avec un lit double. (2 lits simples collés)" },
		{ body: "Une chambre enfant en mezzanine de 12m² avec 4 lits et lavabo (2 lits gigogne)." },
		{ body: "Une salle d’eau de 3.5m² avec lavabo et baignoire." },
		{ body: "Une salle de douche de 2.5m² avec lavabo" },
		{ body: "Un WC" },
		{ body: "Une terrasse semi-couverte de 35m² avec barbecue et vue mer." },
		{ body: "Une douche extérieure" },
	]

  constructor() {}

	showNextSlide(type) {
		if (type === "img")
			this.slides.slideNext();
		else if (type === "plan")
			this.slides1.slideNext();
	}

	showPreviousSlide(type) {
		if (type === "img")
			this.slides.slidePrev();
		else if (type ==="plan")
			this.slides1.slidePrev();
	}

	isFirstSlide(type) {
		setTimeout(() => {
			if (type === "img") {
				this.firstImg = true;
				this.lastImg = false;
			} else if (type === "plan") {
				this.firstPlan = true;
				this.lastPlan = false;
			}
		}, 100)
	}

	isLastSlide(type) {
		setTimeout(() => {
			if (type === "img") {
				this.firstImg = false;
				this.lastImg = true;
			} else if (type === "plan") {
				this.firstPlan = false;
				this.lastPlan = true;
			}
		}, 100)
	}

	changeSlide(type) {
		if (type === "img") {
			this.firstImg = false;
			this.lastImg = false;
		} else if (type === "plan") {
			this.firstPlan = false;
			this.lastPlan = false;
		}
	}

}
