export function Svg() {

    let file = "./img/svg/icons.svg",
        revision = 123

    if( !document.createElementNS || !document.createElementNS( "http://www.w3.org/2000/svg", "svg" ).createSVGRect ) {
        return true
    }

    let isLocalStorage = !!(window["localStorage"]),
        request,
        data,
        insertIT = function () {
            document.body.insertAdjacentHTML( "beforeend", data )
        },
        insert = function () {
            if (document.body) insertIT()
            else document.addEventListener( "DOMContentLoaded", insertIT )
        }

    if ( isLocalStorage && localStorage.getItem( "inlineSVGrev" ) === revision ) {
        data = localStorage.getItem( "inlineSVGdata" )

        if (data) {
            insert()
            return true
        }
    }

    try {
        request = new XMLHttpRequest()
        request.open( "GET", file, true )
        request.onload = function () {
            if ( request.status >= 200 && request.status < 400 ) {
                data = request.responseText
                insert()
                if ( isLocalStorage ) {
                    localStorage.setItem( "inlineSVGdata", data )
                    localStorage.setItem( "inlineSVGrev", revision )
                }
            }
        }
        request.send()
    } catch(e) {}

}


