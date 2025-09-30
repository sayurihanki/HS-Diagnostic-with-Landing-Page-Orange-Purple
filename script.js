// Hell Diagnostic JavaScript

// Global variables
let currentQuestion = 0;
let answers = [];
let userName = '';
let userAge = 0;

// Live clock functionality for modern dashboard
function updateLiveClock() {
    const now = new Date();
    const options = { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Enhanced form validation for modern dashboard
function validateModernForm(name, age) {
    if (!age || age < 13 || age > 100) {
        return {
            valid: false,
            message: 'Please enter a valid age between 13 and 100.'
        };
    }
    
    return {
        valid: true,
        name: name.trim() || 'Anonymous',
        age: parseInt(age)
    };
}

// Question data with scoring weights for different hell dimensions
const questions = [
    {
        text: "What kind of dreams do you often have when you're asleep? Please select the one that best matches your experience:",
        options: [
            { text: "Dreams of sharing joy with those around me", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } },
            { text: "Dreams of being in a peaceful world", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } },
            { text: "Dark and lonely dreams", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "Dreams of being chased", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 3, greed: 1 } },
            { text: "Dreams of being placed in difficult circumstances", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 2, greed: 2 } },
            { text: "None of the above or I don't remember", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 1 } }
        ]
    },
    {
        text: "I think there are many evil people around me.",
        options: [
            { text: "Applies", scores: { anger: 4, lust: 1, jealousy: 3, isolation: 3, greed: 2 } },
            { text: "Somewhat applies", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "None at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "I feel reassured when I see others performing worse than me in work or study.",
        options: [
            { text: "Applies", scores: { anger: 2, lust: 1, jealousy: 4, isolation: 1, greed: 2 } },
            { text: "Somewhat applies", scores: { anger: 1, lust: 1, jealousy: 3, isolation: 1, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 2, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 0 } },
            { text: "Does not apply", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you find yourself remembering past arguments or events and feeling that same anger all over again?",
        options: [
            { text: "Applies", scores: { anger: 4, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "Somewhat applies", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 1, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Does not apply", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you feel frustrated or angry when your opinions are not accepted?",
        options: [
            { text: "I feel frustrated or angry", scores: { anger: 4, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I sometimes feel frustrated or angry", scores: { anger: 3, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "I hardly feel frustrated or angry", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Have you ever been ridiculed or belittled in the past, and are unable to forget it?",
        options: [
            { text: "Applies", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 3, greed: 1 } },
            { text: "Somewhat applies", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Is there someone you hate so much that you want to kill them?",
        options: [
            { text: "Applies", scores: { anger: 5, lust: 2, jealousy: 3, isolation: 2, greed: 2 } },
            { text: "Somewhat applies", scores: { anger: 4, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you worry that your partner might cheat on you?",
        options: [
            { text: "Always worried", scores: { anger: 2, lust: 2, jealousy: 4, isolation: 2, greed: 1 } },
            { text: "Sometimes worried", scores: { anger: 1, lust: 2, jealousy: 3, isolation: 1, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 2, isolation: 1, greed: 1 } },
            { text: "A little worried", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not worried at all/Does not apply", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you view romantic relationships as a game?",
        options: [
            { text: "Always", scores: { anger: 2, lust: 4, jealousy: 3, isolation: 2, greed: 3 } },
            { text: "Sometimes", scores: { anger: 1, lust: 3, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 2, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Not really", scores: { anger: 0, lust: 1, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you prioritize emotional connection above all else in romantic relationships?",
        options: [
            { text: "Strongly agree", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } },
            { text: "Somewhat agree", scores: { anger: 0, lust: 1, jealousy: 1, isolation: 0, greed: 0 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 2, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Somewhat disagree", scores: { anger: 1, lust: 3, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "Not at all", scores: { anger: 2, lust: 4, jealousy: 2, isolation: 2, greed: 3 } }
        ]
    },
    {
        text: "Do you sometimes seek temporary pleasure in romantic relationships?",
        options: [
            { text: "Applies", scores: { anger: 2, lust: 4, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "Somewhat applies", scores: { anger: 1, lust: 3, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 2, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 1, jealousy: 1, isolation: 0, greed: 0 } },
            { text: "Not at all/Does not apply", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you prioritize your own pleasure in romantic relationships?",
        options: [
            { text: "Always prioritize", scores: { anger: 3, lust: 4, jealousy: 3, isolation: 2, greed: 3 } },
            { text: "Sometimes prioritize", scores: { anger: 2, lust: 3, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 2, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Do not prioritize", scores: { anger: 0, lust: 1, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Not at all/Does not apply", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Are you afraid to speak your mind?",
        options: [
            { text: "Always afraid", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "Sometimes afraid", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 3, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Hardly afraid", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not afraid at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you hold back your true feelings because you worry about how others will react?",
        options: [
            { text: "Applies", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "Somewhat applies", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 3, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you feel misunderstood by others?",
        options: [
            { text: "Always feel misunderstood", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "Sometimes feel misunderstood", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 3, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Hardly feel misunderstood", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you often feel stressed when communicating with others?",
        options: [
            { text: "Always stressed", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "Sometimes stressed", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 3, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Not very stressed", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you sometimes wish to sever all relationships with others?",
        options: [
            { text: "Applies", scores: { anger: 3, lust: 2, jealousy: 2, isolation: 5, greed: 2 } },
            { text: "Somewhat applies", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you feel tempted to post harsh comments online under the anonymity of social media?",
        options: [
            { text: "Often", scores: { anger: 4, lust: 2, jealousy: 3, isolation: 3, greed: 2 } },
            { text: "Occasionally", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Rarely", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Never", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Have you ever posted negative comments anonymously online?",
        options: [
            { text: "Often", scores: { anger: 4, lust: 2, jealousy: 3, isolation: 3, greed: 2 } },
            { text: "Occasionally", scores: { anger: 3, lust: 1, jealousy: 2, isolation: 2, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 2, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Rarely", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 0 } },
            { text: "Never", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you believe that gaining the approval of many followers is a form of justice?",
        options: [
            { text: "Strongly agree", scores: { anger: 3, lust: 2, jealousy: 3, isolation: 2, greed: 3 } },
            { text: "Agree", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Somewhat disagree", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 1, greed: 1 } },
            { text: "Strongly disagree", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you sometimes feel envious of others' homes, cars, possessions, or status?",
        options: [
            { text: "Often", scores: { anger: 2, lust: 2, jealousy: 4, isolation: 2, greed: 4 } },
            { text: "Sometimes", scores: { anger: 1, lust: 1, jealousy: 3, isolation: 1, greed: 3 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 2, isolation: 1, greed: 2 } },
            { text: "Rarely", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Never", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you have negative emotions when hearing about others' success stories?",
        options: [
            { text: "Strongly applies", scores: { anger: 3, lust: 1, jealousy: 4, isolation: 2, greed: 3 } },
            { text: "Somewhat applies", scores: { anger: 2, lust: 1, jealousy: 3, isolation: 1, greed: 2 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 2, isolation: 1, greed: 1 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Even if others have worked hard for it, do you think you are lucky if you can obtain it easily?",
        options: [
            { text: "Applies", scores: { anger: 2, lust: 2, jealousy: 3, isolation: 1, greed: 4 } },
            { text: "Somewhat applies", scores: { anger: 1, lust: 1, jealousy: 2, isolation: 1, greed: 3 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 2 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you think it's best if you can get great results with little effort?",
        options: [
            { text: "Agree", scores: { anger: 2, lust: 2, jealousy: 2, isolation: 1, greed: 4 } },
            { text: "Somewhat agree", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 3 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 2 } },
            { text: "Somewhat disagree", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Strongly disagree", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you feel a strong attraction to gambling, lotteries, or other one-shot chances?",
        options: [
            { text: "Applies", scores: { anger: 2, lust: 3, jealousy: 2, isolation: 2, greed: 4 } },
            { text: "Somewhat applies", scores: { anger: 1, lust: 2, jealousy: 1, isolation: 1, greed: 3 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 2 } },
            { text: "Hardly applies", scores: { anger: 0, lust: 1, jealousy: 0, isolation: 0, greed: 1 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "I am someone who wants to buy things that I cannot pay with cash, such as cars and electronics, with loans or credit cards to get it as quickly as possible.",
        options: [
            { text: "Agree", scores: { anger: 2, lust: 2, jealousy: 2, isolation: 1, greed: 4 } },
            { text: "Somewhat agree", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 3 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 1, greed: 2 } },
            { text: "Somewhat disagree", scores: { anger: 0, lust: 0, jealousy: 1, isolation: 0, greed: 1 } },
            { text: "Not at all", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    },
    {
        text: "Do you sometimes feel like you want to die?",
        options: [
            { text: "I still feel that way", scores: { anger: 3, lust: 2, jealousy: 3, isolation: 5, greed: 2 } },
            { text: "I still feel that way sometimes", scores: { anger: 2, lust: 1, jealousy: 2, isolation: 4, greed: 1 } },
            { text: "I can't say either way", scores: { anger: 1, lust: 1, jealousy: 1, isolation: 2, greed: 1 } },
            { text: "Not now but in the past", scores: { anger: 1, lust: 0, jealousy: 1, isolation: 2, greed: 0 } },
            { text: "Never", scores: { anger: 0, lust: 0, jealousy: 0, isolation: 0, greed: 0 } }
        ]
    }
];

// Hell types and descriptions
const hellTypes = {
    anger: {
        name: "Asura Hell (Hell of Fighting)",
        description: "A realm of constant conflict and rage, where anger consumes the soul.",
        color: "#dc143c"
    },
    lust: {
        name: "Hell of Lust (Hell of the Bloody Pond)",
        description: "A place where desires lead to suffering and endless craving.",
        color: "#ff1493"
    },
    jealousy: {
        name: "Hell of Jealousy",
        description: "A realm where envy and resentment poison the spirit.",
        color: "#9932cc"
    },
    isolation: {
        name: "The Abysmal Hell",
        description: "The deepest darkness where souls are trapped in eternal loneliness.",
        color: "#000080"
    },
    greed: {
        name: "Hell of Hungry Ghosts",
        description: "A realm of insatiable hunger and material obsession.",
        color: "#ff4500"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeLandingPage();
});

// Landing Page Functions
function initializeLandingPage() {
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeNavigation();
}

function initializeSmoothScrolling() {
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Floating cards parallax
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.3 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeNavigation() {
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAssessment() {
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
        assessmentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


function initializeApp() {
    // Initialize live clock for modern dashboard
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // Set up form submission
    const form = document.getElementById('user-info-form');
    form.addEventListener('submit', startTest);

    // Set up navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);

    // Set up restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartTest);
    }

    // Set up share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }

    // Set up floating action button
    setupFloatingActionButton();

    // Set up intersection observer for animations
    setupIntersectionObserver();

    // Update question counter
    document.getElementById('total-q').textContent = questions.length;
}

function setupIntersectionObserver() {
    // Only set up observer if on landing page to avoid conflicts
    if (!document.getElementById('landing-page')) return;
    
    // Optimized observer for better scroll performance
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('card-animate');
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initially hide cards that should animate in
    const cardsToObserve = document.querySelectorAll('.modern-card:not(.featured-assessment-card), .modern-input-section');
    cardsToObserve.forEach((card, index) => {
        // Only animate cards after the featured card
        if (index > 0) {
            card.classList.add('card-animate');
            observer.observe(card);
        }
    });
}

function setupFloatingActionButton() {
    const fabMain = document.getElementById('fab-main');
    const fabOptions = document.getElementById('fab-options');
    const fabRestart = document.getElementById('fab-restart');
    const fabTop = document.getElementById('fab-top');
    const fabShare = document.getElementById('fab-share');

    if (fabMain && fabOptions) {
        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
            fabOptions.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.floating-menu')) {
                fabMain.classList.remove('active');
                fabOptions.classList.remove('show');
            }
        });
    }

    if (fabRestart) {
        fabRestart.addEventListener('click', () => {
            restartTest();
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        });
    }

    if (fabTop) {
        fabTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        });
    }

    if (fabShare) {
        fabShare.addEventListener('click', () => {
            shareResults();
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        });
    }

    // Show/hide floating menu based on page
    updateFloatingMenuVisibility();
}

function updateFloatingMenuVisibility() {
    const floatingMenu = document.getElementById('floating-menu');
    const resultsPage = document.getElementById('results-page');
    
    if (floatingMenu && resultsPage) {
        if (resultsPage.classList.contains('active')) {
            floatingMenu.style.display = 'block';
        } else {
            floatingMenu.style.display = 'none';
        }
    }
}

function startTest(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    
    const validation = validateModernForm(nameInput.value, ageInput.value);
    
    if (!validation.valid) {
        // Modern alert styling could be added here
        alert(validation.message);
        return;
    }
    
    userName = validation.name;
    userAge = validation.age;
    
    // Initialize answers array
    answers = new Array(questions.length).fill(null);
    currentQuestion = 0;
    
    // Switch to questions page
    switchPage('landing-page', 'questions-page');
    displayQuestion();
}

function switchPage(fromPage, toPage) {
    const from = document.getElementById(fromPage);
    const to = document.getElementById(toPage);
    
    from.classList.remove('active');
    to.classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function displayQuestion() {
    const question = questions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('question-options');
    const currentQSpan = document.getElementById('current-q');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Update question text and counter
    questionText.textContent = question.text;
    currentQSpan.textContent = currentQuestion + 1;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create options
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option.text;
        optionBtn.addEventListener('click', () => selectOption(index));
        
        // Check if this option was previously selected
        if (answers[currentQuestion] === index) {
            optionBtn.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionBtn);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = answers[currentQuestion] === null;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
}

function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    // Update visual selection
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
        btn.classList.toggle('selected', index === optionIndex);
    });
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    if (answers[currentQuestion] !== null) {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            // Test completed
            calculateResults();
        }
    }
}

function calculateResults() {
    // Initialize scores
    const scores = {
        anger: 0,
        lust: 0,
        jealousy: 0,
        isolation: 0,
        greed: 0
    };
    
    // Calculate scores based on answers
    answers.forEach((answerIndex, questionIndex) => {
        if (answerIndex !== null) {
            const option = questions[questionIndex].options[answerIndex];
            Object.keys(scores).forEach(dimension => {
                scores[dimension] += option.scores[dimension] || 0;
            });
        }
    });
    
    // Calculate total score and percentages
    const maxPossibleScore = questions.length * 5; // Maximum score per dimension
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const hellProbability = Math.min(Math.round((totalScore / (maxPossibleScore * 5)) * 100), 100);
    
    // Determine primary hell type
    const primaryHell = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // Sort hell types by score
    const sortedHells = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .filter(([_, score]) => score > 0);
    
    // Switch to results page and display results
    switchPage('questions-page', 'results-page');
    displayResults(hellProbability, scores, primaryHell, sortedHells);
    
    // Update floating menu visibility
    updateFloatingMenuVisibility();
}

function displayResults(hellProbability, scores, primaryHell, sortedHells) {
    // Initialize Advanced Dashboard
    initializeAdvancedDashboard(hellProbability, scores, sortedHells);
    
    // Update user info in new format
    const userNameDiv = document.getElementById('results-user-name');
    userNameDiv.textContent = `Name: ${userName}`;
    
    // Animate hell probability with new design
    animateAdvancedHellProbability(hellProbability);
    
    // Update assessment description based on probability
    updateAssessmentDescription(hellProbability);
    
    // Update risk level
    updateRiskLevel(hellProbability);
    
    // Display soul dimensions with new design
    displaySoulDimensions(scores);
    
    // Create soul composition chart
    createSoulChart(scores);
    
    // Display hell destinations with new format
    displayAdvancedHellDestinations(sortedHells);
    
    // Initialize spiritual metrics
    initializeSpiritualMetrics(hellProbability, scores);
    
    // Setup real-time clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Animate result cards
    animateResultCards();
    
    // Initialize advanced interactive features
    setTimeout(() => {
        initializeAdvancedInteractions();
    }, 1000);
}

function animateHellProbability(probability) {
    const percentageElement = document.getElementById('hell-percentage');
    let currentPercentage = 0;
    const increment = probability / 50; // Animate over ~2 seconds
    
    const animation = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= probability) {
            currentPercentage = probability;
            clearInterval(animation);
            
            // Also animate the modern gauge if it exists
            if (window.advancedDashboard) {
                window.advancedDashboard.animateHellProbabilityGauge(probability);
            }
        }
        percentageElement.textContent = Math.round(currentPercentage);
    }, 40);
}

function updateRiskLevel(probability) {
    const riskElement = document.getElementById('risk-level');
    let riskLevel, riskClass;
    
    if (probability < 25) {
        riskLevel = 'LOW';
        riskClass = 'risk-low';
    } else if (probability < 50) {
        riskLevel = 'MEDIUM';
        riskClass = 'risk-medium';
    } else if (probability < 75) {
        riskLevel = 'HIGH';
        riskClass = 'risk-high';
    } else {
        riskLevel = 'EXTREME';
        riskClass = 'risk-extreme';
    }
    
    riskElement.textContent = riskLevel;
    riskElement.className = `risk-level ${riskClass}`;
}

function updateSimilarSouls(probability) {
    const similarSoulsElement = document.getElementById('similar-souls');
    // Simulate based on probability (higher probability = more similar souls)
    const baseSouls = Math.floor(Math.random() * 10000) + 1000;
    const adjustedSouls = Math.floor(baseSouls * (probability / 100) + Math.random() * 5000);
    
    let currentCount = 0;
    const targetCount = adjustedSouls;
    const increment = targetCount / 100;
    
    const animation = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(animation);
        }
        similarSoulsElement.textContent = Math.floor(currentCount).toLocaleString();
    }, 20);
}

function updateRedemptionPotential(probability) {
    const redemptionElement = document.getElementById('redemption-level');
    let redemptionLevel;
    
    if (probability < 30) {
        redemptionLevel = 'HIGH';
    } else if (probability < 60) {
        redemptionLevel = 'MODERATE';
    } else {
        redemptionLevel = 'CHALLENGING';
    }
    
    redemptionElement.textContent = redemptionLevel;
}

function displaySoulDimensions(scores) {
    const container = document.getElementById('dimensions-container');
    container.innerHTML = '';
    
    const maxScore = Math.max(...Object.values(scores), 1);
    const dimensions = [
        { key: 'anger', label: '🔥 Anger & Wrath', color: '#dc143c' },
        { key: 'lust', label: '💕 Lust & Desire', color: '#ff1493' },
        { key: 'jealousy', label: '💚 Jealousy & Envy', color: '#9932cc' },
        { key: 'isolation', label: '🌑 Isolation & Despair', color: '#000080' },
        { key: 'greed', label: '💰 Greed & Materialism', color: '#ff4500' }
    ];
    
    dimensions.forEach((dimension, index) => {
        const score = scores[dimension.key];
        const percentage = Math.round((score / maxScore) * 100) || 0;
        
        const dimensionDiv = document.createElement('div');
        dimensionDiv.className = 'dimension-item';
        dimensionDiv.innerHTML = `
            <div class="dimension-label">${dimension.label}</div>
            <div class="dimension-bar">
                <div class="dimension-fill" style="background: linear-gradient(90deg, ${dimension.color}, ${dimension.color}cc)"></div>
            </div>
            <div class="dimension-value">${score}</div>
        `;
        
        container.appendChild(dimensionDiv);
        
        // Animate the bar after a delay
        setTimeout(() => {
            const fillElement = dimensionDiv.querySelector('.dimension-fill');
            fillElement.style.width = `${percentage}%`;
        }, index * 200 + 500);
    });
}

function createSoulChart(scores) {
    const chartCanvas = document.getElementById('soul-chart');
    if (!chartCanvas) {
        console.error('Chart canvas not found');
        return;
    }
    
    // Ensure Chart.js is loaded before creating chart
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        // Fallback: create a custom CSS-based pie chart
        createFallbackChart(scores);
        return;
    }
    
    // Clear any existing chart instance
    if (window.soulChartInstance) {
        window.soulChartInstance.destroy();
        window.soulChartInstance = null;
    }
    
    const ctx = chartCanvas.getContext('2d');
    const validScores = Object.values(scores).map(score => Math.max(0, score || 0));
    const totalScore = validScores.reduce((sum, score) => sum + score, 0);
    
    if (totalScore === 0) {
        displayPureSoulMessage(chartCanvas);
        return;
    }
    
    // Enhanced chart configuration
    try {
        window.soulChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['🔥 Anger & Wrath', '💕 Lust & Desire', '💚 Jealousy & Envy', '🌑 Isolation & Despair', '💰 Greed & Materialism'],
                datasets: [{
                    data: validScores,
                    backgroundColor: [
                        'rgba(220, 20, 60, 0.8)',    // Crimson
                        'rgba(255, 20, 147, 0.8)',   // Deep Pink
                        'rgba(153, 50, 204, 0.8)',   // Dark Orchid
                        'rgba(0, 0, 139, 0.8)',      // Dark Blue
                        'rgba(255, 69, 0, 0.8)'      // Red Orange
                    ],
                    borderColor: '#1a1a1a',
                    borderWidth: 3,
                    hoverBorderWidth: 5,
                    hoverOffset: 15,
                    hoverBackgroundColor: [
                        'rgba(220, 20, 60, 1)',
                        'rgba(255, 20, 147, 1)',
                        'rgba(153, 50, 204, 1)',
                        'rgba(0, 0, 139, 1)',
                        'rgba(255, 69, 0, 1)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                resizeDelay: 0,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            font: { size: 12, weight: '600' },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 26, 0.95)',
                        titleColor: '#ff6b35',
                        bodyColor: '#ffffff',
                        borderColor: '#ff6b35',
                        borderWidth: 2,
                        callbacks: {
                            label: (context) => {
                                const percentage = ((context.parsed / totalScore) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} pts (${percentage}%)`;
                            }
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeInOutCubic'
                },
                interaction: {
                    intersect: false,
                    mode: 'point'
                },
                elements: {
                    arc: {
                        borderWidth: 2,
                        borderColor: '#2a2a2a'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating chart:', error);
        createFallbackChart(scores);
    }
}

// Add fallback chart function
function createFallbackChart(scores) {
    const chartCanvas = document.getElementById('soul-chart');
    const container = chartCanvas.parentElement;
    
    const scoreEntries = Object.entries(scores);
    const maxScore = Math.max(...Object.values(scores));
    const labels = ['🔥 Anger & Wrath', '💕 Lust & Desire', '💚 Jealousy & Envy', '🌑 Isolation & Despair', '💰 Greed & Materialism'];
    const colors = ['#dc143c', '#ff1493', '#9932cc', '#000080', '#ff4500'];
    
    container.innerHTML = `
        <div class="fallback-chart" style="
            width: 300px;
            height: 300px;
            margin: 0 auto;
            position: relative;
            border-radius: 50%;
            background: conic-gradient(
                ${colors[0]} 0deg ${(scoreEntries[0][1]/maxScore) * 72}deg,
                ${colors[1]} ${(scoreEntries[0][1]/maxScore) * 72}deg ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore) * 72}deg,
                ${colors[2]} ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore) * 72}deg ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore + scoreEntries[2][1]/maxScore) * 72}deg,
                ${colors[3]} ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore + scoreEntries[2][1]/maxScore) * 72}deg ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore + scoreEntries[2][1]/maxScore + scoreEntries[3][1]/maxScore) * 72}deg,
                ${colors[4]} ${(scoreEntries[0][1]/maxScore + scoreEntries[1][1]/maxScore + scoreEntries[2][1]/maxScore + scoreEntries[3][1]/maxScore) * 72}deg 360deg
            );
            box-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
        ">
            <div class="chart-center" style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120px;
                height: 120px;
                background: #1a1a1a;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ff6b35;
                font-weight: bold;
                font-size: 1.1rem;
            ">Soul Map</div>
        </div>
        <div class="chart-legend" style="
            margin-top: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            text-align: left;
        ">
            ${labels.map((label, index) => `
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #ffffff;
                    font-size: 0.9rem;
                ">
                    <div style="
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: ${colors[index]};
                    "></div>
                    <span>${label}: ${Object.values(scores)[index]}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function displayPureSoulMessage(chartCanvas) {
    const container = chartCanvas.parentElement;
    container.innerHTML = `
        <div style="
            text-align: center;
            color: #ffffff;
            padding: 3rem;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1), rgba(255, 255, 255, 0.05));
            border-radius: 20px;
            border: 2px solid rgba(255, 215, 0, 0.3);
        ">
            <h3 style="color: #ffd700; margin-bottom: 1rem; font-size: 2rem;">🌟 Pure Soul Detected!</h3>
            <p style="font-size: 1.1rem; line-height: 1.6;">Your soul shows remarkable purity with minimal negative tendencies.</p>
            <p style="font-size: 1rem; color: #e0e0e0; margin-top: 1rem;">Continue on your righteous path! ✨</p>
        </div>
    `;
}

function displayHellDestinations(sortedHells) {
    const container = document.getElementById('hell-destinations');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (sortedHells.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 2rem;"><h3>😇 Blessed Soul</h3><p>Your soul shows remarkable purity with no hell destinations detected!</p></div>';
        return;
    }
    
    sortedHells.forEach(([hellType, score], index) => {
        const hell = hellTypes[hellType];
        const isPrimary = index === 0;
        const maxScore = sortedHells[0][1];
        const percentage = ((score / maxScore) * 100).toFixed(1);
        
        const hellDiv = document.createElement('div');
        hellDiv.className = `hell-item ${isPrimary ? 'primary' : ''}`;
        hellDiv.innerHTML = `
            <div class="hell-rank">${isPrimary ? '🥇 Primary Hell:' : `${getOrdinal(index + 1)} Hell:`}</div>
            <div class="hell-name">${hell.name}</div>
            <div class="hell-description">${hell.description}</div>
            <div class="hell-score">
                <div class="hell-score-bar">
                    <div class="hell-score-fill" style="width: 0%; background: ${hell.color}; transition: width 1.5s ease ${index * 0.3}s;"></div>
                </div>
                <span class="hell-score-text">Intensity: ${score}/${maxScore} (${percentage}%)</span>
            </div>
        `;
        
        container.appendChild(hellDiv);
        
        // Animate the score bar
        setTimeout(() => {
            const fillElement = hellDiv.querySelector('.hell-score-fill');
            fillElement.style.width = `${percentage}%`;
        }, 500 + (index * 300));
        
        // Add interactive effects
        hellDiv.addEventListener('click', () => {
            // Remove selection from other items
            container.querySelectorAll('.hell-item').forEach(item => item.classList.remove('selected'));
            // Select this item
            hellDiv.classList.add('selected');
            
            // Add pulse effect
            hellDiv.style.transform = 'scale(0.98)';
            setTimeout(() => {
                hellDiv.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    hellDiv.style.transform = '';
                }, 200);
            }, 100);
        });
        
        // Add hover sound effect simulation
        hellDiv.addEventListener('mouseenter', () => {
            hellDiv.style.filter = 'brightness(1.1)';
        });
        
        hellDiv.addEventListener('mouseleave', () => {
            hellDiv.style.filter = '';
        });
    });
}

function getOrdinal(num) {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th'];
    return ordinals[num - 1] || `${num}th`;
}

function animateResultCards() {
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
}

function displaySoulSummary(hellProbability, scores, sortedHells) {
    const container = document.getElementById('soul-summary');
    if (!container) return;
    
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore > 0 ? (totalScore / Object.keys(scores).length).toFixed(1) : 0;
    const dominantHell = sortedHells.length > 0 ? hellTypes[sortedHells[0][0]].name : 'None';
    const purityLevel = hellProbability < 25 ? 'High' : hellProbability < 50 ? 'Moderate' : hellProbability < 75 ? 'Low' : 'Critical';
    
    container.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">Overall Hell Risk</span>
            <span class="summary-value">${hellProbability}%</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Soul Purity Level</span>
            <span class="summary-value">${purityLevel}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Dominant Tendency</span>
            <span class="summary-value">${dominantHell.split(' ')[0]}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Average Dimension Score</span>
            <span class="summary-value">${averageScore}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Test Completion</span>
            <span class="summary-value">✓ Complete</span>
        </div>
    `;
    
    // Add click interactions to summary items
    const summaryItems = container.querySelectorAll('.summary-item');
    summaryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            }, 100);
        });
    });
}

function shareResults() {
    const hellPercentage = document.getElementById('hell-percentage')?.textContent || '0';
    const riskLevel = document.getElementById('risk-level')?.textContent || 'UNKNOWN';
    
    const shareText = `🔥 Hell Diagnostic Results 🔥\n\n` +
                     `Hell Probability: ${hellPercentage}%\n` +
                     `Risk Level: ${riskLevel}\n` +
                     `Name: ${userName}\n\n` +
                     `Discover your soul's path at Hell Diagnostic! ⚡`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Hell Diagnostic Results',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showTemporaryMessage('Results copied to clipboard! 📋');
        }).catch(() => {
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showTemporaryMessage('Results copied to clipboard! 📋');
    } catch (err) {
        showTemporaryMessage('Sharing not supported. Screenshot your results! 📸');
    }
    document.body.removeChild(textarea);
}

function showTemporaryMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border: 2px solid var(--accent-orange);
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(255, 69, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

function restartTest() {
    // Clean up any existing chart instances
    if (window.soulChartInstance) {
        window.soulChartInstance.destroy();
        window.soulChartInstance = null;
    }
    
    // Reset all variables
    currentQuestion = 0;
    answers = [];
    userName = '';
    userAge = 0;
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    
    // Switch back to landing page
    switchPage('results-page', 'landing-page');
    
    // Update floating menu visibility
    updateFloatingMenuVisibility();
}

// Enhanced interactive features
function addInteractiveFeatures() {
    // Pulsing animation for high-risk elements
    const hellPercentage = parseInt(document.getElementById('hell-percentage')?.textContent || '0');
    
    if (hellPercentage > 70) {
        const probabilityCard = document.querySelector('.main-card');
        if (probabilityCard) {
            probabilityCard.classList.add('critical-warning');
        }
    }
    
    // Click-to-expand hell destinations
    document.querySelectorAll('.hell-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Add detailed explanation
            if (!this.querySelector('.detailed-explanation')) {
                const explanation = document.createElement('div');
                explanation.className = 'detailed-explanation';
                explanation.innerHTML = getDetailedHellExplanation(this.dataset.hellType || 'general');
                this.appendChild(explanation);
            }
        });
    });
    
    // Add tooltips to dimension items
    addDimensionTooltips();
}

function getDetailedHellExplanation(hellType) {
    const explanations = {
        anger: `
            <h4>🔥 Path to Redemption from Anger</h4>
            <ul>
                <li>Practice daily meditation and mindfulness</li>
                <li>Learn conflict resolution techniques</li>
                <li>Cultivate forgiveness and compassion</li>
                <li>Channel anger into positive action</li>
            </ul>
        `,
        lust: `
            <h4>💕 Path to Redemption from Lust</h4>
            <ul>
                <li>Develop deeper emotional connections</li>
                <li>Practice self-control and discipline</li>
                <li>Focus on spiritual and intellectual growth</li>
                <li>Seek healthy, committed relationships</li>
            </ul>
        `,
        jealousy: `
            <h4>💚 Path to Redemption from Jealousy</h4>
            <ul>
                <li>Practice gratitude and appreciation</li>
                <li>Celebrate others' successes genuinely</li>
                <li>Focus on personal growth and achievements</li>
                <li>Build self-confidence and self-worth</li>
            </ul>
        `,
        isolation: `
            <h4>🌑 Path to Redemption from Isolation</h4>
            <ul>
                <li>Gradually reconnect with supportive people</li>
                <li>Join community groups or activities</li>
                <li>Practice open communication</li>
                <li>Seek professional help if needed</li>
            </ul>
        `,
        greed: `
            <h4>💰 Path to Redemption from Greed</h4>
            <ul>
                <li>Practice generosity and charity</li>
                <li>Focus on experiences over possessions</li>
                <li>Cultivate contentment and gratitude</li>
                <li>Set meaningful non-material goals</li>
            </ul>
        `,
        general: `
            <h4>✨ General Path to Redemption</h4>
            <ul>
                <li>Focus on spiritual growth and self-reflection</li>
                <li>Practice compassion and kindness</li>
                <li>Engage in positive actions and thoughts</li>
                <li>Seek wisdom through study and contemplation</li>
            </ul>
        `
    };
    
    return explanations[hellType] || explanations.general;
}

function addDimensionTooltips() {
    // Add hover tooltips for dimension explanations
    const dimensionItems = document.querySelectorAll('.dimension-item');
    dimensionItems.forEach(item => {
        const label = item.querySelector('.dimension-label')?.textContent;
        if (label) {
            item.title = `Click for detailed analysis of ${label.replace(/[🔥💕💚🌑💰]/g, '').trim()}`;
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                item.style.transform = 'translateX(15px) scale(1.02)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 300);
            });
        }
    });
}

// Add click effects to result cards
document.addEventListener('click', function(e) {
    if (e.target.closest('.result-card')) {
        const card = e.target.closest('.result-card');
        card.style.transform = 'translateY(-5px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }
});

// ======= ADVANCED DASHBOARD FUNCTIONALITY =======

// Advanced Dashboard Controller
class AdvancedHellDiagnosis {
    constructor() {
        this.hellProbability = 0;
        this.invocationCount = 0;
        this.reflectionScore = 50;
        this.spiritualVibration = 4.0;
        this.currentView = 'dashboard';
        this.sessionData = {
            reflectionTimer: 0,
            reflectionTimerInterval: null,
            invocationSession: 0,
            dailySessions: 1,
            totalReflectionTime: 0
        };
        
        // Initialize real-time clock
        this.startClock();
        this.reflectionPrompts = [
            {
                title: "Examine Your Daily Actions",
                text: "Reflect deeply on your actions today. Did you act with love and compassion toward others? Were there moments when ego, pride, or selfishness guided your decisions? Remember, honest self-reflection is the key to spiritual purification."
            },
            {
                title: "Your Relationships with Others", 
                text: "How did you treat the people in your life today? Did you listen with genuine care? Were you patient, understanding, and forgiving? Or did jealousy, criticism, or indifference cloud your interactions?"
            },
            {
                title: "Material Attachments and Desires",
                text: "What material things occupied your thoughts today? Money, possessions, status, or appearances? Examine how these earthly attachments might be preventing your spiritual growth and connection to divine truth."
            },
            {
                title: "Thoughts of Anger and Resentment",
                text: "Did anger arise in your heart today? Toward whom, and why? Anger and resentment are heavy burdens that lower your spiritual vibration. Can you find forgiveness and release these negative emotions?"
            },
            {
                title: "Acts of Love and Service",
                text: "How did you serve others today without expecting anything in return? True spiritual growth comes from selfless love and compassionate action. What opportunities for service did you embrace or miss?"
            }
        ];
        this.currentPromptIndex = 0;
    }

    init(hellProbability, scores, sortedHells) {
        this.hellProbability = hellProbability;
        this.scores = scores;
        this.sortedHells = sortedHells;
        
        // Calculate initial spiritual vibration based on hell probability
        this.spiritualVibration = Math.max(3.0, 6.0 - (hellProbability / 20));
        
        this.setupNavigationSystem();
        this.setupAdvancedInteractions();
        this.startRealTimeUpdates();
    }

    setupNavigationSystem() {
        // Navigation between interfaces
        document.getElementById('access-fourth-dim')?.addEventListener('click', () => {
            this.navigateToInterface('fourth-dimension-interface');
        });

        document.getElementById('deep-reflection')?.addEventListener('click', () => {
            this.navigateToInterface('deep-reflection-interface');
            this.startReflectionTimer();
        });

        document.getElementById('invoke-el-cantare')?.addEventListener('click', () => {
            this.performInvocation();
        });

        // Return to dashboard buttons
        document.getElementById('return-dashboard')?.addEventListener('click', () => {
            this.navigateToInterface('dashboard');
        });
        document.getElementById('return-dashboard-2')?.addEventListener('click', () => {
            this.navigateToInterface('dashboard');
            this.stopReflectionTimer();
        });
        document.getElementById('return-dashboard-3')?.addEventListener('click', () => {
            this.navigateToInterface('dashboard');
        });

        // Setup individual interfaces
        this.setupFourthDimensionInterface();
        this.setupDeepReflectionInterface(); 
        this.setupElCantareInterface();
        this.setupSpiritualActions();
    }

    navigateToInterface(targetInterface) {
        // Hide all interfaces
        const mainDashboard = document.querySelector('#results-page .container');
        const spiritualInterfaces = document.querySelectorAll('.spiritual-interface');
        
        if (targetInterface === 'dashboard') {
            mainDashboard.style.display = 'block';
            spiritualInterfaces.forEach(el => el.style.display = 'none');
        } else {
            mainDashboard.style.display = 'none';
            spiritualInterfaces.forEach(el => {
                el.style.display = el.id === targetInterface ? 'block' : 'none';
            });
        }
        
        this.currentView = targetInterface;
        window.scrollTo(0, 0);
    }

    setupFourthDimensionInterface() {
        // Assessment questions
        document.querySelectorAll('.assessment-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                const value = e.target.dataset.value;
                
                // Remove active class from siblings
                e.target.parentElement.querySelectorAll('.assessment-option').forEach(sibling => {
                    sibling.classList.remove('btn-primary');
                    sibling.classList.add('btn-ghost');
                });
                
                // Make clicked button active
                e.target.classList.remove('btn-ghost');
                e.target.classList.add('btn-primary');
                
                this.processAssessmentAnswer(question, value);
            });
        });

        // Dimension exploration
        document.getElementById('explore-higher')?.addEventListener('click', () => {
            this.exploreHigherDimension();
        });

        // Spiritual guide buttons
        document.querySelectorAll('.spiritual-guide-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const guide = e.target.dataset.guide;
                this.showSpiritualGuide(guide);
            });
        });
    }

    setupDeepReflectionInterface() {
        // Next prompt button
        document.getElementById('next-prompt')?.addEventListener('click', () => {
            this.nextReflectionPrompt();
        });

        // Deeper guidance button
        document.getElementById('deeper-guidance')?.addEventListener('click', () => {
            this.provideDeeperGuidance();
        });

        // Reflection topic buttons
        document.querySelectorAll('.reflection-topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = e.target.dataset.topic;
                this.loadReflectionTopic(topic);
            });
        });

        // Save session
        document.getElementById('save-session')?.addEventListener('click', () => {
            this.saveReflectionSession();
        });

        // Complete reflection
        document.getElementById('complete-reflection')?.addEventListener('click', () => {
            this.completeReflectionSession();
        });
    }

    setupElCantareInterface() {
        // Begin invocation (interface version)
        document.getElementById('begin-invocation')?.addEventListener('click', () => {
            this.beginInvocationPractice();
        });

        // Guided practice
        document.getElementById('guided-practice')?.addEventListener('click', () => {
            this.startGuidedInvocation();
        });
    }

    setupSpiritualActions() {
        // Spiritual action buttons
        const actions = [
            'meditation-session', 'compassion-practice', 'study-laws',
            'karmic-repair', 'dimension-travel', 'spiritual-protection'
        ];

        actions.forEach(actionId => {
            document.getElementById(actionId)?.addEventListener('click', () => {
                this.performSpiritualAction(actionId);
            });
        });

        // Reflection journal functionality
        const reflectionText = document.getElementById('reflection-text');
        if (reflectionText) {
            reflectionText.addEventListener('input', (e) => {
                this.updateWordCount(e.target.value);
            });
        }

        document.getElementById('save-reflection')?.addEventListener('click', () => {
            this.saveReflection();
        });

        document.getElementById('ai-analysis')?.addEventListener('click', () => {
            this.performAIAnalysis();
        });

        // Modal close
        document.getElementById('modal-close')?.addEventListener('click', () => {
            this.closeModal();
        });
    }

    setupAdvancedInteractions() {
        // Real-time Fourth Dimension updates
        document.getElementById('access-fourth-dim')?.addEventListener('click', () => {
            this.updateFourthDimensionStats();
        });
    }

    startReflectionTimer() {
        this.sessionData.reflectionTimer = 0;
        this.sessionData.reflectionTimerInterval = setInterval(() => {
            this.sessionData.reflectionTimer++;
            const minutes = Math.floor(this.sessionData.reflectionTimer / 60);
            const seconds = this.sessionData.reflectionTimer % 60;
            const timerElement = document.getElementById('reflection-timer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    stopReflectionTimer() {
        if (this.sessionData.reflectionTimerInterval) {
            clearInterval(this.sessionData.reflectionTimerInterval);
            this.sessionData.reflectionTimerInterval = null;
        }
    }

    performInvocation() {
        this.invocationCount++;
        const progress = (this.invocationCount / 108) * 100;
        
        // Update displays
        document.getElementById('invocation-count').textContent = this.invocationCount;
        document.getElementById('invocation-progress').style.width = Math.min(progress, 100) + '%';
        
        // Update light received
        const lightReceived = (this.invocationCount * 0.1).toFixed(1);
        document.getElementById('light-received').textContent = lightReceived + 'kLx';
        
        // Update connection strength
        if (this.invocationCount > 20) {
            document.getElementById('divine-connection').textContent = 'Strong';
        } else if (this.invocationCount > 50) {
            document.getElementById('divine-connection').textContent = 'Profound';
            document.getElementById('divine-connection').className = 'metric-value text-divine';
        }
        
        // Update last invocation time
        document.getElementById('last-invocation').textContent = 'Just now';
        
        // Increase spiritual vibration slightly
        this.spiritualVibration += 0.01;
        this.updateSpiritualVibration();
        
        this.showModal('🙏', 'El Cantare Invoked', `Your spiritual light has increased. Daily progress: ${this.invocationCount}/108 invocations.`);
    }

    processAssessmentAnswer(question, value) {
        // Process spiritual assessment and adjust metrics
        let adjustment = 0;
        
        if (question === '1') {
            const adjustments = { 'always': 0.1, 'often': 0.05, 'sometimes': 0, 'rarely': -0.05 };
            adjustment = adjustments[value];
        }
        
        this.spiritualVibration += adjustment;
        this.updateSpiritualVibration();
        
        // Add new guardian message
        const messages = {
            'always': "Your selfless nature shines brightly. This is the path of the bodhisattva.",
            'often': "You show great compassion. Continue to put others before yourself.",
            'rarely': "Consider how you can serve others more selflessly. This is the path to spiritual growth."
        };
        
        if (messages[value]) {
            this.addGuardianMessage(messages[value], "Guardian Spirit Michael");
        }
    }

    exploreHigherDimension() {
        if (this.spiritualVibration >= 5.0) {
            document.getElementById('current-dimension').textContent = 'Current Location: Fifth Dimension';
            document.getElementById('dimension-population').textContent = '800 million souls';
            this.showModal('🌟', 'Fifth Dimension Accessed', 'You have ascended to the Fifth Dimension - the Realm of Good Spirits. Here, souls live in harmony and continue their spiritual education.');
        } else {
            this.showModal('⚠️', 'Insufficient Spiritual Vibration', `Your current vibration of ${this.spiritualVibration.toFixed(1)}Hz is not yet sufficient for Fifth Dimension access. Continue your spiritual practice to reach 5.0Hz.`);
        }
    }

    nextReflectionPrompt() {
        this.currentPromptIndex = (this.currentPromptIndex + 1) % this.reflectionPrompts.length;
        const prompt = this.reflectionPrompts[this.currentPromptIndex];
        
        document.getElementById('current-prompt-title').textContent = prompt.title;
        document.getElementById('current-prompt-text').textContent = prompt.text;
        
        // Clear the journal for new reflection
        document.getElementById('reflection-journal').value = '';
    }

    loadReflectionTopic(topic) {
        const topics = {
            'relationships': {
                title: "Examining Your Relationships",
                text: "Reflect on how you treat the people in your life. Are you patient, kind, and understanding? Do you listen with genuine care, or do you judge and criticize? Consider how you can embody more love and compassion in your relationships."
            },
            'work': {
                title: "Your Work and Life Purpose", 
                text: "Is your work serving others and contributing to the betterment of society? Are you using your talents to create value and help people? Or are you primarily motivated by money, status, and personal gain? Reflect on how to align your career with spiritual purpose."
            },
            'anger': {
                title: "Releasing Anger and Resentment",
                text: "What situations or people triggered anger in you recently? Examine the root causes - was it wounded pride, unmet expectations, or feelings of injustice? Anger lowers your spiritual vibration. Practice forgiveness and release these negative emotions."
            },
            'pride': {
                title: "Overcoming Pride and Ego",
                text: "When did pride influence your thoughts or actions? Did you seek recognition, feel superior to others, or resist admitting mistakes? Pride is a major obstacle to spiritual growth. Cultivate humility and recognize your true place in the universe."
            },
            'material': {
                title: "Material Attachments and Desires",
                text: "What material things do you crave or cling to? Money, possessions, comfort, or security? Examine how these attachments create suffering and distance you from spiritual truth. Practice gratitude for what you have and generosity toward others."
            },
            'forgiveness': {
                title: "The Practice of Forgiveness",
                text: "Who do you need to forgive - others or yourself? What grudges or guilt are you carrying? Forgiveness is not about condoning harmful actions, but about freeing your own soul from the burden of resentment. Release the past with love."
            }
        };
        
        if (topics[topic]) {
            document.getElementById('current-prompt-title').textContent = topics[topic].title;
            document.getElementById('current-prompt-text').textContent = topics[topic].text;
        }
    }

    saveReflectionSession() {
        const journalText = document.getElementById('reflection-journal').value;
        if (journalText.trim().length > 50) {
            this.reflectionScore = Math.min(100, this.reflectionScore + 2);
            this.sessionData.dailySessions++;
            this.sessionData.totalReflectionTime += Math.floor(this.sessionData.reflectionTimer / 60);
            
            // Update displays
            document.getElementById('reflection-score').textContent = this.reflectionScore.toFixed(1) + '%';
            document.getElementById('reflection-meter').style.width = this.reflectionScore + '%';
            document.getElementById('daily-sessions').textContent = this.sessionData.dailySessions;
            document.getElementById('total-reflection-time').textContent = this.sessionData.totalReflectionTime + ' minutes';
            
            this.showModal('📝', 'Reflection Session Saved', 'Your spiritual insights have been recorded. Through honest self-examination, you are purifying your soul and raising your vibration.');
        } else {
            this.showModal('⚠️', 'Reflection Too Brief', 'Please write a more detailed reflection. Deep spiritual examination requires honest, thorough introspection.');
        }
    }

    completeReflectionSession() {
        this.spiritualVibration += 0.05;
        this.updateSpiritualVibration();
        
        // Reset timer
        this.sessionData.reflectionTimer = 0;
        
        this.showModal('✨', 'Reflection Session Complete', 'You have completed a deep reflection session. Your spiritual vibration has increased, and you are one step closer to enlightenment.');
    }

    performSpiritualAction(actionId) {
        const actions = {
            'meditation-session': {
                icon: '🧘‍♀️',
                title: 'Meditation Session Complete',
                message: 'Your mind is now calm and centered. Spiritual clarity has increased significantly.',
                vibrationIncrease: 0.05
            },
            'compassion-practice': {
                icon: '❤️',
                title: 'Compassion Practice Complete',
                message: 'By practicing loving-kindness, you have opened your heart and raised your spiritual vibration.',
                vibrationIncrease: 0.03
            },
            'study-laws': {
                icon: '📚',
                title: 'Laws of Hell Study Complete',
                message: 'Knowledge of spiritual laws helps you avoid hellish states. Wisdom level increased.',
                vibrationIncrease: 0.02
            },
            'karmic-repair': {
                icon: '🔧',
                title: 'Karmic Repair Activated',
                message: 'Past mistakes are being healed through sincere repentance. Karmic weight reduced.',
                vibrationIncrease: 0.04
            },
            'dimension-travel': {
                icon: '🚀',
                title: 'Dimension Travel Initiated',
                message: 'You have briefly visited higher spiritual realms. Your consciousness has expanded.',
                vibrationIncrease: 0.1
            },
            'spiritual-protection': {
                icon: '🛡️',
                title: 'Spiritual Protection Activated',
                message: 'Divine protection surrounds you. Negative influences are being repelled.',
                vibrationIncrease: 0.01
            }
        };

        const action = actions[actionId];
        if (action) {
            this.spiritualVibration += action.vibrationIncrease;
            this.updateSpiritualVibration();
            
            // Update karmic repairs count
            if (actionId === 'karmic-repair') {
                const current = parseInt(document.getElementById('karmic-repairs').textContent);
                document.getElementById('karmic-repairs').textContent = current + 1;
            }
            
            this.showModal(action.icon, action.title, action.message);
        }
    }

    updateSpiritualVibration() {
        const vibrationElement = document.getElementById('current-vibration');
        if (vibrationElement) {
            vibrationElement.textContent = this.spiritualVibration.toFixed(1) + 'Hz';
        }
        
        const percentage = (this.spiritualVibration / 6) * 100; // Max 6Hz for display
        const vibrationMeter = document.getElementById('vibration-meter');
        if (vibrationMeter) {
            vibrationMeter.style.width = Math.min(percentage, 100) + '%';
        }
        
        // Update dimension level
        const dimensionElement = document.getElementById('dimension-level');
        if (dimensionElement) {
            if (this.spiritualVibration >= 5.0) {
                dimensionElement.textContent = 'Fifth Dimension';
                dimensionElement.className = 'metric-value text-divine';
            } else if (this.spiritualVibration >= 4.0) {
                dimensionElement.textContent = 'Fourth Dimension';
                dimensionElement.className = 'metric-value text-success';
            } else {
                dimensionElement.textContent = 'Third Dimension';
                dimensionElement.className = 'metric-value text-warning';
            }
        }
        
        // Update hell probability (inverse relationship)
        this.hellProbability = Math.max(0.1, 15 - (this.spiritualVibration * 2));
        const hellPercentageElement = document.getElementById('hell-percentage');
        if (hellPercentageElement) {
            hellPercentageElement.textContent = this.hellProbability.toFixed(1);
        }
    }
    
    // Real-time clock functionality
    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }
    
    updateClock() {
        const now = new Date();
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        const dateOptions = { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric'
        };
        
        // Update all clock elements
        const timeElements = document.querySelectorAll('#current-time, #clock-time');
        const dateElements = document.querySelectorAll('#current-date, #clock-date');
        
        timeElements.forEach(el => {
            if (el) el.textContent = now.toLocaleTimeString('en-US', timeOptions);
        });
        
        dateElements.forEach(el => {
            if (el) el.textContent = now.toLocaleDateString('en-US', dateOptions);
        });
    }
    
    // Enhanced gauge animation for hell probability
    animateHellProbabilityGauge(percentage) {
        const gaugeElement = document.getElementById('gauge-fill');
        if (gaugeElement) {
            // Calculate rotation based on percentage (0-360 degrees)
            const rotation = (percentage / 100) * 360;
            gaugeElement.style.transform = `rotate(${rotation}deg)`;
            gaugeElement.style.transition = 'transform 2s ease-out';
        }
    }
    
    // Toggle dimension view between chart and list
    toggleDimensionView(view) {
        const chartView = document.getElementById('soul-radar');
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        
        toggleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === view) {
                btn.classList.add('active');
            }
        });
        
        if (view === 'chart') {
            if (chartView) chartView.style.display = 'block';
        } else {
            if (chartView) chartView.style.display = 'block'; // Keep showing for now
        }
    }
    
    // Animate composition orb
    animateComposition() {
        const orb = document.getElementById('orb-layers');
        if (orb) {
            orb.style.animationDuration = '2s';
            setTimeout(() => {
                orb.style.animationDuration = '10s';
            }, 2000);
        }
    }

    updateWordCount(text) {
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordCountElement = document.getElementById('word-count');
        if (wordCountElement) {
            wordCountElement.textContent = wordCount;
        }
    }

    saveReflection() {
        const reflectionText = document.getElementById('reflection-text').value;
        if (reflectionText.trim().length > 50) {
            this.reflectionScore = Math.min(100, this.reflectionScore + 1);
            const reflectionScoreElement = document.getElementById('reflection-score');
            const reflectionMeterElement = document.getElementById('reflection-meter');
            if (reflectionScoreElement) {
                reflectionScoreElement.textContent = this.reflectionScore.toFixed(1) + '%';
            }
            if (reflectionMeterElement) {
                reflectionMeterElement.style.width = this.reflectionScore + '%';
            }
            
            this.showModal('📝', 'Reflection Saved', 'Your spiritual insights have been recorded. Self-reflection score has increased.');
        } else {
            this.showModal('⚠️', 'Reflection Too Short', 'Please write a more detailed reflection for meaningful spiritual growth.');
        }
    }

    performAIAnalysis() {
        const reflectionText = document.getElementById('reflection-text').value;
        if (reflectionText.trim().length > 30) {
            // Simulate AI analysis
            const insights = [
                "Your reflection shows deep self-awareness and a genuine desire for spiritual growth.",
                "You demonstrate compassion and understanding in your spiritual journey.",
                "Consider focusing more on forgiveness and releasing past grievances.",
                "Your commitment to self-improvement is commendable and will lead to spiritual advancement.",
                "Remember that true wisdom comes from recognizing our interconnectedness with all beings."
            ];
            const randomInsight = insights[Math.floor(Math.random() * insights.length)];
            this.showModal('🤖', 'AI Spiritual Analysis', randomInsight);
        } else {
            this.showModal('⚠️', 'Insufficient Content', 'Please write more in your reflection journal for meaningful AI analysis.');
        }
    }

    addGuardianMessage(message, guardian) {
        const messagesContainer = document.getElementById('guardian-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'guardian-message';
        messageDiv.style.cssText = 'margin-bottom: 16px; padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-md); border-left: 3px solid var(--accent-success);';
        messageDiv.innerHTML = `
            <p style="font-style: italic; margin: 0;">"${message}"</p>
            <small style="color: var(--text-tertiary); margin-top: 8px; display: block;">- ${guardian}</small>
        `;
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showSpiritualGuide(guide) {
        const guides = {
            'self-reflection': {
                title: 'Laws of Self-Reflection',
                message: 'Self-reflection is the foundation of spiritual growth. By honestly examining our thoughts, words, and deeds, we can identify and correct our mistakes, leading to inner purification and wisdom.'
            },
            'love': {
                title: 'The Nature of Love',
                message: 'True love is selfless, unconditional, and seeks the highest good for others. It is the fundamental force that connects all beings and the path to spiritual enlightenment.'
            },
            'karma': {
                title: 'Understanding Karma',
                message: 'Every thought, word, and action creates karmic consequences. By understanding this law, we can make conscious choices that create positive karma and avoid negative outcomes in this life and beyond.'
            },
            'enlightenment': {
                title: 'Path to Enlightenment',
                message: 'Enlightenment is the realization of your true spiritual nature and oneness with the divine. It is achieved through self-reflection, compassionate action, wisdom study, and devotion to the highest truth.'
            }
        };
        
        if (guides[guide]) {
            this.showModal('📚', guides[guide].title, guides[guide].message);
        }
    }

    provideDeeperGuidance() {
        const guidanceMessages = [
            "Consider the deeper spiritual implications of your actions. Every choice you make affects not only your present life but your eternal spiritual journey.",
            "Look beyond the surface of your emotions. What spiritual lessons are hidden within your reactions and feelings?",
            "Examine your motivations honestly. Are you acting from love and wisdom, or from ego and fear?",
            "Remember that true spiritual growth requires surrendering the false self and embracing your divine nature.",
            "Consider how your current challenges are opportunities for spiritual development and karmic healing."
        ];
        
        const randomGuidance = guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
        this.showModal('🔮', 'Deeper Spiritual Guidance', randomGuidance);
    }

    beginInvocationPractice() {
        document.getElementById('invocation-status').textContent = 'Invoking El Cantare';
        document.getElementById('invocation-instruction').textContent = 'Speak the sacred invocation with sincere devotion...';
        document.getElementById('invocation-counter-display').style.display = 'block';
        document.getElementById('invocation-controls').style.display = 'none';
        
        // Start invocation session
        this.startInvocationSession();
    }

    startInvocationSession() {
        let sessionCount = 0;
        const sessionTarget = 21; // Traditional number for focused practice
        
        const invocationInterval = setInterval(() => {
            sessionCount++;
            this.invocationCount++;
            
            // Update displays
            document.getElementById('session-count').textContent = sessionCount;
            const invocationCountElement = document.getElementById('invocation-count');
            if (invocationCountElement) {
                invocationCountElement.textContent = this.invocationCount;
            }
            
            // Update progress bars
            const sessionProgress = (sessionCount / sessionTarget) * 100;
            const dailyProgress = (this.invocationCount / 108) * 100;
            
            document.getElementById('session-progress').style.width = sessionProgress + '%';
            const invocationProgressElement = document.getElementById('invocation-progress');
            if (invocationProgressElement) {
                invocationProgressElement.style.width = Math.min(dailyProgress, 100) + '%';
            }
            
            // Update interface displays
            document.getElementById('daily-invocations-display').textContent = `${this.invocationCount}/108`;
            document.getElementById('divine-light-display').textContent = (this.invocationCount * 0.1).toFixed(1) + 'kLx';
            
            // Increase spiritual metrics
            this.spiritualVibration += 0.005;
            this.updateSpiritualVibration();
            
            // Complete session
            if (sessionCount >= sessionTarget) {
                clearInterval(invocationInterval);
                this.completeInvocationSession();
            }
        }, 3000); // Every 3 seconds for one invocation
    }

    completeInvocationSession() {
        document.getElementById('invocation-status').textContent = 'Divine Light Received';
        document.getElementById('invocation-instruction').textContent = 'You have successfully connected with Lord El Cantare. Divine protection surrounds you.';
        document.getElementById('invocation-controls').style.display = 'flex';
        document.getElementById('connection-strength').textContent = 'Profound';
        document.getElementById('spiritual-protection').textContent = 'Active';
        
        this.showModal('🙏', 'Invocation Session Complete', 'Lord El Cantare has heard your call. Divine light fills your being, and spiritual protection surrounds you. Continue your practice to deepen this connection.');
    }

    startGuidedInvocation() {
        const guidedSteps = [
            "Center yourself in a quiet space and close your eyes.",
            "Take three deep breaths and feel your connection to the divine.",
            "Visualize a golden light surrounding your heart center.",
            "Speak the invocation with sincere devotion and faith.",
            "Feel Lord El Cantare's presence and divine protection.",
            "Open your heart to receive spiritual guidance and wisdom.",
            "Express gratitude for the divine connection you have received."
        ];
        
        let stepIndex = 0;
        const nextStep = () => {
            if (stepIndex < guidedSteps.length) {
                this.showModal('🙏', `Guided Practice - Step ${stepIndex + 1}`, guidedSteps[stepIndex]);
                stepIndex++;
                setTimeout(nextStep, 4000);
            } else {
                this.showModal('✨', 'Guided Practice Complete', 'You have completed the guided invocation practice. Your connection with Lord El Cantare is now strengthened.');
            }
        };
        
        nextStep();
    }

    updateFourthDimensionStats() {
        // Simulate real-time updates
        const activities = ['High', 'Moderate', 'Intense', 'Peaceful'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const guardianCount = 12847 + Math.floor(Math.random() * 200) - 100;
        const awaitingCount = 3421 + Math.floor(Math.random() * 100) - 50;
        
        document.getElementById('reception-activity').textContent = randomActivity;
        document.getElementById('guardian-count').textContent = guardianCount.toLocaleString();
        document.getElementById('awaiting-judgment').textContent = awaitingCount.toLocaleString();
    }

    showModal(icon, title, message) {
        const modal = document.getElementById('spiritual-modal');
        if (!modal) return;
        
        document.getElementById('modal-icon').textContent = icon;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('spiritual-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    startRealTimeUpdates() {
        // Update Fourth Dimension stats periodically
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.updateFourthDimensionStats();
            }
        }, 45000);

        // Subtle spiritual vibration fluctuations
        setInterval(() => {
            if (Math.random() > 0.9) {
                this.spiritualVibration += (Math.random() - 0.5) * 0.01;
                this.spiritualVibration = Math.max(3.0, Math.min(6.0, this.spiritualVibration));
                this.updateSpiritualVibration();
            }
        }, 30000);
    }
}

// Global dashboard instance
let advancedDashboard = null;

// Initialize Advanced Dashboard
function initializeAdvancedDashboard(hellProbability, scores, sortedHells) {
    advancedDashboard = new AdvancedHellDiagnosis();
    advancedDashboard.init(hellProbability, scores, sortedHells);
}

// New animation function for advanced hell probability
function animateAdvancedHellProbability(probability) {
    const percentageElement = document.getElementById('hell-percentage');
    if (!percentageElement) return;
    
    let currentPercentage = 0;
    const increment = probability / 60; // Slower animation
    
    const animation = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= probability) {
            currentPercentage = probability;
            clearInterval(animation);
        }
        percentageElement.textContent = Math.round(currentPercentage);
    }, 50);
}

// Update assessment description based on probability
function updateAssessmentDescription(probability) {
    const descriptionElement = document.getElementById('assessment-description');
    if (!descriptionElement) return;
    
    let description, probabilityText;
    
    if (probability < 10) {
        description = "The likelihood of you falling into hell is extremely low. You are calm and composed, and you are not easily swayed by having worldly attachments. By cultivating inner peace, striving for self-improvement, and dedicating yourself to the betterment of others, you will likely return to the World of Light.";
        probabilityText = "Less than 10% - Excellent spiritual standing";
    } else if (probability < 25) {
        description = "Your spiritual foundation is quite strong. While there are some areas for improvement, your overall trajectory is positive. Continue your spiritual practices and maintain your connection to higher principles.";
        probabilityText = "Low probability - Good spiritual health";
    } else if (probability < 50) {
        description = "There are some spiritual challenges that need attention. This is an important time for self-reflection and spiritual growth. Focus on areas where negative emotions or attachments may be holding you back.";
        probabilityText = "Moderate probability - Requires attention";
    } else if (probability < 75) {
        description = "This assessment reveals significant spiritual concerns that require immediate attention. Through dedicated self-reflection, repentance, and spiritual practice, you can transform these challenges into opportunities for growth.";
        probabilityText = "High probability - Urgent spiritual work needed";
    } else {
        description = "This result indicates serious spiritual challenges, but remember that no soul is beyond redemption. With sincere repentance, dedicated spiritual practice, and the grace of divine light, even the darkest spiritual states can be transformed.";
        probabilityText = "Very high probability - Critical intervention needed";
    }
    
    descriptionElement.textContent = description;
    document.getElementById('hell-probability-text').textContent = probabilityText;
}

// Display advanced hell destinations
function displayAdvancedHellDestinations(sortedHells) {
    const container = document.getElementById('hell-destinations');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (sortedHells.length === 0 || sortedHells.every(([_, score]) => score === 0)) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-secondary); font-style: italic;">
                <span style="font-size: 1.25rem;">** N/A **</span>
                <p style="margin-top: 8px; font-size: 0.875rem;">No significant hell realms detected based on your spiritual profile</p>
            </div>
        `;
        return;
    }
    
    sortedHells.slice(0, 3).forEach(([hellType, score], index) => {
        if (score === 0) return;
        
        const hell = hellTypes[hellType];
        const maxScore = sortedHells[0][1];
        const percentage = ((score / maxScore) * 100).toFixed(1);
        
        const hellDiv = document.createElement('div');
        hellDiv.className = 'hell-realm-card';
        hellDiv.style.cssText = `
            padding: 12px; 
            background: rgba(255, 71, 87, 0.1); 
            border: 1px solid rgba(255, 71, 87, 0.3); 
            border-radius: var(--radius-md); 
            margin-bottom: 8px;
        `;
        
        hellDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.875rem; font-weight: 600;">${hell.name}</span>
                <span style="font-size: 0.75rem; color: var(--text-tertiary);">Risk: ${percentage}%</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 4px 0 0; line-height: 1.4;">${hell.description}</p>
        `;
        
        container.appendChild(hellDiv);
    });
}

// Initialize spiritual metrics
function initializeSpiritualMetrics(hellProbability, scores) {
    // Calculate base spiritual vibration
    const baseVibration = Math.max(3.0, 6.0 - (hellProbability / 20));
    
    // Update spiritual vibration display
    const vibrationElement = document.getElementById('current-vibration');
    if (vibrationElement) {
        vibrationElement.textContent = baseVibration.toFixed(1) + 'Hz';
    }
    
    // Update vibration meter
    const percentage = (baseVibration / 6) * 100;
    const vibrationMeter = document.getElementById('vibration-meter');
    if (vibrationMeter) {
        setTimeout(() => {
            vibrationMeter.style.width = Math.min(percentage, 100) + '%';
        }, 1000);
    }
    
    // Update earthbound risk
    const earthboundRisk = hellProbability > 70 ? 'High' : hellProbability > 40 ? 'Medium' : 'Low';
    const earthboundElement = document.getElementById('earthbound-risk');
    if (earthboundElement) {
        earthboundElement.textContent = earthboundRisk;
        earthboundElement.className = `metric-value ${earthboundRisk === 'High' ? 'text-warning' : earthboundRisk === 'Medium' ? 'text-primary' : 'text-success'}`;
    }
    
    // Initialize reflection score based on results
    const initialReflectionScore = Math.max(30, 100 - hellProbability);
    const reflectionScoreElement = document.getElementById('reflection-score');
    const reflectionMeterElement = document.getElementById('reflection-meter');
    
    if (reflectionScoreElement) {
        reflectionScoreElement.textContent = initialReflectionScore.toFixed(1) + '%';
    }
    if (reflectionMeterElement) {
        setTimeout(() => {
            reflectionMeterElement.style.width = initialReflectionScore + '%';
        }, 1500);
    }
}

// Update clock function
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    
    if (timeElement && dateElement) {
        timeElement.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        dateElement.textContent = now.toLocaleDateString([], {weekday: 'long', month: 'short', day: 'numeric'});
    }
}

// Initialize advanced interactions
function initializeAdvancedInteractions() {
    addInteractiveFeatures();
    
    // Add advanced card interactions
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Initialize advanced dashboard
    if (!window.advancedDashboard) {
        window.advancedDashboard = new AdvancedHellDiagnosis();
    }
}

// Global functions to be accessible from HTML onclick events
function showSpiritalInterface(type) {
    if (window.advancedDashboard) {
        window.advancedDashboard.showInterface(type);
    }
}

function toggleDimensionView(view) {
    if (window.advancedDashboard) {
        window.advancedDashboard.toggleDimensionView(view);
    }
}

function animateComposition() {
    if (window.advancedDashboard) {
        window.advancedDashboard.animateComposition();
    }
}
