/* =================================
   JACKFLAMES
   FULL JAVASCRIPT
   WITH SOUND + TALKING RESULT
   + AUTOMATIC RELATIONSHIP PICTURE
================================= */


/* =================================
   SOUND SYSTEM
   No MP3 files needed
================================= */

let audioContext = null;


/* =================================
   CREATE / START AUDIO
================================= */

function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (audioContext.state === "suspended") {

        audioContext.resume();

    }
}


/* =================================
   CLICK SOUND 🔊
================================= */

function playClickSound() {

    initAudio();

    const osc =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(
        500,
        audioContext.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
        800,
        audioContext.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
        0.25,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.12
    );

    osc.connect(gain);

    gain.connect(
        audioContext.destination
    );

    osc.start();

    osc.stop(
        audioContext.currentTime + 0.12
    );
}


/* =================================
   LOADING SOUND 🔄
================================= */

function playLoadingSound() {

    initAudio();

    const osc =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    osc.type = "triangle";

    osc.frequency.setValueAtTime(
        300,
        audioContext.currentTime
    );

    osc.frequency.linearRampToValueAtTime(
        500,
        audioContext.currentTime + 0.5
    );

    gain.gain.setValueAtTime(
        0.12,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.6
    );

    osc.connect(gain);

    gain.connect(
        audioContext.destination
    );

    osc.start();

    osc.stop(
        audioContext.currentTime + 0.6
    );
}


/* =================================
   RESULT SOUND 🎉
================================= */

function playResultSound() {

    initAudio();

    const notes = [
        523,
        659,
        784,
        1047
    ];

    notes.forEach(
        function (frequency, index) {

            const osc =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            osc.type = "sine";

            const startTime =
                audioContext.currentTime +
                index * 0.13;

            osc.frequency.setValueAtTime(
                frequency,
                startTime
            );

            gain.gain.setValueAtTime(
                0.18,
                startTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.01,
                startTime + 0.25
            );

            osc.connect(gain);

            gain.connect(
                audioContext.destination
            );

            osc.start(startTime);

            osc.stop(
                startTime + 0.25
            );

        }
    );
}


/* =================================
   TALKING RESULT 🗣️
================================= */

function playTalkingSound(
    result,
    percentage
) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    /* Stop previous speech */

    window.speechSynthesis.cancel();


    /* Get result information */

    const data =
        resultData[result];


    /* Text to speak */

    const text =
        "Result is " +
        result +
        ". Your jackfruit compatibility is " +
        percentage +
        " percent. " +
        data.message;


    /* Create speech */

    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    /* Voice settings */

    speech.rate = 0.9;

    speech.pitch = 1.1;

    speech.volume = 1;


    /* Try to use English voice */

    const voices =
        window.speechSynthesis.getVoices();


    const englishVoice =
        voices.find(
            function (voice) {

                return voice.lang
                    .toLowerCase()
                    .startsWith("en");

            }
        );


    if (englishVoice) {

        speech.voice =
            englishVoice;

    }


    /* Speak */

    window.speechSynthesis.speak(
        speech
    );
}


/* =================================
   IMAGE PREVIEW
================================= */


/* =================================
   PERSON PHOTO PREVIEW
================================= */

const personPhotoInput =
    document.getElementById(
        "personPhoto"
    );

if (personPhotoInput) {

    personPhotoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (file) {

                const preview =
                    document.getElementById(
                        "personPreview"
                    );

                preview.src =
                    URL.createObjectURL(
                        file
                    );

                preview.style.display =
                    "block";

            }

        }
    );

}


/* =================================
   JACKFRUIT PHOTO PREVIEW
================================= */

const jackfruitPhotoInput =
    document.getElementById(
        "jackfruitPhoto"
    );

if (jackfruitPhotoInput) {

    jackfruitPhotoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (file) {

                const preview =
                    document.getElementById(
                        "jackfruitPreview"
                    );

                preview.src =
                    URL.createObjectURL(
                        file
                    );

                preview.style.display =
                    "block";

            }

        }
    );

}


