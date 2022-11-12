const divSeats = document.querySelector("#seats")








eventListener();


function eventListener() {
    document.addEventListener("DOMContentLoaded", loadAllSeatsUI);
    document.addEventListener("DOMContentLoaded", setSeatArray);
    document.addEventListener("click", changeSeatStatus)
    document.addEventListener("DOMContentLoaded", loadAllSeatsFromStorage);
}

function loadAllSeatsUI() {
    let divRow;




    for (let i = 1; i <= 36; i++) {

        if (i % 6 == 1) {

            divRow = document.createElement("div");
            divRow.className = "row row-cols-auto justify-content-md-center"


        }


        const divSeat = document.createElement("div");
        divSeat.className = "col seat freeseatdiv";

        const pSeatno = document.createElement("p");
        pSeatno.appendChild(document.createTextNode(`${i}`))

        const linkSeat = document.createElement("a")
        linkSeat.href = "#"
        linkSeat.className = "linkseat"
        linkSeat.innerHTML = "<i class='bi bi-diamond-fill freeseatlink'></i>"

        const pSeatStatus = document.createElement("p")
        pSeatStatus.appendChild(document.createTextNode("FREE"))
        divSeat.appendChild(pSeatStatus)
        divSeat.appendChild(pSeatno)
        divSeat.appendChild(linkSeat)

        divRow.appendChild(divSeat)
        divSeats.appendChild(divRow)



    }
}


function changeSeatStatus(e) {
    const seat = e.target
    if (seat.className === "bi bi-diamond-fill freeseatlink") {
        seat.className = "bi bi-diamond-fill fillseatlink"
        seat.parentElement.parentElement.className = "col seat fillseatdiv"
        seat.parentElement.previousElementSibling.previousElementSibling.innerText = "FILL"
        addSeatsStorage(e);
    }

    else if (seat.className === "bi bi-diamond-fill fillseatlink") {
        seat.className = "bi bi-diamond-fill freeseatlink"
        seat.parentElement.parentElement.className = "col seat freeseatdiv"
        seat.parentElement.previousElementSibling.previousElementSibling.innerText = "FREE"
        deleteSeatsStorage(e);
    }



    e.preventDefault();



}

function setSeatArray() {
    const items = document.querySelectorAll(".seat")

    items.forEach((item) => {
        seatsArray.push(item)

    })


}

function getSeatsFromStorage() {
    let seats;
    if (localStorage.getItem("fillseatdiv") === null) {
        seats = [];
    }
    else {
        seats = JSON.parse(localStorage.getItem("fillseatdiv"))
    }
    return seats;
}

function addSeatsStorage(e) {

    const item = Number(e.target.parentElement.previousElementSibling.innerText) - 1

    const seatFillArray = getSeatsFromStorage();
    console.log(seatFillArray.indexOf(item))
    if (seatFillArray.indexOf(item) === -1) {
        seatFillArray.push(item)

        localStorage.setItem("fillseatdiv", JSON.stringify(seatFillArray))
    }




}

function deleteSeatsStorage(e) {
    const seatFillArray = getSeatsFromStorage();
    const item = Number(e.target.parentElement.previousElementSibling.innerText) - 1

    if (seatFillArray.indexOf(item) !== -1) {
        seatFillArray.splice(seatFillArray.indexOf(item),1)

        localStorage.setItem("fillseatdiv", JSON.stringify(seatFillArray))
    }

}

function loadAllSeatsFromStorage() {
    const fillSeats = getSeatsFromStorage();
    const divSeat = document.querySelectorAll(".seat")

    

    fillSeats.forEach((index)=>{
        divSeat[index].className="col seat fillseatdiv"
        divSeat[index].children[0].innerHTML="FILL"
        divSeat[index].children[2].children[0].className="bi bi-diamond-fill fillseatlink"
        console.log(divSeat[index])//div
        console.log(divSeat[index].children[0])//p
        console.log(divSeat[index].children[2].children[0])//i
    })


}

