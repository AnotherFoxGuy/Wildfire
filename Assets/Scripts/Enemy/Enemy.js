#pragma strict

private var MovementSpeed = 2;
private var One = 1;
private var HitPoint: RaycastHit;
private var MoveTo = 1;
private var Player: GameObject;
private var Timer : float = 0;


function Start() {
	Player = GameObject.Find("Player");
}

function Update() {
	var dist = Vector3.Distance(this.transform.position, Player.transform.position);
	if (dist < 20) {
		if (dist < 10 && GetClosestObject("Throwable") != null) isInChase();
		else isNotInChase();
		var translation = Time.deltaTime * MoveTo;
		transform.Translate(translation, 0, 0);
	}
}

function GetClosestObject(tag: String): GameObject {
	var objectsWithTag = GameObject.FindGameObjectsWithTag(tag);
	var closestObject: GameObject;
	for (var obj: GameObject in objectsWithTag) {
		if (!closestObject)
			closestObject = obj;
		if (Vector3.Distance(transform.position, obj.transform.position) <= Vector3.Distance(transform.position, closestObject.transform.position))
			closestObject = obj;
	}
	return closestObject;
}

function isNotInChase() {
	MoveTo = MovementSpeed;
	var PosTMP = Vector2(this.transform.position.x + One, this.transform.position.y);
	Debug.DrawLine(this.transform.position, PosTMP);
	if (!Physics2D.Raycast(PosTMP, Vector2(0, -1), 1) || Physics2D.Raycast(PosTMP, Vector2(One, 0), 1)) {
		if (One > 0) {
			One = -1;
			this.transform.eulerAngles.y = 180;
		} else {
			One = 1;
			this.transform.eulerAngles.y = 0;
		}
	}
}

function isInChase() {
	var closestObject = GetClosestObject("Throwable");
	var closestObjectPos = Vector3(closestObject.transform.position.x, closestObject.transform.position.y, this.transform.position.z);
	var dist = Vector3.Distance(this.transform.position, closestObjectPos);
	var PosTMP = Vector2(this.transform.position.x + One, this.transform.position.y);
	if (dist > 1.1) {
		MoveTo = MovementSpeed * 3;
		//if(!Physics2D.Raycast(PosTMP, Vector2(0,-1), 1) || Physics2D.Raycast(PosTMP, Vector2(One, 0), 1)) MoveTo = 0;else MoveTo = MovementSpeed * 3;
		if (this.transform.position.x > closestObject.transform.position.x) {
			One = -1;
			this.transform.eulerAngles.y = 180;
		} else {
			One = 1;
			this.transform.eulerAngles.y = 0;
		}
	} else {
		MoveTo = 0;
	}
	if (dist < 1.2 && Time.time > Timer) {
		var Throwable = closestObject;
		var oVelocity = Mathf.Abs(Player.GetComponent.<Rigidbody2D>().velocity.x) + Mathf.Abs(Player.GetComponent.<Rigidbody2D>().velocity.y);
		Throwable.tag = "Flying";
		var ThrowForce = Vector3.Distance(this.transform.position, Player.transform.position);
		var Height = Player.transform.position.y - this.transform.position.y;
		Height /= 2;
		Height += 0.5;
		ThrowForce += oVelocity;
		ThrowForce /= 2.5f;
		Throwable.transform.position = this.transform.position;
		if (this.transform.position.x < Player.transform.position.x) {
			Throwable.GetComponent.<Rigidbody2D>().velocity = Vector2(2, Height) * ThrowForce;
		} else {
			Throwable.GetComponent.<Rigidbody2D>().velocity = Vector2(-2, Height) * ThrowForce;
		}
		Timer = Time.time + 0.5f;
	}
}