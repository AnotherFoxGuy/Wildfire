#pragma strict

function OnCollisionEnter2D(coll: Collision2D) {
        Destroy (this.gameObject);
}
