
var updateInterval = 0.5;
var minFps = 50;
var objectsDestroyed = 10;

private var accum = 0.0; // FPS accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interval
private var fps  = 100;


function Start() {
	timeleft = updateInterval;
}

function Update() {
	timeleft -= Time.deltaTime;
	accum += Time.timeScale / Time.deltaTime;
	++frames;
	if (timeleft <= 0.0) {
		fps = accum / frames;
		timeleft = updateInterval;
		accum = 0.0;
		frames = 0;
		//print(""+fps);
	}
	if (fps < minFps) {
		var objInLevel: GameObject[];
		objInLevel = GameObject.FindGameObjectsWithTag("Fire");
		if (objInLevel.length > objectsDestroyed) {
			for (var i = 0; i < objectsDestroyed; i++) {
				Destroy(objInLevel[i]);
			}
		}
	}
}