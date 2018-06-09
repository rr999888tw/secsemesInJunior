// 剪刀 = 0
// 石頭 = 1
// 布 = 2

// 石頭 > 剪刀 = 1
// 布 > 石頭 = 1
// 剪刀 > 布 = -2

// 剪刀 < 石頭 = -1
// 石頭 < 布 = -1
// 布 < 剪刀 = 2

var playChoice;
var time = 0;
var record = {
    win: 0,
    lose: 0,
    tied: 0
};
var choiceHaveBeenSelected = false;
var streak = 0;
var money = 1000;
var btnPaper = document.querySelector("btn.paper");
var btnScissor = document.querySelector("btn.scissor");
var btnStone = document.querySelector("btn.stone");
var go = document.querySelector("btn.go");
var msga = document.querySelector(".msg-a");
var msgb = document.querySelector(".msg-b");
var moneyDetail = document.querySelector(".money .detail")
var recordDetail = document.querySelector(".record .detail")
var streakDetail = document.querySelector(".streak .detail")
var secondsDetail = document.querySelector(".seconds .detail")
var comPaper = document.querySelectorAll(".comGest .pa");
var playPaper = document.querySelectorAll(".playGest .pa")
var comScissor = document.querySelectorAll(".comGest .sc");
var playScissor = document.querySelectorAll(".playGest .sc");
var head = document.querySelectorAll(".head");
var leg1 = document.querySelectorAll(".leg1");
var leg2 = document.querySelectorAll(".leg2");
var handb = document.querySelectorAll(".handb");
var egg = document.querySelector(".word_wrap");


function goPaper(side) {
    if (side === "player") {
        playPaper.forEach(p => p.style.display = "initial");
        playScissor.forEach(p => p.style.display = "initial");
    } else {
        comPaper.forEach(p => p.style.display = "initial");
        comScissor.forEach(p => p.style.display = "initial");
    }
}

function goScissor(side) {
    if (side === "player") {
        playPaper.forEach(p => p.style.display = "none");
        playScissor.forEach(p => p.style.display = "initial");
    } else {
        comPaper.forEach(p => p.style.display = "none");
        comScissor.forEach(p => p.style.display = "initial");
    }
}

function goStone(side) {
    if (side === "player") {
        playPaper.forEach(p => p.style.display = "none");
        playScissor.forEach(p => p.style.display = "none");
    } else {
        comPaper.forEach(p => p.style.display = "none");
        comScissor.forEach(p => p.style.display = "none");
    }
}

function initialChoiceColor() {
    btnPaper.style.color = '#10a0de';
    btnScissor.style.color = '#10a0de';
    btnStone.style.color = '#10a0de';
    btnPaper.style.border = '2px solid #10a0de';
    btnScissor.style.border = '2px solid #10a0de';
    btnStone.style.border = '2px solid #10a0de';
}

function initialGame() {
    goStone("player");
    goStone("computer");
    initialChoiceColor();
}

function updateDashboard() {
    moneyDetail.innerHTML = "$ " + money;
    recordDetail.innerHTML = record.win + "W " + record.lose + "L " + record.tied + "T";
    streakDetail.innerHTML = streak >= 0 ? streak + "W" : streak * (-1) + "L"
}

function showMessage(mA, mB) {
    msga.innerHTML = mA;
    msgb.innerHTML = mB;
}

function updateSelect() {
    initialGame();
    playChoice = this.getAttribute('value');
    console.log(this.getAttribute('value'));

    this.style.color = '#7bcc3a';
    this.style.border = '2px solid #7bcc3a';
    showMessage("", "")
    choiceHaveBeenSelected = true;
    head.forEach(h => h.style.animation = "");
    leg1.forEach(h => h.style.animation = "legToRight 3s infinite linear");
    leg2.forEach(h => h.style.animation = "legToLeft 3s infinite linear");
    handb.forEach(h => h.style.animation = "legToRight 3s infinite linear");
}

function checkWinner(comChoice) {
    console.log(comChoice);
    console.log(playChoice);

    if (comChoice === parseInt(playChoice)) {
        console.log("Tied");
        return "TIED"
    } else if ((parseInt(playChoice) - comChoice === 1) || parseInt(playChoice) - comChoice === -2) {
        console.log("Win");
        return "WIN"
    } else {
        console.log("Lose");
        return "LOSE"
    }
}

function showAnimation(params) {
    head.forEach(h => h.style.animation = "legToLeft 0.5s");
    leg1.forEach(h => h.style.animation = "legToLeft 0s");
    leg2.forEach(h => h.style.animation = "legToRight 0s");
    handb.forEach(h => h.style.animation = "legToLeft 0s");
}

function checkResult() {
    if (choiceHaveBeenSelected) {
        showAnimation();
        var comChoice = parseInt(3 * Math.random());
        switch (comChoice) {
            case 0:
                goScissor("computer");
                break;
            case 1:
                goStone("computer");
                break;
            case 2:
                goPaper("computer");
                break;
            default:
        }
        switch (parseInt(playChoice)) {
            case 0:
                goScissor("player");
                break;
            case 1:
                goStone("player");
                break;
            case 2:
                goPaper("player");
                break;
            default:
        }
        var result = checkWinner(comChoice);
        switch (result) {
            case "TIED":
                showMessage("TIED", "earn $0")
                record.tied++;
                break;
            case "WIN":
                showMessage("WIN", "earn $100")
                record.win++;
                if (streak <= 0) {
                    streak = 1;
                } else {
                    streak++;
                }
                money += 100;
                break;
            case "LOSE":
                showMessage("LOSE", "lose $100")
                record.lose++;
                if (streak >= 0) {
                    streak = -1;
                } else {
                    streak--;
                }
                money -= 100;
                break;
            default:
        }
        updateDashboard()
        initialChoiceColor();
    }
    choiceHaveBeenSelected = false;

}

function changeLuck() {
    showMessage("GOOD LUCK", "Win More");
    var rR = parseInt(255 * Math.random());
    var rG = parseInt(255 * Math.random());
    var rB = parseInt(255 * Math.random());
    document.documentElement.style.setProperty('--c', `rgb(${rR},${rG},${rB})`);
    document.documentElement.style.setProperty('--bgc', `rgb(${rB},${rR},${rG})`);
}



setInterval(function () {
    time++;
    secondsDetail.innerHTML = time + " s"

}, 1000);

btnPaper.addEventListener("click", updateSelect);
btnScissor.addEventListener("click", updateSelect);
btnStone.addEventListener("click", updateSelect);
go.addEventListener("click", checkResult);
egg.addEventListener("click", changeLuck);
initialGame();
updateDashboard();
showMessage("Pick your choice!", "Paper Scissor Stone")