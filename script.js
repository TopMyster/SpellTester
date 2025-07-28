let score = 0
let letter
let txt
let letters = []
let randomnum
let userinput = document.getElementById('userinput').value
letters = JSON.parse(localStorage.getItem('letters'));
let hearts = 3

function getPreferredVoice() {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = ['Samantha',];
    
    for (let preferred of preferredVoices) {
        const voice = voices.find(v => v.name.includes(preferred));
        if (voice) return voice;
    }

    const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman') ||
        v.gender === 'female'
    );
    if (femaleVoice) return femaleVoice;
    return voices[0] || null;
}
function speak(text, pitch = 0.8, rate = 0.9) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();
    
    if (voice) {
        utterance.voice = voice;
    }
    
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.volume = 1.0
    utterance.lang = 'en-US'
    window.speechSynthesis.speak(utterance)
}

function random() {
    randomnum = Math.floor(Math.random() * letters.length)
    letter = letters[randomnum]
    txt = String(letter)
    speak(txt, 0.8, 0.8)
    console.log(String(letter))
}

if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        random()
    })
} else {
    random()
}


    document.getElementById('submition').addEventListener('click', function() {
        let userinput = document.getElementById('userinput').value
        if (userinput === letter) { 
            score += 5
            txt = "Correct, Great Job! ,"
            speak(txt, 0.8, 0.8)
            document.getElementById('correction').textContent = "Great Job"
            random() 
           
        } else {
            txt = "Almost there! Try again! ,"
            document.getElementById('correction').textContent = "Almost there: "+ letter
            speak(txt, 0.8, 0.8)
            random() 
            hearts -= 1
        }
    })

    setInterval(function() {
    document.getElementById('score').textContent = score;
    let highscore = parseInt(localStorage.getItem("highscore")) || 0;
    document.getElementById('highscore').textContent = highscore;
    if (score > highscore) {
        localStorage.setItem("highscore", score);
    }
}, 1000);

 setInterval(function() {
    if (hearts === 1) {
       document.getElementById('hearts').textContent = "❤️"
    } else if (hearts === 2) {
        document.getElementById('hearts').textContent = "❤️❤️"
    } else if (hearts === 3) {
        document.getElementById('hearts').textContent = "❤️❤️❤️"
    }
    if (hearts === 0) {
        window.location.href = 'gameover.html'
    }
}, 1000);

function addword() {
    const input = document.getElementById('newword').value;
    const newWords = input
        .split(',')
    letters.push(...newWords);
    localStorage.setItem('letters', JSON.stringify(letters));
    document.getElementById('words').textContent = letters;
}

function repeatbtn() {
    txt = String(letter)
    speak(txt, 0.8, 0.8)
}