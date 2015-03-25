#pragma strict

var MovementSpeed = 1f;
var Throwable: GameObject;

private var One = 1;
private var HitPoint: RaycastHit;
private var MoveTo = 1;
private var Player: GameObject;
private var CoinsFound = 0;
private var Timer : float = 0;


function Start() {
	Player = GameObject.Find("Player");
}

function Update() {
	var dist = Vector3.Distance(this.transform.position, Player.transform.position);
	if (dist < 20) {
		if (dist < 10) isInChase();
		else isNotInChase();
		var translation = Time.deltaTime * MoveTo;
		transform.Translate(translation, 0, 0);
	}
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
	var PosTMP = Vector2(this.transform.position.x + One, this.transform.position.y);
	if (!Physics2D.Raycast(PosTMP, Vector2(0, -1), 1) || Physics2D.Raycast(PosTMP, Vector2(One, 0), 1)) MoveTo = 0;
	else MoveTo = MovementSpeed * 3;
	if (this.transform.position.x > Player.transform.position.x) {
		One = -1;
		this.transform.eulerAngles.y = 180;
	} else {
		One = 1;
		this.transform.eulerAngles.y = 0;
	}
	if (Time.time > Timer) {
		var clone: GameObject;
		var oVelocity = Mathf.Abs(Player.GetComponent.<Rigidbody2D>().velocity.x) + Mathf.Abs(Player.GetComponent.<Rigidbody2D>().velocity.y);
		var PosTMP3 = Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z + 1);
		clone = Instantiate(Throwable, PosTMP3, Quaternion.identity);
		clone.tag = "Flying";
		var ThrowForce = Vector3.Distance(this.transform.position, Player.transform.position);
		var Height = Player.transform.position.y - this.transform.position.y;
		Height /= 2;
		Height += 0.5;
		ThrowForce += oVelocity;
		ThrowForce /= 2.5f;
		if (this.transform.position.x < Player.transform.position.x) {
			clone.GetComponent.<Rigidbody2D>().velocity = Vector2(2, Height) * ThrowForce;
		} else {
			clone.GetComponent.<Rigidbody2D>().velocity = Vector2(-2, Height) * ThrowForce;
		}
		Timer = Time.time + 0.6f;
	}
}