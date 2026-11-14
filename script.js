// Source - https://stackoverflow.com/a/1349426
// Posted by csharptest.net, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-14, License - CC BY-SA 4.0

function makeid(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

console.log(makeid(20));

const test = document.createElement('p');
test.id = "test";
test.textContent = makeid(20);
test.textContent = test.textContent.split("").join("\u00A0\u00A0");
document.body.appendChild(test);

const metrics = document.createElement('p');
metrics.id = "metrics";
metrics.textContent = "Metrics will appear here";
document.body.appendChild(metrics);

const scoreMetrics = document.createElement("p");
scoreMetrics.id = "score-metrics";
document.body.appendChild(scoreMetrics);


const feedback = document.createElement("p");
feedback.id = "feedback";
document.body.appendChild(feedback);


const cleanTarget = test.textContent.replace(/\s+/g, "");
let currentIndex = 0;
let correctKeystrokes = 0;
let startTime = null;
let isFinished = false;

document.addEventListener("keydown", function (event) {

    if (isFinished || event.key.length !== 1) return;

    if (startTime === null) {
        startTime = performance.now();
    }

    const charSpan = document.createElement("span");
    charSpan.textContent = event.key === " " ? "_" : event.key;
    charSpan.style.marginRight = "4px";
    charSpan.style.fontWeight = "bold";

    if (event.key === cleanTarget[currentIndex]) {
        charSpan.style.color = "green";
        correctKeystrokes++;
    } else {
        charSpan.style.color = "red";
    }

    feedback.appendChild(charSpan);

    currentIndex++;

    if (currentIndex >= cleanTarget.length) {
        isFinished = true;
        const timeSeconds = (performance.now() - startTime) / 1000;
        const cps = cleanTarget.length / timeSeconds;
        const accuracyRatio = correctKeystrokes / cleanTarget.length;
        const accuracyPercent = accuracyRatio * 100;
        const score = cps * Math.pow(accuracyRatio, 2);

        metrics.textContent = "The End";


        scoreMetrics.textContent = `Time: ${timeSeconds.toFixed(2)}s | CPS: ${cps.toFixed(2)} | Accuracy: ${accuracyPercent.toFixed(1)}% | Score: ${score.toFixed(2)}`;
    }
});
