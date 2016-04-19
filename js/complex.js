
var Complex = function(real, imaginary) {
	
	var obj = {
		
		re : real,
		im : imaginary,
		
		add : function(par){
			return Complex(this.re + par.re, this.im + par.im);
		},
		
		mul : function(c1, c2){
			return Complex(
				c1.re * c2.re - c1.im * c2.im,
				c1.re * c2.im + c1.im * c2.re);
		},
		
		mod2 : function(c){
			return c.re * c.re + c.im * c.im;
		}
	}
	
	return obj;
}