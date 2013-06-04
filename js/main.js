(function($) {


    var tmplt = {
        test: [
            '<div class="widget" data-name="${name}">',
            '<span class="icon"></span> ${name}',
            '<ul id="out${name}"></ul>',
            '</div>'
        ].join(""),
        message: [
            '<li class="cf">',
            '<div class="fl sender">${sender}: </div><div class="fl text">${text}</div>',
            '</li>'
        ].join(""),
        term: [
            '<div class="widget" id="${name}" data-name="${name}">',
            '</div>'
        ].join("")
    };

    function bindDOMEvents(){

        $('#btnMakeDiv').on('click', function(){
            makeDiv('test');
        });

        $('#btnMakeDivTerm').on('click', function(){
            loadCSS('widgets/termlib/term_styles.css');
            $.getScript('widgets/termlib/termlib_min.js').done(function(script,textStatus) {
                $.getScript('widgets/termlib/termlib_parser_min.js').done(function(script,textStatus) {
                    $.getScript('widgets/termlib/termwidget.js').done(function(script,textStatus) {
                        termOpen(makeDiv('term'));
                    });
                });
            });
        });


    }

    function loadCSS(url) {

        if(document.createStyleSheet) {
            try { document.createStyleSheet(url); } catch (e) { }
        }
        else {
            var css;
            css         = document.createElement('link');
            css.rel     = 'stylesheet';
            css.type    = 'text/css';
            css.media   = "all";
            css.href    = url;
            document.getElementsByTagName("head")[0].appendChild(css);
        }
    }

    sockmger = {} ;

    var i=0;
    function  makeDiv(type) {
        //alert('hi');
        var _name = type + i++;
        var $html = $.tmpl(tmplt[type], {
            name: _name
        });

        sockmger[_name] = io.connect('http://localhost:8080/' + type)  ;

        sockmger[_name].on('connect', function () {
            log('connect',_name);
            sockmger[_name].emit('hi im ' + _name);
        });
        sockmger[_name].on('item', function (data) {
            log('news',_name);
            sockmger[_name].emit('woot');
            var $news = $.tmpl(tmplt.message, {
                sender: _name,
                text: data.news
            });
            $news.appendTo('#out'+_name);
        });

        $html.appendTo('#content');
        return _name;

    }

    function log(msg,from) {
        var $log = $.tmpl(tmplt.message, {
            sender: from,
            text: msg
        });
        $log.appendTo('#log');
    }


    $(function(){
        bindDOMEvents();
    });


}(jQuery));
