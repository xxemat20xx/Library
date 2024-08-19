const myLibrary = [];

function Book(title, url, author, pages, read) {
    // the constructor...
    this.title = title;
    this.url = url;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// Open modal
function bookModal() {
    const modal = document.createElement('div');
    modal.classList.add("modal");
    modal.innerHTML = `
                    <div class="modal-content">
                        <h1>Add New Manga</h1>
                        <div class="modal-inputs">
                            <input type="text" id="book-title" placeholder="Manga Title" >
                            <input type="text" id="book-author" placeholder="Author">
                            <input type="url" name="url" id="url" placeholder="https://example.com" pattern="https://.*" size="30" />
                            <input type="number" id="book-page" placeholder="Page/s">
        
                            <div class="read">
                                <label for="read">Have you read it?</label>
                                <input type="checkbox" id="read">
                            </div>
                        </div>
                        <div class="modal-btn">
                            <button class="btn" id="btn-addBook">Add Book</button>
                            <button class="btn" id="btn-cancel">Cancel</button>
                        </div>
                    </div>
                
    `;
    document.body.appendChild(modal);
}
// ADD TO ARRAY
function addBookToLibrary(title, url, author, pages, read) {
    const newBook = new Book(title, url, author, pages, read);

    myLibrary.push(newBook);
    displayBook();
    console.log(myLibrary);
}
// DISPAY TO UI
function displayBook() {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    myLibrary.forEach((book, index) => {

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerHTML = `
                             <h3 id="card-title">Title: ${book.title}</h3>
                              <div class="img-container">
                               <img src="${book.url}"
                                    alt="...">
                                </div>
                                <p id="card-author">Book Author: ${book.author}</p>
                                <p id="card-page">Page/s: ${book.pages}</p>
                                <span id="card-readstats">Status: ${book.read ? "Read" : "Not Read"}</span>
                            <div class="cards-btn">
                                    <button id="btnRead" data-index="${index}">${book.read ? "Not Read" : "Read"}</button>
                                    <button id="btnDelete" data-index="${index}">Delete</button>
                            </div>
        `;
        cards.appendChild(newCard);
    });
}
function deleteList(index) {
    const alert = document.querySelector(".alert");
    const addedTitle = document.querySelector("#add-title");
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);

        alert.classList.add("alert-deleted");
        alert.style.visibility = "visible";
        addedTitle.innerHTML = " Manga Deleted"

        setTimeout(() => {
            alert.style.visibility = "hidden";
        }, 2000);


        displayBook();

    } else {
        console.log(`Invalid index: ${index}`);
    }
}
// Event listeners
document.querySelector("#open-modal").addEventListener("click", () => { // ---------------------open modal---------------------//
    bookModal();
});
document.addEventListener("click", function (e) {                   // --------------------- add book --------------------- //
    if (e.target.id === "btn-addBook") {
        const title = document.querySelector("#book-title").value;
        const url = document.querySelector("#url").value;
        const author = document.querySelector("#book-author").value;
        const pages = document.querySelector("#book-page").value;
        const read = document.querySelector("#read").checked;
        const alert = document.querySelector(".alert");
        const addedTitle = document.querySelector("#add-title");
        if (title === "" || author === "" || url === "") {
            alert("Please fill all field!");
            return;
        }
        if (!parseInt(pages) || parseInt(pages) < 0) {
            alert("Please enter a valid number!")
        }

        else if (!parseInt(pages) || parseInt(pages) < 0) {

        }
        else {
            addBookToLibrary(title, url, author, pages, read);
            alert.classList.add("alert-added");
            alert.style.visibility = "visible";
            addedTitle.innerHTML = ` You have added ${title}`;
            setTimeout(() => {
                alert.style.visibility = "hidden";
            }, 3000);
            // clear 
            document.querySelector("#book-title").value = "";
            document.querySelector("#book-author").value = "";
            document.querySelector("#book-page").value = "";
            document.querySelector("#read").checked = false;
            document.querySelector("#url").value = "";
            document.querySelector(".modal").remove();
        }
    }

});
// read status evt
document.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    if (e.target.id === "btnRead") {
        myLibrary[index].read = !myLibrary[index].read;
        displayBook();
    }
});
// REMOVE BOOK
document.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    e.target.id === "btnDelete" ? deleteList(index) : "";
});
// ---------------------CLOSE modal---------------------//
document.addEventListener("click", function (e) {
    e.target.id === "btn-cancel" ? document.querySelector(".modal").remove() : "";
});

// RENDER DATA
addBookToLibrary("Attack on Titan",
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10701949_b_v8_ah.jpg",
    "Hajime Isayama",
    69,
    true);

addBookToLibrary("Chainsaw Man",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv052bvTHRsXROGd6UQgVaHqgmnOWjEZV8UVBUw8kdTPVeEkEBOrlJ5PIpCSDXlIvoZ4c&usqp=CAU",
    "Tatsuki Fujimoto",
    99,
    true);

addBookToLibrary("One Piece",
    "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg",
    "Oda",
    1100,
    true);
addBookToLibrary("kimetsu no yaiba",
    "https://demonslayer-hinokami.sega.com/img/purchase/digital-standard.jpg",
    "Koyoharu Gotouge",
    320,
    true);
displayBook();