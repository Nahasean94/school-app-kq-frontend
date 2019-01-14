const login = `
   mutation($email:String!,$password:String!) {
  login(email:$email,password:$password) {
    token
    ok
    error
  }
}
`
const createUser = `
   mutation($name:String!,$email:String!,$password:String!,$role:String!) {
  createUser(name:$name,email:$email,password:$password,role:$role) {
   success
  }
}
`
const getSignupRoles = `
   {
  getSignupRoles{
    id
    role
  }
}
`
const isUserExists = `
   mutation($email:String!){
  isUserExists(email:$email){
   exists
  }
}
`
const getAllStudents= `
   {
  getAllStudents{
    id
    name
    email
    timestamp
  }
}
`
const getAllTeachers= `
   {
  getAllTeachers{
    id
    name
    email
    timestamp
  }
}
`
export {
    login,
    getSignupRoles,
    isUserExists,
    createUser,
    getAllStudents,
    getAllTeachers

}
