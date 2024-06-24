const bookInfo = async () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closePopup()">&times;</span>
            <form id="bookForm" method="post">
                <label for="title">Title</label>
                <input class="titleid" type="text" name="title" id="title"> <br>
                <label for="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10"></textarea><br>
                <label for="authorId">Author</label>
                <select name="author" id="select"></select><br>
                <input type="submit" value="Submit">
            </form>
        </div>`;

    pop_up_window.style.display = 'block';

    // Fetch authors and populate the select element
    const select = document.getElementById('select');
    try {
        const response = await fetch("http://localhost:3000/authors/");
        const data = await response.json();
        const authors = data.Authors;
        console.log('Fetched authors:', authors);

        authors.forEach(author => {
            console.log('Author object:', author);
            let option = document.createElement("option");
            option.value = author.id || author.ID || author._id || ''; // Adjust based on actual property
            option.textContent = author.name || author.Name || author.fullName || ''; // Adjust based on actual property
            console.log('Creating option:', option);
            select.appendChild(option); // Corrected the typo
        });

        console.log('Select element after adding options:', select);
    } catch (error) {
        console.log(`Error fetching authors: ${error}`);
    }
};

const addBook = async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    let title = document.getElementById('title'),
        content = document.getElementById('content'),
        selectAuthor = document.getElementById('select');

    let inputs = {
        title: title.value,
        content: content.value,
        authorId: selectAuthor.value
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
        selectAuthor.value = '';
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
    closePopup();
};

const closePopup = () => {
    const pop_up_window = document.querySelector('.pop_up_window');
    pop_up_window.style.display = 'none';
};

// Event listener for form submission
document.addEventListener('submit', addBook);
