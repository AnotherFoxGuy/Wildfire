#pragma strict

var  slider : UI.Slider;
var  UI_text : UI.Text;

function Start() {
	slider.maxValue = 8;
	UI_text.text = "load Level: " + slider.value;
}


function loadLevel() {
	Application.LoadLevel(slider.value);
}

function UpdateUI_text() {
	UI_text.text = "load Level: " + slider.value;
}
