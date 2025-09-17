"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var Book = /** @class */ (function () {
    function Book(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
    Book.prototype.showBook = function () {
        console.log("".concat(this.title, ", written by ").concat(this.author, ". Genre: ").concat(this.genre));
    };
    return Book;
}());
exports.Book = Book;
