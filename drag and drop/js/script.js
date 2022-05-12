const body = document.body;
const elements = body.querySelectorAll(".square");
const areas = body.querySelectorAll(".area");
let mousePosX;
let mousePosY;
let posDiffX;
let posDiffY;


elements.forEach(element => {
    element.addEventListener("dblclick", (ev) => {
        ev.target.classList.toggle("rounded");
    })


    element.addEventListener("dragstart", (ev) => {
        // ev.preventDefault();

        mousePosX = ev.offsetX;
        mousePosY = ev.offsetY;

        posDiffX = element.offsetWidth - mousePosX;
        posDiffY = element.offsetHeight - mousePosY;


        // console.log(posDiffY);
        ev.dataTransfer.setData("elementId", ev.target.id);
        ev.target.classList.add("grabbed");
        setTimeout(() => {
            ev.target.classList.add("hide");
            ev.target.classList.remove("grabbed");
        }, 100);
        // console.log(ev.target.id);
    });

    element.addEventListener("dragend", (ev) => {
        ev.target.classList.add("dropped");
    });

});


areas.forEach(area => {
    area.addEventListener("dragenter", (ev) => {
        ev.preventDefault();
        ev.target.classList.add("drag-over");
    })

    area.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        ev.target.classList.add("drag-over");
    })

    area.addEventListener("dragleave", (ev) => {
        ev.target.classList.remove("drag-over");
    })

    area.addEventListener("drop", (ev) => {
        ev.target.classList.remove("drag-over");

        const id = ev.dataTransfer.getData("elementId");
        const draggable = document.getElementById(id);

        let posX = ev.offsetX;
        let posY = ev.offsetY;
        console.log(posDiffY);
        console.log(area.offsetHeight - posY);



        ev.target.appendChild(draggable);
        draggable.style.left = `${posX - mousePosX}px`;
        draggable.style.top = `${posY - mousePosY}px`;

        // console.log(area.offsetWidth);

        if ((area.offsetWidth - posX) < posDiffX) {
            posX = posX - (posDiffX - (area.offsetWidth - posX));
            draggable.style.left = `${posX - mousePosX}px`;

        }
        else if (posX < mousePosX) {
            draggable.style.left = `0px`;
        }
        
        if ((area.offsetHeight - posY) < posDiffY) {
            posY = posY - (posDiffY - (area.offsetHeight - posY));
            draggable.style.top = `${posY - mousePosY}px`;

        }
        else if (posY < mousePosY) {
            draggable.style.top = `0px`
        }

        draggable.classList.remove('hide');
    })
});