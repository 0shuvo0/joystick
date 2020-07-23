# Joystick

### Joystick is a really small library for easily making adding joysticks to your webapps.

Syntax:
```
initJoystick({
	el: "joystick", //id of canvas
	posChange: function(x, y){
		/*Do stuff*/
	}
});
```

## available options:
* innerCircleClr: (color string)
* outerCircleClr: (color string)
* innerCircleRadius: (integer)
* margin: (integer)
* showPos: (boolean)
* autoCenter: (boolean)