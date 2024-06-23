// Get the books container element
let booksId = document.getElementById('books');

// Function to display books
const displayBooks = async () => {
    const response = await fetch("http://localhost:3000/books/gbwa");
    const data = await response.json();
    booksId.innerHTML = '';

    data.books.forEach((book, index) => {
        booksId.innerHTML += `
<div class="card" data-index="${index}">
    <div class="foto">
        <img src="./media/la.jpeg"  />
    </div>
    <div class="card-content">
        <div class="action">
            <span onClick="editBook(${index})" class="edit act" data-index="${index}"></span>
            <span onClick="deleteBook(${index})" class="delete act" data-index="${index}"></span>
        </div>
        <h2 class="title">Book Title: <span  id="tid-${index}">${book.title}</span></h2>
        <div class="publishdate" id="pid-${index}">Date of Publishing: ${book.publishAt}</div>
        <div " class="author">Author: <a href="#"><span id="aid-${index}">${book.authorName}</span></a></div>

        <p class="content" id="cid-${index}">Content: ${book.content}</p>
    </div>
</div>
        `;
    });
    console.log(data.books);
};

// Call displayBooks to load books on page load
displayBooks();

// Function to edit a book
const editBook = async (index) => {
    const updatePopup = document.getElementById('updatepopup');
    const newBook = document.getElementById('newbook');
    newBook.style.display = 'none';
    updatePopup.style.display = 'block';

    const bookTitle = document.getElementById(`tid-${index}`).innerText.trim();
    const bookContent = document.getElementById(`cid-${index}`).innerText.trim().replace('Content: ', '');

    updatePopup.innerHTML = `
        <form method="post" class='form'>
            <label for="title">Title</label>
            <input class="titleid" type="text" name="title" id="title" value="${bookTitle}"><br>
            <label for="content">Content</label>
            <textarea name="content" id="contentid" cols="30" rows="10">${bookContent}</textarea><br>
            <input onclick="updateBook(${index})" id="bttnid" type="submit" value="Update">
        </form>
    `;
};

// Function to update a book
const updateBook = async (index) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const titleInput = document.getElementById('title').value;
    const contentInput = document.getElementById('contentid').value;

    let inputs = {
        title: titleInput,
        content: contentInput
    };

    const bookId = document.querySelector(`.card[data-index="${index}"]`).getAttribute('data-id');

    try {
        let response = await fetch(`http://localhost:3000/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        console.log(data);

        displayBooks();

        const updatePopup = document.getElementById('updatepopup');
        const newBook = document.getElementById('newbook');
        newBook.style.display = 'block';
        updatePopup.style.display = 'none';
    } catch (error) {
        console.log(`Error updating book: ${error}`);
    }
};

// Function to delete a book (to be implemented)
const deleteBook = async (index) => {
    // const bookTitle = document.querySelector(`.card-content[data-index="${index}"]`).innerText;
    const bookTitle = document.querySelector(`#tid-${index}`)
    let dtitle = bookTitle.innerText.trim()

    console.log(bookTitle)
    try {
        let response = await fetch(`http://localhost:3000/books/${dtitle}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);

        displayBooks();
    } catch (error) {
        console.log(`Error deleting book: ${error}`);
    }
};

document.querySelectorAll('.edit').forEach(element => {
    element.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        editBook(index);
    });
});

document.querySelectorAll('.delete').forEach(element => {
    element.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        deleteBook(index);
    });
});

// ---------------------------------------


//---------------------------------------


// const authorInfo = () => {
//     const pop_up_window = document.querySelector('.pop_up_window');
//     pop_up_window.innerHTML = `
//       <div class="popup-content">
//         <span class="close" onclick="closePopup()">&times;</span>
//         <form id="authorForm" method="post">
//           <label for="name">Name</label>
//           <input class="nameid" type="text" name="name" id="name"> <br>
//           <label for="bio">Bio</label>
//           <input class="bioid" type="text" name="bio" id="bio"><br>
//           <label for="bdate">Date of Birth</label>
//           <input class="bdateid" type="text" name="bdate" id="bdate"> <br>
//           <input onclick="addAuthor()" id="btnid" type="submit" value="Submit">
//         </form>
//       </div>`;
// }
// const bookInfo = () => {
//     const pop_up_window = document.querySelector('.pop_up_window');
//     pop_up_window.innerHTML  = `
//        <form method="post">
//         <label for="title"> Title</label>
//         <input class="titleid" type="text" name="title" id="title"> <br>
//         <label for="content"> Content</label>
//         <textarea name="content" id="contentid" cols="30" rows="10"></textarea><br>
//         <label for="authorId"> Author</label>
//         <input class="authorIdid" type="text" name="authorId" id="authorId"> <br>
//         <input onclick="addBook()" id="bttnid" type="submit" value="Submit">
//     </form>`;
// }

// // Function to open the popup
// function openPopup(type) {
//     document.getElementById("popup").style.display = "block";
//     if (type === 'author') { authorInfo(); }
//     else if (type === 'book') { bookInfo(); }



// }

// // Function to close the popup
// function closePopup() {
//     document.getElementById("popup").style.display = "none";
// }

// // Close the popup if the user clicks outside of it
// window.onclick = function (event) {
//     var popup = document.getElementById("popup");
//     if (event.target == popup) {
//         popup.style.display = "none";
//     }
// }

// const addAuthor = async () => {
//     // Prevent default form submission for demonstration
//     event.preventDefault();
//     let nameid = document.getElementById('name'),
//         bioid = document.getElementById('bio'),
//         bdateid = document.getElementById('bdate');

//     // event.preventDefault(); // Prevent the form from submitting the traditional way
//     var parts = bdateid.value.split('/');
//     var mydate = new Date(parts[2], parts[1] - 1, parts[0]); // Assuming the format is dd/mm/yyyy
//     console.log(mydate);
//     let inputs = {
//         name: nameid.value,
//         bio: bioid.value,
//         birthDate: mydate
//     };
//     try {
//         let response = await fetch("http://localhost:3000/authors", {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(inputs)
//         });
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.log(`Error fetching data: ${error}`);
//     }
//     closePopup();
// }






// const addBook = async () => {
//     let title = document.getElementById('title'),
//     content = document.getElementById('contentid'),
//     authorId = document.getElementById('authorId')
    
//     event.preventDefault(); // Prevent the form from submitting the traditional way
//     let inputs = {
//         content: content.value,
//         title: title.value,
//         authorId: authorId.value
//     }
//     try {
//         let response = await fetch("http://localhost:3000/books", {
//             method: "POST", headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             }, body: JSON.stringify(inputs)
//         })
//         const data = await response.json()
//         console.log(data)
//         title.value = ''
//         content.value = ''
//         authorId.value = ''
//     } catch (error) {
//         console.log(`Error fetching data ${error}`)

//     }
//     closePopup();


// }
