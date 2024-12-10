export const loginRequest = async (email, password) => {
  return;
};

export const registerRequest = async (name,surname,univercity,department,email, password) => {

    const response = await fetch("http://localhost:3000/api/register/student", {
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        univercity,
        department,
        email ,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
  
};
