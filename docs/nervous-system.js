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
                science: "Chewing with an even pace (isochronal) for 10-15 minutes can signal safety to your nervous system.\n\nTrigeminal Nerve Activity: chewing stimulates the trigeminal nerve, which has a calming effect on the brainstem and helps lower the body's overall stress response.\n\nProprioceptive Input: The jaw is a powerful muscle, and repetitive, rhythmic movement provides calming proprioceptive input to the brain, which is especially effective for reducing feelings of being overwhelmed.",
                duration: 180,
                durations: [180, 600],
                durationLabels: ['3 min', '10 min'],
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

        // SVG Icons
        function renderIcon(type, animating) {
            const a = animating;
            switch(type) {
                case 'shake':
                    return `<svg viewBox="0 0 100 100" class="w-28 h-28 ${a ? 'animate-shake' : ''}">
                        <circle cx="50" cy="50" r="45" fill="#e0f2fe"/>
                        <path d="M35 65 Q 50 80 65 65" stroke="#0284c7" stroke-width="3" fill="none"/>
                        <circle cx="35" cy="45" r="5" fill="#0284c7"/>
                        <circle cx="65" cy="45" r="5" fill="#0284c7"/>
                        <path d="M20 50 Q 10 40 15 30" stroke="#0284c7" stroke-width="3" fill="none"/>
                        <path d="M80 50 Q 90 40 85 30" stroke="#0284c7" stroke-width="3" fill="none"/>
                        ${a ? '<circle cx="20" cy="28" r="3" fill="#0ea5e9" opacity="0.7"><animate attributeName="r" values="2;5;2" dur="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0;0.7" dur="1s" repeatCount="indefinite"/></circle><circle cx="80" cy="28" r="3" fill="#0ea5e9" opacity="0.7"><animate attributeName="r" values="2;5;2" dur="1s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0;0.7" dur="1s" begin="0.4s" repeatCount="indefinite"/></circle>' : ''}
                    </svg>`;
                case 'laugh':
                    return `<svg viewBox="0 0 100 100" class="w-28 h-28">
                        <circle cx="50" cy="50" r="45" fill="#fef9c3"/>
                        <path d="M30 60 Q 50 90 70 60" fill="#ca8a04"/>
                        <path d="M30 40 L 40 45 L 30 50" fill="none" stroke="#ca8a04" stroke-width="3"/>
                        <path d="M70 40 L 60 45 L 70 50" fill="none" stroke="#ca8a04" stroke-width="3"/>
                        ${a ? `
                        <text x="8" y="30" font-size="12" font-weight="bold" fill="#ca8a04"><animate attributeName="y" values="30;25;30" dur="0.6s" repeatCount="indefinite"/>HA!</text>
                        <text x="68" y="22" font-size="12" font-weight="bold" fill="#ca8a04"><animate attributeName="y" values="22;17;22" dur="0.6s" begin="0.2s" repeatCount="indefinite"/>HA!</text>
                        <text x="74" y="78" font-size="10" font-weight="bold" fill="#ca8a04"><animate attributeName="y" values="78;73;78" dur="0.6s" begin="0.4s" repeatCount="indefinite"/>ha!</text>
                        ` : ''}
                    </svg>`;
                case 'voo':
                    return `<svg viewBox="0 0 100 100" class="w-28 h-28">
                        <circle cx="50" cy="50" r="45" fill="#f3e8ff"/>
                        <circle cx="50" cy="50" r="10" fill="#9333ea"/>
                        ${a ? `
                        <circle cx="50" cy="50" r="10" fill="none" stroke="#a855f7" stroke-width="2" class="animate-ping-slow"/>
                        <circle cx="50" cy="50" r="10" fill="none" stroke="#a855f7" stroke-width="2" class="animate-ping-slow-delay"/>
                        <text x="50" y="92" text-anchor="middle" font-size="8" fill="#7e22ce" font-family="monospace">VOOOOOOO</text>
                        ` : ''}
                    </svg>`;
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
