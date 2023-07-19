$(document).ready(function() {
    const questions = [{
            id: 1,
            text: "How satisfied are you with our products?",
            type: "rating",
            options: [1, 2, 3, 4, 5]
        },
        {
            id: 2,
            text: "How fair are the prices compared to similar retailers?",
            type: "rating",
            options: [1, 2, 3, 4, 5]
        },
        {
            id: 3,
            text: "How satisfied are you with the value for money of your purchase?",
            type: "rating",
            options: [1, 2, 3, 4, 5]
        },
        {
            id: 4,
            text: "On a scale of 1-10, how would you recommend us to your friends and family?",
            type: "rating",
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: 5,
            text: "What could we do to improve our service?",
            type: "text"
        }
    ];

    let currentQuestionIndex = 0;
    let answers = [];
    let sessionID = generateSessionID();

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        $("#questionNumber").text(`${currentQuestionIndex + 1}/${questions.length}`);
        $("#question").text(currentQuestion.text);

        if (currentQuestion.type === "rating") {
            $("#ratingOptions").empty();
            currentQuestion.options.forEach(option => {
                $("#ratingOptions").append(`<button class="ratingButton">${option}</button>`);
            });
            $("#ratingOptions").show();
            $("#textAnswer").hide();
            const selectedRating = answers.find(answer => answer.questionID === currentQuestion.id);
            if (selectedRating) {
                $(".ratingButton").removeClass("selected");
                $(`.ratingButton:contains(${selectedRating.rating})`).addClass("selected");
            }
        } else if (currentQuestion.type === "text") {
            $("#ratingOptions").hide();
            $("#textAnswer").show();
            $("#textAnswer").val("");
        }
    }

    function handleNext() {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.type === "rating") {
            const selectedRating = parseInt($(".ratingButton.selected").text());
            answers = answers.filter(answer => answer.questionID !== currentQuestion.id);
            answers.push({
                questionID: currentQuestion.id,
                rating: selectedRating
            });
        } else if (currentQuestion.type === "text") {
            const textAnswer = $("#textAnswer").val().trim();
            answers.push({
                questionID: currentQuestion.id,
                text: textAnswer
            });
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            $("#surveyScreen").hide();
            $("#thankYouScreen").show();
            saveSurveyData();
            setTimeout(() => {
                $("#thankYouScreen").hide();
                $("#welcomeScreen").show();
                currentQuestionIndex = 0;
                answers = [];
            }, 5000);
        }
    }

    function handlePrevious() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    }

    function handleSkip() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            $("#surveyScreen").hide();
            $("#thankYouScreen").show();
            saveSurveyData();
            setTimeout(() => {
                $("#thankYouScreen").hide();
                $("#welcomeScreen").show();
                currentQuestionIndex = 0;
                answers = [];
            }, 5000);
        }
    }

    function saveSurveyData() {
        localStorage.setItem(`survey_${sessionID}`, JSON.stringify(answers));
        localStorage.setItem(`survey_status_${sessionID}`, "COMPLETED");
    }

    function generateSessionID() {
        const timestamp = new Date().getTime();
        return `session_${timestamp}`;
    }

    $("#startButton").on("click", function() {
        $("#welcomeScreen").hide();
        $("#surveyScreen").show();
        showQuestion();
    });

    $("#nextButton").on("click", handleNext);
    $("#previousButton").on("click", handlePrevious);
    $("#skipButton").on("click", handleSkip);
    $("#submitButton").on("click", handleNext);
    $(document).on("click", ".ratingButton", function() {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    });
});
