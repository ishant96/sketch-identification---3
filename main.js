function setup() {
canvas = createcanvas(280, 280);
canvas.center();
background("white")
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function preload(){
    classifier = m15.imageclassifier('DoodleNet');
} 

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotresults);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    documents.getElementById('label').innerHTML = 'Label: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}