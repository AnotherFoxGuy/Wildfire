#pragma strict

private var Player : GameObject ;
//public var MoveTo : Transform;
//public var Rel : Vector3;

function Start() {
	Player = GameObject.Find("Player");
	this.transform.position = Vector3(Player.transform.position.x, Player.transform.position.y + 4, Player.transform.position.z - 10);
}

function Update() {
	this.transform.position = Vector3(Player.transform.position.x, Player.transform.position.y + 2, this.transform.position.z);
}
