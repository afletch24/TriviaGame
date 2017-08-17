$(document).ready(function(){
    var showQuestion;
    var count = 0;
    var timeRemaining = 10;
    var intervalId;
    var questionActive = false;
    var right=0;
    var wrong=0;
    var unanswered=0;
    
    
    var fullquestions =[
        { 
            question: "Wisconsin is the ___________ capitol of the United States.",
            answers: ["Dairy" , "Farm", "Ham", "Corn"],
            correctAnswer: 1,
            images: "<img src='assets/images/cow.gif'>",
        },
        {
            question: "What is the mascot for the Univeristy of Wisconsin?",
            answers: ["Dairy Cow" , "Benny Beaver", "Bucky Badger", "Baldwin the Eagle"],
            correctAnswer: 3,
            images: "<img src='assets/images/badger.gif'>",
        },
        {
            
            question: "What does the state of Wisconsin most resemble?",
            answers: ["Rectangle", "Mitten", "Square", " The Letter 'L'"],
            correctAnswer: 2,
            images: "<img src='assets/images/mitten.jpg'>",
        },
        {
            question: "How many lakes are in Wisconsin?",
            answers: ["82" , "539", "15,074","6,174"],
            correctAnswer: 3,
            images: "<img src='assets/images/lake.gif'>",
        },
        {
            question: "Wisconsin repealed its Prohibition laws ____ years [before/after] the rest of the nation.",
            answers: ["one year before" , "four years after", "one year after", "four years before"],
            correctAnswer: 4,
            images: "<img src='assets/images/beer.gif'>",
        }
    ];
    
    // When the start button is pressed...
    $("#startButton").click(startQuestion);
//    $("#startOverButton").click(stopQuestion);

    
    function startQuestion(){
        $("#giftarget").hide();
        console.log("STARTED");
        if (questionActive) {
            return
        }
        questionActive = true;
        console.log("DO WE GET HERE?");
        if (count === fullquestions.length){
            endGame();
        }
        else{ 
        displayQuestion();
        intervalId = setInterval(tick, 1000);
        console.log("startQuestion function");
        }
    }

    function displayQuestion(){ 
        var currentQuestion = fullquestions[count];
        $("#question").html(fullquestions[count].question);
        $("#spot1").html(fullquestions[count].answers[0]);
        $("#spot2").html(fullquestions[count].answers[1]);
        $("#spot3").html(fullquestions[count].answers[2]);
        $("#spot4").html(fullquestions[count].answers[3]);
    }

    function tick() {
        timeRemaining--;
        displayTimer();
        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            timeRemaining = 10;
            unansweredAnswer();
        }
    }


    function nextQuestion(){
        count++;
        questionActive = false;
        
    }

    function displayTimer() {
        $('#timeRemaining').html("Time Remaining: " + timeRemaining);
    }

     
    
    $(".list-group-item").on("click", function(){
        
        var value = +$(this).attr("value");
        console.log(value);
        clearInterval(intervalId);
        if(value === fullquestions[count].correctAnswer){
            rightAnswer();
        } else if (value !== fullquestions[count].correctAnswer){
            wrongAnswer();
        }
    });
    
    function rightAnswer (){
        $("#question").html("Correct Answer!");
        $("#giftarget").html(fullquestions[count].images); 
        right++;
         $("#giftarget").show();
        clearInterval(intervalId);
        responseScreenTimer();
        console.log("correct");
       }

    function wrongAnswer(){
        $("#question").html("Wrong Answer!");
        $("#giftarget").html(fullquestions[count].images); 
        wrong++;
         $("#giftarget").show();
        clearInterval(intervalId);
        responseScreenTimer();
    }

    function unansweredAnswer(){
        $("#question").html("You ran out of time!");
        $("#giftarget").html(fullquestions[count].images); 
        unanswered++;
         $("#giftarget").show();
        responseScreenTimer();
    }

    function responseScreenTimer(){
        nextQuestion();
        timeRemaining = 10;
        answerTimer = setTimeout(startQuestion, 5000);
        console.log("response screen timer");
    
    }

    function endGame(){
        $("#question").html("Game Over");
        $("#spot1").html(right + " Correct Answers");
        $("#spot2").html(wrong + " Wrong Answers");
        $("#spot3").html(unanswered + " unanswered Questions");
        $("#spot4").html("");
       
    };




});