let score = 0
    let letter
    let txt
    let letters = []
    let randomnum
    let userinput = document.getElementById('userinput').value
    letters = JSON.parse(localStorage.getItem('letters'));
    let hearts = 3
    
    function random() {
        randomnum = Math.floor(Math.random() * letters.length)
        letter = letters[randomnum]
        txt = String(letter)
        const utterance = new SpeechSynthesisUtterance(txt)
        utterance.pitch = .6
        window.speechSynthesis.speak(utterance)
        console.log(String(letter))
    }
    random()


    document.getElementById('submition').addEventListener('click', function() {
        let userinput = document.getElementById('userinput').value
        if (userinput === letter) { 
            score += 5
            txt = "Correct"
            const utterance = new SpeechSynthesisUtterance(txt)
            utterance.pitch = .5
            window.speechSynthesis.speak(utterance)
            random() 
        } else {
            txt = "Wrong"
            const utterance = new SpeechSynthesisUtterance(txt)
            utterance.pitch = .5
            window.speechSynthesis.speak(utterance)
            random()
        }

        if (hearts === 0) {
            window.location.href = 'gameover.html'
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

function addword() {
   letters.push(String(document.getElementById('newword').value))
    localStorage.setItem('letters', JSON.stringify(letters));
   document.getElementById('words').textContent = letters
}