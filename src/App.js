import './App.scss';

window.onload = function () {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  c.fillRect(0, 0, canvas.width, canvas.height)
  canvas.width = 1024
  canvas.height = 576
  const mapImg = new Image()
  mapImg.src = 'img/testMap.png'

  mapImg.onload = () => {
    //if i want to change the starting position, change the 0s
    c.drawImage(mapImg, 0, 0)
  }
}

function App() {
  return (
    <>
      <canvas></canvas>
    </>

  );
}

export default App;
