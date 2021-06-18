let nouveauLivre = document.querySelector(".h2");
let title = document.querySelector(".title");
// let resultDivMessage = document.createElement("div");
const content = document.getElementById("content");
const container = document.getElementById("myBooks");

// let pochList = [];

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

    fetch(url)
    .then((res) => res.json())
    .then((results) => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      const search = results.items;
      search.map((book) => {
        console.log("book => ", book);
        const card = document.createElement('div');
        card.className = 'card';

        const idBookCard = document.createElement('h4');
        idBookCard.innerText = "Id : " + book.id;
        idBookCard.className = 'card-id';

        const titleBookCard = document.createElement('h4');
        titleBookCard.innerText = "Titre : " + book.volumeInfo.title;
        titleBookCard.className = 'card-title';

        const authorBookCard = document.createElement('p');
        authorBookCard.innerText = "Auteur : " + book.volumeInfo.authors;
        authorBookCard.className = 'card-author';
        if (book.volumeInfo.authors > 1) {
          book.volumeInfo.authors = book.volumeInfo.authors.slice(0, 2);
        }

        const descriptionBookCard = document.createElement('p');
        descriptionBookCard.innerText = "Description : " + book.volumeInfo.description;
        descriptionBookCard.className = 'card-description';
        if (descriptionBookCard === '' || descriptionBookCard === 'undefined') {
          descriptionBookCard.innerText = "Information manquante";
        } else if (descriptionBookCard.innerText.length > 200) {
          descriptionBookCard.innerText = descriptionBookCard.innerText.substring(0, 200) + '...';
        }


        const bookMarks = document.createElement('i');
        bookMarks.className = 'fas fa-bookmark';

        const imgCard = document.createElement('img');
        imgCard.className = 'card-img';

        if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
          imgCard.src = 'images/unavailable.png';
        } else {
          imgCard.src = book.volumeInfo.imageLinks.thumbnail;
        }

        const deleteCard = document.createElement('i');
        deleteCard.className = 'fas fa-trash-alt';
        

        cardContainer.appendChild(card);
        card.appendChild(bookMarks);
        card.appendChild(titleBookCard);
        card.appendChild(idBookCard);
        card.appendChild(authorBookCard);
        card.appendChild(descriptionBookCard);
        card.appendChild(imgCard);
        bookMarks.addEventListener('click', (e) => {
          e.preventDefault();
          if ((sessionStorage.getItem('book') !== null) && (sessionStorage.getItem('book') !== undefined)) {
            books = JSON.parse(sessionStorage.getItem('book'));
          } else {
            books = [];
          }
          // console.log(e.currentTarget.classList);

          if (books.some(b => b.id === book.id)) {
            alert('Ajout impossible, le livre est déjà présent dans vos favoris.');
          } else {
            books.push(book);
            sessionStorage.setItem('book', JSON.stringify(books));
            e.currentTarget.classList = 'fas fa-bookmark';
            e.currentTarget.setAttribute("class", "");
            e.currentTarget.setAttribute("class", "fas fa-times");
            e.currentTarget.setAttribute("class", "fas fa-trash-alt");
          }
          deleteCard.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('book', JSON.stringify(foundBooks));
            location.reload();
            return false;
        })
            
        });
        document.getElementById('content').appendChild(cardContainer);
      });
    })
  }

  //Cancel the search and the result
  function cancelSearch() {
    addBookDiv.innerHTML = `
    <button onclick="addSearchForm()" type="button" class="addButton">Ajouter un livre</button>`;
    searchResults.innerHTML = "";
    searchBook();
    // search = [];
    // resultDivMessage.innerHTML = "";
  }

  function searchResults() {
    let searchResults = document.createElement("div");
    searchResults.classList.add("results");
    searchButton.after(searchResults);
  }

  //Create alert
  function alertMessage() {
    let alert = document.createElement("div");
    nouveauLivre.after(alert);
  }
  alertMessage();

  // function addToFavorites(book) {
  //   let books = [];
  //   bookMarks.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     if ((sessionStorage.getItem('book') !== null) && (sessionStorage.getItem('book') !== undefined)) {
  //       books = JSON.parse(sessionStorage.getItem('book'));
  //     }

  //     if (books.some(b => idBookCard === book)) {
  //       alert('Ajout impossible, le livre est déjà présent dans vos favoris.');
  //     } else {
  //       books.push(book);
  //       sessionStorage.setItem('book', JSON.stringify(books));
  //       bookmarks.setAttribute('class', 'fas fa-bookmark')
  //       bookmarks.setAttribute('style', 'font-size: 6em; color: #1c938c')
  //     }
  //   })
  // }

  // Create elements
  // List of favourite book cards saved in the session storage.
  // const headerPage = document.querySelector('header');
  // const tableIcon = document.createElement('link');
  // tableIcon.setAttribute('rel', 'icon');
  // tableIcon.setAttribute('href', 'images/logo.png');
  // headerPage.appendChild(tableIcon);