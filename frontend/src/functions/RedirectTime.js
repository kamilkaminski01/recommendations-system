export default function RedirecTime(props) {
  setTimeout(function () {
    window.location.replace(props.url);
  }, 5000);
}
