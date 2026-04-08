// 1. Unified Data
const insights = [
    { quote: "No one is dumb who is curious.  The people who don't ask questions remain clueless throughout their lives.", author: "The Laughing Philosophress" },
    { quote: "My middle name is Curiosity.", author: "The Laughing Philosophress" },
    { quote: "Be like water", author: "Bruce Lee" },
    { quote: "A river doesn't fight, it flows. Stress arises when you resist reality.", author: "The Laughing Philosophress" },
    { quote: "Don't fight. Win.", author: "Thaddeus Holmes, Shidoshi" },
    { quote: "Humor is the sound of suffering meeting grace.", author: "The Laughing Philosophress" },
    { quote: "Do not seek that the things which happen should happen as you wish; but wish the things which happen to be as they are.", author: "Epictetus" },
    { quote: "You have power over your mind, not outside events.", author: "Marcus Aurelius" },
    { quote: "Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.", author: "Lao Tzu" },
    { quote: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
    { quote: "I'm not allowed to rush. I give you permission to be gentle.", author: "The Laughing Philosophress" }
];

// 2. Helper: Copy Function
async function handleCopy(text, btnElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalContent = btnElement.innerHTML;
        btnElement.innerHTML = '<span class="text-teal-600 font-bold">Copied!</span>';
        setTimeout(() => { 
            btnElement.innerHTML = originalContent; 
            if (window.lucide) lucide.createIcons(); 
        }, 2000);
    } catch (err) {
        console.error('Copy failed', err);
    }
}

// 3. Generator Logic
function generateWisdom() {
    const textEl = document.getElementById('wisdom-text');
    if (!textEl) return;
    
    textEl.style.opacity = '0';
    setTimeout(() => {
        const item = insights[Math.floor(Math.random() * insights.length)];
        textEl.textContent = `"${item.quote}" — ${item.author}`;
        textEl.style.opacity = '1';
    }, 300);
}

// 4. Random Insight Logic (Mid-page)
let lastIdx = -1;
function showRandomInsight() {
    const textEl = document.getElementById('insightText');
    const authorEl = document.getElementById('insightAuthor');
    if (!textEl || !authorEl) return;

    let idx;
    do {
        idx = Math.floor(Math.random() * insights.length);
    } while (idx === lastIdx);
    lastIdx = idx;

    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';

    setTimeout(() => {
        textEl.textContent = `"${insights[idx].quote}"`;
        authorEl.textContent = `— ${insights[idx].author}`;
        textEl.style.opacity = '1';
        authorEl.style.opacity = '1';
    }, 350);
}

// 5. Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) { lucide.createIcons(); }

    // Hero Copy Button
    const copyBtn = document.getElementById('copyHeroBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const text = document.getElementById('wisdom-text').textContent;
            handleCopy(text, copyBtn);
        });
    }

    // Mid-page Random Button
    const insightBtn = document.getElementById('insightBtn');
    if (insightBtn) {
        insightBtn.addEventListener('click', showRandomInsight);
    }

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }

    // Initial Hero Load
    setTimeout(generateWisdom, 800);
});
