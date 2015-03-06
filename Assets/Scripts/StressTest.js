#pragma strict

public var fire : GameObject;

private var updatetime = 0.5f;
private var accum = 0.0; // FPS accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interval
private var fpsText  = "";
private var fps  = 100;
private var Timer : float = 0;
private var objFound = 0;
private var objInLevelTotal = 0;
private var Results = false;


function Start() {
	timeleft = updatetime;
}

function Update() {
	if (!Results) {
		UpdateFps();
		if (fps > 29) {
			var clone: GameObject;
			//for (var c = 0; c < 5; c++)
			clone = Instantiate(fire, this.transform.position, Quaternion.Euler(Vector3(270, 0, 0)));
			//clone.GetComponent(DamagingFire).enabled = false;
			UpdateCounter();
		} else {
			Results = true;
			var objInLevel: GameObject[];
			objInLevel = GameObject.FindGameObjectsWithTag("Fire");
			for (var i = 0; i < objInLevel.length; i++) {
				Destroy(objInLevel[i]);
			}
		}
	}
}

function OnGUI() {
	if (!Results) {
		GUI.Box(Rect(10, 50, 150, 100), "FPS: " + fpsText + "\n Objects: " + objFound);
	} else {
		GUI.Box(Rect(Screen.width / 2 - 100, Screen.height / 2 - 30, 200, 60), "Objects spawned: " + objFound);
	}
}


function UpdateCounter() {
	if (Time.time > Timer) {
		Timer = Time.time + 1;
		var objInLevel: GameObject[];
		objInLevel = GameObject.FindGameObjectsWithTag("Fire");
		objFound = objInLevel.length;
	}
}

function UpdateFps() {
	timeleft -= Time.deltaTime;
	accum += Time.timeScale / Time.deltaTime;
	++frames;

	// Interval ended - update GUI text and start new interval
	if (timeleft <= 0.0) {
		// display two fractional digits (f2 format)
		fpsText = "" + (accum / frames).ToString("f2");
		fps = accum / frames;
		timeleft = updatetime;
		accum = 0.0;
		frames = 0;
	}
}