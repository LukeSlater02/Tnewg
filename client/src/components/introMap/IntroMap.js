import './IntroMap.scss';
import { useEffect, useRef } from 'react';
import { collisions } from './IntroMapData'
import { Boundary, Sprite } from './classes.js'
import { battleZonesData } from '../battles/battleZoneData'
import React from 'react';

export function IntroMap() {

  const ref = useRef(null)
  let canvas = null
  let c = null

  useEffect(() => {
    canvas = ref.current
    c = canvas.getContext('2d')
    canvas.width = 1440
    canvas.height = 960

    const collisionsMap = []
    //90 is map width
    for (let i = 0; i < collisions.length; i += 90) {
      collisionsMap.push(collisions.slice(i, 90 + i))
    }

    const battleZonesMap = []
    //90 is map width
    for (let i = 0; i < battleZonesData.length; i += 90) {
      battleZonesMap.push(battleZonesData.slice(i, 90 + i))
    }

    const offset = {
      x: -450,
      y: -350
    }

    const boundaries = []

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

    const battleZones = []

    battleZonesMap.forEach((row, i) => {
      row.forEach((num, ind) => {
        if (num === 2016) {
          battleZones.push(new Boundary({
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

    const playerDownImage = new Image()
    playerDownImage.src = 'img/downWalkCycle.png'

    const playerUpImage = new Image()
    playerUpImage.src = 'img/up_walk1.png'

    const playerLeftImage = new Image()
    playerLeftImage.src = 'img/left_walk1.png'

    const playerRightImage = new Image()
    playerRightImage.src = 'img/right_walk1.png'

    const foregroundImg = new Image()
    foregroundImg.src = 'img/introForeground.png'

    const player = new Sprite({
      position: {
        x: canvas.width / 2 + 40,
        y: canvas.width / 4 + 85
      },
      frames: { max: 4 },
      image: playerDownImage,
      sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
      }
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

    const movables = [background, ...boundaries, foreground, ...battleZones]

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
      battleZones.forEach(battleZone => {
        battleZone.draw(c)
      })
      player.draw(c)
      foreground.draw(c)

      let moving = true
      player.moving = false

      if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
          const battleZone = battleZones[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: battleZone
            })) {
            console.log("hello tere");
            break
          }
        }
      }

      if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary, position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 2
                }
              }
            })) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach(m => { m.position.y += 2 })
      }

      else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary, position: {
                  x: boundary.position.x + 2,
                  y: boundary.position.y
                }
              }
            })) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach(m => { m.position.x += 2 })
      }

      else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary, position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 2
                }
              }
            })) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach(m => { m.position.y -= 2 })
      }

      else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary, position: {
                  x: boundary.position.x - 2,
                  y: boundary.position.y
                }
              }
            })) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach(m => { m.position.x -= 2 })
      }

    }

    animate()
  }, [])
  
  return (
    <>
      <canvas ref={ref}></canvas>
    </>
  );
}
