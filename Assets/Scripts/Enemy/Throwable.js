#pragma strict

/*
function Update () {
        var oVelocity = Mathf.Abs(this.rigidbody2D.velocity.x) + Mathf.Abs(this.rigidbody2D.velocity.y);
        if(oVelocity < 0.1){
                this.tag = "Throwable";
        }
        else{
                this.tag = "Flying";
        }
}
*/


function OnCollisionEnter2D(coll: Collision2D) {
        this.tag = "Throwable";
}
