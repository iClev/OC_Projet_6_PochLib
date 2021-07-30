let nouveauLivre = document.querySelector(".h2");
let PageTitle = document.querySelector(".h1");
const contentBook = document.getElementById("content");
const container = document.getElementById("myBooks");
const maPochListe = document.getElementById("poch-list");

// Funtion Button add book
function addBookButton() {
  let addButton = document.createElement("div");
  addButton.innerHTML = `<div class="addBook">
      <button onclick="addSearchForm()" type="button" class="addButton"> Ajouter un livre </button>
    </div>`;

  container.appendChild(addButton);
  nouveauLivre.after(addButton);
  }
  


function cancelSearch() {
  const addBookDiv = document.querySelector(".addBook");
  addBookDiv.innerHTML = `
  <button type="button" id="addButton" class="addButton">Ajouter un livre</button>`;
  document.getElementById('addButton').addEventListener('click', function() {
    
  })
  searchBook();
  loadPochList();
}
addBookButton();

function createAllEventListner() {

  
  document.getElementById('searchButton').addEventListener('click', function() {
    searchBook();
     
  })
  document.getElementById('cancelButton').addEventListener('click', function() {
      cancelSearch();
      // displayBookToPochList();
  })

}


//Function Add Search Form
function addSearchForm() {
  const addBookDiv = document.querySelector(".addBook");
  addBookDiv.innerHTML = `
  <form id="search-card" onsubmit="searchResults(); return false;">
    <div class="form-group">
      <label class="bookTitle" for="title"> Titre du Livre </label>
    
      <input class="row-s-8 form-control" type="text" name="title" id="title" placeholder="Titre" > </br>
    
      <label class="bookAuthor" for="author">Auteur</label>
  
      <input class="form-control" type="text" name="author" id="author" placeholder="Auteur" > 
    
      <div class="button2"><br>
        <button type="button" id="searchButton" class="searchButton"> Rechercher </button>
      </div><br>

      <div class="button3">
        <button type="button" id="cancelButton" class="cancelButton"> Annuler </button>
      </div><br>
    </div>
  </form>`;
  createAllEventListner();
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

        const headerCard = document.createElement('div');
        headerCard.className = 'card-header';
        headerCard.appendChild(titleBookCard);
        headerCard.appendChild(bookMarks);


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
        card.appendChild(headerCard);
        card.appendChild(idBookCard);
        card.appendChild(authorBookCard);
        card.appendChild(descriptionBookCard);
        card.appendChild(imgCard);



        bookMarks.addEventListener('click', (e) => {
          e.preventDefault();
          if ((sessionStorage.getItem('book') !== null) && (sessionStorage.getItem('book') !== undefined)) {
            books = JSON.parse(sessionStorage.getItem('book'));
            displayBookToPochList(book, id);
          } else {
            books = [];
          }

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
            sessionStorage.setItem('book', JSON.stringify(storedBooks));
            location.reload();
            return false;
          })

        });

      });
      const titlePochList = document.createElement('h2');
      titlePochList.id = 'titlePochList';
      titlePochList.className = 'h2';
      titlePochList.innerHTML = "Résultats de la recherche";
      const cardWrapper = document.createElement('div');
      cardWrapper.appendChild(titlePochList);
      cardWrapper.appendChild(cardContainer);
      const content = document.getElementById("content");
      content.insertBefore(cardWrapper, content.childNodes[0]);
    });


  //Cancel the search and the result
 
  // cancelSearch();



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
}

function displayBookToPochList(book, id) {

  
  const cardContent = document.getElementById('content');
  
  const cardContainer = document.createElement("div");

  const idBook = id;
  cardContainer.id = idBook;
  cardContainer.className = 'resultsPochList';
  content.appendChild(cardContainer);

  const deleteContainer = document.createElement("div");
  deleteContainer.className = "fas fa-trash-alt";
  cardContainer.appendChild(deleteContainer);

  const titleElt = document.createElement('h4');
  titleElt.className = 'h4';
  console.log(book);
  titleElt.textContent = 'Titre:' + '\t' + book.title;
  cardContainer.appendChild(titleElt);

  idElt = document.createElement('h4');
  idElt.className = 'h4';
  idElt.textContent = 'Id -' + '\t' + book.industryIdentifiers[0].type + '\t' + book.industryIdentifiers[0].identifier;
  cardContainer.appendChild(idElt);

  authorElt = document.createElement('h4');
  authorElt.className = 'h4';
  authorElt.textContent = 'Auteur:' + '\t' + book.volumeInfo.authors;
  cardContainer.appendChild(authorElt);

  descriptionElt = document.createElement('p');
  descriptionElt.className = 'description';
  descriptionElt.textContent = book.description ? getDescription(book.description) : "Information manquante";
  cardContainer.appendChild(descriptionElt);

  img = document.createElement('img');
  img.id = 'img';
  img.src = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'images/unavailable.png';
  cardContainer.appendChild(img);

}


function loadPochList() {

  let myPochlist = JSON.parse(localStorage.getItem("myBooks"));
console.log(myPochlist);
  myPochlist && myPochlist.forEach(book => {
      displayBookToPochList(book, book.id);
  });

}