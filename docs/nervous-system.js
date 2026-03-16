const STRATEGIES = [
    {
        id: 'shake',
        title: 'The Wet Dog Shake',
        tagline: 'Shake it off. Literally.',
        description: 'Stand up. Shake your hands. Shake your legs. Wiggle your spine. Let your head bobble. Do it for 30 seconds.',
        science: 'Animals shake to discharge adrenaline after a threat. This "somatic shaking" signals your amygdala that the danger is over, releasing trapped tension from the body.',
        duration: 30,
        bg: '#e0f2fe',
        accent: '#0284c7',
        btn: '#0369a1',
        ring: '#0284c7',
        icon: 'shake'
    },
    {
        id: 'laugh',
        title: 'The Fake Laugh',
        tagline: "Fake it 'til you make it.",
        description: 'Force a loud "HA! HA! HA!". Keep going until it feels so awkward you start laughing for real.',
        science: "Your body can't distinguish between simulated and real laughter. Both engage the diaphragm and trigger endorphins, lowering cortisol instantly.",
        duration: 45,
        bg: '#fef9c3',
        accent: '#ca8a04',
        btn: '#a16207',
        ring: '#ca8a04',
        icon: 'laugh'
    },
    {
        id: 'voo',
        title: 'The "Voo" Sound',
        tagline: 'Be a human foghorn.',
        description: 'Inhale deeply. Exhale making a low, vibrating "VOOOOOO" sound. Feel it rumble in your belly.',
        science: 'Low-frequency vibration stimulates the Vagus Nerve, physically flipping your system from "fight or flight" to "rest and digest".',
        duration: 60,
        bg: '#f3e8ff',
        accent: '#9333ea',
        btn: '#7e22ce',
        ring: '#9333ea',
        icon: 'voo'
    },
    {
        id: 'gum',
        title: 'Isochronal Chewing',
        tagline: 'Trick your primal brain.',
        description: 'Try at least 3 minutes now. Pop a piece of gum (or pretend to) and chew rhythmically and intentionally.',
        science: "Chewing with an even pace (isochronal) for 10-15 minutes can signal safety to your nervous system. chewing stimulates the trigeminal nerve, which has a calming effect.",
        duration: 180,
        bg: '#fce7f3',
        accent: '#db2777',
        btn: '#be185d',
        ring: '#db2777',
        icon: 'gum'
    },
    {
        id: 'wall',
        title: 'Legs Up The Wall',
        tagline: 'Get inverted.',
        description: 'Lie on the floor, butt against the wall, legs straight up. Breathe slowly. Rest here.',
        science: 'This inversion (Viparita Karani) physically shifts blood flow, slows heart rate, and makes it nearly impossible to maintain a high-panic state.',
        duration: 120,
        bg: '#ecfccb',
        accent: '#65a30d',
        btn: '#4d7c0f',
        ring: '#65a30d',
        icon: 'wall'
    }
];

// SVG Icon Renderer
function renderIcon(type, animating) {
    const a = animating;
    switch(type) {
        case 'shake':
            return `<svg viewBox="0 0 100 100" class="w-28 h-28 ${a ? 'animate-shake' : ''}"><circle cx="50" cy="50" r="45" fill="#e0f2fe"/><path d="M35 65 Q 50 80 65 65" stroke="#0284c7" stroke-width="3" fill="none"/><circle cx="35" cy="45" r="5" fill="#0284c7"/><circle cx="65" cy="45" r="5" fill="#0284c7"/><path d="M20 50 Q 10 40 15 30" stroke="#0284c7" stroke-width="3" fill="none"/><path d="M80 50 Q 90 40 85 30" stroke="#0284c7" stroke-width="3" fill="none"/></svg>`;
        case 'laugh':
            return `<svg viewBox="0 0 100 100" class="w-28 h-28"><circle cx="50" cy="50" r="45" fill="#fef9c3"/><path d="M30 60 Q 50 90 70 60" fill="#ca8a04"/><path d="M30 40 L 40 45 L 30 50" fill="none" stroke="#ca8a04" stroke-width="3"/><path d="M70 40 L 60 45 L 70 50" fill="none" stroke="#ca8a04" stroke-width="3"/></svg>`;
        case 'voo':
            return `<svg viewBox="0 0 100 100" class="w-28 h-28"><circle cx="50" cy="50" r="45" fill="#f3e8ff"/><circle cx="50" cy="50" r="10" fill="#9333ea"/></svg>`;
        case 'gum':
            return `<svg viewBox="0 0 100 100" class="w-28 h-28"><circle cx="50" cy="50" r="45" fill="#fce7f3"/><circle cx="50" cy="50" r="${a ? '0' : '15'}" fill="#f472b6"></circle><path d="M30 55 Q 50 ${a ? '82' : '78'} 70 55" fill="none" stroke="#db2777" stroke-width="3"></path></svg>`;
        case 'wall':
            return `<svg viewBox="0 0 100 100" class="w-28 h-28"><rect x="0" y="0" width="100" height="100" fill="#ecfccb" rx="10"/><line x1="5" y1="80" x2="95" y2="80" stroke="#65a30d" stroke-width="2"/><line x1="80" y1="5" x2="80" y2="80" stroke="#65a30d" stroke-width="2"/><path d="M40 80 L 75 80 L 75 30" fill="none" stroke="#365314" stroke-width="4" stroke-linecap="round"/><circle cx="35" cy="80" r="5" fill="#365314"/></svg>`;
    }
}

