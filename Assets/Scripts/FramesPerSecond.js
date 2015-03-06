var updateInterval = 0.5;

private var accum = 0.0; // FPS accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interval
private var fpsText  = "";

function Start() {
	timeleft = updateInterval;
}

function Update() {
	timeleft -= Time.deltaTime;
	accum += Time.timeScale / Time.deltaTime;
	frames++;

	// Interval ended - update GUI text and start new interval
	if (timeleft <= 0.0) {
		// display two fractional digits (f2 format)
		fpsText = "" + (accum / frames).ToString("f2");
		timeleft = updateInterval;
		accum = 0.0;
		frames = 0;
	}
}

function OnGUI() {
	GUI.Box(Rect(10, 50, 150, 25), "FPS: " + fpsText);
}