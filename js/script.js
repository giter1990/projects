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
			
			if (t.hours < 10) {
				t.hours = "0" + t.hours;
			}
			
			if (t.minutes < 10) {
				t.minutes = "0" + t.minutes;
			}
			
			if (t.seconds < 10) {
				t.seconds = "0" + t.seconds;
			}
			
			hours.textContent = t.hours; // запись ч, м, с, полученная из объекта (стр. 50 - 53)
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds;
			
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	
	setClock("timer", deadline);
});











