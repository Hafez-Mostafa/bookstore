let title = document.getElementById('title'),
content = document.getElementById('content'),
authorId = document.getElementById('authorId')


const addBook = async () => {
event.preventDefault(); // Prevent the form from submitting the traditional way

let inputs = {
    title: title.value,
    content: content.value,
    authorId: authorId.value
}
try {
    let response = await fetch("http://localhost:3000/books", {
        method: "POST", headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, body: JSON.stringify(inputs)
    })
    const data = await response.json()
    console.log(data)
    title.value=''
     content.value=''
   authorId.value=''



} catch (error) {
    console.log(`Error fetching data ${error}`)

}

}








const editBook = async () => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    


    
    let inputs = {
        title: title.value,
        content: content.value,
        authorId: authorId.value
    }
    try {
        let response = await fetch("http://localhost:3000/books", {
            method: "PUT", headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body: JSON.stringify(inputs)
        })
        const data = await response.json()
        console.log(data)
        title.value=''
         content.value=''
       authorId.value=''
       
    
    
    } catch (error) {
        console.log(`Error fetching data ${error}`)
    
    }
    
    }











