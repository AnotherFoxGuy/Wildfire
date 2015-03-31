#pragma strict

var MoveTo = 1;

function Update () {
		var translation = Time.deltaTime * MoveTo;
		transform.Translate(translation, 0, 0);
}