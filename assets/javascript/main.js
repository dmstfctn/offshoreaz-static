var zeropad = function( what, toLength ){
	 return Array(Math.max(toLength - String(what).length + 1, 0)).join(0) + what;
}
var makeSlug = function( from ){
	return from.replace( /[^a-zA-Z0-9]/g, '-' ).toLowerCase();
}

var getCountryCode = function( country, _len ){
	var len = _len || 2;
	var c2c = {
		"aruba": {"alpha2" : "AW", "alpha3" : "ABW" },
		"barbados" : {"alpha2" : "BB", "alpha3" : "BRB" },
		"bermuda" : {"alpha2" : "BM", "alpha3" : "BMU" },
		"british virgin islands" : {"alpha2" : "VG", "alpha3" : "VGB" },
		"cayman islands" : {"alpha2" : "KY", "alpha3" : "CYM" },
		"hong kong special administrative region of the people's republic of china" : {"alpha2" : "HK", "alpha3" : "HKG" },
		"republic of cyprus" : {"alpha2" : "CY", "alpha3" : "CYP" },
		"dominican republic" : {"alpha2" : "DO", "alpha3" : "DOM" },
		"gibraltar" : {"alpha2" : "GI", "alpha3" : "GIB" },
		"republic of vanuatu" : {"alpha2" : "VU", "alpha3" : "VUT" },
		"republic of mauritius" : {"alpha2" : "MU", "alpha3" : "MUS" }
	};

	return c2c[ country ][ 'alpha' + len ];
}


var initModeToggle = function(){
	var modes = [
		'information',
		'visuals'
	];
	for( i in modes ){
		(function( mode ){
			$('[data-toggle-mode="' + mode + '"]').click(function(){
				$('body').toggleClass('mode__' + mode );
			});
		})( modes[i] );
	}

	$('body').addClass('mode__visuals' );

};

initModeToggle();

// $('.popup').each(function(){
// 	new Popup( $(this) );
// });

var a = 0;

if( $('.company-listing--listing').length > 0 ){
	$('.listing-search--form').on('submit', function( e ){
		e.preventDefault();
		var data = $('.listing-search--form').serializeArray();
		window.location.pathname = 'listing/search/' + data[0].value;
	});

	// $('.company-listing--listing').DataTable( {
  //      	"ajax": "/?ajax-listing=true",
  //      	"deferRender": true,
  //      	"order": [[ 1, "asc" ]],
  //      	"pageLength": 50,
  //      	"pagingType": "full_numbers",
  //      	"columns": [
  //      		{ "data": "id" },
  //           { "data": "companyName" },
  //           {
  //               "data": function( row, type, set, meta ){
  //                   if( a< 10 ){
  //                       console.log( row );
  //                       a++;
  //                   }
  //                   if(
  //                       parseInt( row.icij_node_id ) !== 0
  //                       || parseInt( row.icij_offshore_leaks ) !== 0
  //                       || parseInt( row.icij_panama_papers ) !== 0
  //                       || parseInt( row.icij_lux_leaks  ) !== 0
  //                   ){
  //                       return true;
  //                   }
  //                   return false;
  //               }
  //           },
  //           {
  //           	"data": function( row, type, set, meta ){
  //           		var d = new Date( row.date );
  //           		if( type === 'sort' ){
  //           			return d.getTime();
  //           		} else {
  //           			return row.date;
  //           		}
  //           	}
  //           },
  //           {
  //           	"data": function( row, type, set, meta ){
  //           		if( type === 'filter' ){
  //           			return row.country;
  //           		} else {
  //           			return row.country;
  //           		}
  //           	}
  //           }
  //       ],
  //       "columnDefs": [
  //        	{
  //           	"targets": [ 0 ],
  //           	"visible": true,
  //           	"render": function( data, type, row ){
  //           		var firstChar = row.companyName[0].toUpperCase();
  //           		if( parseInt( firstChar ) ){
  //           			return "#";
  //           		} else if( firstChar.match(/[A-Z]/) ){
  //           			return firstChar;
  //           		} else {
  //           			return '\u2026';
  //           		}
  //           	}
  //           },
  //       	{
  //       		"targets": [1],
  //       		"render":  function( data, type, row ){
  //                   return '<a href="/' + row.id + '">' + data + '</a>';
  //               }
  //       	},
  //       	{
  //       		"targets": [2],
  //       		"render":  function( data, type, row ){
  //       			return ( data ) ? '<span class="tickmark tickmark__true">true</span>' : '-';
  //               }
  //       	},
  //       	{
  //       		"targets": [3],
  //       		"render":  function( data, type, row ){
  //       			var d = new Date( data );
  //       			return zeropad( d.getDay()+1, 2 )+ '-' + zeropad(d.getMonth() + 1, 2) + '-' + d.getFullYear();
  //               }
  //       	},
  //       	{
  //       		"targets": [4],
  //       		"render":  function( data, type, row ){
  //       			var flag = '<div class="flag">';
  //       			flag += '<img src="/assets/images/flags/' + makeSlug(data) + '.png" alt="">';
	// 				flag += '</div>';
  //                   var name = '<span class="country-name" style="display: none;">' + data + '</span>';
  //       			return name + flag + getCountryCode( data );
  //               }
  //       	},
  //       ]
  //   } );
	// $('.company-listing--listing').on( 'draw.dt', function () {
	//     var rows = $(this).find('tr')
	//     for( var i = rows.length - 1; i >= 0; i-- ){
	//     	var $indexCell = $(rows[i]).children('td:first-child')
	//     	var letter = $indexCell.text();
	//     	var letterPre = $(rows[i-1]).children('td:first-child').text();
	//     	if( letter === letterPre ){
	//     		$indexCell.text('');
	//     	} else {
	//     		$indexCell.html( '<span class="index">' + letter + '</span>' );
	//     	}
	//     }
	// } );
}

