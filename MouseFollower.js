MouseFollower = (function(){
	var store = [],			//contains an object with an element & invert property
		xdeg = ydeg = 0,	//the current rotationAngles of the cube that is currently being handled
		sPos = {},			//relative pos on screen, seen from the document
		invert = 1;			//look to the mouse cursor or away from it

	document.body.onmousemove = followElements;
	
	/* helper functions*/
	function prefixStyle(el,p,style){
		var prefixes = ["webkit","moz","o"],
				i = 0;
		p = p.charAt(0).toUpperCase() + p.slice(1);
		while (prefix = prefixes[i++]){
			el.style[prefix + p] = style;
		}
	}
	function posOnScreen(el){
		return el.getBoundingClientRect();
	}

	/*
		iterate over the store,
		get each element and apply the right rotation angles.
		Invert the view angle if set.
	*/
	function followElements( e ){
		[].forEach.call( store , function(item, index){
			sPos = posOnScreen( item.element );
			/* if the element is in the viewport */
			if( sPos.top > -sPos.height || sPos.top < document.clientHeight + sPos.height){
				invert = item.invert ? -1 : 1;

				xdeg = -120 * invert * ( e.x - sPos.left ) / document.body.clientWidth + "deg";
				ydeg = 270 * invert * ( e.y - sPos.top ) / document.body.clientHeight + "deg";
				prefixStyle(item.element,"transform","rotateY("+xdeg+") rotateX("+ydeg+")");
			}
		});
	}

	/* public methods */
	/*
	add an element to the store.
	usage:
		MouseFollower.add({
			element: document.querySelector(".cube"),
			invert: true
		});
	*/
	function add( opt ){
		if( opt && opt.element ){
			store.push( opt );
		}
	}
	//TODO
	function remove(arguments) {
	}
	function stop() {
		store = [];
	}
	
	return {
		add: add,
		remove: remove,
		stop: stop
	}
})();