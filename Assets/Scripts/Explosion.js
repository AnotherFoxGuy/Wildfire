#pragma strict
private var exp = false;
public var fire : GameObject;
private var Player: GameObject;

function Start() {
	Player = GameObject.Find("Player");
}

function Update () {
	if(!exp){
		var GOColor: Color = this.GetComponent(Renderer).material.color;
		if (GOColor.r < 0.1 && GOColor.g < 0.1 && GOColor.b < 0.1) {
			print("exp");
      exp = true;
			var clone: GameObject;
			clone = Instantiate(fire,  Player.transform.position, Quaternion.identity);
			Destroy(clone, 5);
		}
	}
}