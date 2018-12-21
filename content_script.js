var x , xStart , y , yStart;
var multiplier = 8;
var mode = "drag";
function stop( e ) { e.stopPropagation(); e.preventDefault(); }
function mouseMoved() { return ( x != xStart || y != yStart ) }
function dragging( e ) {
	window.scrollBy( ( x - e.screenX ) * multiplier , ( y - e.screenY ) * multiplier )
	x = e.screenX ,	y = e.screenY;
}
function mousedown( e ) {
	if ( e.button != 0 ) return;
	var setMode = ( x == e.screenX && y == e.screenY && e.explicitOriginalTarget.nodeType != 3) // these tests needs to be done now, but mode needs to be set later
	x = xStart = e.screenX , y = yStart = e.screenY;
	if ( ["select","audio","video","input","textarea"].includes( e.target.tagName.toLowerCase() ) ) return;
	if ( setMode ) mode = "drag";
	if ( mode == "drag" ) document.addEventListener( "mousemove" , dragging , true );
}
function mouseup( e ) {
	document.removeEventListener( "mousemove" , dragging , true );
	if ( !mouseMoved() && "a" != e.target.tagName.toLowerCase() ) {
		if ( e.explicitOriginalTarget.nodeType == 3 || ["input","textarea"].includes( e.target.tagName.toLowerCase() ) ) { // nodeType 3 is TEXT_NODE
			mode = "normal";
		}
	}
}
document.addEventListener( "mousedown" , mousedown , true );
document.addEventListener( "mouseup" , mouseup , true );
document.addEventListener( "selectstart" , ( e => { if ( mode == "drag" ) e.preventDefault() } ) );
document.addEventListener( "dragstart" , ( e => { if ( mode == "drag" ) e.preventDefault() } ) );
document.addEventListener( "click" , ( e => { if ( mouseMoved() && e.button == 0 ) stop( e ) } ) , true );