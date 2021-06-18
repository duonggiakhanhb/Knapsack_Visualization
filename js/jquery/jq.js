function jq() {
    $(function () {
        $("#tbl").draggable();
        $('#tbl').bind('wheel mousewheel', function (e) {
            var delta;
            if (e.originalEvent.wheelDelta !== undefined)
                delta = e.originalEvent.wheelDelta;
            else
                delta = e.originalEvent.deltaY * -1;

            if (delta > 0) {
                $(this).css("width", "+=5%");
                $(this).css("height", "+=5%");
            } else {
                $(this).css("width", "-=5%");
                $(this).css("height", "-=5%");
            }
        });
        $('.tbl.value').draggable();
        $('.tbl.value').bind('wheel mousewheel', function (e) {
            var delta;
            if (e.originalEvent.wheelDelta !== undefined)
                delta = e.originalEvent.wheelDelta;
            else
                delta = e.originalEvent.deltaY * -1;

            if (delta > 0) {
                $(this).css("width", "+=5%");
                $(this).css("height", "+=5%");
            } else {
                $(this).css("width", "-=5%");
                $(this).css("height", "-=5%");
            }
        });
        $('.tbl.weight').draggable();
        $('.tbl.weight').bind('wheel mousewheel', function (e) {
            var delta;
            if (e.originalEvent.wheelDelta !== undefined)
                delta = e.originalEvent.wheelDelta;
            else
                delta = e.originalEvent.deltaY * -1;

            if (delta > 0) {
                $(this).css("width", "+=5%");
                $(this).css("height", "+=5%");
            } else {
                $(this).css("width", "-=5%");
                $(this).css("height", "-=5%");
            }
        });
    });

}