
var MAXTIME = Number.MAX_VALUE;
var val = [3, 7, 2, 9];
var wt = [2, 2, 4, 5];
var W = 10;
var N = 4;
var tracer = new Tracer();
var play = true;


// creating all cells
function createMatrix(){
    // get the reference for the body
    var matrix = document.getElementById("matrix");

    // creates a <table> element and a <tmatrix> element
    var tbl = document.createElement("table");
    tbl.setAttribute('id', "tbl");
    tbl.setAttribute('class', "tbl");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i <= N+1; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.setAttribute("id", 'r-'+i);
        row.setAttribute("class", 'row '+i);
        for (var j = 0; j <= W + 1; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i+'-'+j);
            cell.setAttribute("class", 'cell ' + i+'-'+j);
            var cellText = document.createTextNode('0');

            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body

        tblBody.appendChild(row);
    }

// put the <tbody> in the <table>
    tbl.appendChild(tblBody);
// appends <table> into <body>
    matrix.appendChild(tbl);

    for(var i=0; i <= W+1; i++ ) {
        var get = tblBody.getElementsByClassName('row 0')[0];
        get = get.getElementsByClassName('cell')[i];
        get.style.cssText = 'border: none; background: none';
        get.innerHTML = i-1;
    }
    for(var i=0; i <= N+1; i++ ) {
        var get = tblBody.getElementsByClassName(`row ${i}`)[0];
        get = get.getElementsByClassName('cell')[0];
        get.style.cssText = 'border: none; background: none';
        get.innerHTML = i-1;
    }
    $('#0-0').empty();
}
function createValue(){
    var tblVal = document.getElementById('val');
    var tbl = document.createElement("table");
    tbl.setAttribute('class', "tbl value");
    var tblBody = document.createElement("tbody");
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id", 'v-r');
    row.setAttribute("class", 'row');
    for (var i = 0; i < N; i++) {
        var cell = document.createElement("td");
        cell.setAttribute("id", 'v-'+i);
        cell.setAttribute("class", 'cell');
        cell.innerHTML = i+1;

        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    delete row;
    var row = document.createElement("tr");
    row.setAttribute("id", 'v-r-v');
    row.setAttribute("class", 'row');
    for (var i = 0; i < N; i++) {
        var cell = document.createElement("td");
        var input = document.createElement('input');
        input.id = 'v-i-'+ i;
        input.type = "text";
        input.value = val[i] ?? 0;
        cell.appendChild(input);
        cell.setAttribute("id", 'v-c-'+i);
        cell.setAttribute("class", 'cell');
        /*var cellText = document.createTextNode(val[i]);
        cell.appendChild(cellText);*/
        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    tblVal.appendChild(tbl);
    for(var i=0; i < N; i++ ) {
        $(`#v-${i}`).css({
            'border': 'none',
            'background': 'none',
        });
    }

}

function createWeight(){
    var tblVal = document.getElementById('wei');
    var tbl = document.createElement("table");
    tbl.setAttribute('class', "tbl weight");
    var tblBody = document.createElement("tbody");
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id", 'w-r');
    row.setAttribute("class", 'row');
    for (var i = 0; i < N; i++) {
        var cell = document.createElement("td");
        cell.setAttribute("id", 'w-'+i);
        cell.setAttribute("class", 'cell');
        cell.innerHTML = i+1;
        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    delete row;
    var row = document.createElement("tr");
    row.setAttribute("id", 'w-r-w');
    row.setAttribute("class", 'row');
    for (var i = 0; i < N; i++) {
        var cell = document.createElement("td");
        var input = document.createElement('input');
        input.type = "text";
        input.id = 'w-i-'+ i;
        input.value = wt[i] ?? 0;
        cell.appendChild(input);
        cell.setAttribute("id", 'w-c-'+i);
        cell.setAttribute("class", 'cell');

        /*var cellText = document.createTextNode(wt[i]);
        cell.appendChild(cellText);*/
        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    tblVal.appendChild(tbl);
    for(var i=0; i < N; i++ ) {
        $(`#w-${i}`).css({
            'border': 'none',
            'background': 'none',
        });
    }

}

function createTableSelected(){
    $('.tbl.result').empty();
    var tbl = document.createElement('tbl');
    var tblBody = document.createElement('tbody');
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var text = document.createTextNode('Profit');
    cell.appendChild(text);
    row.appendChild(cell);
    delete cell;
    delete text;
    var text = document.createTextNode('Weight');
    var cell = document.createElement('td');
    cell.appendChild(text);
    row.appendChild(cell);
    delete cell;
    delete text;
    var text = document.createTextNode('Value');
    var cell = document.createElement('td');
    cell.appendChild(text);
    row.appendChild(cell);
    tblBody.appendChild(row);

    for (var i=0; i<tracer.selected.length; i++){
        delete row;
        delete cell;
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.innerHTML = tracer.selected[i];
        row.appendChild(cell);
        delete cell;
        var cell = document.createElement('td');
        cell.innerHTML = wt[tracer.selected[i]-1];
        row.appendChild(cell);
        delete cell;
        var cell = document.createElement('td');
        cell.innerHTML = val[tracer.selected[i]-1];
        row.appendChild(cell);
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.getElementsByClassName('tbl result')[0].appendChild(tbl);
}

function getValue(){
    N = parseInt($('.input.-N').val());
    W = parseInt($('.input.-W').val());
    wt = [];
    val = [];
    for(var i = 0; i<N; i++){
        val.push($(`#v-i-${i}`).val());
        wt.push($(`#w-i-${i}`).val());
    }
}

function knapsack(i, j){
    tracer.delay();
    tracer.delay();
    var temp = i;
    for (; i < N + 1; i++) {
        tracer.DP[i] = new Array(W + 1);
        for (; j < W + 1; j++) {
            tracer.DP[i][j] = 0;
        }
        j=0;
    }
i = temp;
    for ( ;i <= N; i++) {
        for (; j <= W; j++) {
            if (i === 0 || j === 0) {
                /*
                If we have no items or maximum weight we can take in collection is 0
                then the total weight in our collection is 0
                */
                tracer.DP[i][0] = 0;
                // visualize {
                tracer.patch(i, j, tracer.DP[i][j]);
                tracer.delay();
                tracer.dePatch(i, j);
                // }
            } else if (wt[i - 1] <= j) { // take the current item in our collection
                // visualize {
                tracer.selectWaV(i - 1, 1);
                tracer.selectWaV(i - 1, 0);
                tracer.delay();
                tracer.select(i - 1, j - wt[i - 1]);
                tracer.select(i - 1, j);
                tracer.delay();
                // }
                const A = parseInt(val[i - 1]) + parseInt(tracer.DP[i - 1][j - wt[i - 1]]);
                const B = parseInt(tracer.DP[i - 1][j]);
                /*
                find the maximum of these two values
                and take which gives us a greater weight
                 */
                if (A > B) {
                    tracer.DP[i][j] = A;
                    // visualize {
                    tracer.patch(i, j, tracer.DP[i][j]);
                    tracer.delay();
                    // }
                } else {
                    tracer.DP[i][j] = B;
                    // visualize {
                    tracer.patch(i, j, tracer.DP[i][j]);
                    tracer.delay();
                    // }
                }
                // visualize {
                // opt subproblem depatch
                tracer.dePatch(i, j);
                tracer.deSelect(i - 1, j);
                tracer.deSelect(i - 1, j - wt[i - 1]);
                tracer.deSelectWaV(i - 1, 1);
                tracer.deSelectWaV(i - 1, 0);
                // }
            } else { // leave the current item from our collection
                tracer.DP[i][j] = tracer.DP[i - 1][j];
                // visualize {
                tracer.patch(i, j, tracer.DP[i][j]);
                tracer.delay();
                tracer.dePatch(i, j);
                // }
            }
        }
        j=0;
    }
    i=N; j=W;
    while(tracer.DP[i][j] != 0){
        if(tracer.DP[i][j] != tracer.DP[i-1][j]){
            j-=wt[i-1];
            tracer.selected.push(i);
            i--;
        }
        else {
            i--;
        }
    }

    createTableSelected();
    $('.input-status').prop('max', tracer.display.length-1);
    $('.status-value').html(1 +'/'+ (tracer.display.length -1));
    $('.result-text').html('Result: '+ tracer.DP[N][W]);
    $('.input-status').val(0);
}

function clear(){
    $('.tbl.matrix').empty();
    createValue();
    createWeight();
    getValue();
    $('#val').empty();
    $('#wei').empty();

    createValue();
    createWeight();
    getValue();
    createMatrix();

    tracer.clear();

}
$('.input.-N').val(N);
$('.input.-W').val(W);
clear();
knapsack(0,0);
jq();

