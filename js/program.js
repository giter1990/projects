let money = +prompt("Ваш бюджет на месяц?", ""),
	time = prompt("Введите дату в формате YYYY-MM-DD"),
	appData = {
		budget: money,
		timeData: time,
		expenses: {
			expenseItem: +prompt("Введите обязательную статью расходов в этом месяце"),
			amount: +prompt("Во сколько обойдется?"),
			// expenseItem: amount,
			expenseItem: +prompt("Введите обязательную статью расходов в этом месяце"),
			amount: +prompt("Во сколько обойдется?")
			// expenseItem: amount
		},
		optionalExpenses: {},
		income: [],
		savings: false
	};

alert("Ваш бюджет на день: " + Math.floor(appData.budget / 30));

console.log(appData);
console.log(appData.expenses.expenseItem);
console.log(appData.expenses.amount);
	
