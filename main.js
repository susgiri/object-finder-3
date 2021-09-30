status1 = "";
objects = [];

function setup(){
    canvas = createCanvas(400, 300);
    canvas.position(445, 270);
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
}

function draw(){
    image(video, 0, 0, 400, 300);

    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        r = random(100, 230);
        g = random(100, 230);
        b = random(100, 230);
        for(i = 0; i < objects.length; i++){
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = "Object Found: Yes";
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = "Object Found: No";
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + " not found");
                synth.speak(utterThis);
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}