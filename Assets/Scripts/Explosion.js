#pragma strict
private var exp = false;
public var GameObject : GameObject;

function Update () {
	if(!exp){
		var GOColor: Color = this.GetComponent(Renderer).material.color;
		if (GOColor.r < 0.1 && GOColor.g < 0.1 && GOColor.b < 0.1) {
      exp = true;
			var clone: GameObject;
			clone = Instantiate(GameObject,  this.transform.position, Quaternion.identity);
			Destroy(clone, 5);
		}
	}
}