let money, 
	time;

function start() {
	money = +prompt("Ваш бюджет на месяц?", "");
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	
	while ((isNaN(money)) || (money == "") || (money == null) ) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
};
start();

let	appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: true,
	chooseExpenses: function() { // Обязательные расходы
		for (let i = 0; i < 2; i++) {
			let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
				b = prompt("Во сколько обойдется?", "");
				
			if ((typeof(a) === "string") && (typeof(a) != null) && (typeof(b) != null) && (a != "") && (b != "") && (a.length < 50)) {
				console.log("Done");
				appData.expenses[a] = b;
				console.log(typeof(appData.expenses[a]));
			} else {
				console.log("Bad result");
				i--;
			}
		};
	},
	detectDayBudget: function() { // Дневной бюджет
		appData.moneyPerDay = (appData.budget / 30).toFixed(1);
		alert("Ежедневный бюджет: " + appData.moneyPerDay);
	},
	detectLevel: function() { // Уровень достатка
		if (appData.moneyPerDay < 100) {
			console.log("Минимальный уровень достатка");
		} else if ((appData.moneyPerDay > 100) && (appData.moneyPerDay < 2000)) {
			console.log("Средний уровень достатка");
		} else if (appData.moneyPerDay > 2000) {
			console.log("Высокий уровень достатка");
		} else {
			console.log("Произошла ошибка");
		}
	},
	checkSavings: function() { // Месячный доход с депозита
		if (appData.savings == true) {
			let save = +prompt("Какова сумма накоплений?"),
				percent = +prompt("Под какой процент?");
			
			appData.monthIncome = save / 100 / 12 * percent;
			alert("Доход в месяц с Вашего депозита: " + appData.monthIncome.toFixed());
		}
	},
	chooseOptExpenses: function() { // Необязательные расходы
		for (let i = 0; i < 2; i++) {
			let questionOptExpenses = prompt("Ваша статья необзятельных расходов", "");
			
			if ((typeof(questionOptExpenses) === "string") && (typeof(questionOptExpenses) != null) && (questionOptExpenses != "") && (questionOptExpenses.length < 50)) {
				console.log("Done");
				appData.optionalExpenses[i + 1] = questionOptExpenses;
				console.log(appData.optionalExpenses[i + 1]);
			} else {
				console.log("Bad result");
				i--;
			}
		}
	},
	chooseIncome: function() { // Дополнительный доход
		let items = prompt("Что принесёт дополнительный доход? (Перечислите через запятую)", "");
		
		if (typeof(items) != "string" || items == "" ||  items == null) {
			alert("Неверное значение");
		} else {
			appData.income = items.split(", ");
			appData.income.push(prompt("Может что-то ещё?", ""));
			appData.income.sort();
		}
		
		appData.income.forEach(function(item, i) {
			console.log(i + 1 + ": " + item);
		});
	}
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