/* =================================
   FLAMES CALCULATION
================================= */

function calculateFlames() {


    /* =================================
       START AUDIO
    ================================= */

    playClickSound();


    /* =================================
       GET NAME VALUES
    ================================= */

    const personName =
        document
            .getElementById("personName")
            .value
            .trim();


    const jackfruitName =
        document
            .getElementById("jackfruitName")
            .value
            .trim();


    /* =================================
       GET PHOTO FILES
    ================================= */

    const personPhoto =
        document
            .getElementById("personPhoto")
            .files[0];


    const jackfruitPhoto =
        document
            .getElementById("jackfruitPhoto")
            .files[0];


    /* =================================
       CHECK NAME INPUT
    ================================= */

    if (
        !personName ||
        !jackfruitName
    ) {

        alert(
            "😂 Please enter both names!"
        );

        return;

    }


    /* =================================
       CHECK PHOTO INPUT
    ================================= */

    if (
        !personPhoto ||
        !jackfruitPhoto
    ) {

        alert(
            "📸 Please upload both photos!"
        );

        return;

    }


    /* =================================
       HIDE BUTTON
    ================================= */

    document
        .getElementById("calculateBtn")
        .style.display =
            "none";


    /* =================================
       SHOW LOADING
    ================================= */

    document
        .getElementById("loading")
        .style.display =
            "block";


    /* =================================
       LOADING SOUND
    ================================= */

    playLoadingSound();


    /* =================================
       CALCULATE AFTER DELAY
    ================================= */

    setTimeout(
        function () {

            const result =
                getFlamesResult(
                    personName,
                    jackfruitName
                );


            const percentage =
                getCompatibility(
                    personName,
                    jackfruitName
                );


            showResult(
                result,
                percentage
            );

        },
        1800
    );
}


/* =================================
   FLAMES LOGIC
================================= */

function getFlamesResult(
    name1,
    name2
) {


    /* Convert names */

    let a =
        name1
            .toLowerCase()
            .replace(
                /[^a-z]/g,
                ""
            )
            .split("");


    let b =
        name2
            .toLowerCase()
            .replace(
                /[^a-z]/g,
                ""
            )
            .split("");


    /* =================================
       REMOVE MATCHING LETTERS
    ================================= */

    for (
        let i = a.length - 1;
        i >= 0;
        i--
    ) {

        const index =
            b.indexOf(a[i]);


        if (index !== -1) {

            a.splice(
                i,
                1
            );

            b.splice(
                index,
                1
            );

        }

    }


    /* =================================
       REMAINING LETTER COUNT
    ================================= */

    const count =
        a.length +
        b.length;


    /* =================================
       FLAMES
    ================================= */

    const flames = [

        "FRIENDS",

        "LOVE",

        "AFFECTION",

        "MARRIAGE",

        "ENEMY",

        "SIBLINGS"

    ];


    let index = 0;


    let list = [
        ...flames
    ];


    /* =================================
       IF COUNT IS ZERO
    ================================= */

    if (count === 0) {

        return "FRIENDS";

    }


    /* =================================
       ELIMINATE FLAMES
    ================================= */

    while (
        list.length > 1
    ) {

        index =
            (
                index +
                count -
                1
            ) %
            list.length;


        list.splice(
            index,
            1
        );

    }


    return list[0];
}


/* =================================
   COMPATIBILITY PERCENTAGE
================================= */

function getCompatibility(
    name1,
    name2
) {


    const combined =
        name1.toLowerCase() +
        name2.toLowerCase();


    let total = 0;


    for (
        let i = 0;
        i < combined.length;
        i++
    ) {

        total +=
            combined.charCodeAt(i) *
            (i + 1);

    }


    /* =================================
       FUN REPEATABLE PERCENTAGE
       BETWEEN 60% AND 99%
    ================================= */

    return 60 + (
        total % 40
    );
}


/* =================================
   RESULT INFORMATION
================================= */

