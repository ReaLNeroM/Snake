document.onkeydown = function (e) {
	var keys = {
		40: 'down',
		38: 'up',
		39: 'right',
		37: 'left'
	};

	dir = -1;
	if(keys[e.keyCode] == 'down'){
		dir = 0;
	} else if(keys[e.keyCode] == 'up'){
		dir = 1;
	} else if(keys[e.keyCode] == 'right'){
		dir = 2;
	} else if(keys[e.keyCode] == 'left'){
		dir = 3;
	}
};