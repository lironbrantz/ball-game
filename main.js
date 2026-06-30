'use strict'

var gBallSize = 100

function onBallClick() {
    const diff = getRandomInt(20, 60)

    gBallSize += diff

    if (gBallSize > 400) {
        gBallSize = 100
    }

    const elBall = document.querySelector('.ball')
    elBall.style.width = gBallSize + 'px'
    elBall.style.height = gBallSize + 'px'
    elBall.style.backgroundColor = getRandomColor()
    elBall.innerText = gBallSize
}