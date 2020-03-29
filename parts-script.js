/* function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	}; */
	
/* function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	}; */
	
// hours = Math.floor((t / 1000 / 60 / 60) % 24), другой формат получения кол-ва часов
// days = Math.floor(t / (1000 * 60 * 60 * 24));

/* if (t.hours < 10) { // 1-й способ учёта нуля (стр. 82-96)
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

/* function addZero(num){ // 2-й способ учёта нуля (стр. 98-102, 104-106)
	if (num <= 9) {
		return '0' + num;
	} else return num;
}; */

/* function updateClock() { // вызов функции каждую секунду
	let t = getTimeRemaining(endtime),
		addZero = (num) => { // 2-й способ учёта нуля (стр. 118-122, 146-148) (ES6)
			if (num <= 9) {
				return '0' + num;
			} else return num;
		};
	
	/* if (t.hours < 10) { // 1-й способ учёта нуля (стр. 124-134)
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
	
	/* function addZero(num){ // 2-й способ учёта нуля (стр. 140-148)
		if (num <= 9) {
			return '0' + num;
		} else return num;
	}; конец комментария со стр. 140
	
	hours.textContent = addZero(t.hours);
	minutes.textContent = addZero(t.minutes);
	seconds.textContent = addZero(t.seconds);
	
	if (t.total <= 0) {
		clearInterval(timeInterval);
		hours.textContent = '00';
		minutes.textContent = '00';
		seconds.textContent = '00';
	}
} */

/* function getTimeRemaining(endtime) {
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
} */

/* function setClock(id, endtime) { // изменение файла HTML
	let timer = document.getElementById(id), // выставление и запуск часов
		hours = timer.querySelector(".hours"),
		minutes = timer.querySelector(".minutes"),
		seconds = timer.querySelector(".seconds"),
		timeInterval = setInterval(updateClock, 1000);
		
	function updateClock() { // вызов функции каждую секунду
		let t = getTimeRemaining(endtime);
		
		/* if (t.hours < 10) { // 1-й способ учёта нуля (стр. 185-195)
			t.hours = "0" + t.hours;
		}
		
		if (t.minutes < 10) {
			t.minutes = "0" + t.minutes;
		}
		
		if (t.seconds < 10) {
			t.seconds = "0" + t.seconds;
		} */
		
		/* hours.textContent = t.hours; // запись ч, м, с, полученная из объекта (стр. 168 - 171)
		minutes.textContent = t.minutes;
		seconds.textContent = t.seconds; конец комментария со стр. 197
		
		function addZero(num){ // 2-й способ учёта нуля (стр. 201-209)
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
} */

/* close.addEventListener("click", function() { // не работает с двумя крестиками (окнами)
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	}); */