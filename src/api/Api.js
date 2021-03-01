const rootApiUrl = "http://localhost:8080";
const addUserApiUrl = rootApiUrl + "/users";
const getOnlineUsersApiUrl = rootApiUrl + "/users";

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
        var result = await response.json();
        var errorMessage = 'Server error. Check console for details.';
        if(result && result.error){
            errorMessage = result.error;
        }
        throw new Error(errorMessage);
    }
}

async function getOnlineUsers(){

    const response = await fetch(getOnlineUsersApiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        return response.json();
    }
    else{
        console.log(response);
        var result = await response.json();
        var errorMessage = 'Server error. Check console for details.';
        if(result && result.error){
            errorMessage = result.error;
        }
        throw new Error(errorMessage);
    }
}

export{
    addUserToChat,
    getOnlineUsers
}

