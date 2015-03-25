#pragma strict

var Move = 1f;
function Update () {
	var translation = Time.deltaTime * Move;
	this.transform.Translate(translation, 0, 0);
}