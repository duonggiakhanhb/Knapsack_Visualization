$(document).on('input', '.input-status', function() {
    changeStatus();
});

$('.back').on( 'click', () => {
    if(tracer.pivot==1) return;
    changeStatus(-1);
});

$('.forward').on('click', () => {
    if(tracer.pivot==tracer.display.length-1) return;
    changeStatus(1);
});

$('.btn.generate-input').click(() => {
    N = parseInt($('.input.-N').val());
    W = parseInt($('.input.-W').val());
    clear();
});

$('.btn.generate').click(() => {
    clear();
    knapsack(0, 0);

});

$('.play').on('click', () => {
    if(!play) {
        clearInterval(tracer.interval);
        $('.play span').text('Play');
        play = !play;
    }
    else {
        $('.play span').text('Pause');
        play = !play;
        tracer.renderTracer();
    }
});

$('.speed-slider').on('input', async () => {
    var val = $('.speed-slider').val();
    $('.speed-value').html('Delay: ' + val);
    await new Promise(resolve => setTimeout(resolve, 100));
    clearInterval(tracer.interval);
    tracer.ms = val;
    if(!play) tracer.renderTracer();
});

function changeStatus(changed= 0){
    var max = $('.input-status').prop('max');
    var val = $('.input-status').val()*1 + changed;
    $('.input-status').val(val);
    var width = val / max * 100;

    $('.status-value').html( (val) + '/' + (max *1) );
    $('.input-status').css('background', `linear-gradient(270deg, #666666 ${100-width}%, #FFED50 0%)`);
    tracer.pivot = val;
    tracer.displayCurrent(tracer.hmtlTrace[tracer.pivot]);
    play = true;
    $('.play span').text('Play');

}