if( window.AZ.company ){
	var vis = new Visuals( '#visuals', window.AZ.company, !window.AZ.company.complete );
	vis.run();

	/*
	var falsehoods = []
	$('.truth__false').not('.image').each(function(){
		if( $(this).hasClass('field') ){
			var $falseField = $('.field--value', $(this) );
			var colours = ( Math.random() > 0.5 ) ? vis.gradientColours : vis.titleColours;
			var f = new Falsehood( $falseField, colours );
			falsehoods.push( f );
		}
	});

	// $('.truth__false.image').each(function(){
	// 	var colours = ( Math.random() > 0.5 ) ? vis.gradientColours : vis.titleColours;
	// 	var f = new Falsehood( $(this).children('.secrecy-overlay'), colours );
	// 	falsehoods.push( f );
	// })

	for( var i = 0; i < falsehoods.length; i++ ){
		falsehoods[i].run();
	}
	*/

	(function(){
	    //style bits of the popup
	    var gradSunrise = '45deg, #' + vis.gradientColours[0][0] + ' 0%, #' + vis.gradientColours[1][0] + ' 100%';
	    $('#inquiry-form .colorway__sunrise').css({
	        'background-image': '-moz-linear-gradient(' + gradSunrise + ')',
	        'background-image': '-webkit-linear-gradient(' + gradSunrise + ')',
	        'background-image': 'linear-gradient(' + gradSunrise + ')'
	    });

	    var gradSunset = '45deg, #' + vis.titleColours[0][0] + ' 0%, #' + vis.titleColours[1][0] + ' 100%';
	    $('#inquiry-form .colorway__sunset').css({
	        'background-image': '-moz-linear-gradient(' + gradSunset + ')',
	        'background-image': '-webkit-linear-gradient(' + gradSunset + ')',
	        'background-image': 'linear-gradient(' + gradSunset + ')'
	    });

	    $('.label-withpop').each(function(){
	        $content = $(this).find('.popout .content');
	        $disclaimer = $(this).find('.popout .disclaimer');
	        var rand = Math.random();
	        if( rand > 0.75 ){
	            $content.css('border-color', '#' + vis.gradientColours[0][0] );
	            $disclaimer.css('color', '#' + vis.gradientColours[0][0] );
	        } else if ( rand > 0.5 ){
	            $content.css('border-color', '#' + vis.gradientColours[1][0] );
	            $disclaimer.css('color', '#' + vis.gradientColours[1][0] );
	        } else if( rand > 0.25 ){
	            $content.css('border-color', '#' + vis.titleColours[0][0] );
	            $disclaimer.css('color', '#' + vis.titleColours[0][0] );
	        } else {
	            $content.css('border-color', '#' + vis.titleColours[1][0] );
	            $disclaimer.css('color', '#' + vis.titleColours[1][0] );
	        }
	    });
	})();
}

$('#inquiry-form').on('submit', function( e ){
	e.preventDefault();
	$(this).find('input[name="colours-sunrise"]').attr('value', vis.gradientColours[0][0] + ',' + vis.gradientColours[1][0] )
	$(this).find('input[name="colours-sunset"]').attr('value', vis.titleColours[0][0] + ',' + vis.titleColours[1][0] )
	$.post(
		'/send-inquiry.php',
		$(this).serialize() ,
		function( data ) {
			console.log( 'result', data );
        	$('#inquiry-form').find('.output input').hide();
        	$('#inquiry-form').find('.output').append('<div class="message">' + data.response + '</div>');
        	if( !data.valid ){
        		setTimeout(function(){
        			$('#inquiry-form').animate({'scrollTop': 0 });
        			$('#inquiry-form').find('.output .message').remove();
        			$('#inquiry-form').find('.output input').fadeIn( 200 );
        		}, 2000 )
        	}
		},
		'json' // response format
	);
	return false;
})