const resultData = {


    FRIENDS: {

        emoji: "🤝",

        message:
            "Best buddies forever! Jackfruit is your ultimate friend! 🍈😂",

        fun:
            "✨ Friendship level: JACKFRUIT BESTIES! ✨"

    },


    LOVE: {

        emoji: "❤️",

        message:
            "A sweet connection detected! Even the jackfruit is blushing! 🍈❤️",

        fun:
            "💕 Warning: Too much sweetness detected! 😂"

    },


    AFFECTION: {

        emoji: "🥰",

        message:
            "Sweet connection detected! Something special is happening! 🍈✨",

        fun:
            "🥰 Jackfruit approves this relationship!"

    },


    MARRIAGE: {

        emoji: "💍",

        message:
            "Wow! This is getting serious! Start planning the jackfruit wedding! 😂🍈",

        fun:
            "💍 Save the date! Jackfruit wedding incoming!"

    },


    ENEMY: {

        emoji: "😈",

        message:
            "Uh-oh! This relationship is a little spicy! Stay away from the jackfruit! 😂",

        fun:
            "🔥 Jackfruit drama detected!"

    },


    SIBLINGS: {

        emoji: "👨‍👩‍👧",

        message:
            "You two have strong sibling energy! Sharing jackfruit is compulsory! 😂🍈",

        fun:
            "🍈 Family-level bonding detected!"

    }

};


/* =================================
   AUTOMATIC RELATIONSHIP PICTURE
================================= */

function getRelationshipImage(result) {

    const pictures = {

        FRIENDS:
            "friends.jpeg",

        LOVE:
            "love.jpeg",

        AFFECTION:
            "affection.jpeg",

        MARRIAGE:
            "marriage.jpeg",

        ENEMY:
            "enemy.jpeg",

        SIBLINGS:
            "siblings.jpeg"

    };


    return pictures[result];

}


/* =================================
   SHOW RESULT
================================= */

function showResult(
    result,
    percentage
) {


    /* =================================
       RESULT SOUND 🎉
    ================================= */

    playResultSound();


    /* =================================
       HIDE LOADING
    ================================= */

    document
        .getElementById("loading")
        .style.display =
            "none";


    /* =================================
       SHOW RESULT
    ================================= */

    document
        .getElementById("result")
        .style.display =
            "block";


    /* =================================
       GET RESULT DATA
    ================================= */

    const data =
        resultData[result];


    /* =================================
       RESULT TITLE
    ================================= */

    document
        .getElementById("resultTitle")
        .textContent =
            data.emoji +
            " " +
            result;


    /* =================================
       COMPATIBILITY
    ================================= */

    document
        .getElementById("percentage")
        .textContent =
            "🍈 Compatibility: " +
            percentage +
            "% 😂";


    /* =================================
       PREDICTION
    ================================= */

    document
        .getElementById("prediction")
        .textContent =
            data.message;


    /* =================================
       FUN MESSAGE
    ================================= */

    const funMessage =
        document.querySelector(
            ".fun-message"
        );


    if (funMessage) {

        funMessage.textContent =
            data.fun;

    }


    /* =================================
       PERSON PHOTO
    ================================= */

    const personPreview =
        document.getElementById(
            "personPreview"
        );


    const resultPerson =
        document.getElementById(
            "resultPerson"
        );


    if (
        personPreview &&
        resultPerson
    ) {

        resultPerson.src =
            personPreview.src;

    }


    /* =================================
       JACKFRUIT PHOTO
    ================================= */

    const jackfruitPreview =
        document.getElementById(
            "jackfruitPreview"
        );


    const resultJackfruit =
        document.getElementById(
            "resultJackfruit"
        );


    if (
        jackfruitPreview &&
        resultJackfruit
    ) {

        resultJackfruit.src =
            jackfruitPreview.src;

    }


    /* =================================
       AUTOMATIC RELATIONSHIP PICTURE
       ❤️ 🤝 🥰 💍 😈 👨‍👩‍👧
    ================================= */

    const relationshipPicture =
        document.getElementById(
            "relationshipPicture"
        );


    if (relationshipPicture) {

        relationshipPicture.src =
            getRelationshipImage(
                result
            );

        relationshipPicture.style.display =
            "block";

    }


    /* =================================
       CONFETTI 🎉
    ================================= */

    createConfetti();


    /* =================================
       🗣️ TALKING RESULT
    ================================= */

    setTimeout(
        function () {

            playTalkingSound(
                result,
                percentage
            );

        },
        300
    );


    /* =================================
       SCROLL TO RESULT
    ================================= */

    setTimeout(
        function () {

            document
                .getElementById(
                    "result"
                )
                .scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });

        },
        100
    );
}


