// parallax effect start

let cloud = document.querySelectorAll(".header__cloud")
let boat = document.querySelector(".header__boat")
let fantasy = document.querySelector(".header__fantasy")

window.addEventListener("scroll", (e) => {
    // console.log(window.scrollY);

    fantasy.style.objectPosition = `0 ${window.scrollY / 10}%`

    cloud.forEach(clouds => {
        // console.log(clouds);
        // console.log(index);
        // console.log(array);

        let speed = clouds.getAttribute("data-speed")

        clouds.style.transform = `translateX(${window.scrollY * speed}px)`
    });

    boat.style.transform = `translateX(${window.scrollY * 0.5}px)`

})

// parallax effect end

// run string start

let h1 = document.querySelector(".header__title")

let txt = h1.innerHTML
h1.innerHTML = ''

function str(x = 0) {
    h1.innerHTML += txt[x]
    x++

    if (x < txt.length) {
        setTimeout(() => {
            str(x)
        }, 150);
    }
}

str()

// run string end

// parallax start

let parallaxBox = document.querySelector(".parallax__box")
let parallaxBall = document.querySelectorAll(".parallax__ball")

parallaxBox.addEventListener("mousemove", (e) => {
    // console.log(e);
    parallaxBall.forEach(balls => {
        let speed = balls.getAttribute("data-speed")
        const X = (window.innerWidth - e.pageX * speed) / 100
        const Y = (window.innerWidth - e.pageY * speed) / 100

        balls.style.transform = `translate(${X}px, ${Y}px)`
    });

})

// parallax end

// timer start

let timerNum = document.querySelectorAll(".timer__num")
let timer = document.querySelector(".timer")

// console.log(timer.getBoundingClientRect().top);
// console.log(timer.offsetTop);

// let y = +timerNum[0].dataset.num

function run() {
    for (let i = 0; i < timerNum.length; i++) {
        let count = +timerNum[i].getAttribute("data-num") /* 123 */
        timerNum[i].innerHTML = 0

        function time(k = 0) {
            timerNum[i].innerHTML = k
            k++

            if (k <= count) {
                setTimeout(() => {
                    time(k)
                }, 5);
            }
        }
        time()
    }
}

window.addEventListener("scroll", function timerWait() {
    // console.log(this.scrollY); 1318
    // console.log(timer.offsetTop); 1938
    // console.log(timer.offsetHeight); 350
    if (this.scrollY >= (timer.offsetTop - timer.offsetHeight * 2.5)) {
        // timer.style.background = 'red'
        run()
        this.removeEventListener("scroll", timerWait)
    }
    // fadeRightAnim(timer, 3)
})

// console.log(x);
// console.log(y);

// timer end

// Bubble animation start

let timerBtn = document.querySelectorAll(".timer__btn")

timerBtn.forEach(btns => {
    btns.addEventListener("mousemove", function (e) {
        // console.log(e.pageX);
        // console.log(this.offsetLeft);
        // console.log(e.pageX - this.offsetLeft);
        const X = e.pageX - this.offsetLeft
        const Y = e.pageY - this.offsetTop
        this.style.setProperty('--x', `${X}px`)
        this.style.setProperty('--y', `${Y}px`)
    })
});

// Bubble animation end

// 3D cards start

let card = document.querySelectorAll(".card")

card.forEach(cards => {
    cards.addEventListener("mousemove", rotate)
    cards.addEventListener("mouseout", rotateNone)
});

function rotate(e) {
    // console.log(this);
    // this.style.background = 'red'
    const cardItem = this.querySelector(".card__item")
    // console.log(cardItem);
    const halfHeight = cardItem.offsetHeight / 2 /* 125 */
    // cardItem.innerHTML = `Y: ${-(halfHeight - e.offsetY)}`
    cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 10}deg) rotateY(${-(halfHeight - e.offsetX) / 10}deg)`
}

function rotateNone() {
    const cardItem = this.querySelector(".card__item")
    cardItem.style.transform = 'rotate(0)'
}

// 3D cards end

// scroll animation start

let scrollSection = document.querySelector(".scroll")
// console.log(scrollSection.offsetTop - scrollSection.offsetHeight * 1.5);

window.addEventListener("scroll", () => {
    fadeRightAnim(scrollSection, 1.5)
})

function fadeRightAnim(section, coordinate) {
    let fadeRight = section.querySelectorAll(".fade-right")
    fadeRight.forEach(fadeRights => {
        const speed = fadeRights.getAttribute("data-speed")
        fadeRights.style.transition = speed + "ms ease-in-out"
        if (this.scrollY >= (section.offsetTop - section.offsetHeight * coordinate)) {
            fadeRights.classList.add("active")
        } else {
            fadeRights.classList.remove("active")
        }
    });
}

// scroll animation end

// ToDoList start

let toDoListInp = document.querySelector(".toDoList__inp")
let TodoListBtn = document.querySelector(".toDoList__box .toDoList__btn")
let toDoListList = document.querySelector(".toDoList__list")

function add() {
    const toDoListInpValue = toDoListInp.value
    toDoListInp.value = ''
    let toDoListItem = document.createElement("li")
    toDoListItem.classList.add("toDoList__item")
    let toDoListBtn = document.createElement("button")
    toDoListBtn.classList.add("toDoList__btn")
    toDoListBtn.classList.add("remove")
    toDoListBtn.innerText = "X"
    toDoListItem.append(toDoListInpValue)
    toDoListItem.append(toDoListBtn)
    toDoListList.append(toDoListItem)
    let remove = document.querySelectorAll(".remove")
    remove.forEach(del => {
        del.addEventListener("click", function () {
            this.parentElement.remove()
        })
    });
}

TodoListBtn.addEventListener("click", function () {
    if (!toDoListInp.value == "") {
        add()
    }
})

document.addEventListener("keydown", function (e) {
    if (!toDoListInp.value == "") {
        if (e.key == "ArrowUp" || e.keyCode == 13) {
            add()
        }
    }
})

// ToDoList end