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