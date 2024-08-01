``Hello Let's Start``😄

## Description
This is a Real Time Whiteboard Application consist of usage of next.js, typescript and for authentication I have utilized keycloak
for css i have utilized Bootstrap 

## Features of whiteboard
1. Color : A user can choose a color if its choice 
2. Erase : User can erase the content
3. Draw : User can draw / write 
4. Upload/Insert pdf/image: User can easily show case image on whiteboard

## Getting Started

Since For Authentication I have used keyloack :
Go to the Folder auth in that go to the hook folder inside it you will encounter 😇
    const client = new Keycloak({
      url: "http://localhost:8080/",
      realm: "myrealm",
      clientId: "myclient",
    });
A snippet where you have to use your own realm and ClientId 

Inside client : 
let me help you with one more thing 
In Valid redirect URIs : http://localhost:3000/*
Valid post logout redirect URIs : http://localhost:3000/
Web origin : http://localhost:3000/

Create User :
Create a user you can create it in user 
username : admin 
firstname : admin
lastname : admin 
in credential use for password : admin only 
Email : admin@example.com

After this just go to the terminal write the 
``npm run dev`` 

Do enjoy the application 😄


