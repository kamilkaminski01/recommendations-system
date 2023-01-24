export default function CheckToken() {
  const token = localStorage.getItem("token");
  return token;
}
