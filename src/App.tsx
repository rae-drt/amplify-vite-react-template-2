//import { fetchAuthSession } from '@aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// Function to print access token and id token
/*
  const printAccessTokenAndIdToken = async () => {
    try {
      const session = await fetchAuthSession();   // Fetch the authentication session
      console.log('Session:', session); //.tokens.accessToken.toString());
      //console.log('Tokens:', session.tokens); //.accessToken.toString());
      //console.log('accessToken:', session.tokens?.accessToken); //.toString());
      console.log('token:', session.tokens?.accessToken?.toString()); //.toString());
      // console.log('ID Token:', session.tokens.idToken.toString());
      return (session.tokens?.idToken?.toString());
      //return (session.tokens?.accessToken?.toString());
    }
    catch (e) { console.log(e); }
  };
  */

const client = generateClient<Schema>();
//const nameId = 100123;
  const fetchData = async() => {
     console.log("Fetching all the data");
    console.log(import.meta.env.VITE_VARIABLE);
    //console.log(process.env);
     //setFetching(true);
    //let token = await(printAccessTokenAndIdToken());
    //console.log("TOKEN", token);
     let data;
     //let url = import.meta.env.VITE_APP_API_ROOT + 'name?nameid=' + nameId;
     let url = import.meta.env.VITE_APP_API_ROOT + 'authtest';
     console.log(url);
      // const response = await fetch(url);

     const response = await(fetch(url, { 
           method: 'GET', 
      //     headers: new Headers({
        //       'Authorization': token
          // })
       }));
     console.log("Status:", response.status);
     if(!response.ok) {
       throw new Error('Bad response: ' + response.status);
      }
      data = await(response.json());
     console.log(data);
     //setFetching(false);
   }

function App() {
  const { signOut } = useAuthenticator();
  
  fetchData();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
