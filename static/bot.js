data = []
    questions = ["Are you a Senior Citizen (more than 55 years old)?", "What is your gender?", "Do you have fever?",
      "Do you currently have a sore throat?", "Do you cough regularly?",
      "Are you experiencing shortness of breath or any other problems in breathing?",
      "Which of the following is applicable?"
    ]
    answers = {
      0: ["Yes", "No"],
      1: ["Male", "Female"],
      2: ["Yes", "No"],
      3: ["Yes", "No"],
      4: ["Yes", "No"],
      5: ["Yes", "No"],
      6: ["Came in contact with infected individual", "Travelled abroad", "None of the above"]
    }
    ids = ["age", "gender", "fever", "sore-throat", "cough", "shortBreath", "applicable"]
    document.querySelector(".startBtn").addEventListener("click", () => {
      document.querySelector(".chatBot").innerHTML = ""
      populateQuestions(0);
    })

    let index = 0;

    async function populateQuestions(index) {
      if (index == 7){
        generateAssessement();
        return;
      }
      const chatBot = document.querySelector(".chatBot").innerHTML
      const ques = `<h5 class="bot">${questions[index]}</h5>`
      let buttons = ``
      let lmao = answers[index].length - 1

      for (var j = 0; j < answers[index].length; j++) {
        buttons += `<button class="options" onclick=push(${lmao})>${answers[index][j]}</button>`
        lmao--;
      }

      const ans = `<div class="answers">${buttons}</div>`
      const qna = `<div class="qna">${ques} ${ans}</div>`
      document.querySelector(".chatBot").innerHTML = chatBot + qna
    }

    async function push(key) {
      data.push(key);
      await populateQuestions(++index)
    }

    function generateAssessement(){
      sendingData = {
        "data": [data]
      }
      $.post("http://127.0.0.1:5000/assessmentComplete", JSON.stringify(sendingData), function (response) {
        console.log(response)
      })
    }