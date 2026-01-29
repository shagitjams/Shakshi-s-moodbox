
const moodTools = {
    energized: {
        title: "Daily Win",
        html: `
            <p>What's the one thing you wanna do today?</p>
            <input type="text" id="goal-input" placeholder="Type your goal...">
            <button class="task-btn" onclick="saveGoal()">Lock it in</button>
            <div id="goal-display"></div>
        `
    },
    overwhelmed: {
        title: "Just Breathe",
        html: `
            <div class="breathing-circle"></div>
            <p style="margin-top:15px;">Follow the circle... Inhale... Exhale...</p>
        `
    },
    creative: {
        title: "Palette Generator",
        html: `
            <p>..because shakshi loves colour inspo!!?</p>
            <div id="palette-box" style="display:flex; gap:10px; margin:15px 0;"></div>
            <button class="task-btn" onclick="generatePalette()">New Colors</button>
        `
    },
    focused: {
        title: "Deep Work Timer",
        html: `
            <div class="timer-display" id="timer">25:00</div>
            <button class="task-btn" id="start-btn" onclick="toggleTimer()">Start Focus</button>
        `
    },
    dreamy: {
        title: "Midnight Thought",
        html: `
            <textarea id="note-pad" placeholder="Jot down a dream or a future idea..."></textarea>
            <p style="font-size:0.8rem; opacity:0.7;">(Saved to your session)</p>
        `
    }
};

function changeMood(mood) {
    const container = document.getElementById('widget-container');
    const title = document.getElementById('mood-title');
    const body = document.getElementById('app-body');

   
    body.className = mood + "-mode";
    title.innerText = moodTools[mood].title;

    
    container.innerHTML = moodTools[mood].html;


    clearInterval(timerInterval);
}

let timerInterval;
let isRunning = false;
function toggleTimer() {
    const btn = document.getElementById('start-btn');
    if (isRunning) {
        clearInterval(timerInterval);
        btn.innerText = "Resume";
        isRunning = false;
    } else {
        let time = 25 * 60;
        isRunning = true;
        btn.innerText = "Pause";
        timerInterval = setInterval(() => {
            time--;
            let mins = Math.floor(time / 60);
            let secs = time % 60;
            document.getElementById('timer').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (time <= 0) {
                clearInterval(timerInterval);
                alert("Session Complete! Take a break.");
            }
        }, 1000);
    }
}


function generatePalette() {
    const colors = ['#ff9a9e', '#fad0c4', '#a1c4fd', '#76b852', '#8e44ad', '#f39c12'];
    const box = document.getElementById('palette-box');
    box.innerHTML = '';
    for(let i=0; i<3; i++) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        box.innerHTML += `<div style="width:50px; height:50px; border-radius:10px; background:${randomColor}; border:2px solid white;"></div>`;
    }
}

function saveGoal() {
    const input = document.getElementById('goal-input');
    const display = document.getElementById('goal-display');
    if(input.value) {
        display.innerHTML = `<h3 style="margin-top:10px;"> ${input.value}</h3>`;
        input.style.display = 'none';
    }
}
function goHome() {
    const container = document.getElementById('widget-container');
    const title = document.getElementById('mood-title');
    document.body.className = "default-mode";
    
    title.innerText = "Choose Your Vibe";
    container.innerHTML = `
        <div class="placeholder-content">
            <p>Click a sticker below to load your tools.</p>
        </div>
    `;
}