// App State
let current = 0;
let timerActive = false;
let timerInterval = null;
let isFlipped = false;
let isFinished = false;
let timeLeft = STRATEGIES[0].duration;

function renderCard() {
    const s = STRATEGIES[current];
    document.getElementById('cardTitle').textContent = s.title;
    document.getElementById('cardTagline').textContent = s.tagline;
    document.getElementById('cardDesc').textContent = s.description;
    document.getElementById('cardScience').textContent = s.science;
    document.getElementById('cardColor').style.backgroundColor = s.bg;
    document.getElementById('playBtn').style.backgroundColor = s.btn;
    document.getElementById('timerCircle').style.stroke = s.ring;
    document.getElementById('counter').textContent = `${current + 1} / ${STRATEGIES.length}`;
    
    // Render Dots
    document.getElementById('dots').innerHTML = STRATEGIES.map((_, i) => 
        `<div class="w-2 h-2 rounded-full ${i === current ? 'bg-teal-600 w-4' : 'bg-gray-200'} transition-all duration-300"></div>`
    ).join('');
    
    updateTimerUI();
}

function updateTimerUI() {
    const s = STRATEGIES[current];
    const percent = (timeLeft / s.duration) * 226;
    document.getElementById('timerCircle').style.strokeDashoffset = 226 - percent;
    document.getElementById('timerDisplay').textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
    document.getElementById('playLabel').textContent = isFinished ? 'Restart' : (timerActive ? 'Pause' : 'Start');
    document.getElementById('finishedMsg').classList.toggle('hidden', !isFinished);
    document.getElementById('timerDisplay').classList.toggle('hidden', isFinished);
    document.getElementById('iconArea').innerHTML = renderIcon(s.icon, timerActive);
}

function toggleTimer() {
    if (isFinished) { resetTimer(); return; }
    timerActive = !timerActive;
    if (timerActive) {
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                timeLeft = 0; timerActive = false; isFinished = true;
                clearInterval(timerInterval);
            }
            updateTimerUI();
        }, 1000);
    } else {
        clearInterval(timerInterval);
    }
    updateTimerUI();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerActive = false; isFinished = false;
    timeLeft = STRATEGIES[current].duration;
    updateTimerUI();
}

function flipCard() {
    isFlipped = !isFlipped;
    document.getElementById('cardInner').classList.toggle('flipped', isFlipped);
}

function nextCard() { current = (current + 1) % STRATEGIES.length; resetTimer(); renderCard(); }
function prevCard() { current = (current - 1 + STRATEGIES.length) % STRATEGIES.length; resetTimer(); renderCard(); }

// THE CSP FIX: Handle clicks globally without needing onclick in HTML
document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const text = btn.innerText.toUpperCase();
    if (text.includes('WHY IT WORKS') || text.includes('BACK TO EXERCISE') || btn.id === 'backBtn') flipCard();
    if (text.includes('NEXT')) nextCard();
    if (text.includes('PREV')) prevCard();
    if (btn.id === 'playBtn') toggleTimer();
    if (btn.id === 'resetBtn') resetTimer();
});

// Initialization
renderCard();
