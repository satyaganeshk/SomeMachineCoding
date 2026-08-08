// this component is for users we gonna use for validationg the login 
// each may have different roles like admin, user, etc. so we can use it to show the dashboard or not


interface User  {
    username: string;
    password: string;
    role: string[];
}
const users: User[] = [
    {
        username: "satya",
        password: "admin",
        role: [
            "admin",
            "developer",
            "user"]
    },
    {
        username: "john",
        password: "user123",
        role: [
            'user',
            'developer'
        ]
    },
    {
        username: "jane",
        password: "user456",
        role: [
            'user'
        ]
    }
];


// this function is for validating the user login credentials
// if the user is not exist or password is wrong then throw error and show 404 

const validateUser = (username: string, password: string): User => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  return user;
};

export { validateUser, users };