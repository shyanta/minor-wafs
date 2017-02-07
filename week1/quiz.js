var answerKey = [1,1,2,4];
var questions = document.getElementsByClassName("QuestionContainer");
var questionCount = questions.length;

var userAnswers = new Array(questionCount).fill(0);
var rightAnswers = 0;
var wrongAnswers ="";


function getAnswers(){
    for (i = 0; i < questionCount; i++){
        var k = i+1;
            userAnswers[i] = Number(document.querySelector('input[name="q'+k+'"]:checked').value);
            console.log(userAnswers);
    }
    checkAnswers();
}
function checkAnswers(){
    for (i = 0; i < questionCount; i++) {
        if (userAnswers[i] === answerKey[i]){
            console.log("That was Right");
            rightAnswers++;
        }
        else{
            wrongAnswers += "Question "+[i+1]+" ";
            console.log("That was Wrong");
            console.log("Questions answerd wrong: "+wrongAnswers);
        }
    }
    showScore();
};
function showScore(){
    document.getElementsByClassName("score")[0].innerHTML = ((rightAnswers/questionCount) *100) +"%";
    document.getElementsByClassName("wrong")[0].innerHTML = ("Questions answerd wrong were: "+ wrongAnswers);
    
    console.log("userAnswers = "+userAnswers);
    console.log("wrongAnswers = "+ wrongAnswers);
};


function progressBar(){
    document.getElementsByClassName("progress_Percentage")[0].innerHTML = ((questionCount - userAnswers.filter(function(obj) {return (obj == 0);}).length)/questionCount) *100 + "%";
    document.getElementsByClassName("progress_Bar")[0].style.width =((questionCount - userAnswers.filter(function(obj) {return (obj == 0);}).length)/questionCount) *100 + "%";
}


document.querySelector('input[type="radio"]').addEventListener("click", function(){    progressBar();
});

document.getElementById("submit").addEventListener("click", function(){
    getAnswers();
    progressBar();
});