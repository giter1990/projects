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
});











