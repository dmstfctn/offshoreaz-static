var Shape = function( _src, _container, _fromEdge ){
	var that = this;	
	this.src = _src;
	this.$container = ( _container ) ? $(_container) : $('body');

	this.fromEdge = !!_fromEdge;

	this.bounds = {
		x: {
			min: 0,
			max: this.$container.width()
		},
		y: {
			min: 0,
			max: this.$container.height()
		} 
	};

	if( this.fromEdge ){
		var xP = (Math.random() > 0.5 ) ? 1 : 0;
		var yP = (Math.random() > 0.5 ) ? 1 : 0;
		var x = this.$container.width() * xP; 
		var y = this.$container.height() * yP;
		if( xP === 0 ){
			x -= this.$container.width() * 0.25;
		} else {
			x += this.$container.width() * 0.25;
		}
		if( yP === 0 ){
			y -= this.$container.height() * 0.25;
		} else {
			y += this.$container.height() * 0.25;
		}
		this.position = {
			x: x, // translateX
			y: y, // translateY
			a: 0,							// rotate
			s: 0.5							// scale (X and Y)
		}
	} else {
		this.position = {
			x: this.$container.width()/2, 	// translateX
			y: this.$container.height()/2, 	// translateY
			a: 0,							// rotate
			s: 0.5							// scale (X and Y)
		};
	}

	this.motion = {
		x: (Math.random() * 0.3) - 0.15,
		y: (Math.random() * 0.3) - 0.15,
		a: (Math.random() * 0.1) - 0.05
	};

	this.size = {
		width: 0,
		height: 0
	};
	
	this.$ele = $('<img src="' + this.src + '"/>' );
	
	this.$ele.on('load', function(){
		that.size.width = that.$ele.width();
		that.size.height = that.$ele.height();
		that.position.x -= that.size.width/4;
		that.position.y -= that.size.height/4;
		that.$ele.css({
			'width': that.size.width,
			'height': that.size.height,
			//'left': that.$ele.width() * -0.5,
			//'top': that.$ele.height() * -0.5,
		})
		that.applyTransform();
	});
	
	this.$ele.css({
		'transform-origin': 'top left',
		'position': 'absolute',		
	});

	this.applyTransform();
}

Shape.prototype = {
	applyTransform: function(){
		var string = 	'translateX(' + this.position.x + 'px)';
			string +=	' translateY(' + this.position.y + 'px)';
			string += 	' scaleX(' + this.position.s + ')';
			string += 	' scaleY(' + this.position.s + ')';
			string += 	' rotate(' + this.position.a + 'deg)';

		this.$ele.css({
			'transform': string
		});
	},
	move: function(){
		this.position.x += this.motion.x;
		this.position.y += this.motion.y;
		this.position.a += this.motion.a;
		if( this.position.x > this.$container.width() + this.size.width ){
			this.position.x = -this.size.width;
		}
		if( this.position.x < -this.size.width ){
			this.position.x = this.$container.width() + this.size.width;
		}
		if( this.position.y > this.$container.height() + this.size.height ){
			this.position.y = -this.size.height;
		}
		if( this.position.y < -this.size.height ){
			this.position.y = this.$container.height() + this.size.height;
		}

	},
	render: function(){
		this.move();
		this.applyTransform();
	}
}