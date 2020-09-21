var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')


var score = 0
var isGameStarted = false

$gameTime.addEventListener('input', setGameTime)
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)


function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)

    show($timeHeader)
    hide($resultHeader)
}

function startGame() {
    $gameTime.setAttribute('disabled', 'true')
    score = 0
    setGameTime()
    $game.style.backgroundColor = '#fff'
    hide($start)

    isGameStarted = true

    var interval = setInterval(function () {
        var time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function endGame() {
    isGameStarted = false
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    setGameScore()
    $gameTime.removeAttribute('disabled')

}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
    else {
        if (!event.target.getAttribute('data-miss')) {
            var topSize = +event.offsetY - 15
            var leftSize = +event.offsetX - 15

            var box = document.createElement('div')

            box.setAttribute('data-miss', 'true')

            box.style.position = 'absolute'
            box.style.backgroundColor = 'red'
            box.style.height = box.style.width = '30px'
            box.style.borderRadius = '100px'
            box.style.top = topSize + 'px'
            box.style.left = leftSize + 'px'
            $game.insertAdjacentElement('afterbegin', box)
        }
    }
}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.height - boxSize
    var maxBorderRadius = getRandom(0, 120)
    if (maxBorderRadius < 30) {
        maxBorderRadius = 0
    } else {
        maxBorderRadius = maxBorderRadius - 30
    }

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#' + getRandom(111, 999)
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.borderRadius = maxBorderRadius + 'px'

    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


