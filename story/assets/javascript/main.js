var TOWEL_VISIBLE = false;
var TOWEL_SIDE = false;
var TOWEL_ZOOM = false;

var hideTowels = function(){
  $('html').removeClass( 'towels-visible' );
  $('.towel').css({
    'background-image': ''
  });
  $('.towel').hide();
  $('.towel img').hide();
  TOWEL_VISIBLE = false;
  TOWEL_ZOOM = false;
};

var showTowels = function( src ){
  $('html').addClass( 'towels-visible' );
  $('.towel img').hide();
  $('.towel').show();
  $('.towel img[src="' + src + '"]').show();
}

var zoomTowelIn = function( src ){
  var assumedSrc = ( TOWEL_SIDE === 'front' ) ? $('.towel .front').attr('src') : $('.towel .back').attr('src');
  if( $(window).height() > 1000 ){
    assumedSrc = ( TOWEL_SIDE === 'front' ) ? $('.towel .front').attr('data-zoom-src') : $('.towel .back').attr('data-zoom-src');
  }
  var src = src || assumedSrc;
  $('.towel').css({
    'background-image': 'url(' + src + ')'
  }).addClass('zoomed-in');
  TOWEL_ZOOM = true;
}
var zoomTowelOut = function(){
  $('.towel').css({
    'background-image': ''
  }).removeClass('zoomed-in');
  if( TOWEL_SIDE === 'front' ){
    $('.towel img.front').show();
  } else {
    $('.towel img.back').show();
  }
  TOWEL_ZOOM = false;
}

hideTowels();

$('.link-towel .visibility').click(function(){
  if( TOWEL_VISIBLE ){
    hideTowels();
  }
});
$('.towel').click(function(){
  // if( TOWEL_ZOOM ){
  //   zoomTowelOut();
  // } else {
    hideTowels();
  //}
});

$('.link-towel a').click(function( e ){
  e.preventDefault();
  if( $(this).hasClass('link-towel-front') ){
    if( TOWEL_VISIBLE && TOWEL_SIDE === 'front' && !TOWEL_ZOOM ){
      zoomTowelOut();
      hideTowels();
      return false;
    }
    TOWEL_SIDE = 'front';
  } else{
    if( TOWEL_VISIBLE && TOWEL_SIDE === 'back' && !TOWEL_ZOOM  ){
      zoomTowelOut();
      hideTowels();
      return false;
    }
    TOWEL_SIDE = 'back';
  }
  if( $(this).hasClass('link-towel-front') ){
    TOWEL_SIDE = 'front';
  } else {
    TOWEL_SIDE = 'back';
  }
  if( TOWEL_ZOOM ){
    zoomTowelIn();
  } else {
    zoomTowelOut();
    showTowels( $(this).attr('href') ) ;
  }
  if( !TOWEL_VISIBLE ){
    TOWEL_VISIBLE = true;
  }
  return false;
});

$('.link-towel a').mouseover(function(){
  if( TOWEL_ZOOM ){
    $('.towel').css({
      'background-image': 'url(' + $(this).attr('href') + ')'
    });
  }
});

$('.towel').mousemove(function( e ){
  if( TOWEL_ZOOM ){
    var parentOffset = $(this).offset();
    var relY = e.pageY - parentOffset.top;
    var h = $(this).height();
    $(this).css({
      'background-position': '0%' + (relY / h) * 100 + '%'
    });
  }
});

$('.towel img').mouseover(function(){
  //$('.towel img').css('object-fit', 'cover')
  if( TOWEL_VISIBLE && !TOWEL_ZOOM ){
    zoomTowelIn();
    $(this).fadeOut(100);
  }
});

$('.link-towel').mouseleave(function(){
  if( !TOWEL_VISIBLE ){
    $('.towel').hide();
    $('.towel img').hide();
  }
});

$('.link-person').each(function(){
  var text = $(this).text();
  var first = text.charAt(0);
  var rest = text.slice( 1, text.length );
  $(this).html( '<span class="first-letter">' + first + '</span>' + rest );
});

$('.link-person').click(function(e){
  e.preventDefault();
  return false;
});

$('.link-person').mouseover(function( e ){
  var $target = $('img[src="' + $(this).attr('href') + '"].person');
  var offset = $(this).find('.first-letter').position();
  $('.person').hide();
  $target.show();
  $target.css({
    'top': offset.top,
    'left': offset.left
  });
});

$('.link-person').mouseout(function(){
  $('.person').hide();
});
