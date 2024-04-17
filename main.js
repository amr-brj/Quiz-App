const p = document.querySelector("p")
const ul = document.querySelector("ul")
const card = document.querySelector(".card");
const next = document.querySelector("span");
let question = document.querySelector(".question");
let grade = 0;
let counter = 1;
fetch('https://opentdb.com/api.php?amount=50').then(e => {
    return e.json();
}).then(e => {
    return e.results;
}).then(arr => {
    let q = arr[0];
    createQuestion(q);
    card.addEventListener("click", e => {
        if (e.target.tagName === "SPAN") {
            console.log(grade);
            p.innerHTML = "";
            document.querySelectorAll("li").forEach(e => {
                ul.removeChild(e)
            })
            ul.classList.remove("answered-ul");
            card.classList.remove("answered-card");
            ifEndShowGrade();
        }
    })
})
function createQuestion(e) {
    let answer = e.correct_answer;
    console.log(answer);
    let arr = e.incorrect_answers;
    let rand = Math.floor(Math.random() * 4);
    arr.splice(rand, 0, answer);
    p.innerHTML = `${counter}. ` + e.question;
    arr.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element;
        ul.append(li);
    });
    document.querySelectorAll("li").forEach(li => {

        li.addEventListener("click", e => {
            let tar = e.target;
            let temp = document.createElement("p");
            temp.innerHTML = answer;
            if (tar.innerHTML === temp.innerHTML) {
                console.log(tar.innerHTML);
                tar.classList.add("correct");
                grade++;
            }
            else {
                ul.childNodes.forEach(li => {
                    if (li.innerHTML === temp.innerHTML) {
                        li.classList.add("correct")
                    }
                })
                tar.classList.add("wrong");
            }
            ul.classList.add("answered-ul");
            question.classList.add("answered-card");
        })
    })
}
function ifEndShowGrade() {
    if (counter > 9) {
        let p = document.createElement("p");
        p.innerHTML = `Your grade is ${grade} / ${counter}`;
        question.remove();
        next.remove();
        card.append(p);
    }
    else createQuestion(counter++);
}