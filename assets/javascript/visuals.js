(function( global ){
	global.AZ = global.AZ || {};
	var country_config = {
		"aruba": {
			'slug': 'aruba',
			'colours': [ '6BD3E8', '8DC6E3', 'EDA6B5', 'A6A4A2' ],
			'shapes': {
				'styles': [
					{
						'count': 17
					},
					{
						'count': 33
					},
					{
						'count': 29
					},
					{
						'count': 24
					}
				]
			}				
		},
		"barbados": {
			'slug': 'barbados',
			'colours': [ 'D4C9FF', '03FFD9', '946225', 'FFFFFF' ],
			'shapes': {
				'styles': [
					{
						'count': 23
					},
					{
						'count': 26
					},
					{
						'count': 24
					},
					{
						'count': 25
					}
				]
			}			
		},
		"bermuda": {
			'slug': 'bermuda',
			'colours': [ 'FF479D', 'FF6E08', '00D050', 'AA47FF' ],
			'shapes': {
				'styles': [
					{
						'count': 23
					},
					{
						'count': 20
					},
					{
						'count': 25
					},
					{
						'count': 29
					}
				]
			}
		},
		"british virgin islands": {
			'slug': 'british-virgin-islands',
			'colours': [ '96DAFF', 'EEE8FF', 'FFEF92', 'D6AE2B' ],
			'shapes': {
				'styles': [
					{
						'count': 19
					},
					{
						'count': 15
					},
					{
						'count': 20
					},
					{
						'count': 22
					}
				]
			}
		},
		"cayman islands": {
			'slug': 'cayman-islands',
			'colours': [ '4C7173', '595947', 'DDEDDE', '0CC8CF' ],
			'shapes': {
				'styles': [
					{
						'count': 21
					},
					{
						'count': 17
					},
					{
						'count': 19
					},
					{
						'count': 20
					}
				]
			}
		},
		"dominican republic": {
			'slug': 'dominican-republic',
			'colours': [ 'DEC097', 'F29A8D', 'FF7099', 'A84F31' ],
			'shapes': {
				'styles': [
					{
						'count': 18
					},
					{
						'count': 20
					},
					{
						'count': 19
					},
					{
						'count': 20
					}
				]
			}
		},
		"gibraltar": {
			'slug': 'gibraltar',
			'colours': [ '6B230F', 'FFF2C2', 'B08C53', 'FFCE5C' ],
			'shapes': {
				'styles': [
					{
						'count': 19
					},
					{
						'count': 19
					},
					{
						'count': 20
					},
					{
						'count': 15
					}
				]
			}
		},
		"hong kong special administrative region of the people's republic of china": {
			'slug': 'hong-kong',
			'colours': [ '303030', 'D0315B', '19DF26', 'FF4A4B' ],
			'shapes': {
				'styles': [
					{
						'count': 35
					},
					{
						'count': 16
					},
					{
						'count': 26
					},
					{
						'count': 24
					}
				]
			}
		},
		"republic of cyprus": {
			'slug': 'republic-of-cyprus',
			'colours': [ '469C8E', 'FA564A', 'E99B46', 'DAE341' ],
			'shapes': {
				'styles': [
					{
						'count': 31
					},
					{
						'count': 17
					},
					{
						'count': 20
					},
					{
						'count': 21
					}
				]
			}
		},
		"republic of mauritius": {
			'slug': 'republic-of-mauritius',
			'colours': [ 'FF62B7', 'C9D48F', 'FFFD9C', 'A6E7FD' ],
			'shapes': {
				'styles': [
					{
						'count': 21
					},
					{
						'count': 17
					},
					{
						'count': 23
					},
					{
						'count': 25
					}
				]
			}
		},
		"republic of vanuatu": {
			'slug': 'republic-of-vanuatu',
			'colours': [ '34B8FF', 'FFCA32', 'FFA222', 'C9D93B' ],
			'shapes': {
				'styles': [
					{
						'count': 20
					},
					{
						'count': 14
					},
					{
						'count': 25
					},
					{
						'count': 29
					}
				]
			}
		}
	};

	var Visuals = function( ele, company, _fromEdge ){
		var $ele = $(ele);

		this.name = company.fields.name.value;
		this.date = company.fields.date.value;
		this.country = company.fields.country.value;		

		this.gradientColours = this.pickColours();
		this.titleColours = this.pickColours();

		this.fromEdge = !!_fromEdge;

	};

	Visuals.prototype = {
		pickColours: function(){
			var colours = [];			
			for( var i = 0; i < country_config[ this.country ].colours.length; i++ ){
				colours.push( country_config[ this.country ].colours[i] );
			}
			var colour1Index = Math.floor( Math.random() * colours.length );
			var c1 = colours.splice( colour1Index, 1 );
			
			var colour2Index = Math.floor( Math.random() * colours.length );
			var c2 = colours.splice( colour2Index, 1 );
			console.log( [ c1, c2 ] );
			return [ c1, c2 ];
		},
		renderGradient: function( _c1, _c2 ){			
			var c1 = _c1 || this.gradientColours[0];
			var c2 = _c2 || this.gradientColours[1];
			$('#visuals').css({
				'background': '-moz-linear-gradient(-45deg, #' + c1 + ' 0%, #' + c2 + ' 100%)',
				'background': '-webkit-linear-gradient(-45deg, #' + c1 + ' 0%, #' + c2 + ' 100%)',
				'background': 'linear-gradient(135deg, #' + c1 + ' 0%, #' + c2 + ' 100%)'
			});
		},
		renderTitle: function( _c1, _c2 ){			
			var c1 = _c1 || this.titleColours[0];
			var c2 = _c2 || this.titleColours[1];
			if( Math.random() > 0.5 ){
				$('#header svg').css({
					'stroke': '#' + c1,
					'fill': '#' + c2
				});
			} else {
				$('#header svg').css({
					'stroke': '#' + c2,
					'fill': '#' + c1
				});
			}
		},
		addShapes: function( count ){
			var config = country_config[ this.country ];
			var styles = config.shapes.styles;
			var styleID = Math.floor( Math.random() * styles.length );
			var style = styles[ styleID ];
			this.shapes = [];
			for( var i = 0; i < count; i++ ){
				var shapeIndex = Math.floor( Math.random() * style.count );
				var filename = config.slug + '_' + styleID + '_' + shapeIndex + '.png';				
				var path = 'assets/images/shapes/' + filename;				
				var shape = new Shape( path, $('#visuals .shapes'), this.fromEdge );
				$('#visuals .shapes').append( shape.$ele );
				this.shapes.push( shape );				
			}
			return this.shapes;
		},
		renderLoop: function( toRender ){
			var that = this;
			for( var i = 0; i < toRender.length; i++ ){
				toRender[i].render();
			}
			requestAnimationFrame( function(){
				that.renderLoop( toRender );
			});
		},
		run: function(){
			this.renderGradient();
			this.renderTitle();
			this.shapes = this.addShapes( Math.floor( Math.random() * 5 ) + 5 );
			this.renderLoop( this.shapes );
		}
	}

	window.Visuals = Visuals;

})( this );