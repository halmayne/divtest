/**
 * User: halmayne
 * Date: 6/3/13
 * Time: 1:42 PM
 */
var term;
var term_welcome = [' ',
                    'Welcome'
];

var _name ='';

function termOpen(divname) {

    if ((!term) || (term.closed)) {
        _name=    divname;
        term = new Terminal(
            {
                x: 0,
                y: 0,
                termDiv: divname,
                bgColor: '#232e45',
                greeting: term_welcome.join('%n'),
                handler: termHandler,
                exitHandler: termExitHandler,
                wrapping: true,
                cols: 80,
                rows: 24
            }
        );
        term.open();


    }
}

function termExitHandler() {

}

var term;

function termHandler() {
    // default handler + exit
    this.newLine();
    term=this;

    if (this.lineBuffer != '') {
        // echo with write for wrapping, but escape any mark-up
        this.write('You wrote: '+this.lineBuffer.replace(/%/g, '%%'));
        this.newLine();

        sockmger[_name].emit('line',{ line: this.lineBuffer }, function(data) {

            term.write(data);
            term.prompt();
        });

    }


}
