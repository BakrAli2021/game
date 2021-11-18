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
    attackersNUm = 30;
/// choose game level
document.querySelector('#lelvel').addEventListener('change', function() {
    level = this.value;
    attackersNUm = this.options[this.selectedIndex].getAttribute('data-num');
    console.log(attackersNUm);
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
        tries.textContent = `Tries : ${bulletnum}`;
    });
}

function createAttackers() {
    // create attackers 
    imgSrc = ['img/3.png', 'img/war.png'];

    for (let i = 0; i < attackersNUm; i++) {
        let goal = document.createElement('img');
        var x = Math.floor(Math.random() * game.offsetWidth);
        goal.style.left = x + 'px';
        var size = 2 + Math.random() * 10;
        console.log(size);
        goal.style.animationDelay = i / 2 + 's';
        goal.src = i % 2 === 0 ? `${imgSrc[1]}` : `${imgSrc[0]}`;
        goal.id = 'goal';
        game.appendChild(goal);
    }

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
            } else {
                result += 15;
                tooltip.textContent = '15+';
            }
            game.appendChild(tooltip);
            // attackers shape
            goal.setAttribute('src', 'img/ex.gif');
            num--;
            dest.textContent = `You destory: ${num}  Of ${attackers.length}`;
            // dest.textContent = `You destory: ${num}`;
            score.textContent = `Score: ${result}`;
            score.classList.add('active');
            setTimeout(() => {
                goal.remove();
                score.classList.remove('active');
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
    createAttackers();
    game.style.backgroundImage = `url('img/war_bg.gif')`;
    start.parentElement.style.display = 'none';
    game.style.cursor = 'none';
    gun.style.display = 'block';
    document.querySelector('.game .result').style.display = 'block';

    /****game over message */
    setTimeout(() => {
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
        dest.textContent = `You destory: ${0}  Of ${attackers.length}`;
        attackers.forEach((e) => {
            e.remove();
        });
        // relaod page


    }, level !== '' ? (parseInt(attackersNUm) - 5) * 1000 : 35000);




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
    }
}
topscore();