#pragma strict

function StartNewGame() {
	Application.LoadLevel(4);
}

function ContinueGame() {
	Application.LoadLevel(PlayerPrefs.GetInt("LastLevel"));
}


function GoToMainMenu() {
	Application.LoadLevel(0);
}


function StartBenchmark() {
	Application.LoadLevel("Benchmark");
}

function StartStressTest() {
	Application.LoadLevel("StressTest");
}

function SelectLevel() {
	Application.LoadLevel("LevelSelect");
}