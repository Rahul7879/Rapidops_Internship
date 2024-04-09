let rod1 = document.getElementById("rod1");
let rod2 = document.getElementById("rod2");
let rod3 = document.getElementById("rod3");
let moveCount = document.getElementById("move-count");
let count = 0;
let plateCount = 0;
let moves = 0;

function counter() {
    if (count !== 0 && count === moves) {
        return;
    }
    count++;
    moveCount.innerHTML = count;
    towerOfHanoi(plateCount, count)
}
function getInput() {
    rod1.innerHTML = "";
    rod2.innerHTML = "";
    rod3.innerHTML = "";
    count = 0;
    plateCount = +document.getElementById("plateCount").value;
    for (let i = plateCount; i > 0; i--) {
        let div = document.createElement("div");
        div.style.width = `${(i) * 30}px`
        div.className = "disk";
        div.innerHTML = i;
        rod1.insertBefore(div, rod1.firstChild);
    }
}

function towerOfHanoi(n, range) {
    let rods = [[], [], []];
    for (let i = n; i > 0; i--) {
        rods[0].push(i);
    }

    moves = 0;
    let totalMoves = Math.pow(2, n) - 1;
    let source = 0, dest = 1, spare = 2;

    if (n % 2 === 0) {
        [dest, spare] = [spare, dest];
    }

    const printRods = () => {
        rods.forEach((rod, index) => {
            if (moves < range) {
                if ((index + 1) % 3 === 1) {
                    rod1.innerHTML = "";
                } else if ((index + 1) % 3 === 2) {
                    rod2.innerHTML = "";
                } else {
                    rod3.innerHTML = "";
                }
        
                rod.forEach(rodSize => {
                    let div = document.createElement("div");
                    div.style.width = `${(rodSize) * 30}px`
                    div.className = "disk";
                    div.innerHTML = rodSize;
                    if (index === 0) {
                        rod1.insertBefore(div, rod1.firstChild);
                    } else if (index === 1) {
                        rod2.insertBefore(div, rod2.firstChild);
                    } else {
                        rod3.insertBefore(div, rod3.firstChild);
                    }
                });
            }


        });
    };

    printRods();

    for (let i = 1; i <= totalMoves; i++) {
        if (i % 3 === 1) {
            moveDisk(rods, source, dest);
        } else if (i % 3 === 2) {
            moveDisk(rods, source, spare);
        } else if (i % 3 === 0) {
            moveDisk(rods, spare, dest);
        }
        printRods();

        moves++;
    }

    function moveDisk(rods, fromRod, toRod) {
        let diskToMove;
        if (rods[fromRod].length === 0 && rods[toRod].length > 0) {
            diskToMove = rods[toRod].pop();
            rods[fromRod].push(diskToMove);
        } else if (rods[toRod].length === 0 && rods[fromRod].length > 0) {
            diskToMove = rods[fromRod].pop();
            rods[toRod].push(diskToMove);
        } else if (rods[fromRod][rods[fromRod].length - 1] < rods[toRod][rods[toRod].length - 1]) {
            diskToMove = rods[fromRod].pop();
            rods[toRod].push(diskToMove);
        } else {
            diskToMove = rods[toRod].pop();
            rods[fromRod].push(diskToMove);
        }
    }
}
function autoRun() {
    let select = +document.getElementById("speed").value;
    let speed = Math.floor(1000 / select)
    let timer = setInterval(() => {
        if (count !== 0 && count === moves) {
            clearInterval(timer);
            return;
        }
        count++;
        moveCount.innerHTML = count;
        towerOfHanoi(plateCount, count)
    }, speed)


}
