#pragma strict

var Prefabs: GameObject[];
var RanMin = 3f;
var RanMax = 5f;

private var Timer: float = 0;


function Update () {
	if (Time.time > Timer) {
			Timer = Time.time + Random.Range(RanMin, RanMax);
			Instantiate (Prefabs[Random.Range(0, Prefabs.length)],this.transform.position, Quaternion.identity);
	}
}