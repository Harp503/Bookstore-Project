const addBookForm = document.querySelector("#add-book");
const booksTable = document.querySelector("#books-table");
const apiUrl = "https://bookstore-api-six.vercel.app/";
const ep = "api/books"
const headers = {
    "Content-type": "application/json"
  };
  
  // Post
  addBookForm.addEventListener("submit", handleAddBook);

async function handleAddBook(event){
  event.preventDefault();
  try {
        const payload = { 
        title: event.target.title.value,
        author: event.target.author.value,
        genre: event.target.genre.value,
        publisher: event.target.publisher.value,
      };
    const response = await fetch(`${apiUrl}${ep}`, { 
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });

const data = await response.json();

const newElement = document.createElement("section");
newElement.classList.add("table-row", "d-flex");
newElement.innerHTML = `
    <section class="book-info">${data.title}</section>
    <section class="book-info">${data.author}</section>
    <section class="book-info">${data.genre}</section>
    <section class="book-info">${data.publisher}</section>
    <button class="delete-todo" data-id="${data.id}">Delete</button>
  `;
booksTable.appendChild(newElement);
event.target.reset();

  } catch (error) {
    console.log(error.message);
  }
}

// Deleting Book
async function deleteBook(id){
try {
   const response = await fetch(`${apiUrl}${ep}/${id}`, {
        method: "DELETE",
        headers
    });
      await response.json();
    } catch (error) {
        console.log (error);
    }
}
// Delete Button
document.addEventListener("click", async function (event) {
    if (event.target.classList.contains ("delete-todo")){
      const id = event.target.getAttribute("data-id");
      await deleteBook(id);
      event.target.parentElement.remove();
    }
});

// Loading in API - (GET)
async function fetchBooks() {
    try {
        const response = await fetch(`${apiUrl}${ep}`);
        const books = await response.json();

        books.forEach(data => {
          const newElement = document.createElement("section"); 
          newElement.classList.add("table-row", "d-flex");
          newElement.innerHTML = `
            <section class="book-info">${data.title}</section>
            <section class="book-info">${data.author}</section>
            <section class="book-info">${data.genre}</section>
            <section class="book-info">${data.publisher}</section>
            <button class="delete-todo" data-id="${data.id}">Delete</button>
            `;
            booksTable.appendChild(newElement);
    });
    } catch (error) {
       console.log(error);
    }
}
fetchBooks();