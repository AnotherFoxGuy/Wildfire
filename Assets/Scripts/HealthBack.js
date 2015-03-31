#pragma strict

var GameObject : GameObject;

function OnParticleCollision () {
  GameObject.SendMessage ("ApplyDamage" , 1);
}