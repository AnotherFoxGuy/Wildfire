#pragma strict

public var Health = 100;
public var HealthSub = 5;
public var GodMode = false;

private var Fire: ParticleSystem;
private var GodModeProgress = 0;
private var CheatDelay = 0f;

function Start() {
	Fire = this.GetComponent(ParticleSystem);
}

function Update() {
	UpdateCheats();
	if (Health <= 0 && !GodMode)
		Application.LoadLevel(Application.loadedLevel);
}

function ApplyDamage (damage : float) {
	Health -= damage;
}

function OnTriggerEnter2D(otherObj: Collider2D) {
	if (otherObj.tag == "Flying") {
		Health = Health - HealthSub;
		Fire.emissionRate = Health;
	} else if (otherObj.tag == "Health") {
		Health += 20;
		Destroy(otherObj.gameObject);
	}
}

function OnTriggerStay2D(otherObj: Collider2D) {
	if (otherObj.tag == "Enemy") {
		var BoxColl = otherObj.GetComponent(BoxCollider2D);
		BoxColl.enabled = false;
		Destroy(otherObj.gameObject, 4);
	}
}

function OnGUI() {
	GUI.Box(Rect(10, 100, 150, 50), "Fireynes: " + Health);
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
		GodMode = !GodMode;
		print("GodMode " + GodMode);
	}
}
