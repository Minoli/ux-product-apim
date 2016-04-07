$(window).load(function(){

    var animating = false;
    var menu = 'navigation';

    $(".navigation ul li").not('.navigation ul li ul li').click(function(e){
        e.preventDefault();

        if(animating){
            return;
        }

        var delay = 0,
            el = $(this),
            color = $(this).find('.left-menu-item').css('background-color'),
            prev = $(".navigation ul li:first"),
            distance = el.offset().top  - $(".navigation").offset().top,
            isLastElClicked = el.next().length <= 0,
            hasSubMenu = el.find('.sublevel-menu').length == 1,
            isActiveItem = el.hasClass('active');

        if($('.sublevel-menu').is(':visible')){
            $('.sublevel-menu').slideUp(function(){
                $(this).parent().find('.left-menu-item i').removeClass('fw-up').addClass('fw-down');
            });
            delay = 700;
        }

        if(isActiveItem && hasSubMenu){
            if(el.find('.sublevel-menu').is(':visible')){
                el.find('.sublevel-menu').slideUp(function(){
                    el.find('.left-menu-item i').removeClass('fw-up').addClass('fw-down');
                });
            }else{
                el.find('.sublevel-menu').slideDown(function(){
                    el.find('.left-menu-item i').removeClass('fw-down').addClass('fw-up');
                });
            }
            return;
        }

        if (el.prev().length > 0) {
            animating = true;
            $(el).find('.left-menu-item').css('background-color',color);
            $.when(
                el.delay(delay).animate({
                    top: -distance + 'px'
                },{
                    duration:0,
                    step:function(now,fx){
                        if(now == 0){
                            fx.end = -($(fx.elem).offset().top  - $(".navigation").offset().top);
                        }
                    }
                })
            ).done(function () {
                el.is(':hidden') ? el.show():'';
                el.insertBefore(prev).css('top','0px').addClass('active');
                el.find('.left-menu-item').removeAttr('style');
                if(isLastElClicked){
                    prev.removeClass('active');

                }else{
                    prev.removeClass('active');
                }
                animating = false;

                if(hasSubMenu){
                    el.find('.sublevel-menu').slideDown(function(){
                        el.find('.left-menu-item i').removeClass('fw-down').addClass('fw-up');
                    });
                }

                setTimeout(function(){
                    //location.replace(el.attr('href'));
                },500)

            });
        }
    }).children('.sublevel-menu').find('li').click(function(e){
        e.stopImmediatePropagation();
    });

    if(!$('.navigation ul li.active').is(':first-child')){
        !$('.navigation ul li.active').trigger('click');
    }
    
});