function map(x, in_min, in_max, out_min, out_max) {
	return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function initJoystick(ops) {
	var canvas = document.getElementById(ops.el);
	var width = canvas.width;
	var height = canvas.height;
	var c = canvas.getContext('2d');
	var jpx = width / 2,
		jpy = width / 2;
	var oy = canvas.offsetTop;
	var ox = canvas.offsetLeft;
	var sx = window.scrollX;
	var sy = window.scrollY;
	var cx = ox - sx;
	var cy = oy - sy;
	var radius = ops.innerCircleRadius || 50;
	var margin = ops.margin || 20;
	var lineWidth = ops.outerCircleWidth || 8;
	var mw = margin - (lineWidth / 2);
	var u = radius + mw;


	/*Drawing outer circle outline*/
	function drawOuterCircle() {
		c.beginPath();
		c.lineWidth = lineWidth;
		c.strokeStyle = ops.outerCircleClr || "red";
		c.arc(width / 2, height / 2, (width / 2) - margin, 0, Math.PI * 2);
		c.stroke();
		c.closePath();
	}

	/*Drawing inner circle*/
	function drawInnerCircle() {
		c.beginPath();
		c.fillStyle = ops.innerCircleClr || "red";
		c.arc(jpx, jpy, radius, 0, Math.PI * 2);
		c.fill();
		c.closePath();
	}

	/*Drawing positions*/
	function drawPositions(x, y) {
		c.beginPath();
		c.font = "10px Poppins";
		c.fillText("x: " + x + ", y: " + y, 5, 12);
		c.fill();
		c.closePath();
	}

	/*Render everything*/
	function render() {
		drawOuterCircle();
		drawInnerCircle();
	}
	render();

	function onTouch(tx, ty) {
		tx = tx < cx + mw ? cx + mw : tx;
		tx = tx > cx + width - mw ? cx + width - mw : tx;
		ty = ty < cy + mw ? cy + mw : ty;
		ty = ty > cy + height - +mw ? cy + width - +mw : ty;

		jpx = map(tx, cx, cx + width, u, width - u);
		jpy = map(ty, cy, cy + height, u, height - u);

		c.clearRect(0, 0, width, height);
		render();
		var ax = Math.floor(map(jpx, u, width - u, 0, 100));
		var ay = Math.floor(map(jpy, u, height - u, 0, 100));
		ops.showPos && drawPositions(ax + "%", ay + "%");

		ops.posChange(ax, ay);
	}
	canvas.ontouchmove = function (e) {
		var tx = e.touches[0].clientX;
		var ty = e.touches[0].clientY;
		onTouch(tx, ty);
	}
	canvas.ontouchend = function () {
		ops.autoCenter && onTouch(cx + (width / 2), cy + (height / 2));
	}
}