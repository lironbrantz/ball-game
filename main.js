'use strict'

var gBallSize = 100

function onBallClick() {
    gBallSize += 50

    if (gBallSize > 400) {
        gBallSize = 100
    }

    const elBall = document.querySelector('.ball')
    elBall.style.width = gBallSize + 'px'
    elBall.style.height = gBallSize + 'px'
    elBall.innerText = gBallSize
}