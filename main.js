'use strict'

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
}

function onShrinkBallsClick() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    shrinkBall(elBall1)
    shrinkBall(elBall2)
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
}

function onResetClick() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')

    resetBall(elBall1, 'orange')
    resetBall(elBall2, 'lightblue')

    document.body.style.backgroundColor = 'black'
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