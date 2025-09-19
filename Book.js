export class Book {
    constructor(title, author, genre, pages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
    }

    getInfo() {
        return `${this.title} by ${this.author}, ${this.genre}, ${this.pages} pages`;
    }
}