let nouveauLivre = document.querySelector(".h2");

let PageTitle = document.querySelector(".h1");

const container = document.getElementById("myBooks");

const maPochListe = document.getElementById("poch-list");

// Funtion adds "Ajouter un livre" button 
function createAddBookButton() {
  const container = document.getElementById("myBooks");

  let addBookButton = document.createElement("div");
  addBookButton.id = "addBookBtn";
  addBookButton.innerHTML = `<div class="addBookDiv">

      <button onclick="createSearchForm()" type="button" class="addBookButton"> Ajouter un livre </button>

    </div>`;

  addBookButton.hidden = false;

  container.appendChild(addBookButton);

  nouveauLivre.after(addBookButton);
}
//Clicking on the "Annuler" button redirects to the "Ajouter un livre" page and the Pochliste.
function cancelSearch() {
  const addBookDiv = document.querySelector(".addBookDiv");

  addBookDiv.innerHTML = `

  <button onclick="createSearchForm()" type="button" id="addBookBtn" class="addBookButton">Ajouter un livre</button>`;
}
createAddBookButton();

//Add all events listner
function createAllEventListner() {
  document.getElementById("searchButton").addEventListener(
    "click",
    function () {
      displaySearchBook();
      clearPochlist();
      if (document.getElementById("maPochList")) {
        document.getElementById("maPochList").hidden = false;
      }
      if (document.getElementById("poch-List")) {
        document.getElementById("poch-List").hidden = false;
      }
    });

  document.getElementById("cancelButton").addEventListener(
    "click",
    function () {
      cancelSearch();
      displayBookToPochList();
      document.getElementById("results").hidden = true;
    },
  );
}
//Function Add Search Form
function createSearchForm() {
  const addBookDiv = document.querySelector(".addBookDiv");
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
// Search results: display books 
function displaySearchBook() {
  let libelleAlert = "";
  if (document.getElementById("title").value == "") {
    libelleAlert = "Vous devez saisir obligatoirement le titre ";
  }
  if (document.getElementById("author").value == "") {
    libelleAlert = "Vous devez saisir obligatoirement l'auteur ";
  }
  if (libelleAlert != "") {
    alert(libelleAlert);
    libelleAlert = "";
  }
  else {

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
            if (sessionStorage.getItem(book.id) !== null) {
              alert('Ajout impossible, le livre est déjà présent dans vos favoris.');
            } else {
              sessionStorage.setItem(book.id, JSON.stringify(book));
              e.currentTarget.classList = 'fas fa-bookmark';
              e.currentTarget.setAttribute("class", "fas fa-bookmark");
              displayBookToPochList(book);
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
        cardWrapper.id = "results";
        cardWrapper.appendChild(titlePochList);
        cardWrapper.appendChild(cardContainer);

        const content = document.getElementById("content");
        content.insertBefore(cardWrapper, content.childNodes[0]);
      });

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
}
// Add books to the poch'list
function displayBookToPochList(book) {
  const content = document.getElementById('content');
  let pochListContainer = document.getElementById('pochlist-container');
  let cardWrapper = document.createElement('div');
  cardWrapper.id = "pochList";
  if (pochListContainer) {
    cardWrapper = document.getElementById('pochList');
  } else {
    const maPochList = document.createElement('div');
    maPochList.id = "maPochList";
    maPochList.className = 'h2';
    maPochList.innerHTML = "Ma poch'liste";
    pochListContainer = document.createElement('div');
    pochListContainer.id = "pochlist-container";
    cardWrapper.appendChild(maPochList);
  }
  for (i = 0; i < sessionStorage.length; i++) {
    const idLivre = sessionStorage.key(i);
    const test = document.getElementById(idLivre + "[poch]");
    if (test !== 'undefined' && test != null) {

    } else {
      var book1 = JSON.parse(sessionStorage.getItem(idLivre));
      if (!book1.id) {
        continue;
      }
      const card = document.createElement("div");
      card.className = "card";
      card.id = book1.id + "[poch]";

      const idBookCard = document.createElement("h4");
      idBookCard.innerText = "Id : " + book1.id;
      idBookCard.className = "card-id";

      const titleBookCard = document.createElement("h4");

      titleBookCard.innerText = "Titre : " + book1.volumeInfo.title;

      titleBookCard.className = "card-title";

      const authorBookCard = document.createElement("p");

      authorBookCard.innerText = "Auteur : " + book1.volumeInfo.authors;

      authorBookCard.className = "card-author";

      if (book1.volumeInfo.authors > 1) {
        book1.volumeInfo.authors = book1.volumeInfo.authors.slice(0, 2);
      }

      const descriptionBookCard = document.createElement("p");

      descriptionBookCard.innerText =
        "Description : " + book1.volumeInfo.description;

      descriptionBookCard.className = "card-description";

      if (descriptionBookCard === "" || descriptionBookCard === "undefined") {
        descriptionBookCard.innerText = "Information manquante";
      } else if (descriptionBookCard.innerText.length > 200) {
        descriptionBookCard.innerText =
          descriptionBookCard.innerText.substring(0, 200) + "...";
      }

      const bookMarks = document.createElement("i");

      bookMarks.className = "fas fa-trash-alt";
      bookMarks.addEventListener("click", (e) => {
        e.preventDefault();

        sessionStorage.removeItem(book1.id);

        document.getElementById(book1.id + "[poch]").remove();
      });

      const headerCard = document.createElement("div");

      headerCard.className = "card-header";

      headerCard.appendChild(titleBookCard);

      headerCard.appendChild(bookMarks);

      const imgCard = document.createElement("img");

      imgCard.className = "card-img";

      if (
        book1.volumeInfo.imageLinks === null ||
        book1.volumeInfo.imageLinks === undefined
      ) {
        imgCard.src = "images/unavailable.png";
      } else {
        imgCard.src = book1.volumeInfo.imageLinks.thumbnail;
      }
      pochListContainer.appendChild(card);

      card.appendChild(headerCard);

      card.appendChild(idBookCard);

      card.appendChild(authorBookCard);

      card.appendChild(descriptionBookCard);

      card.appendChild(imgCard);

      cardWrapper.appendChild(pochListContainer);
    }
  }
  content.appendChild(cardWrapper);
}

// Clear the pochlist
function clearPochlist() {
  const content = document.getElementById("content");

  content.innerHTML = "";
}
// Loading pochlist
function loadPochList() {
  let myPochlist = JSON.parse(sessionStorage.getItem("book"));

  console.log(myPochlist);

  myPochlist &&
    myPochlist.forEach((book) => {
      displayBookToPochList(book, id);
    });
}