song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseyNet is on :)");
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("green");
    strokeWeight(5);

    if (scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,15);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=Math.floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Da vOlUmE Is " + volume;
    song.setVolume(volume);
    }
}

function preload()
{
    song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("ScOrElEfTwRiSt is" + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LWX=" + leftWristX + "LWY" + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RWX=" + rightWristX + "RWY" + rightWristY);
    }
}

