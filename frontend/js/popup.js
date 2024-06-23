
const authorInfo = () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.innerHTML = `
      <div class="popup-content">
        <span class="close" onclick="closePopup()">&times;</span>
        <form id="authorForm" method="post">
          <label for="name">Name</label>
          <input class="nameid" type="text" name="name" id="name"> <br>
          <label for="bio">Bio</label>
          <input class="bioid" type="text" name="bio" id="bio"><br>
          <label for="bdate">Date of Birth</label>
          <input class="bdateid" type="text" name="bdate" id="bdate"> <br>
          <input onclick="addAuthor()" id="btnid" type="submit" value="Submit">
        </form>
      </div>`;
}

const bookInfo = () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.innerHTML  = `
      <div class="popup-content">
        <span class="close" onclick="closePopup()">&times;</span>
        <form id="bookForm" method="post">
          <label for="title">Title</label>
          <input class="titleid" type="text" name="title" id="title"> <br>
          <label for="content">Content</label>
          <textarea name="content" id="content" cols="30" rows="10"></textarea><br>
          <label for="authorId">Author</label>
          <input class="authorIdid" type="text" name="authorId" id="authorId"> <br>
          <input onclick="addBook()" id="bttnid" type="submit" value="Submit">
        </form>
      </div>`;
}

// Function to open the popup
function openPopup(type) {
    document.getElementById("popup").style.display = "block";
    if (type === 'author') { authorInfo(); }
    else if (type === 'book') { bookInfo(); }
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Close the popup if the user clicks outside of it
window.onclick = function (event) {
    var popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

const addAuthor = async () => {
    // Prevent default form submission for demonstration
    event.preventDefault();
    let nameid = document.getElementById('name'),
        bioid = document.getElementById('bio'),
        bdateid = document.getElementById('bdate');

    // event.preventDefault(); // Prevent the form from submitting the traditional way
    var parts = bdateid.value.split('/');
    var mydate = new Date(parts[2], parts[1] - 1, parts[0]); // Assuming the format is dd/mm/yyyy
    console.log(mydate);
    let inputs = {
        name: nameid.value,
        bio: bioid.value,
        birthDate: mydate
    };
    try {
        let response = await fetch("http://localhost:3000/authors", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
    closePopup();
}

const addBook = async () => {
    let title = document.getElementById('title'),
        content = document.getElementById('content'),
        authorId = document.getElementById('authorId');
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let inputs = {
        title: title.value,
        content: content.value,
        authorId: authorId.value
    };
    try {
        let response = await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        console.log(data);
        title.value = '';
        content.value = '';
        authorId.value = '';
    } catch (error) {
        console.log(`Error fetching data ${error}`);
    }
    closePopup();
}
