window.addEventListener("DOMContentLoaded", function() {
	"use_strict";
	
	let tab = document.querySelectorAll(".info-header-tab"),
		info = document.querySelector(".info-header"),
		tabContent = document.querySelectorAll(".info-tabcontent"),
		hideTabContent = (a) => { // ES6
			for (let i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove("show");
				tabContent[i].classList.add("hide");
			}
		},
		showTabContent = (b) => { // ES6
			if (tabContent[b].classList.contains("hide")) {
				tabContent[b].classList.remove("hide");
				tabContent[b].classList.add("show");
			}
		};
	
	hideTabContent(1); // скрытие всех tabContent, кроме первого (с индексом 0)
	
	// Перебирание табов
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
	}); // e надо для сравнения с тем, куда кликаем (стр. 37)
	
	// Таймер обратного отсчёта
	let deadline = "2020-03-14",
		getTimeRemaining = (endtime) => { // ES6
			let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60), // получаем кол-во секунд (работает и без Math.floor)
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor(t / (1000 * 60 * 60));
		
			return { // извлечение общего времени и ч, м, с
				"total": t,
				"hours": hours,
				"minutes": minutes,
				"seconds": seconds
			}
		},
		setClock = (id, endtime) => { // изменение файла HTML (ES6)
			let timer = document.getElementById(id), // выставление и запуск часов
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds"),
			updateClock = () => {
				let t = getTimeRemaining(endtime),
					addZero = (num) => { 
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
			},
			timeInterval = setInterval(updateClock, 1000);
		};
	
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
		if (e.target && e.target.classList.contains("popup-close")) {
			this.style.display = "none";
			more.classList.remove("more-splash");
			document.body.style.overflow = "";
		}
	});
	
	// Form
	let message = { // Объект с состоянием запроса
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с Вами свяжемся!",
		failure: "Что-то пошло не так..."
	};
	let form = document.querySelector(".main-form"),
		formContacts = document.querySelector("#form"),
		input = form.getElementsByTagName("input"),
		inputContacts = formContacts.getElementsByTagName("input"),
		statusMessage = document.createElement("div"),
		statusMessageContacts = document.createElement("div");
		
	statusMessage.classList.add("status");
	statusMessageContacts.classList.add("status");
	
	form.addEventListener("submit", function(e) {
		e.preventDefault();
		
		statusMessageContacts.style.color = "#fff";
		statusMessageContacts.style.marginTop = "10px";
		form.appendChild(statusMessage); // сообщение в форме об итоге запроса
		
		let formData = new FormData(form);
		
		// 1) отправка данных с помощью FormData (Promise)
		function postData(data) {
			return new Promise(function(resolve, reject) {
				let request = new XMLHttpRequest(); 
				
				request.open('POST', 'server.php');
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				
				request.addEventListener("readystatechange", function() { // отслеживание изменений состояния запроса
					if (request.readyState < 4) {
						resolve();
					} else if ((request.readyState == 4) && (request.status == 200)) {
						resolve();
					} else {
						reject();
					}
				});
				
				request.send(data); // отправка данных на сервер
			});
		};
		
		function clearInput() {
			for (let i = 0; i < input.length; i++) {
				input[i].value = "";
			};
		};
		
		postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.then(clearInput)
		
		// 2) отправка данных с помощью JSON (Promise):		
		/* function postData(data) {
			return new Promise(function(resolve, reject) {
				let request = new XMLHttpRequest();
				
				request.open('POST', 'server.php');
				request.setRequestHeader("Content-type", "application/json; charset=utf-8"); // ставим формат JSON
				
				// преобразование данных формы в формат JSON:
				let obj = {};
				
				// заполнение obj данными из FormData:
				formData.forEach(function(value, key) {
					obj[key] = value;
				});
				
				// превращение obj в формат JSON:
				let json = JSON.stringify(obj);
				
				request.addEventListener("readystatechange", function() { // отслеживание изменений состояния запроса
					if (request.readyState < 4) {
						resolve();
					} else if ((request.readyState == 4) && (request.status == 200)) {
						resolve();
					} else {
						reject();
					}
				});
		
				request.send(json); // отправка данных на сервер
			});
		};
		
		function clearInput() {
			for (let i = 0; i < input.length; i++) {
				input[i].value = "";
			};
		};
		
		postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.then(clearInput) */
	});
	
	formContacts.addEventListener("submit", function(e) {
		e.preventDefault();
		
		statusMessageContacts.style.color = "#fff";
		statusMessageContacts.style.marginTop = "15px";
		formContacts.appendChild(statusMessageContacts);
		
		let formData = new FormData(formContacts);
		
		// 1) отправка данных с помощью FormData (Promise)
		/* function postData(data) {
			return new Promise(function(resolve, reject) {
				let request = new XMLHttpRequest();
		
				request.open("POST", "server.php");
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				
				request.addEventListener("readystatechange", function() {
					if (request.readyState < 4) {
						resolve();
					} else if ((request.readyState == 4) && (request.status == 200)) {
						resolve();
					} else {
						reject();
					}
				});
				
				request.send(data);
			});
		};
		
		function clearInput() {
			for (let i = 0; i < input.length; i++) {
				inputContacts[i].value = "";
			};
		};
		
		postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.then(clearInput) */

		// 2) отправка данных с помощью JSON (Promise)
		function postData(data) {
			return new Promise(function(resolve, reject) {
				let request = new XMLHttpRequest();
			
				request.open("POST", "server.php");
				request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				
				// let formData = new FormData(formContacts),
				let	obj = {};
					
				formData.forEach(function(value, key) {
					obj[key] = value;
				});
				
				let json = JSON.stringify(obj);
				
				request.addEventListener("readystatechange", function(e) {
					if (request.readyState < 4) {
						resolve();
					} else if ((request.readyState == 4) && (request.status == 200)) {
						resolve();
					} else {
						reject();
					}
				});
				
				request.send(json);
			});
		};
		
		function clearInput() {
			for (let i = 0; i < inputContacts.length; i++) {
				inputContacts[i].value = "";
			};
		};
		
		postData(formData)
			.then(() => statusMessageContacts.innerHTML = message.loading)
			.then(() => statusMessageContacts.innerHTML = message.success)
			.catch(() => statusMessageContacts.innerHTML = message.failure)
			.then(clearInput)
	});
	
	// Слайдер
	let slideIndex = 1, // переменная, что показывается в текущий момент
		slides = document.querySelectorAll(".slider-item"),
		prev = document.querySelector(".prev"),
		next = document.querySelector(".next"),
		dotsWrap = document.querySelector(".slider-dots"),
		dots = document.querySelectorAll(".dot");
		
	function showSlides(n) {
		if (n > slides.length) { // Возвращение к 1-му слайду
			slideIndex = 1;
		};
		
		if (n < 1) { // Возвращение к последнему слайду
			slideIndex = slides.length;
		}
		slides.forEach((item) => { // скрываем все слайды
			item.style.display = "none";
		});
		/* for (let i = 0; i < slides.length; i++) { 
			slides[i].style.display = "none"; // аналог стр. 335-337
		} */
		
		dots.forEach((item) => { //  удаляем чёрную точку 
			item.classList.remove("dot-active");
		});
		
		slides[slideIndex - 1].style.display = "block"; // показ нужного слайда (ковертация нормальной нумерации в формат JS)
		dots[slideIndex - 1].classList.add("dot-active"); // активация соответствующей точки
	}
	
	showSlides(slideIndex);
	
	function plusSlides(n) { // изменение параметра slideIndex сообразно навигации по слайдам
		showSlides(slideIndex += n);
	}
	
	function currentSlide(n) { // определение текущего слайда и его установка
		showSlides(slideIndex = n);
	}
	
	prev.addEventListener("click", function() {
		plusSlides(-1); // можно указать число одновременно перелистываемых слайдов
	});
	// перелистывание слайдов стрелками (стр. 367-373)
	next.addEventListener("click", function() {
		plusSlides(1);
	});
	
	dotsWrap.addEventListener("click", function(event) {
		for (let i = 0; i < dots.length + 1; i++) { // преобразование значение, которое получено из JS, в значение, соответствующее кол-ву слайдов
			if (event.target.classList.contains("dot") && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});
	
	// Калькулятор
	let persons = document.querySelectorAll(".counter-block-input")[0],
		restDays = document.querySelectorAll(".counter-block-input")[1],
		place = document.getElementById("select"),
		totalValue = document.getElementById("total");
		personsSum = 0,
		daysSum = 0,
		total = 0;
		
	totalValue.innerHTML = 0;
	
	persons.addEventListener("change", function() {
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;
		
		if (restDays.value == "") {
			totalValue.innerHTML = 0;
		} else if (persons.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});
	
	restDays.addEventListener("change", function() {
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;
		
		if (persons.value == "") {
			totalValue.innerHTML = 0;
		} else if (restDays.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});
	
	place.addEventListener("change", function() {
		if (persons.value == "" || restDays.value == "") {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
	
});











