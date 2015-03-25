#pragma strict

@script RequireComponent(LensFlare)
var BlinkSpeed = 2f;

private var lf : LensFlare;

function Start () {
	lf = this.GetComponent(LensFlare);
}

function Update() {
	var b = Time.time * BlinkSpeed;
	lf.brightness = Mathf.Abs(Mathf.Sin(b));
}