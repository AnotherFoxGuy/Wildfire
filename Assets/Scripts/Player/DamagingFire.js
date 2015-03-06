#pragma strict

private var layerMask = ((1 << 13) | (1 << 14) | (1 << 15));

function Update() {
	var PosTMP = Vector2(this.transform.position.x, this.transform.position.y - 0.2);
	var results = new RaycastHit2D[10];
	if (Physics2D.RaycastNonAlloc(PosTMP, Vector2(0, 1), results, 2, layerMask) > 0) {
		for (var hit: RaycastHit2D in results) {
			if (hit.collider != null) {
				var GOColor: Color = hit.collider.GetComponent.<Renderer>().material.color;
				if (GOColor.r > 0 || GOColor.g > 0 || GOColor.b > 0) {
					var cc: float = Time.deltaTime / 50;
					GOColor = Color(GOColor.r - cc, GOColor.g - cc, GOColor.b - cc);
					hit.collider.GetComponent.<Renderer>().material.color = GOColor;
				} else {
					if (hit.collider.GetComponent.<Rigidbody2D>() != null)
						hit.collider.GetComponent.<Rigidbody2D>().isKinematic = false;
					if (hit.collider.GetComponent(HingeJoint2D) != null)
						hit.collider.GetComponent(HingeJoint2D).enabled = false;
				}
			}
		}
	} else {
		Destroy(this.gameObject);
	}
}