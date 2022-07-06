import './IntroMap.scss';
import { collisions } from './IntroMapData'

window.onload = function () {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  canvas.width = 1024
  canvas.height = 576

  const collisionsMap = []
  //90 is map width
  for (let i = 0; i < collisions.length; i += 90) {
    collisionsMap.push(collisions.slice(i, 90 + i))
  }

  class Boundary {
    static width = 16
    static height = 16
    constructor({ position }) {
      this.position = position

      //16x16, like i set on Tiled
      this.width = Boundary.width
      this.height = Boundary.height
    }

    draw() {
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  }

  const offset = {
    x: 0,
    y: 0
  }

  const boundaries = []

  //
  collisionsMap.forEach((row, i) => {
    row.forEach((num, ind) => {
      if (num === 1985) {
        boundaries.push(new Boundary({
          position: {
            x: ind * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        }))
      }
    })
  })

  const mapImg = new Image()
  mapImg.src = 'img/testMap.png'

  const playerImage = new Image()
  playerImage.src = 'img/down_walk1.png'

  class Sprite {
    constructor({ position, image, frames = { max: 1 } }) {
      this.position = position
      this.image = image
      this.frames = frames

      this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
      }
    }

    draw() {
      c.drawImage(
        this.image,
        0,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      )
    }
  }

  const player = new Sprite({
    position: {
      x: canvas.width / 2 + 100,
      y: canvas.width / 2 - 200
    },
    image: playerImage
  })
  const background = new Sprite({
    position: {
      //should match up with the drawImage
      x: offset.x,
      y: offset.y
    }, image: mapImg
  })

  //TRACKS MOVEMENT KEY BEING PRESSED / RELEASED
  const keys = {
    w: {
      pressed: false
    },
    a: {
      pressed: false
    },
    s: {
      pressed: false
    },
    d: {
      pressed: false
    }
  }

  let lastKey = ''
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break;
      case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break;
      case 's':
        keys.s.pressed = true
        lastKey = 's'
        break;
      case 'd':
        keys.d.pressed = true
        lastKey = 'd'
        break;
    }
  })

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = false
        break;
      case 'a':
        keys.a.pressed = false
        break;
      case 's':
        keys.s.pressed = false
        break;
      case 'd':
        keys.d.pressed = false
        break;
    }
  })

  const movables = [background, ...boundaries]

  function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
  }
  //infinite loop, so the effect of the keypress conditionals will run for however long they remain true
  const animate = () => {
    window.requestAnimationFrame(animate)
    background.draw()
    //If i change the offset of the map, need to factor that in to the boundary placement
    boundaries.forEach(boundary => {
      boundary.draw()
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: boundary
      })) {
        console.log("COLLIDE");
      }
    })
    player.draw()

    if (keys.w.pressed && lastKey === 'w') movables.forEach(m => { m.position.y += 3 })
    else if (keys.a.pressed && lastKey === 'a') movables.forEach(m => { m.position.x += 3 })
    else if (keys.s.pressed && lastKey === 's') movables.forEach(m => { m.position.y -= 3 })
    else if (keys.d.pressed && lastKey === 'd') movables.forEach(m => { m.position.x -= 3 })

  }

  animate()
}

function App() {
  return (
    <>
      <canvas></canvas>
    </>

  );
}

export default App;
