export const loginRequest = async (email, password) => {
  return;
};

export const StudentregisterRequest = async (
  name,
  surname,
  univercity,
  department,
  email,
  password
) => {
  const response = await fetch("http://localhost:3000/api/register/student", {
    method: "POST",
    body: JSON.stringify({
      name,
      surname,
      univercity,
      department,
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};



export const TeacherregisterRequest = async (
  name,
  surname,
  univercity,
  department,
  email,
  password,
  status
) => {
  const response = await fetch("http://localhost:3000/api/register/teacher", {
    method: "POST",
    body: JSON.stringify({
      name,
      surname,
      univercity,
      department,
      email,
      password,
      status,
    }),
  });
  const data = await response.json();
  console.log(data);
};

export const CommunityregisterRequest = async (
  name,
  surname,
  univercity,
  department,
  email,
  password
) => {
  const response = await fetch("http://localhost:3000/api/register/community", {
    method: "POST",
    body: JSON.stringify({
      name,
      communityType,
      communityun,
      department,
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);
};
