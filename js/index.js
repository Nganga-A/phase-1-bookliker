document.addEventListener("DOMContentLoaded", function() {
    
   // Fetch the list of books from the backend
fetch('http://localhost:3000/books')
.then(response => response.json())
.then(books => {
  const listElement = document.querySelector('#list');

  // Display the book titles in the list
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = book.title;
    li.addEventListener('click', () => {
      // Show book details when the title is clicked
      showBookDetails(book);
    });
    listElement.appendChild(li);
  });
});

// Function to display book details
function showBookDetails(book) {
const showPanel = document.querySelector('#show-panel');
showPanel.innerHTML = ''; // Clear previous content

// Create elements for book details
const thumbnail = document.createElement('img');
thumbnail.src = book.thumbnail;
const description = document.createElement('p');
description.textContent = book.description;
const likedBy = document.createElement('ul');

// Display list of users who liked the book
book.users.forEach(user => {
  const userLi = document.createElement('li');
  userLi.textContent = user.username;
  likedBy.appendChild(userLi);
});

// Create like button
const likeButton = document.createElement('button');
likeButton.textContent = 'Like';
likeButton.addEventListener('click', () => {
  const currentUser = { id: 1, username: 'pouros' };
  const likedByUsers = [...book.users, currentUser];
  likeBook(book.id, likedByUsers);
});

// Append elements to the show panel
showPanel.appendChild(thumbnail);
showPanel.appendChild(description);
showPanel.appendChild(likedBy);
showPanel.appendChild(likeButton);
}

// Function to like a book
function likeBook(bookId, likedByUsers) {
const patchData = {
  users: likedByUsers
};

fetch(`http://localhost:3000/books/${bookId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(patchData)
})
  .then(response => response.json())
  .then(updatedBook => {
    // Update the book details with the new list of users who liked the book
    const showPanel = document.querySelector('#show-panel');
    const likedBy = showPanel.querySelector('ul');
    likedBy.innerHTML = ''; // Clear previous content

    updatedBook.users.forEach(user => {
      const userLi = document.createElement('li');
      userLi.textContent = user.username;
      likedBy.appendChild(userLi);
    });
  });
}











});
