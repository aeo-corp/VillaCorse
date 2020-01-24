import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

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

	screen_width: number = 1920;

	onglets = {
		description: false,
		equipment: false,
		location: false
	}

	imgs = [
		{ path: "assets/imgs/rezDeJardin/5 vue terrasse rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/6  terrasse rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/6 terrasse cuisine.jpg" },
		{ path: "assets/imgs/rezDeJardin/7 terrasse rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/7 terrasse séjour.jpg" },
		{ path: "assets/imgs/rezDeJardin/8 entrée rez de jardin.jpg" },
		{ path: "assets/imgs/rezDeJardin/8 mini terrasse chambre parents.jpg" },
		{ path: "assets/imgs/rezDeJardin/8 sejour.jpg" },
		{ path: "assets/imgs/rezDeJardin/8 terrasse.jpg" },
		{ path: "assets/imgs/rezDeJardin/9  terrasse .png" },
		{ path: "assets/imgs/rezDeJardin/9 .png" },
		{ path: "assets/imgs/rezDeJardin/9 terrasse cuisine.png" },
		{ path: "assets/imgs/rezDeJardin/10 terrasse commune.jpg" },
		{ path: "assets/imgs/rezDeJardin/11 terrasse commune.jpg" },
		{ path: "assets/imgs/rezDeJardin/12 terrasse  commune.jpg" },
		{ path: "assets/imgs/rezDeJardin/13 terrasse  .jpg" },
		{ path: "assets/imgs/rezDeJardin/14 cuisine.jpg" },
		{ path: "assets/imgs/rezDeJardin/15 vue cuisine.jpg" },
		{ path: "assets/imgs/rezDeJardin/16 couloir.jpg" },
		{ path: "assets/imgs/rezDeJardin/17 chambre parents .jpg" },
		{ path: "assets/imgs/rezDeJardin/18 sejour ou chambre parents.jpg" },
		{ path: "assets/imgs/rezDeJardin/19 sejour ou chambre 2 lits.jpg" },
		{ path: "assets/imgs/rezDeJardin/20 Acces chambre ado 3 lits.jpg" },
		{ path: "assets/imgs/rezDeJardin/21 chambre ado 3 lits .jpg" },
		{ path: "assets/imgs/rezDeJardin/22 salle de bain.jpg" }
	]

	plans = [
		{ path: "assets/imgs/rezDeJardin/5  plan de l'appartement du rez de jardin.png" }
	]

	location_pics =  [
		{ path: "assets/imgs/rezDeJardin/3 situation de la maison 1.png" },
		{ path: "assets/imgs/rezDeJardin/3 situation de la maison 3.png" },
		{ path: "assets/imgs/rezDeJardin/4 situation de la maison 2.png" },
	]

	locations =  [
		{ body: "JetSky", addresse: "12 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
		{ body: "Bouée", addresse: "13 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
		{ body: "Parachute", addresse: "14 rue de rivoli, 75000 Paris", phone_number: "+33684355629" },
	]

  constructor(private platform: Platform) {
		this.slideOpts = {
		  initialSlide: 0,
		  slidesPerView: 1,
		  autoplay:true
		};
		this.screen_width = this.platform.width();
	}

	showNextSlide(type) {
		if (type === "img")
			this.slides.slideNext();
		else if (type === "plan")
			this.slides1.slideNext();
		else if (type === "location")
			this.slides2.slideNext();
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
				this.location_index = this.location_pics.length - 1;
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
			if (this.location_index + 1 < this.location_pics.length)
				this.location_index++;
		}
	}

}
