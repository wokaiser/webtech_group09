function getMinMarge( newItems ) {
    var center  = newItems.eq(0).outerWidth(true) + (newItems.eq(1).outerWidth(true) / 2);
    var minMarg = ($(window).width() / 2) - center;
    
    return minMarg;
}
function showTitle( item ) {
    $('#title').html( item.attr( 'alt' ) );
}
$(function() {
    $('#carousel').carouFredSel({
        width: 10000,	//	should be wide enough ;)
        height: 790,
        align: false,
        circular: false,
        infinite: false,
        items: 3,
        prev: '#prev',
        next: '#next',
        auto: false,
        scroll: {
            items: 1,
            duration: 1000,
            onBefore: function( data ) {
                $(this).parent().animate({
                    'marginLeft': getMinMarge( data.items.visible )
                }, data.scroll.duration);
                data.items.old.eq(1).animate({
                    'opacity': 0.2
                }, data.scroll.duration);
                data.items.visible.eq(1).animate({
                    'opacity': 1
                }, data.scroll.duration);
                showTitle( data.items.visible.eq(1) );
            }
        },
        onCreate: function( data ) {
            $(this).parent().css({
                'marginLeft': getMinMarge( data.items )
            });
            $(this).children().not(':eq(1)').css({
                'opacity': 0.2
            });
            showTitle( data.items.eq(1) );
        }
    });
});