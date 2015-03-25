#pragma strict

@script RequireComponent(Rigidbody2D)

private var thisRigidbody : Rigidbody2D;
private var m = Vector3.zero;
var Move = 1f;
enum move_directions {
	left, right
}
var MoveDirection: move_directions;

function Start() {
	thisRigidbody = this.GetComponent(Rigidbody2D);
	if(MoveDirection == move_directions.right){
    m = Vector3.right;
	}
	else{
    m = Vector3.left;
	}
}

function Update () {
	var GOColor: Color = this.GetComponent(Renderer).material.color;
	if (GOColor.r > 0 || GOColor.g > 0 || GOColor.b > 0) {
	  var vel = this.GetComponent(Rigidbody2D).velocity;
		if (vel.magnitude < Move)
			thisRigidbody.AddForce(transform.TransformDirection(m * 50));
	}
}