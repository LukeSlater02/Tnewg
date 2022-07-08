import './IntroMap.scss';
import { collisions } from './IntroMapData'
import { Boundary, Sprite } from './classes.js'

window.onload = function () {
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')
  canvas.width = 1440
  canvas.height = 960

  const collisionsMap = []
  //90 is map width
  for (let i = 0; i < collisions.length; i += 90) {
    collisionsMap.push(collisions.slice(i, 90 + i))
  }

  const offset = {
    x: 0,
    y: 0
  }

  const boundaries = []

  //
  collisionsMap.forEach((row, i) => {
    row.forEach((num, ind) => {
      if (num === 1986) {
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
  mapImg.src = 'img/introMap.png'

  const playerImage = new Image()
  playerImage.src = 'img/down_walk1.png'

  const foregroundImg = new Image()
  foregroundImg.src = 'img/introForeground.png'

  const player = new Sprite({
    position: {
      x: canvas.width / 2,
      y: canvas.width / 4 + 80
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
  const foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y
    }, image: foregroundImg
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

  const movables = [background, ...boundaries, foreground]

  function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
  }
  //infinite loop, so the effect of the keypress conditionals will run for however long they remain true
  const animate = () => {
    window.requestAnimationFrame(animate)
    background.draw(c)
    //If i change the offset of the map, need to factor that in to the boundary placement
    boundaries.forEach(boundary => {
      boundary.draw(c)
    })
    player.draw(c)
    foreground.draw(c)

    let moving = true

    if (keys.w.pressed && lastKey === 'w') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary, position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            }
          })) {
          console.log("COLLIDE");
          moving = false
          break
        }
      }

      if (moving)
        movables.forEach(m => { m.position.y += 3 })
    }

    else if (keys.a.pressed && lastKey === 'a') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary, position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            }
          })) {
          console.log("COLLIDE");
          moving = false
          break
        }
      }

      if (moving)
        movables.forEach(m => { m.position.x += 3 })
    }

    else if (keys.s.pressed && lastKey === 's') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary, position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            }
          })) {
          console.log("COLLIDE");
          moving = false
          break
        }
      }

      if (moving)
        movables.forEach(m => { m.position.y -= 3 })
    }

    else if (keys.d.pressed && lastKey === 'd') {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: {
              ...boundary, position: {
                x: boundary.position.x - 3,
                y: boundary.position.y
              }
            }
          })) {
          console.log("COLLIDE");
          moving = false
          break
        }
      }

      if (moving)
        movables.forEach(m => { m.position.x -= 3 })
    }

  }

  animate()
}



export function IntroMap() {
  return (
    <>
      <canvas></canvas>
    </>

  );
}
