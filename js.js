/// declare variables

let game = document.getElementById('game'),
    gun = document.getElementById('gun'),
    shot = document.getElementById('shot'),
    result = 0,
    score = document.querySelector('span.score'),
    tries = document.querySelector('span.tries'),
    dest = document.querySelector('.destory'),
    highscore = document.querySelector('.highscore'),
    level = '',
    gameTime = document.querySelector('.gameTime'),
    timer = document.querySelector('.timer');
attackersNUm = 100;
/// choose game level
document.querySelector('#lelvel').addEventListener('change', function() {
    level = this.value;
    attackersNUm = this.options[this.selectedIndex].getAttribute('data-num');
});

game.addEventListener('mousemove', (e) => {
    gun.style.left = e.clientX - 45 + 'px';
    gun.style.top = e.clientY - 45 + 'px';
});

// first step of start
function stargame() {
    let bulletnum = -1;
    game.addEventListener('click', (e) => {
        let bollet = document.createElement('span');
        bollet.className = 'bollet';
        bollet.style.left = e.clientX - 30 + 'px';
        bollet.style.top = e.clientY - 30 + 'px';
        bollet.style.zIndex = '2';
        game.appendChild(bollet);
        shot.play();
        setTimeout(() => {
            bollet.remove();
        }, 300);
        bulletnum++;
        tries.textContent = `${bulletnum}`;
    });
}
/// crate attackers function

function crateAttackers() {
    imgSrc = ['img/3.png', 'img/war.png', 'img/4.png'];

    for (let i = 0; i < attackersNUm; i++) {
        let goal = document.createElement('img');
        var x = Math.floor(Math.random() * game.offsetWidth);
        goal.style.left = x + 'px';
        goal.style.animationDelay = i / 2 + 's';
        goal.src = i % 2 === 0 ? `${imgSrc[1]}` : i % 3 === 0 ? `${imgSrc[0]}` : `${imgSrc[2]}`;
        goal.id = 'goal';
        game.appendChild(goal);
    }
}
// create attackers  function
function start_Attack() {
    crateAttackers();
    // start attack;
    attackers = document.querySelectorAll('#goal');
    let num = attackers.length;
    attackers.forEach((goal) => {
        goal.style.animationDuration = '1s';

        /// click to kill
        goal.addEventListener('click', () => {
            //// crate tooltip with point scored
            tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.style.left = gun.offsetLeft + 'px';
            tooltip.style.top = gun.offsetTop + 'px';
            let img_src = goal.src;
            if (img_src.substring(img_src.length - 5, img_src.length) == '3.png') {
                result += 10;
                tooltip.textContent = '10+';
            } else if (img_src.substring(img_src.length - 5, img_src.length) == '4.png') {
                result += 12;
                tooltip.textContent = '12+';
            } else {
                result += 10;
                tooltip.textContent = '15+';
            }
            game.appendChild(tooltip);
            // attackers shape
            goal.setAttribute('src', 'img/ex.gif');
            num--;
            dest.textContent = `${attackers.length-num}  Of ${attackers.length}`;
            // dest.textContent = `You destory: ${num}`;
            score.textContent = `${result}`;
            score.classList.add('active');
            dest.classList.add('active');
            tries.classList.add('active');
            setTimeout(() => {
                goal.remove();
                score.classList.remove('active');
                dest.classList.remove('active');
                tries.classList.remove('active');
                tooltip.remove();
            }, 500);
        });
    });
    attackers.forEach((e) => {
        e.classList.add('attack');
        e.style.animationDuration = `${level}`;
    });
}
//// start the game 
start = document.querySelector('.game .intro span');
setTimeout(() => {
    start.style.opacity = '1';
}, 1000);

start.addEventListener('click', (e) => {
    stargame();
    start_Attack();
    increaseTime();
    game.style.backgroundImage = `url('img/war_bg.gif')`;
    start.parentElement.style.display = 'none';
    game.style.cursor = 'none';
    gameTime.style.display = 'block';
    gun.style.display = 'block';
    document.querySelector('.game .result').style.display = 'block';

    /****game over message */
    /*setTimeout(() => {
        let x = Swal.fire({
            title: 'Game Over Yor Final Score is: ' + result,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /// reload th page to prevent start function that create gun 
                location.reload();
            }
        });

        document.querySelector('.intro').style.display = 'block';
        attackers.forEach((e) => {
            e.classList.remove('attack');
        });

        /////////// top score function
        topscore();

        result = 0;
        score.textContent = `Score: ${0}`;
        bulletnum = -1;
        game.style.cursor = 'initial';
        gun.style.display = 'none';
        document.querySelector('.game .result').style.display = 'none';
        num = attackers.length;
        dest.textContent = `${0}  Of ${attackers.length}`;
        attackers.forEach((e) => {
            e.remove();
        });
        // relaod page


    }, level !== '' ? (parseInt(attackersNUm) - 5) * 1000 : 35000);*/

setTimeout(() => {
    finishgame();
}, level !== '' ? 210000 : 73000);



});

/*************************************itro type */
var typed = new Typed('.type', {
    strings: ['All The planet Now depend on You', 'Please Do Your Best To Save us', 'Do It And Destoray Them', 'Save The Earth'],
    smartBackspace: true, // Default value,
    startDelay: 100,
    typeSpeed: 100,
    backSpeed: 50,
});
//// top score funtion and store data to localstorage
function topscore() {
    if (localStorage.score) {
        let topscore = localStorage.score;
        localStorage.score = result;
        // top score localstorage function
        if (topscore > result) {
            highscore.textContent = `Top Score: ${topscore}`;
            localStorage.score = topscore;
        } else {
            highscore.textContent = `Top Score: ${result}`;
            localStorage.score = result;
        }
    } else {
        localStorage.score = 0;
    }
}
topscore();

function increaseTime() {
    var createGift = setInterval(() => {
        let time = document.createElement('span');
        time.className = 'time';
        time.setAttribute('data-time', '20');
        time.style.animationDuration = `${level}`;
        var x = Math.floor(Math.random() * game.offsetWidth);
        time.style.left = x + 'px';
        game.appendChild(time);

        // click to increase playing time
        time.addEventListener('click', (e) => {
            let xx = parseInt(timer.textContent);
            let y = parseInt(time.getAttribute('data-time'));
            timer.textContent = `${xx + y}`;
            time.remove();
        });
        setTimeout(() => {
            time.remove();
        }, level !== '' ? (parseInt(level) * 1000) : 15000);

    }, 20000);
    let giftTime = setInterval(() => {
        let x = parseInt(timer.textContent);
        x--;
        timer.textContent = `${x}`;
        if (x === 0) {
            clearInterval(createGift);
            clearInterval(giftTime);
            return finishgame();
        }
    }, 1000);
}

function finishgame() {
    let x = Swal.fire({
        title: 'Game Over Yor Final Score is: ' + result,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            /// reload th page to prevent start function that create gun 
            location.reload();
        }
    });

    document.querySelector('.intro').style.display = 'block';
    attackers.forEach((e) => {
        e.classList.remove('attack');
    });

    /////////// top score function
    topscore();

    result = 0;
    score.textContent = `Score: ${0}`;
    bulletnum = -1;
    game.style.cursor = 'initial';
    gun.style.display = 'none';
    document.querySelector('.game .result').style.display = 'none';
    num = attackers.length;
    dest.textContent = `${0}  Of ${attackers.length}`;
    attackers.forEach((e) => {
        e.remove();
    });


}
