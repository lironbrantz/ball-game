'use strict'

var gGameStates = []
var gCurrStateIdx = -1
var gHoverTimeoutId = null
var gAutoIntervalId = null
var gAutoCycles = 0

function onBallClick(elBall, maxDiameter) {
    const diff = getRandomInt(20, 60)

    var ballSize = parseInt(elBall.innerText)
    ballSize += diff

    if (ballSize > maxDiameter) {
        ballSize = 100
    }

    elBall.style.width = ballSize + 'px'
    elBall.style.height = ballSize + 'px'
    elBall.style.backgroundColor = getRandomColor()
    elBall.innerText = ballSize
    saveState()
}


function onSwapBallsClick() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    const ball1Size = parseInt(elBall1.innerText)
    const ball2Size = parseInt(elBall2.innerText)

    const ball1Color = getComputedStyle(elBall1).backgroundColor
    const ball2Color = getComputedStyle(elBall2).backgroundColor

    elBall1.style.width = ball2Size + 'px'
    elBall1.style.height = ball2Size + 'px'
    elBall1.style.backgroundColor = ball2Color
    elBall1.innerText = ball2Size

    elBall2.style.width = ball1Size + 'px'
    elBall2.style.height = ball1Size + 'px'
    elBall2.style.backgroundColor = ball1Color
    elBall2.innerText = ball1Size
    saveState()
}

function onShrinkBallsClick() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    shrinkBall(elBall1)
    shrinkBall(elBall2)
    saveState()
}

function shrinkBall(elBall) {
    const diff = getRandomInt(20, 60)

    var ballSize = parseInt(elBall.innerText)
    ballSize -= diff

    if (ballSize < 100) {
        ballSize = 100
    }

    elBall.style.width = ballSize + 'px'
    elBall.style.height = ballSize + 'px'
    elBall.innerText = ballSize
}


function onChangeBgClick() {
    document.body.style.backgroundColor = getRandomColor()
    saveState()
}

function onResetClick() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    resetBall(elBall1, 'orange')
    resetBall(elBall2, 'lightblue')

    document.body.style.backgroundColor = 'black'
    saveState()
}

function resetBall(elBall, color) {
    elBall.style.width = '100px'
    elBall.style.height = '100px'
    elBall.style.backgroundColor = color
    elBall.innerText = '100'
}



function onResetHoverStart() {
    clearAutoPlay()

    gHoverTimeoutId = setTimeout(startAutoPlay, 2000)
}

function onResetHoverEnd() {
    clearAutoPlay()
}

function startAutoPlay() {
    gHoverTimeoutId = null
    gAutoCycles = 0

    gAutoIntervalId = setInterval(runAutoCycle, 2000)
}

function runAutoCycle() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    onBallClick(elBall1, 400)
    onBallClick(elBall2, 300)
    onSwapBallsClick()
    onShrinkBallsClick()

    gAutoCycles++

    if (gAutoCycles === 10) {
        clearAutoPlay()
    }
}

function clearAutoPlay() {
    if (gHoverTimeoutId) {
        clearTimeout(gHoverTimeoutId)
        gHoverTimeoutId = null
    }

    if (gAutoIntervalId) {
        clearInterval(gAutoIntervalId)
        gAutoIntervalId = null
    }

    gAutoCycles = 0
}


function saveState() {
    const state = getState()

    gGameStates = gGameStates.slice(0, gCurrStateIdx + 1)
    gGameStates.push(state)
    gCurrStateIdx++

    updateUndoRedoButtons()
}

function getState() {
    const elsBalls = document.querySelectorAll('.ball')
    const balls = []

    for (var i = 0; i < elsBalls.length; i++) {
        const elBall = elsBalls[i]

        balls.push({
            width: elBall.style.width || getComputedStyle(elBall).width,
            height: elBall.style.height || getComputedStyle(elBall).height,
            backgroundColor: getComputedStyle(elBall).backgroundColor,
            text: elBall.innerText
        })
    }

    return {
        bodyBackgroundColor: getComputedStyle(document.body).backgroundColor,
        balls: balls
    }
}

function applyState(state) {
    const elsBalls = document.querySelectorAll('.ball')

    document.body.style.backgroundColor = state.bodyBackgroundColor

    for (var i = 0; i < elsBalls.length; i++) {
        const elBall = elsBalls[i]
        const ballState = state.balls[i]

        elBall.style.width = ballState.width
        elBall.style.height = ballState.height
        elBall.style.backgroundColor = ballState.backgroundColor
        elBall.innerText = ballState.text
    }
}

function onUndo() {
    if (gCurrStateIdx <= 0) return

    gCurrStateIdx--
    applyState(gGameStates[gCurrStateIdx])
    updateUndoRedoButtons()
}

function onRedo() {
    if (gCurrStateIdx >= gGameStates.length - 1) return

    gCurrStateIdx++
    applyState(gGameStates[gCurrStateIdx])
    updateUndoRedoButtons()
}

function updateUndoRedoButtons() {
    const elUndoBtn = document.querySelector('.undo-btn')
    const elRedoBtn = document.querySelector('.redo-btn')

    elUndoBtn.disabled = gCurrStateIdx <= 0
    elRedoBtn.disabled = gCurrStateIdx >= gGameStates.length - 1
}