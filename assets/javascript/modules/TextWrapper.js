// Based on the character finding functionality in FontBomb
// See: https://github.com/plehoux/fontBomb
(function( global, $ ){
	var TextWrapper = function( scope, initialise ){
		this.scope = scope || document.body;
		this.words = [];
		this.characters = [];

		if( typeof initialise === 'undefined' || initialise === true ){
			this.wrap( scope );
		}
	}

	TextWrapper.prototype.wrap = function( scope ){
		this.getNodes( scope ); // run algorithm
		this.words = scope.getElementsByTagName('word'); //grab all words that have been calculated
		this.characters = scope.getElementsByTagName('character'); //grab all letters that have been calculated
	}

	TextWrapper.prototype.getNodes = function( node ){
		var nodes = node.childNodes;
		if( nodes.length > 0 ){
			for( var i = 0; i < nodes.length; i++ ){
				var bannedNodes = ['script', 'style', 'iframe', 'canvas', 'video', 'audio', 'textarea', 'embed', 'object', 'select', 'area', 'map', 'input', 'character', 'word', 'words'];
				for( var j = 0;  j < bannedNodes.length; j++ ){
					if( nodes[ i ].nodeName.toLowerCase() === bannedNodes[ j ] ){
						return; 
					}
				}
				if( nodes[i].nodeType === 1 ){
					this.getNodes( nodes[i] );
				} else if( nodes[i].nodeType === 3 ){
					this.sortNodes( nodes[i] );
				}
			}
		}
	};

	TextWrapper.prototype.sortNodes = function( node ){
		if( !/^\s*$/.test( node.nodeValue ) ){
			if( node.parentNode.childNodes.length === 1 ){
				node.parentNode.innerHTML = this.wrapChars( node.nodeValue );		
			} else {
				var newNode = document.createElement( "words" );
				newNode.innerHTML = this.wrapChars( node.nodeValue );
				return node.parentNode.replaceChild( newNode, node );
			}
		}
	};

	TextWrapper.prototype.wrapChars = function( text ){	
		var words;
		var letters = text.split('');		
		var tagged = [];
		for( var i = 0; i < letters.length; i++ ){		
			var letter;
			if( !/^\s*$/.test(letters[i]) ){ 
				letter = '<character style="display: inline-block;" data-original="' + letters[i] + '">' + letters[i] + '</character>';			
			} else { 
				letter = '<space>&nbsp;</space>';
			}
			tagged.push( letter );
		}
		words = tagged.join('').split('<space>&nbsp;</space>');	
		tagged = [];
		for( var i = 0; i < words.length; i++ ){		
			var word; 
			if( !/^\s*$/.test( words[i]) ){ 
				word = '<word style="white-space: nowrap; display: inline-block;">' + words[i] + '</word>';			
			} else {
				word = words[i];
			}		
			tagged.push( word );
		}

		return tagged.join( ' ' );
	}

	window.TextWrapper = TextWrapper;

})( this, jQuery )