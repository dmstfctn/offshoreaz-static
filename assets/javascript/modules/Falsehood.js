var GLYPHS = [
	"&squf;",					// ■
	"&#8253;",					// ‽
	"&#191;",					// ¿
	"&#63;",					// ?
	"&#11822;",					// ⸮
	"&#11800;",					// ⸘
	"&#1374;",					// ՞
	"&#704;",					// ˀ
	"&#661;",					// ʕ
	"&#662;",					// ʖ
	"&#673;",					// ʡ
	"&#674;",					// ʢ
	"&#65110;"					// ﹖
];

var arrayRandIndex = function( array ){
	return Math.floor( Math.random() * array.length );
}

var arrayRand = function( array ){
	return array[ arrayRandIndex( array ) ];
}

var isInFirefox = function(){
	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

var Falsehood = function( _ele, _colours, _bgClipText ){
	var that = this;
	if( !_ele ){ throw new Error( 'please specify an element'); }
	if( !_colours ){ throw new Error( 'please specify some colours'); }
	this.$ele = $(_ele);
	this.colours = _colours;

	if( typeof _bgClipText !== 'undefined' ){
		this.bgClipText = _bgClipText;
	} else if( !!Modernizr ){
		this.bgClipText = Modernizr.backgroundcliptext;
	} else {
		this.bgClipText = true;
	}

	this.isInFirefox = isInFirefox();

	this.has_text = ( this.$ele.text().length > 0 );

	this.gradientAngle = Math.floor( Math.random() * 360 );

	this.gradientPos = 0;
	this.gradientMin = -10;
	this.gradientMax = 110;
	this.gradientLen = this.gradientMax - this.gradientMin;

	this.frameTime = 1000/60;
	this.time = (Math.random() * 1900) + 500; //between 250ms and 2sec
	this.delay = (Math.random() * 5000) + 5000; //between 5 and 10 secs

	this.gradientStep = this.gradientLen / (this.time / this.frameTime);

	if( this.has_text ){
		if( this.bgClipText){
			this.$ele.addClass('falsehood-background-clip-text-available')
			this.$ele.css({
				// 'background-clip': 'text',
				// '-webkit-background-clip': 'text',
				//'background-color': '#000000'
			});
			if( this.isInFirefox ){
				this.$ele.css({
					'color': '#000000'
				});
			} else {
				this.$ele.css({
					'color': 'transparent'
				});
			}
		} else {
			var transTime = (this.time / 1000);
			this.$ele.css({
				WebkitTransition : 'color ' + transTime + 's linear',
			    MozTransition    : 'color ' + transTime + 's linear',
			    MsTransition     : 'color ' + transTime + 's linear',
			    OTransition      : 'color ' + transTime + 's linear',
			    transition       : 'color ' + transTime + 's linear'
			});
		}
	}

	this.f = 0;
	//console.log( 'INIT FALSEHOOD, BGCLIPTEXT: ', this.bgClipText );
}

Falsehood.prototype = {
	// COLOUR / GRADIENT METHODS
	gradStep: function(){
		var c0 = '000000';
		if( !this.has_text || this.isInFirefox ){
			c0 = 'transparent';
		}
		var c1 = this.colours[1];
		var c2 = this.colours[0];
		var gradientW = 20;
		if( !this.has_text ){
			gradientW = 40;
		}
		var gradientBuf = 10;
		var bgW = (100 - gradientW - (gradientBuf * 2)) / 2;
		var stops = [
			{color: c0, pos: 0},
			{color: c0, pos: bgW},
			{color: c1, pos: gradientBuf},
			{color: c2, pos: gradientW},
			{color: c0, pos: gradientBuf},
			{color: c0, pos: bgW}
		];

		var stopIndex = 0;
		var startPos = this.gradientPos - (gradientW/2) - gradientBuf - bgW;
		var pos = startPos;
		var grad = this.gradientAngle + 'deg';

		while( pos < this.gradientMax ){
			var stop = stops[ stopIndex % stops.length ];
			pos += stop.pos;

			grad += ', ';
			if( stop.color !== 'transparent' ){
				grad += '#';
			}
			grad += stop.color;
			grad += ' ' + pos + '%';
			stopIndex++;
		}
		this.$ele.css({
			'background-color': 'transparent',
			'background-image': '-moz-linear-gradient(' + grad + ')',
			'background-image': 'linear-gradient(' + grad + ')',
			'background-image': '-webkit-linear-gradient(' + grad + ')'
		});

		this.gradientPos += this.gradientStep;
		if( this.gradientPos > this.gradientMax ){
			this.gradientPos = this.gradientMin;
		//	this.gradientAngle = Math.floor( Math.random() * 360 );
			return false;
		}
		return true; //return true to keep animating
	},
	colrStep:function(){
		if( this.gradientPos > this.gradientMax - (this.gradientStep*3) ){
			this.$ele.css('color', '#000000' );
		} else if( this.gradientPos > this.gradientMax * 0.66  ){
			this.$ele.css('color', '#' + this.colours[1] );
		} else if( this.gradientPos > this.gradientStep * 3 ){
			this.$ele.css('color', '#' + this.colours[0] );
		} else {
			this.$ele.css('color', '#000000' );
		}

		this.gradientPos += this.gradientStep;

		if( this.gradientPos > this.gradientMax ){
			this.gradientPos = this.gradientMin;
			return false;
		}

		return true; //return true to keep animating
	},
	step: function(){
		this.f++;
		if( this.bgClipText ){
			return this.gradStep();
		} else {
			return this.colrStep();
		}
	},
	stop: function(){
		if( this.has_text && this.bgClipText && !this.isInFirefox ){
			this.$ele.css({
				'background-color': '#000000'
			});
		} else if( this.has_text && this.bgClipText && this.isInFirefox ){
			this.$ele.css({
				'background-color': 'transparent'
			});
		}
	},
	wait: function(){
		var that = this;
		clearTimeout( this.waitTimer );
		clearTimeout( that.timer );
		this.stop();
		this.waitTimer = setTimeout( function(){
			that.fade();
		}, this.delay );
	},
	fade: function(){
		var that = this;
		clearTimeout( this.waitTimer );
		var s = function(){
			clearTimeout( that.timer );
			that.timer = setTimeout( function(){
				if( that.step() ){
					s();
				} else {
					that.wait();
				}
			}, that.frameTime );
		};

		s();
	},
	run: function(){
		this.wait();
	}
}
