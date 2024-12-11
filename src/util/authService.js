export const loginRequest = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const StudentregisterRequest = async (
  name,
  surname,
  univercity,
  department,
  email,
  emailExtension,
  password
) => {
  const response = await fetch("http://localhost:3000/api/register/student", {
    method: "POST",
    body: JSON.stringify({
      name,
      surname,
      univercity,
      department,
      email:email+emailExtension,
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
  emailExtension,
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
      email:email+emailExtension,
      password,
      status,
    }),
  });
  const data = await response.json();
  console.log(data);
};

export const CommunityregisterRequest = async (
  name,
  Type,
  activityField,
  email,
  password
) => {
  const response = await fetch("http://localhost:3000/api/register/community", {
    method: "POST",
    body: JSON.stringify({
      name,
      type:Type,
      activityField,
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);
};
