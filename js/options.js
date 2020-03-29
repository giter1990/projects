class Options {
	constructor(bg, fontSize, height, textAlign, width) {
		this.bg = bg;
		this.fontSize = fontSize;
		this.height = height;
		this.textAlign = textAlign;
		this.width = width;
	}
		
	cssText() {
		let newElement = document.createElement("div");
		
		newElement.textContent = "Random description";
		document.body.appendChild(newElement);
		newElement.classList.add("location");
		
		newElement.style.background = this.bg;
		newElement.style.fontSize = this.fontSize;
		newElement.style.height = this.height;
		newElement.style.textAlign = this.textAlign;
		newElement.style.width = this.width;
	}
	
};

const elem = new Options("orange", "20px", "40px", "center", "300px");

elem.cssText();
