/**
 * Function to check if an email is regex valid
 * @param {*} email 
 * @returns boolean
 */
export function isEmail(email){
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}