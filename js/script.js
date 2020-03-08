window.addEventListener("DOMContentLoaded", function() {
	"use_strict";
	
	let tab = document.querySelectorAll(".info-header-tab"),
		info = document.querySelector(".info-header"),
		tabContent = document.querySelectorAll(".info-tabcontent");
		
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	};
	
	hideTabContent(1); // скрытие всех tabContent, кроме первого (с индексом 0)
	
	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	};
	
	info.addEventListener("click", function(e) { 
		let target = event.target;
		
		if (target && target.classList.contains("info-header-tab")) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) { // цель нажатия = перебираемому табу
					hideTabContent(0); // скрытие всех табов
					showTabContent(i);
					break;
				}
			}
		}
	}); // e надо для сравнения с тем, куда кликаем (стр. 24)
	
	// Таймер обратного отсчёта
	let deadline = "2020-03-14";
	
	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60), // получаем кол-во секунд (работает и без Math.floor)
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor(t / (1000 * 60 * 60));
			// hours = Math.floor((t / 1000 / 60 / 60) % 24), другой формат получения кол-ва часов
			// days = Math.floor(t / (1000 * 60 * 60 * 24));
		
		return { // извлечение общего времени и ч, м, с
			"total": t,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		}
	}
	
	function setClock(id, endtime) { // изменение файла HTML
		let timer = document.getElementById(id), // выставление и запуск часов
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds"),
			timeInterval = setInterval(updateClock, 1000);
			
		function updateClock() { // вызов функции каждую секунду
			let t = getTimeRemaining(endtime);
			
			/* if (t.hours < 10) { // 1-й способ учёта нуля (стр. 67-81)
				t.hours = "0" + t.hours;
			}
			
			if (t.minutes < 10) {
				t.minutes = "0" + t.minutes;
			}
			
			if (t.seconds < 10) {
				t.seconds = "0" + t.seconds;
			} */
			
			/* hours.textContent = t.hours; // запись ч, м, с, полученная из объекта (стр. 50 - 53)
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds; */
			
			function addZero(num){ // 2-й способ учёта нуля (стр. 83-94)
				if (num <= 9) {
					return '0' + num;
				} else return num;
			};
			
			hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
			
			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
			}
		}
	}
	
	setClock("timer", deadline);
	
	// Модальное окно
	let more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close"),
		descriptionBtn = document.querySelector(".description-btn"),
		health = document.querySelector(".health"),
		blackout = document.querySelector(".blackout"),
		infoBlock = document.querySelector(".info");
	
	more.addEventListener("click", function() {
		overlay.style.display = "block";
		this.classList.add("more-splash");
		document.body.style.overflow = "hidden";
	});
	
	close.addEventListener("mouseover", function() {
		this.style.textShadow = "0 0 5px #fff";
	});
	
	close.addEventListener("mouseout", function() {
		this.style.textShadow = "none";
	});
	
	overlay.addEventListener("click", function(e) {
		if (e.target && e.target.classList.contains("popup-close")) {
			this.style.display = "none";
			more.classList.remove("more-splash");
			document.body.style.overflow = "";
		}
	});
	
	/* close.addEventListener("click", function() { // не работает с двумя крестиками (окнами) (см. коммент к стр. 134)
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	}); */
	
	descriptionBtn.addEventListener("click", function() {
		this.style.transform = "scale(1.1)";
		blackout.style.display = "block";
		health.style.display = "block";
	});
	
	infoBlock.addEventListener("click", function(e) { // одинаковое окно для всех табов
		if (e.target && e.target.classList.contains("description-btn")) {
			this.style.transform = "scale(1.1)";
			blackout.style.display = "block";
			health.style.display = "block";
		}
	});
	
	health.addEventListener("click", function(e) {
		if (e.target && e.target.classList.contains("popup-close")) { // прописываем родителя и ребёнка, содержащего класс крестика (то же делаем и для overlay, стр. 114)
			this.style.display = "none";
			more.classList.remove("more-splash");
			document.body.style.overflow = "";
		}
	});
});











