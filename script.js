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
            document.getElementById('correction').textContent = "Great Job"
            random() 
           
        } else {
            txt = "Wrong"
            document.getElementById('correction').textContent = "Almost there! Try again!: "+ letter
            const utterance = new SpeechSynthesisUtterance(txt)
            utterance.pitch = .5
            window.speechSynthesis.speak(utterance)
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
    const utterance = new SpeechSynthesisUtterance(txt)
    utterance.pitch = .6
    window.speechSynthesis.speak(utterance)
}