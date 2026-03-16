                case 'gum':
                    return `<svg viewBox="0 0 100 100" class="w-28 h-28">
                        <circle cx="50" cy="50" r="45" fill="#fce7f3"/>
                        <circle cx="50" cy="50" r="${a ? '0' : '15'}" fill="#f472b6">
                            ${a ? '<animate attributeName="r" values="0;22;25;0" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>' : ''}
                        </circle>
                        <path d="M30 55 Q 50 ${a ? '82' : '78'} 70 55" fill="none" stroke="#db2777" stroke-width="3">
                            ${a ? '<animate attributeName="d" values="M30 55 Q 50 78 70 55;M30 55 Q 50 90 70 55;M30 55 Q 50 78 70 55" dur="0.8s" repeatCount="indefinite"/>' : ''}
                        </path>
                    </svg>`;
                case 'wall':
                    return `<svg viewBox="0 0 100 100" class="w-28 h-28">
                        <rect x="0" y="0" width="100" height="100" fill="#ecfccb" rx="10"/>
                        <line x1="5" y1="80" x2="95" y2="80" stroke="#65a30d" stroke-width="2"/>
                        <line x1="80" y1="5" x2="80" y2="80" stroke="#65a30d" stroke-width="2"/>
                        <path d="M40 80 L 75 80 L 75 30" fill="none" stroke="#365314" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="35" cy="80" r="5" fill="#365314"/>
                        ${a ? '<path d="M70 35 L 70 55" stroke="#365314" stroke-width="2" stroke-dasharray="4 2" class="animate-flow"/>' : ''}
                    </svg>`;
            }
        }

        // State
        let current = 0;
        let timerActive = false;
        let timeLeft = STRATEGIES[0].duration;
        let timerInterval = null;
        let isFlipped = false;
        let isFinished = false;

        function renderDots() {
            const el = document.getElementById('dots');
            el.innerHTML = STRATEGIES.map((_, i) => 
                `<button onclick="goTo(${i})" class="w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gray-800 w-4' : 'bg-gray-300'}"></button>`
            ).join('');
        }

        function updateTimerRing() {
            const s = STRATEGIES[current];
            const circle = document.getElementById('timerCircle');
            const circumference = 226;
            const progress = timeLeft / s.duration;
            circle.style.strokeDashoffset = circumference - (circumference * progress);
            circle.style.stroke = s.ring;
        }

        function formatTime(s) {
            const m = Math.floor(s / 60);
            const sec = s % 60;
            return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
        }

        function renderCard() {
            const s = STRATEGIES[current];
            document.getElementById('counter').textContent = `${current + 1} / ${STRATEGIES.length}`;
            document.getElementById('cardTitle').textContent = s.title;
            document.getElementById('cardTagline').textContent = s.tagline;
            document.getElementById('cardDesc').textContent = s.description;
            // Science: render line breaks as paragraphs
            document.getElementById('cardScience').innerHTML = s.science.split('\n\n').map(p => `<p class="mb-3">${p}</p>`).join('');
            document.getElementById('cardColor').style.backgroundColor = s.bg;
            document.getElementById('timerDisplay').textContent = formatTime(timeLeft);
            document.getElementById('playBtn').style.backgroundColor = s.btn;
            document.getElementById('iconArea').innerHTML = renderIcon(s.icon, timerActive);
            document.getElementById('cardFront').classList.add('card-fade');
            setTimeout(() => document.getElementById('cardFront').classList.remove('card-fade'), 400);

            // Duration selector
            const selector = document.getElementById('durationSelector');
            if (s.durations) {
                selector.style.removeProperty('display');
                selector.innerHTML = s.durations.map((d, i) =>
                    `<button onclick="setDuration(${d})" id="dur-${d}"
                        class="px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${timeLeft === d ? 'text-white' : 'bg-white/60 text-gray-700 border-transparent hover:bg-white/90'}"
                        style="${timeLeft === d ? `background-color:${s.btn};border-color:${s.btn}` : ''}"
                    >${s.durationLabels[i]}</button>`
                ).join('');
            } else {
                selector.style.display = 'none';
            }

            updateTimerRing();
            renderDots();
        }

        function setDuration(d) {
            clearInterval(timerInterval);
            timerActive = false;
            isFinished = false;
            timeLeft = d;
            // Also update the strategy's default duration for reset purposes
            STRATEGIES[current].duration = d;
            renderCard();
            updateTimerUI();
        }

        function updateTimerUI() {
            const el = document.getElementById('timerDisplay');
            el.textContent = formatTime(timeLeft);
            el.className = timerActive ? 'text-2xl font-mono font-bold tabular-nums animate-countdown' : 'text-2xl font-mono font-bold tabular-nums';
            updateTimerRing();

            // Play/pause icon
            const icon = document.getElementById('playIcon');
            const label = document.getElementById('playLabel');
            if (timerActive) {
                icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
                label.textContent = 'Pause';
            } else if (isFinished) {
                icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
                label.textContent = 'Again?';
            } else {
                icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
                label.textContent = 'Start';
            }

            // Reset button visibility
            const resetBtn = document.getElementById('resetBtn');
            if (timeLeft !== STRATEGIES[current].duration || isFinished) {
                resetBtn.classList.remove('hidden');
                resetBtn.classList.add('flex');
            } else {
                resetBtn.classList.add('hidden');
                resetBtn.classList.remove('flex');
            }

            // Finished message
            document.getElementById('finishedMsg').classList.toggle('hidden', !isFinished);
            document.getElementById('timerDisplay').classList.toggle('hidden', isFinished);

            // Animate icon
            document.getElementById('iconArea').innerHTML = renderIcon(STRATEGIES[current].icon, timerActive);
        }

        function toggleTimer() {
            if (isFinished) {
                resetTimer();
                return;
            }
            timerActive = !timerActive;
            if (timerActive) {
                timerInterval = setInterval(() => {
                    timeLeft--;
                    if (timeLeft <= 0) {
                        timeLeft = 0;
                        timerActive = false;
                        isFinished = true;
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
            timerActive = false;
            isFinished = false;
            timeLeft = STRATEGIES[current].duration;
            updateTimerUI();
        }

        function flipCard() {
            isFlipped = !isFlipped;
            document.getElementById('cardInner').classList.toggle('flipped', isFlipped);
        }

        function goTo(idx) {
            clearInterval(timerInterval);
            timerActive = false;
            isFinished = false;
            current = idx;
            timeLeft = STRATEGIES[current].duration;
            isFlipped = false;
            document.getElementById('cardInner').classList.remove('flipped');
            renderCard();
            updateTimerUI();
        }

        function nextCard() { goTo((current + 1) % STRATEGIES.length); }
        function prevCard() { goTo((current - 1 + STRATEGIES.length) % STRATEGIES.length); }

        // Swipe support
        let touchStartX = 0;
        document.getElementById('cardScene').addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
        document.getElementById('cardScene').addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? nextCard() : prevCard();
        });

        // Init
        renderCard();
        updateTimerUI();
