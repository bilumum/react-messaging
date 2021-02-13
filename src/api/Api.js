const rootApiUrl = "http://localhost:8080";
const addUserApiUrl = rootApiUrl + "/users";

async function addUserToChat(data = {}){

    const response = await fetch(addUserApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if(response.ok) {
        return response.json();
    }
    else{
        console.log(response);
        throw new Error('Server error. Check console for details.');
    }
}

export{
    addUserToChat
}

