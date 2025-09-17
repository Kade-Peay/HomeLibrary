export class Book {
    public constructor(
        private title: string,
        private author: string,
        private genre: string[],
    ) { }

    public showBook(): void {
        console.log(`${this.title}, written by ${this.author}. Genre: ${this.genre}`);
    }

}
