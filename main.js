'use strict'

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