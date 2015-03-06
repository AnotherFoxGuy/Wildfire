﻿#pragma strict

function OnTriggerEnter2D (otherObj : Collider2D) {
	if (otherObj.tag == "Player") {
		Application.LoadLevel(Application.loadedLevel);
	}
	else{
		Destroy(otherObj.gameObject);
	}
}