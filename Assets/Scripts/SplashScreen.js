#pragma strict
var mat: Material;

var fadeTime = 1.0;
var nextscene = 1;
var frames : Sprite[];
var framesPerSecond = 10;


enum Fade {
	In, Out
}

function Start() {
	mat.color.a = 1;
	yield WaitForSeconds(0.5);
	//yield Fademat(mat, fadeTime, Fade.In);
  yield playAni();
	yield Fademat(mat, fadeTime, Fade.Out);
	yield WaitForSeconds(0.5);
  //mat.color.a = 1;
	Application.LoadLevel(nextscene);
}

function Update () {
  if (Input.GetKeyDown (KeyCode.Escape))
  	Application.LoadLevel(nextscene);
}



function Fademat(curentmat: Material, timer: float, fadeType: Fade) {
	var start = fadeType == Fade.In ? 0.0 : 1.0;
	var end = fadeType == Fade.In ? 1.0 : 0.0;
	var i = 0.0;
	var step = 1.0 / timer;
	while (i < 1.0) {
		i += step * Time.deltaTime;
		curentmat.color.a = Mathf.Lerp(start, end, i) * 1;
		yield;
	}
}


function playAni() {
  var time : float = 0;
	var frame : int = 0;
	var framesLength = frames.Length - 1;
	while (frame < framesLength) {
    time += Time.deltaTime;
    frame = (time * framesPerSecond) % frames.Length;
  	GetComponent.<UnityEngine.UI.Image>().sprite = frames[frame];
    yield;
	}
}