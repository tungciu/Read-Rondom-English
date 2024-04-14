let selectedWords = [];

function addWords() {
  const inputWords = document.getElementById("inputWords").value.trim();
  if (inputWords !== "") {
    const wordsArray = inputWords.split(",").map((word) => word.trim());
    selectedWords.push(...wordsArray);
    document.getElementById("inputWords").value = ""; // Clear input field
  }
}

function getRandomWord() {
  if (selectedWords.length === 0) {
    return null; // Trả về null nếu không còn từ nào trong mảng
  }
  const randomIndex = Math.floor(Math.random() * selectedWords.length);
  const randomWord = selectedWords[randomIndex];
  selectedWords.splice(randomIndex, 1); // Loại bỏ từ đã chọn từ mảng
  return randomWord;
}

function translateAndSpeak() {
  const randomWord = getRandomWord();
  if (!randomWord) {
    alert("Đã đọc hết từ khóa!");
    return;
  }

  // Replace 'en-US' with the language code you want to use
  const targetLanguage = "en-US";

  // Using Google Translate API
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(
    randomWord
  )}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data[0][0][0];
      document.getElementById("translatedText").innerText =
        translatedText;
      speak(translatedText); // Call speak function after translation
    })
    .catch((error) => console.error("Error:", error));
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = "en-US"; // Sử dụng tiếng Anh Mỹ

  // Đọc văn bản
  speechSynthesis.speak(utterance);
}