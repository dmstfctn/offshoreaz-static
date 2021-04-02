var Popup = function( _ele ){
	var that = this;
	if( !_ele ){ throw new Error( 'please specify an element'); }
	this.$ele = $( _ele );
	this.$tab = $('.popup-tab', this.$ele );
	this.$audio = $('audio', this.$ele );
	this.audio = this.$audio[0];
	this.visible = this.$ele.hasClass('visible');
	this.initEvents();
	setTimeout(function(){
		if( !that.visible ){
			that.bug();
		}
	}, 9000 );
	setTimeout(function(){
		if( !that.visible ){
			that.show();
		}
	}, 25000 );
}

Popup.prototype = {
	initEvents: function(){
		var that = this;
		this.$tab.click(function(){
			that.toggle();
		});
		$('body').on('keyup', function(e){
			if( e.which === 27 ){
				that.hide();
			}
		});
	},
	toggle: function(){
		if( this.visible ){
			this.hide();
		} else {
			this.show();
		}
	},
	show: function(){
		this.$ele.addClass( 'visible' );
		this.visible = true;
	},
	hide: function(){
		this.$ele.removeClass( 'visible' );
		this.visible = false;
	},
	bug: function(){
		this.$ele.addClass( 'bug' );
		this.audio.play();
	}
}
