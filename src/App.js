import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";
import { v4 as uuid } from 'uuid';

const App = () => {

  const unique_id = uuid();

  const [values, setValues] = useState({
    name: "",
    email: "",
    birthday: "",
    message: ""
  });

  const inputs = [
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "name",
        errorMessage:
          "name should be 3-16 characters and shouldn't include any special character!",
        label: "name",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
      },
      {
        id: 3,
        name: "message",
        type: "message",
        placeholder: "Tell us something about yourself",
        errorMessage: "Satisfy our curiousity a bit!",
        label: "Message",
        required: true,
      },
    ,
   
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"id": {unique_id},
  "name": "Rabi Ahmed",
  "email": "ahmedrabi2003@gmail.com",
  "message": "Hey im rabi ahmed a software developer"
})
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))

  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;