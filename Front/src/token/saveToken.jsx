
export default function saveToken(userToken) {
  localStorage.setItem("token", JSON.stringify(userToken));
}