/* =================================
   TRY AGAIN
================================= */

function tryAgain() {


    /* =================================
       STOP TALKING
    ================================= */

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }


    /* =================================
       HIDE RESULT
    ================================= */

    document
        .getElementById("result")
        .style.display =
            "none";


    /* =================================
       HIDE LOADING
    ================================= */

    document
        .getElementById("loading")
        .style.display =
            "none";


    /* =================================
       SHOW CALCULATE BUTTON
    ================================= */

    document
        .getElementById("calculateBtn")
        .style.display =
            "inline-block";


    /* =================================
       CLEAR NAMES
    ================================= */

    document
        .getElementById("personName")
        .value = "";


    document
        .getElementById("jackfruitName")
        .value = "";


    /* =================================
       CLEAR PHOTOS
    ================================= */

    document
        .getElementById("personPhoto")
        .value = "";


    document
        .getElementById("jackfruitPhoto")
        .value = "";


    /* =================================
       HIDE PREVIEWS
    ================================= */

    document
        .getElementById("personPreview")
        .style.display =
            "none";


    document
        .getElementById("jackfruitPreview")
        .style.display =
            "none";


    /* =================================
       CLEAR RESULT PHOTOS
    ================================= */

    document
        .getElementById("resultPerson")
        .src = "";


    document
        .getElementById("resultJackfruit")
        .src = "";


    /* =================================
       HIDE RELATIONSHIP PICTURE
    ================================= */

    const relationshipPicture =
        document.getElementById(
            "relationshipPicture"
        );


    if (relationshipPicture) {

        relationshipPicture.src = "";

        relationshipPicture.style.display =
            "none";

    }


    /* =================================
       SCROLL TOP
    ================================= */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =================================
   CONFETTI 🎉
================================= */

function createConfetti() {


    const emojis = [

        "❤️",

        "🍈",

        "😂",

        "✨",

        "🔥",

        "💕"

    ];


    for (
        let i = 0;
        i < 18;
        i++
    ) {


        const confetti =
            document.createElement(
                "div"
            );


        /* =================================
           RANDOM EMOJI
        ================================= */

        confetti.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        /* =================================
           POSITION
        ================================= */

        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() *
            100 +
            "vw";


        confetti.style.top =
            "-30px";


        /* =================================
           STYLE
        ================================= */

        confetti.style.fontSize =
            "22px";


        confetti.style.zIndex =
            "9999";


        confetti.style.pointerEvents =
            "none";


        /* =================================
           ADD TO PAGE
        ================================= */

        document.body.appendChild(
            confetti
        );


        /* =================================
           RANDOM DURATION
        ================================= */

        const duration =
            2 +
            Math.random() * 2;


        /* =================================
           ANIMATION
        ================================= */

        confetti.animate(

            [

                {

                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1

                },

                {

                    transform:
                        "translateY(110vh) rotate(360deg)",

                    opacity: 0

                }

            ],

            {

                duration:
                    duration * 1000,

                easing:
                    "ease-in"

            }

        );


        /* =================================
           REMOVE
        ================================= */

        setTimeout(
            function () {

                confetti.remove();

            },
            duration * 1000
        );

    }
}


/* =================================
   CHECK COMPATIBILITY BUTTON
================================= */

const calculateButton =
    document.getElementById(
        "calculateBtn"
    );

if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateFlames
    );

}