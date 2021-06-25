
class Tracer {
    constructor() {
        this.state = {};
        this.DP = new Array(N+1);
        this.interval = null;
        this.display = [];
        this.pivot = 1;
        this.hmtlTrace = [];
        this.ms = 500;
        this.selected = [];
    }
    select(i, j){
        $(`#${i+1}-${j+1}`).css('background-color', '#2962ff');
        if( typeof this.state.select === 'undefined') this.state.select = [];
        this.state.select.push([ i, j ]);
    }
    deSelect(i, j){
        $(`#${i+1}-${j+1}`).css('background-color', '#393939');
        if( typeof this.state.deSelect === 'undefined') this.state.deSelect = [];
        this.state.deSelect.push([ i, j ]);
    }
    patch(i, j, value){
        $(`#${i+1}-${j+1}`).css('background-color', '#c51162').html(value);
        if( typeof this.state.patch === 'undefined') this.state.patch = [];
        this.state.patch.push( [ i, j, value ] );
    }
    dePatch(i, j){
        $(`#${i+1}-${j+1}`).css('background-color', '#393939');
        if( typeof this.state.dePatch === 'undefined') this.state.dePatch = [];
        this.state.dePatch.push( [ i, j ] );
    }
    selectWaV(i, type){
        var temp;
        if(type == 1) temp = 'w';
        else temp = 'v';
        $(`#${temp}-c-${i}`).css('background-color', '#2962ff');
        if( typeof this.state.selectWaV === 'undefined') this.state.selectWaV = [];
        this.state.selectWaV.push([ i, type ]);
    }
    deSelectWaV(i, type){
        var temp;
        if(type == 1) temp = 'w';
        else temp = 'v';
        $(`#${temp}-c-${i}`).css('background-color', '#393939');
        if( typeof this.state.deSelectWaV === 'undefined') this.state.deSelectWaV = [];
        this.state.deSelectWaV.push([ i, type ]);
    }
    zeroCell(i,j){
        $(`#${i+1}-${j+1}`).css('background-color', '#c51162').html('0');
    }

    delay() {
        this.display.push(this.state);
        this.state = {};
        this.hmtlTrace.push([
            document.getElementById('tbl').cloneNode(true),
            document.getElementsByClassName('tbl value')[0].cloneNode(true),
            document.getElementsByClassName('tbl weight')[0].cloneNode(true)
        ]);
    }

    displayCurrent(dp){
        if(this.interval != null) clearInterval(this.interval);

        dp[0].style.cssText = document.getElementById('tbl').style.cssText;
        dp[1].style.cssText = document.getElementsByClassName('tbl value')[0].style.cssText;
        dp[2].style.cssText = document.getElementsByClassName('tbl weight')[0].style.cssText;

        document.getElementById('matrix').innerHTML = '';
        document.getElementById('val').innerHTML = '';
        document.getElementById('wei').innerHTML = '';

        document.getElementById('matrix').appendChild(dp[0]);
        document.getElementById('val').appendChild(dp[1]);
        document.getElementById('wei').appendChild(dp[2]);
        jq();
    }

    runDP(dp){
        for ( const [ key, value ] of Object.entries(dp)){
            for (var i=0; i<value.length; i++){
                var func ='this.' + key + `(${value[i]})`;
                eval(func);
            }
        }
    }

    renderTracer(){
        if(this.pivot >= this.display.length) return true;

        if(this.displayCurrent(this.hmtlTrace[this.pivot])) return;

        this.interval = setInterval(() => {
            if(this.pivot >= this.display.length) {
                play = true;
                $('.play span').text('Play');
                return;
            }
            this.runDP(this.display[this.pivot]);
            var max = $('.input-status').prop('max');
            $('.input-status').val(this.pivot);
            var width = this.pivot / max * 100;
            $('.status-value').html( (this.pivot) + '/' + (max *1) );
            $('.input-status').css('background', `linear-gradient(270deg, #666666 ${100-width}%, #FFED50 0%)`);
            this.pivot++;
        }, this.ms);
    }
    clear(){
        if(this.interval != null) clearInterval(this.interval);
        this.state = {};
        this.DP = new Array(N+1);
        this.interval = null;
        this.display = [];
        this.pivot = 0;
        this.hmtlTrace = [];
        this.selected = [];
    }
}