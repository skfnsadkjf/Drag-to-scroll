const multiplier = 8; // scroll this many pixels for each pixel worth of mouse movement.
const IGNORE_TAGS = ["SELECT" , "AUDIO" , "VIDEO" , "INPUT" , "TEXTAREA"];
let dragMode = true;
let mouseMoved = false;
const dragging = ( e ) => {
	mouseMoved = true;
	if ( dragMode ) {
		window.scrollBy( e.movementX * multiplier * -1 , e.movementY * multiplier * -1 );
	}
}
const mousedown = ( e ) => {
	if ( e.button == 0 && !IGNORE_TAGS.includes( e.target.tagName ) ) {
		document.addEventListener( "mousemove" , dragging , true );
		mouseMoved = window.getSelection().toString() != "" && e.target.tagName != "A"; // Assumes user is trying to deselect text instead of change modes. The mouse didn't move.
	}
}
const mouseup = ( e ) => {
	if ( e.button == 0 ) {
		document.removeEventListener( "mousemove" , dragging , true );
		if ( !mouseMoved && e.target.tagName != "A" && !IGNORE_TAGS.includes( e.target.tagName ) ) { // <a> tag check for when clicking a link opens a new tab and you want to stay in drag mode in existing tab.
			dragMode = e.explicitOriginalTarget.nodeType != 3; // 3 represents a text node.
		}
	}
}
const selectOrDragStart = ( e ) => {
	if ( dragMode ) {
		e.preventDefault();
	}
}
const click = ( e ) => {
	if ( mouseMoved && e.button == 0 ) {
		e.stopPropagation();
		e.preventDefault();
	}
	mouseMoved = false;
}
document.addEventListener( "mousedown" , mousedown , true );
document.addEventListener( "mouseup" , mouseup , true );
document.addEventListener( "selectstart" , selectOrDragStart , true );
document.addEventListener( "dragstart" , selectOrDragStart , true );
document.addEventListener( "click" , click , true );
