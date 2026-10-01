const sections = ["home", "tutor", "quiz", "premium"];

function hideAll() {
  sections.forEach(function(id) {
    const element = document.getElementById(id);

    if (element) {
      element.classList.add("hidden");
    }
  });
}

function goHome() {
  hideAll();
  document.getElementById("home").classList.remove("hidden");
}

function showTutor() {
  hideAll();
  document.getElementById("tutor").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function showQuiz() {
  hideAll();
  document.getElementById("quiz").classList.remove("hidden");
}

function showPremium() {
  hideAll();
  document.getElementById("premium").classList.remove("hidden");
}

function setSubject(subject) {
  document.getElementById("subject").value = subject;
}

async function askDemo() {
  const subject = document.getElementById("subject").value;
  const question = document.getElementById("question").value.trim();
  const answer = document.getElementById("answer");
  const askBtn = document.getElementById("askBtn");

  if (!question) {
    answer.innerHTML =
      "<strong>Please type your question first.</strong>";

    answer.classList.remove("hidden");
    return;
  }

  answer.innerHTML =
    "<strong>EstherAI:</strong><br>Thinking...";

  answer.classList.remove("hidden");
  askBtn.disabled = true;
  askBtn.textContent = "Processing...";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: subject,
        question: question
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      answer.innerHTML =
        "<strong>EstherAI:</strong><br><p style='color: red;'>Error: " + data.error + "</p>";
    } else {
      answer.innerHTML =
        "<strong>EstherAI:</strong><br>" + formatResponse(data.response);
    }

  } catch (error) {
    console.error("Error:", error);
    answer.innerHTML =
      "<strong>EstherAI:</strong><br><p style='color: red;'>Unable to connect to AI service. Please try again.</p>";
  } finally {
    askBtn.disabled = false;
    askBtn.textContent = "Ask EstherAI";
  }
}

function formatResponse(text) {
  return text.split('\n').map(line => {
    if (line.trim().match(/^\d+\.|^-|^\*/)) {
      return "<p><strong>" + line + "</strong></p>";
    }
    return "<p>" + line + "</p>";
  }).join("");
}

function quizAnswer(button, correct) {
  const result = document.getElementById("quizResult");

  if (correct) {
    result.innerHTML =
      "<p><strong>Correct!</strong> Acid + base → neutralisation.</p>";
  } else {
    result.innerHTML =
      "<p><strong>Not quite.</strong> Try again.</p>";
  }
}
