
var CreatePalette = function(length, colorStopList) {
	
	var palette = [];
	
	if (colorStopList.length == 0){
		for (var i = 0; i < length; i++){
			palette[i] = {r:0, g:0, b:0, a:255};
		}
	} else if (colorStopList.length == 1){
		for (var i = 0; i < length; i++){
			palette[i] = colorStopList[0];
		}
	} else {
		var step = length / colorStopList.length;
		colorStopList.push(colorStopList[0]);
		for (var i = 0; i < colorStopList.length - 1; i++){
			
			firstIndex = Math.round(step * i);
			secondIndex = Math.round(step * (i + 1));
			
			var curR = colorStopList[i].r;
			var curG = colorStopList[i].g;
			var curB = colorStopList[i].b;
			var curA = colorStopList[i].a;
			
			var dR = (colorStopList[i+1].r - colorStopList[i].r) / (secondIndex - firstIndex);
			var dG = (colorStopList[i+1].g - colorStopList[i].g) / (secondIndex - firstIndex);
			var dB = (colorStopList[i+1].b - colorStopList[i].b) / (secondIndex - firstIndex);
			var dA = (colorStopList[i+1].a - colorStopList[i].a) / (secondIndex - firstIndex);
			
			for (var j = firstIndex; j < secondIndex; j++){
				palette[j] = {r: curR, g: curG, b: curB, a: curA}
				curR += dR;
				curG += dG;
				curB += dB;
				curA += dA;
			}
		}
	}
	
	var obj = {
		getColor: function(index){ return palette[index] }
	}
	
	return obj;
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var imageData = context.createImageData(1280, 960);

var x = -2;
var y = 1.5;

var dx = 4 / 1280;
var dy = 3 / 960;

for (var j = 0, k = 0; j < 960; j++){
	
	x = -2;
	
	for (var i = 0; i < 1280; i++, k+=4){
		
		var p = Complex(x, y);
		var z = Complex(0, 0);
		var zx = 0;
		var zy = 0;
		var px = x;
		var py = y;
		
		for (var m = 0; m < 100 && zx*zx + zy*zy < 4; m++){
			//z = (Complex().mul(z, z)).add(p);
			
			zx2 = zx*zx - zy*zy;
			zy2 = zx*zy + zx*zy;
			
			zx = zx2 + px;
			zy = zy2 + py;
		}
		
		if (zx*zx + zy*zy < 4) {
			imageData.data[k+0] = 0;
			imageData.data[k+1] = 0;
			imageData.data[k+2] = 0;
			imageData.data[k+3] = 255;
		} else {
			imageData.data[k+0] = 255;
			imageData.data[k+1] = 255;
			imageData.data[k+2] = 255;
			imageData.data[k+3] = 255;
		}
		
		x+=dx;
	}
	
	y-=dy;
}

context.putImageData(imageData, 0, 0);

alert("stop");