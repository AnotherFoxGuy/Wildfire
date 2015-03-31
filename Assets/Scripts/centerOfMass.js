#pragma strict
var com: Vector2;
private var rb: Rigidbody2D;

function Start() {
	rb = this.GetComponent.<Rigidbody2D>();
	rb.centerOfMass = com;
}