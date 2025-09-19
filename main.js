import { Book } from "./Book.js";

let fourthWing = new Book("Fourth Wing", "Rebecca Yarros", ["Adventure", "Fantasy"], 493);


document.getElementById("bookTitle").innerText = fourthWing.title;
document.getElementById("bookAuthor").innerText = fourthWing.author;
document.getElementById("bookGenre").innerText = fourthWing.genre;
document.getElementById("bookPageCount").innerText = fourthWing.pages;

//    <h1 id="bookTitle">Title</h1>
// <h2 id="bookAuthor">Author</h2>
// <p id="bookGenre">Genre</p>
// <p id="bookPageCount">Page Count</p>