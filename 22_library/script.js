const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = Number(pages);
        this.read = Boolean(read);
    }

    toggleRead() {
        this.read = !this.read;
    }

    get readStatus() {
        return this.read ? "Read" : "Not Read";
    }

    set pageCount(newPageCount) {
        if (isNaN(newPageCount) || newPageCount <= 0) {
            throw new Error("Pages must be a positive number");
        }
        this._pageCount = newPageCount;
    }

    get pageCount() {
        return this._pageCount;
    }

    toString() {
        return `Title: ${this.title}, by ${this.author}, ${this.pageCount} pages, ${this.readStatus}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
addBookToLibrary(new Book("1984", "George Orwell", 328, false));
addBookToLibrary(new Book("Mockingbird", "Harper Lee", 281, true));

document.addEventListener("DOMContentLoaded", () => {
    setupSlideOver();
    setupTableActions();
    displayBooks();
});

function displayBooks() {
    const tbody = document.getElementById("library-tbody");
    if (!tbody) {
        console.warn('Missing table body element with id="library-tbody"');
        return;
    }

    tbody.innerHTML = ""; // Clear existing rows

    myLibrary.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.readStatus}</td>
        <td><button class="btn-toggle" data-action="toggle" data-id="${book.id}">${book.readStatus}</button>
        <button class="btn-remove" data-action="remove" data-id="${book.id}">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

function setupTableActions() {
    const tbody = document.getElementById("library-tbody");
    if (!tbody) return;

    tbody.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        const action = target.getAttribute("data-action");
        const id = target.getAttribute("data-id");
        if (!action || !id) return;

        if (action === "toggle") {
            const book = myLibrary.find((book) => book.id === id);
            if (book) {
                book.toggleRead();
                displayBooks();
            }
        } else if (action === "remove") {
            removeBook(id);
            displayBooks();
        }
    });
}

function setupSlideOver() {
    const addBookBtn = document.getElementById("add-book-btn");
    const slideOver = document.getElementById("slide-over");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close-slide");
    const cancelBtn = document.getElementById("cancel-form");
    const form = document.getElementById("new-book-form");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read");

    if (
        !addBookBtn ||
        !slideOver ||
        !overlay ||
        !closeBtn ||
        !cancelBtn ||
        !form ||
        !titleInput ||
        !authorInput ||
        !pagesInput ||
        !readInput
    ) {
        console.warn("Slide-over elements missing; check your HTML IDs.");
        return;
    }

    function openPanel() {
        slideOver.classList.add("open");
        overlay.classList.add("active");
        overlay.hidden = false;

        addBookBtn.setAttribute("aria-expanded", "true");
        slideOver.setAttribute("aria-hidden", "false");

        setTimeout(() => titleInput.focus(), 150);
        document.addEventListener("keydown", handleEscape);
    }

    function closePanel() {
        slideOver.classList.remove("open");
        overlay.classList.remove("active");
        overlay.hidden = true;

        addBookBtn.setAttribute("aria-expanded", "false");
        slideOver.setAttribute("aria-hidden", "true");

        form.reset();
        addBookBtn.focus();
        document.removeEventListener("keydown", handleEscape);
    }

    function handleEscape(e) {
        if (e.key === "Escape") closePanel();
    }

    addBookBtn.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    cancelBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);

    // Handle form submit: create Book -> add -> re-render -> close
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent page reload

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = pagesInput.valueAsNumber; // NaN if empty/invalid
        const read = readInput.checked;

        // Basic validation
        if (!title || !author || !Number.isFinite(pages) || pages <= 0) {
            // You can show a nicer inline message; for now alert
            alert("Please fill Title, Author, and a valid Pages number (>0).");
            return;
        }

        const newBook = new Book(title, author, pages, read);
        addBookToLibrary(newBook);
        displayBooks();
        closePanel();
    });
}

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
