var board_y = document.getElementById('size').value * 2, board_x = board_y;
var cell_size = 1000 / board_x;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ay = [1, -1, 0, 0];
var ax = [0, 0, 1, -1];

var snake = [];

var apple_y, apple_x;
var snake_y, snake_x;
var dir;

function place_apple(){
	var good = 0;

	var new_y, new_x;

	if(snake.length == board_y * board_x){
		//this rectangle is filled so that the worm actually fills the board at the end of the game
		ctx.fillStyle = 'red';
		ctx.fillRect(Math.round(apple_x * cell_size), Math.round(apple_y * cell_size), Math.round(cell_size), Math.round(cell_size));
		
		alert('Damn son');
		init();
	}

	while(good == 0){
		good = 1;
		new_y = Math.floor(Math.random() * board_y);
		new_x = Math.floor(Math.random() * board_x);

		for(var i = 0; i < snake.length; i++){
			if(snake[i][0] == new_y && snake[i][1] == new_x){
				good = 0;
			}
		}
	}

	apple_y = new_y;
	apple_x = new_x;
}

function wait_time_for_board(size){
	if(document.getElementById('auto').checked){
		//this option puts a theoretical upper bound on the time taken by the auto-snake
		//although in practice, the main loop significantly slows down the game
		//this is way too fast for playing on big boards
		return Math.round(2500 / (size * size));
	} else {
		return Math.round(2500 / (size));
	}

}
function init(){
	snake = [];

	apple_y = -1, apple_x = -1;
	snake_y = Math.round(board_y / 2 - 1), snake_x = Math.round(board_x / 2 - 1);
	dir = 0;

	place_apple();
}

init();

main();

function main(){
	snake_y += ay[dir];
	snake_x += ax[dir];

	snake.push([snake_y, snake_x]);

	if(0 > snake_y || 0 > snake_x || snake_y >= board_y || snake_x >= board_x){
		alert('LOSE');
		init();
	} else if(snake_y == apple_y && snake_x == apple_x){
		place_apple();
	} else if(snake.length > 1){
		snake.shift();
	}

	if(document.getElementById('overlap-death').checked){
		for(var i = 0; i < snake.length - 1; i++){
			if(snake[i][0] == snake_y && snake[i][1] == snake_x){
				alert('LOSE');
				init();
			}
		}
	}

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, Math.round(board_y * cell_size), Math.round(board_x * cell_size));

	ctx.fillStyle = 'green';
	ctx.fillRect(Math.round(apple_x * cell_size), Math.round(apple_y * cell_size), Math.round(cell_size), Math.round(cell_size));

	if(document.getElementById('auto').checked){
		if(snake_y == 0 && snake_x == 0){
			dir = 2;
		} else if(snake_x == 0){
			dir = 1;
		} else if(snake_y == board_y - 1){
			dir = 3;
		} else if(snake_x == 1 && snake_y % 2 == 1){
			dir = 0;
		} else if(snake_x == board_x - 1 && snake_y % 2 == 0){
			dir = 0;
		} else if(snake_y % 2 == 0){
			dir = 2;
		} else {
			dir = 3;
		}
	}


	for(var i = 0; i < snake.length; i++){
		var s = '#';
		var i_replacement = 256 - 10 * (snake.length - i);
		i_replacement = Math.max(i_replacement, 0);
		s += i_replacement.toString(16);
		s += '0000';
		ctx.fillStyle = s;
		ctx.fillRect(Math.round(snake[i][1] * cell_size), Math.round(snake[i][0] * cell_size), Math.round(cell_size), Math.round(cell_size));
	}


	setTimeout(main, wait_time_for_board(board_y));
}
