let // Первые три кнопки
	/* approveBtn1 = document.getElementsByTagName("button")[0],
	approveBtn2 = document.getElementsByTagName("button")[1],
	calculateBtn = document.getElementsByTagName("button")[2], */
// Обязательные расходы
	expensesItem = document.querySelectorAll(".expenses-item"),
	expensesBtn = document.querySelector(".expenses-item-btn"),
// Необязательные расходы
	optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
	optionalExpensesBtn = document.querySelector(".optionalexpenses-btn"),
// Расчёт дневного бюджета
	countBudgetBtn = document.querySelector(".count-budget-btn"),
// Ввод возможных статей дохода
	chooseIncome = document.querySelector(".choose-income"),
// Наличие накоплений
	presenceSavings = document.querySelector("#savings"),
	chooseSum = document.querySelector(".choose-sum"),
	choosePercent = document.querySelector(".choose-percent"),
// Начало расчёта
	startCalculation = document.querySelector("#start"),	
// Правая колонка
	budgetValue = document.getElementsByClassName("budget-value")[0],
	dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
	levelValue = document.getElementsByClassName("level-value")[0],
	expensesValue = document.getElementsByClassName("expenses-value")[0],
	optionalExpensesValue = document.querySelector(".optionalexpenses-value"),
	incomeValue = document.getElementsByClassName("income-value")[0],
	monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
	yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
// Год, месяц, день
	yearValue = document.querySelector(".year-value"),
	monthValue = document.querySelector(".month-value"),
	dayValue = document.querySelector(".day-value"),
	money, 
	time;

	expensesBtn.classList.add("inactive-button");
	optionalExpensesBtn.classList.add("inactive-button");
	countBudgetBtn.classList.add("inactive-button");

startCalculation.addEventListener("click", function() {
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?", "");
	
	while ((isNaN(money)) || (money == "") || (money == null) ) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
	
	appData.budget = money;
	appData.timeData = time;
	
	budgetValue.textContent = money.toFixed();
	
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
	
	expensesBtn.classList.remove("inactive-button");
	countBudgetBtn.classList.remove("inactive-button");
});

expensesBtn.addEventListener("click", function() {
	if ((appData.budget != undefined) && (appData.timeData != undefined)) {
		let sum = 0;
	
		for (let i = 0; i < expensesItem.length; i++) {
			let a = expensesItem[i].value,
				b = expensesItem[++i].value;
				
			if ((typeof(a) === "string") && (typeof(a) != null) && (typeof(b) != null) && (a != "") && (b != "") && (a.length < 50)) {
				console.log("Done");
				appData.expenses[a] = b;
				sum += +b;
				console.log(typeof(appData.expenses[a]));
			} else {
				console.log("Bad result");
				i--;
			}
		};
				
		expensesValue.textContent = sum;
		
		optionalExpensesBtn.classList.remove("inactive-button");
	};
});

optionalExpensesBtn.addEventListener("click", function() {
	if ((appData.budget != undefined) && (appData.timeData != undefined)) {
		for (let i = 0; i < optionalExpensesItem.length; i++) {
			let questionOptExpenses = optionalExpensesItem[i].value;
			
			appData.optionalExpenses[i] = questionOptExpenses;
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
			console.log(appData.optionalExpenses[i]);
		};
	};
});

countBudgetBtn.addEventListener("click", function() {
	if ((appData.budget != undefined) && (appData.timeData != undefined)) {
		if (appData.budget != undefined) {
			appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed(1);
			dayBudgetValue.textContent = appData.moneyPerDay;
	
			if (appData.moneyPerDay < 100) {
				levelValue.textContent = "Минимальный уровень достатка";
				console.log("Минимальный уровень достатка");
			} else if ((appData.moneyPerDay > 100) && (appData.moneyPerDay < 2000)) {
				levelValue.textContent = "Средний уровень достатка";
				console.log("Средний уровень достатка");
			} else if (appData.moneyPerDay > 2000) {
				levelValue.textContent = "Высокий уровень достатка";
				console.log("Высокий уровень достатка");
			} else {
				levelValue.textContent = "Произошла ошибка";
				console.log("Произошла ошибка");
			}
		} else {
			dayBudgetValue.textContent = "Произошла ошибка";
		};
		
		console.log(expensesValue.textContent);
	};
});

chooseIncome.addEventListener("input", function() {
	let items = chooseIncome.value;
	
	appData.income = items.split(", ");
	incomeValue.textContent = appData.income;
});

presenceSavings.addEventListener("click", function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

chooseSum.addEventListener("input", function() {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;
			
		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;
		
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

choosePercent.addEventListener("input", function() {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;
			
		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;
		
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let	appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
};

for (let key in appData) {
	console.log("Свойство " + key + " имеет значение " + appData[key]);
};

// Первый способ вывода бюджета
// appData.moneyPerDay = Math.floor(appData.budget / 30);

// Второй способ вывода бюджета
/* appData.moneyPerDay = (appData.budget / 30).toFixed(1);

alert("Ежедневный бюджет: " + appData.moneyPerDay);
console.log(typeof(appData.moneyPerDay)); */