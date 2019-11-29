import { Component, ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	@ViewChild('slides') slides: Slides;
	slideOpts: {};
	firstImg: boolean = true;
	lastImg: boolean = false;
	imgNbr: number = 1;

	@ViewChild('slides1') slides1: Slides;
	firstPlan: boolean = true;
	lastPlan: boolean = false;

	@ViewChild('slides2') slides2: Slides;
	firstLocation: boolean = true;
	lastLocation: boolean = false;
	location_index: number = 0;

	imgs = [
		{ path: "assets/imgs/rezDeJardin/5 vue terrasse rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/6  terrasse rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/6 terrasse cuisine.jpg" },
	]

	plans = [
		{ path: "assets/imgs/plan1.png" }
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

	locations_pics =  [
		{ path: "assets/imgs/villa1.jpg" },
		{ path: "assets/imgs/villa2.jpg" },
		{ path: "assets/imgs/villa1.jpg" },
	]

	locations =  [
		{ body: "JetSky", addresse: "12 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
		{ body: "Bouée", addresse: "13 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
		{ body: "Parachute", addresse: "14 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
	]

  constructor() {
		this.slideOpts = {
		  initialSlide: 0,
		  slidesPerView: 1,
		  autoplay:true
		};
	}

	ionViewWillLoad() {
		console.log("ok");
	}

	showNextSlide(type) {
		if (type === "img")
			this.slides.slideNext();
		else if (type === "plan")
			this.slides1.slideNext();
		else if (type === "location") {
			this.slides2.slideNext();
		}
	}

	showPreviousSlide(type) {
		if (type === "img")
			this.slides.slidePrev();
		else if (type === "plan")
			this.slides1.slidePrev();
		else if (type === "location") {
			this.slides2.slidePrev();
			this.location_index -= 2;
		}
	}

	isFirstSlide(type) {
		setTimeout(() => {
			if (type === "img") {
				this.firstImg = true;
				this.lastImg = false;
			} else if (type === "plan") {
				this.firstPlan = true;
				this.lastPlan = false;
			} else if (type === "location") {
				this.firstLocation = true;
				this.lastLocation = false;
				this.location_index = 0;
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
			} else if (type === "location") {
				this.firstLocation = false;
				this.lastLocation = true;
				this.location_index = this.locations_pics.length - 1;
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
		} else if (type === "location") {
			this.firstLocation = false;
			this.lastLocation = false;
			if (this.location_index + 1 < this.locations_pics.length) {
				this.location_index++;
			}
		}
	}

	contact() {
		console.log("contact");
	}

}
