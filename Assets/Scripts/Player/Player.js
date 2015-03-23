#pragma strict

public var MaxSpeed = 7;
public var fire : GameObject;
public var SpawnsFire = true;

private var thisRigidbody : Rigidbody2D;
private var jump = true;
private var layerMask = ~ ((1 << 8) | (1 << 9) | (1 << 10));
private var GodModeProgress = 0;
private var CheatDelay = 0f;

function Start() {
	this.transform.position = Vector3(0, 0, -5);
	thisRigidbody = this.GetComponent(Rigidbody2D);
	PlayerPrefs.SetInt("LastLevel", Application.loadedLevel);
}

function Update() {
	UpdateCheats();
	var pt = Vector2(this.transform.position.x, this.transform.position.y - 0.2);
	var results = new RaycastHit2D[10];
	if (Physics2D.RaycastNonAlloc(pt, Vector2(0, 1), results, 2, layerMask) > 0) {
		for (var hit: RaycastHit2D in results) {
			if (hit.collider != null) {
				if (hit.collider.tag == "DamageFire")
					SpawnFire(hit.point);
			}
		}
	}
	if (Input.GetButtonDown("Jump")) {
		var PosTMP = Vector2(this.transform.position.x, this.transform.position.y - 0.51);
		if (jump) {
			thisRigidbody.AddForce(transform.TransformDirection(Vector3.up * 500));
			jump = false;
		}
	}
	if (Input.GetButton("Right")) {
		if (thisRigidbody.velocity.x < MaxSpeed) {
			thisRigidbody.AddForce(transform.TransformDirection(Vector3.right * 20));
		}
	}
	if (Input.GetButton("Left")) {
		if (thisRigidbody.velocity.x > -MaxSpeed) {
			thisRigidbody.AddForce(transform.TransformDirection(Vector3.left * 20));
		}
	}
}

function OnCollisionStay2D(collisionInfo: Collision2D) {
	for (var contact: ContactPoint2D in collisionInfo.contacts) {
		SpawnFire(contact.point);
	}
}


function SpawnFire(pos: Vector3) {
	if (SpawnsFire) {
		var clone: GameObject;
		clone = Instantiate(fire, pos, Quaternion.identity); //
		Destroy(clone, Random.Range(20, 25));
	}
}

function OnCollisionEnter2D(collisionInfo: Collision2D) {
	jump = true;
}

function UpdateCheats() {
	if (CheatDelay > 0.0) {
		CheatDelay -= Time.deltaTime;
		if (CheatDelay <= 0.0) {
			CheatDelay = 0.0;
			GodModeProgress = 0;
		}
	}
	if (GodModeProgress == 0 && Input.GetKeyDown('e')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 1 && Input.GetKeyDown('d')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 2 && Input.GetKeyDown('g')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 3 && Input.GetKeyDown('a')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 4 && Input.GetKeyDown('r')) {
		GodModeProgress = 0;
		SpawnsFire = !SpawnsFire;
		print("SpawnFire " + SpawnFire);
	}
}