class Game {
	constructor() {
		this.status = document.getElementById('status');
		this.fruits = [...document.querySelectorAll(".machine img")];
		this.money = document.querySelector(".credit-value");
		this.bet = document.querySelector(".bet");
		this.fruits = [...document.querySelectorAll(".machine img")];
		this.btn = document.getElementById('start');
		this.draw = [0, 0, 0];
		this.slots = [0, 0, 0];
		this.win = new Audio("sound/win.mp3");
		this.lose = new Audio("sound/lose.mp3");
		this.spin = new Audio("sound/spin.mp3");
		this.coin = new Audio("sound/coin.mp3");
		this.btn.addEventListener('click', this.startGame.bind(this));
	}

	result() {
		let spins = []
		for (let i = 0; i < 3; i++) {
			spins[i] = Math.floor(Math.random() * this.fruits.length) + (i * 10) + 20;
			this.slots[i] = []
			for (let j = 0; j < spins[i]; j++) {
				let fruit = Math.floor(Math.random() * this.fruits.length) + 1;
				this.slots[i].push(fruit);
				if (j + 1 == spins[i]) {
					this.draw[i] = fruit;
				}
			}
		}
	}

	checkWin() {
		if (this.draw[0] == this.draw[1] && this.draw[1] == this.draw[2]) {
			console.log(this.money);
			this.money.innerHTML = Number(this.money.innerHTML) + (this.bet.value * 5);
			console.log(this.money);
			this.status.innerHTML = "You Win";
			this.win.play();
		}
		else {
			this.status.innerHTML = "You Lose";
			this.lose.play();
		}
	}

	changeFruits() {
		let currentFruit = [0, 0, 0];
		let intervals = [0, 0, 0];

		let spin = (index) => {
			currentFruit[index]++;
			if (currentFruit[index] >= this.slots[index].length) {
				this.coin.play();
				clearInterval(intervals[index]);
				if (index == 2) {
					this.checkWin();
					this.btn.disabled = false;
				}
				return null;
			}
			this.spin.play();
			this.fruits[index].src = `img/${this.slots[index][currentFruit[index]]}.png`;
		}
		intervals[0] = setInterval(spin, 50, 0);
		intervals[1] = setInterval(spin, 50, 1);
		intervals[2] = setInterval(spin, 50, 2);
	}


	startGame() {
		this.btn.disabled = true;
		this.status.innerHTML = "Slot machine";
		if (this.bet.value < 1) {
			this.btn.disabled = false;
			return alert('Kwota, którą chcesz grać jest za mała!');
		}

		if (this.bet.value > Number(this.money.innerHTML)) {
			this.btn.disabled = false;
			return alert("masz za mało środków lub podana została nieprawidłowa wartość")
		}
		this.money.innerHTML = this.money.innerHTML - this.bet.value;
		this.result();
		this.changeFruits();
	}

}
const game = new Game()





