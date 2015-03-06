#pragma strict

var CountTag = "me";
var updatetime = 0.5f;

private var Timer : float = 0;
private var objFound = 0;
private var objInLevelTotal = 0;


function OnGUI() {
	GUI.Box(Rect(10, 50, 150, 25), "obj collected: " + objFound);
}

function Update() {
	if (Time.time > Timer) {
		Timer = Time.time + 1;
		var objInLevel: GameObject[];
		objInLevel = GameObject.FindGameObjectsWithTag(CountTag);
		objFound = objInLevel.length;
	}
}
