import { Complex } from "./complex.mjs"

export class Application {

	constructor(){

		this.context = canvas.getContext('2d');
		this.image = this.context.createImageData(innerWidth, innerHeight);

		this.buildFractal();
	}

	buildFractal(){
		var c = new Complex(-2, 2);
		var imageIndex = 0;

		for (var y = 0; y < innerHeight; y++){

			c.x = -2;

			for (var x = 0; x < innerWidth; x++){

				var z = new Complex(0, 0);

				for (var i = 0; z.mod() < 100 && i < 256; i++){
					z = z.mul(z).add(c);
				}

				this.image.data[imageIndex + 0] = i;
				this.image.data[imageIndex + 1] = i;
				this.image.data[imageIndex + 2] = i;
				this.image.data[imageIndex + 3] = 255;

				imageIndex += 4;
				c.x += 0.005;
			}
			c.y -= 0.005;

			// progress.style.width = ((y + 1) / innerHeight) * 100 + '%';
		}
		this.context.putImageData(this.image, 0, 0);
	}
}
