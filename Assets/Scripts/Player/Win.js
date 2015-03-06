#pragma strict

public var nextLevel = false;

private var Player: GameObject;
private var PlayerRigidbody2D : Rigidbody2D;
private var Timer = Mathf.Infinity;
private var Win = false;



function Start () {
	Player = GameObject.Find("Player");
	PlayerRigidbody2D = Player.GetComponent(Rigidbody2D);
}

function Update () {
	if(Time.realtimeSinceStartup > Timer){
		Time.timeScale = 1;
		var levelToLoad = 0;
		if(nextLevel) levelToLoad = Application.loadedLevel + 1;
		Application.LoadLevel(levelToLoad);
	}
}

function OnTriggerEnter2D (player : Collider2D) {
	if(player.gameObject.tag == "Player"){
		Win = true;
		Timer = Time.realtimeSinceStartup + 2;
		Time.timeScale = 0;
	}
}

function OnGUI () {
	if(Win){
		if(nextLevel) GUI.Box (Rect (Screen.width/2 - 75,Screen.height/5 - 25, 150, 50),"Next Level !!!");
		else GUI.Box (Rect (Screen.width/2 - 75,Screen.height/5 - 25, 150, 50),"Win !!!");
	}
}
