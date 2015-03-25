#pragma strict

function OnTriggerStay2D (otherObj : Collider2D) {
	print("Col"+otherObj);
	if (otherObj.tag == "Player") {
		Application.LoadLevel(Application.loadedLevel);
	}
	else{
		Destroy(otherObj.gameObject);
	}
}
