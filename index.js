let nouveauLivre = document.querySelector(".h2");
let title = document.querySelector(".title");
let resultDivMessage = document.createElement("div");
const content = document.getElementById("content");
const container = document.getElementById("myBooks");

let pochList = [];

// Funtion Button add book
function addBookButton() {
  let addButton = document.createElement("div");
  addButton.innerHTML = `<div class="addBook">
      <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
    </div>`;

  nouveauLivre.after(addButton);
}
addBookButton();
let addBookDiv = document.querySelector(".addBook");

//Function Add Search Form
function addSearchForm() {
  addBookDiv.innerHTML = `
  <form>
    <div class="form-group">
      <label class="row-s-3 form-label" for="title"> Titre du Livre </label>
    
      <input class="row-s-8 form-control" type="text" name="title" id="title" placeholder="Titre" > <br></br>
    
      <label class="row-s-3 form-label" for="author">Auteur</label>
  
      <input class="form-control" type="text" name="author" id="author" placeholder="Auteur" > <br></br>
    
      <div class="button2"><br></br>
        <button onclick="searchBook()" type="button" class="searchButton"> Rechercher </button>
      </div><br></br>

      <div class="button3">
        <button onclick="cancelSearch()" type="button" class="cancelButton"> Cancel </button>
      </div><br></br>
    </div>
  </form>`;
}

function searchBook() {
  const url = "https://www.googleapis.com/books/v1/volumes?q=search+terms";
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");

  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      const search = results.items;
      search.map((book) => {
        console.log("book => ", book);









      });
    });
}

//Cancel the search and the result
function cancelSearch() {
  addBookDiv.innerHTML = `
    <button onclick="addSearchForm()" type="button" class="addButton">Ajouter un livre</button>`;
  searchResults.innerHTML = "";
  search = [];
  resultDivMessage.innerHTML = "";
}

function searchResults() {
  let searchResults = document.createElement("div");
  searchResults.classList.add("results");
  searchButton.after(searchResults);
}

// Create PochList
// function createPochList() {
//   let pochListDiv = document.createElement("div");
//   pochListDiv.classList.add("pochList");
//   content.after(pochListDiv);
//   console.log(sessionStorage.getItem("savedBooks"));

//   //Display the saved books
//   if (sessionStorage.getItem("savedBooks")) {
//     pochList = JSON.parse(sessionStorage.getItem("savedBooks"));
//     showPochlist();
//   }
//   console.log(sessionStorage.getItem("savedBooks"));
// }
// createPochList();

//Create alert
function alertMessage() {
  let alert = document.createElement("div");
  nouveauLivre.after(alert);
}
alertMessage();

// function showPochlist() {
//   pochListDiv.innerHTML = '';

// }


