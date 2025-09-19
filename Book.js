export class Book {
    constructor(title = "", author = "", genre = [], pages = 0) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
    }
}