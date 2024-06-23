    // let nameid = document.getElementById('name'),
    //     bioid = document.getElementById('bio'),
    //     bdateid = document.getElementById('bdate');

    // const addAuthor = async () => {
    //     event.preventDefault(); // Prevent the form from submitting the traditional way
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
    // };
