//HM-Slider v 2.0
//By: Harold E. Muñoz
var HMSLIDER = {
    local: 0,
    loop: undefined,
    srcs: new Array(),
    style: new Array(),
    index_li: 0,
    wait: 0,
    delay: false,
    delay_finger: true
};

$(function(){    
    var html = '';
    
    $(".hm-slide").each(function (i){
        HMSLIDER['srcs'][i] = $(this).html();

        (i == 0)? HMSLIDER['style'][i] = $(this).prop("class") : HMSLIDER['style'][i] = $(this).prop("class");
        (i == 1)? $(this).attr("id","hm-slide-second"): true; 

        $(this).attr("ondragstart","return false");
        i++;
    });
    
    html = html+'<ul class="hm-slider-ul">';
    for(var j=0;j<=HMSLIDER['srcs'].length-1;j++)
        html = html+'<li class="hm-slider-li"></li>'; 
    html = html+'</ul>'; 
    
    $("#hm-slider").append(html);
    _liSelected($('.hm-slider-li:eq(0)'));
   
    $("#hm-btn-next").click(nextSlide);
    $("#hm-btn-prev").click(prevSlide);
    $(document).on('click','.hm-slider-li',jumpSlide);
    
    HM_SLIDER_PLAY = (HM_SLIDER_PLAY == undefined)? false : HM_SLIDER_PLAY;
    HM_SLIDER_PLAY_TIME = (HM_SLIDER_PLAY_TIME == undefined)? 1 : HM_SLIDER_PLAY_TIME*1000;
    HM_SLIDER_TIME_SLIDE = (HM_SLIDER_TIME_SLIDE == undefined)? 1 : HM_SLIDER_TIME_SLIDE*1000;
    HM_SLIDER_TIME_TEXT = (HM_SLIDER_TIME_TEXT == undefined)? 1 : HM_SLIDER_TIME_TEXT*1000;

    $("#hm-btn-play").click(sliderLoop);
    if($("#hm-btn-play").length) sliderLoop();
		
    //Touch
    $('#hm-slide-primary').on('drag', function(e) {
        if(HMSLIDER['delay_finger']){
            HMSLIDER['delay_finger'] = false;
            var direction = e.direction;
            if(direction > 0){
				nextSlide();
            }else{
				prevSlide();
            }
            var timeoutID = setTimeout(function(){
				HMSLIDER['delay_finger'] = true;
            }, 1000);
        }		
    });
		
});

function nextSlide(){
    if(!HMSLIDER['delay']){
        HMSLIDER['delay'] = true;

        (HMSLIDER['local'] == HMSLIDER['srcs'].length-1)? HMSLIDER['local'] = 0 : HMSLIDER['local']++;
        _liSelected($('.hm-slider-li:eq('+HMSLIDER['local']+')'));
        
        $('#hm-slide-second').html(HMSLIDER['srcs'][HMSLIDER['local']]);
        $('#hm-slide-second .hm-content-text').css('display','none');
        
        $('#hm-slide-primary .hm-content-text').fadeOut(HM_SLIDER_TIME_TEXT,function(){
            $('#hm-slide-primary').fadeOut(HM_SLIDER_TIME_SLIDE,function(){
                
                $('#hm-slide-primary').html(HMSLIDER['srcs'][HMSLIDER['local']]);
                $('#hm-slide-primary .hm-content-text').css('display','none');
                $('#hm-slide-primary').fadeIn(0);
                var timeoutID = setTimeout(function(){
                    $('#hm-slide-primary .hm-content-text').fadeIn("slow");
                    HMSLIDER['delay'] = false;
                }, 200);
            });
        });
    }
}
function prevSlide(){
    if(!HMSLIDER['delay']){
        HMSLIDER['delay'] = true;

        (HMSLIDER['local'] == 0)? HMSLIDER['local'] = HMSLIDER['srcs'].length-1 : HMSLIDER['local']--;
        _liSelected($('.hm-slider-li:eq('+HMSLIDER['local']+')'));
        
        $('#hm-slide-second').html(HMSLIDER['srcs'][HMSLIDER['local']]);
        $('#hm-slide-second .hm-content-text').css('display','none');
        
        $('#hm-slide-primary .hm-content-text').fadeOut(HM_SLIDER_TIME_TEXT,function(){
            $('#hm-slide-primary').fadeOut(HM_SLIDER_TIME_SLIDE,function(){
                $('#hm-slide-primary').html(HMSLIDER['srcs'][HMSLIDER['local']]);
                $('#hm-slide-primary .hm-content-text').css('display','none');
                $('#hm-slide-primary').fadeIn(0);
                var timeoutID = setTimeout(function(){
                    $('#hm-slide-primary .hm-content-text').fadeIn("slow");
                    HMSLIDER['delay'] = false;
                }, 200);
            });
        });
    }
}
function _liSelected(_element){
    $('.hm-slider-li').removeClass("li-selected");
    _element.addClass("li-selected");
}
function jumpSlide(){
    if(!HMSLIDER['delay']){
        HMSLIDER['delay'] = true;

        HMSLIDER['local'] = $(this).index();
        _liSelected($(this));
        
        $('#hm-slide-second').html(HMSLIDER['srcs'][HMSLIDER['local']]);
        $('#hm-slide-second .hm-content-text').css('display','none');
        
        $('#hm-slide-primary .hm-content-text').fadeOut(HM_SLIDER_TIME_TEXT,function(){
            $('#hm-slide-primary').fadeOut(HM_SLIDER_TIME_SLIDE,function(){
                
                $('#hm-slide-primary').html(HMSLIDER['srcs'][HMSLIDER['local']]);
                $('#hm-slide-primary .hm-content-text').css('display','none');
                $('#hm-slide-primary').fadeIn(0);
                var timeoutID = setTimeout(function(){
                    $('#hm-slide-primary .hm-content-text').fadeIn("slow");
                    HMSLIDER['delay'] = false;
                }, 200);
            });
        });
    }
}
function sliderLoop(){
    if(HM_SLIDER_PLAY == true){
        HMSLIDER['loop'] = setInterval('nextSlide()',HM_SLIDER_PLAY_TIME);
        HM_SLIDER_PLAY = false;
        $('#play').html('||');
    }else{
        clearInterval (HMSLIDER['loop']);
        HM_SLIDER_PLAY = true;
        $('#play').html('>');
    }
}