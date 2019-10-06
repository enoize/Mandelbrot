
export class Complex {

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	add(param){
		return new Complex(
			this.x + param.x,
			this.y + param.y);
	}

	mul(param){
		return new Complex(
			this.x * param.x - this.y * param.y,
			this.x * param.y + this.y * param.x
		);
	}

	mod(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}
