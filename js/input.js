let age = document.getElementById("age");

function showUser(surname, name) {
	// alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
	alert(`Пользователь ${surname} ${name}, его возраст ${this.value}`); // ES6
}

showUser.apply(age, ["Smith", "John"]);