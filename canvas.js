


const canvas =  document.querySelector('canvas')
const c = canvas.getContext('2d')
const gravity = 0.7
canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)



const backGround = new Sprite({
  position: {
    x:0,
    y:0
  },
  imageSrc: 'https://wallpaperaccess.com/full/3479857.jpg'
})

const player = new Fighter({
  position: {
    x:0,
    y:0
  },
  velocity: {
    x:0,
    y:10
  },
  offset: {
    x:0,
    y:0
  },
  imageSrc:'./img/hero/Sprites/Idle.png'
})

const enemy = new Fighter({
  position: {
    x:400,
    y:100
  },
  velocity: {
    x:0,
    y:0
  },
  color:'blue',
  offset: {
    x:50,
    y:0
  }
})


const keys = { 
  a: {
    pressed: false
  },
  d: {
    pressed:false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed:false
  }
}


decreaseTime()






function animate(){
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0 , 0, canvas.width , canvas.height)
  backGround.update()
  player.update()
  enemy.update()
  player.velocity.x = 0
  enemy.velocity.x = 0



  // Player movement

  if(keys.a.pressed){
    player.velocity.x = -5
  } else if(keys.d.pressed){
    player.velocity.x = 5
  }

  // enemy movement

  if(keys.ArrowLeft.pressed){
    enemy.velocity.x = -5
  } else if(keys.ArrowRight.pressed){
    enemy.velocity.x = 5
  }


  // detect

  if(
    rectangleOperator({
      rectangle1:player,
      rectangle2:enemy
    }) && player.isAttacking
  ){
    player.isAttacking = false
    enemy.health -= Math.floor(Math.random()*90)
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    enemy.position.x += Math.floor(Math.random() * 20)
  }

  if(
    rectangleOperator({
      rectangle1:enemy,
      rectangle2:player
    }) && enemy.isAttacking
  ){
    enemy.isAttacking = false
    player.health -=  Math.floor(Math.random() * 20)
    document.querySelector('#playerHealth').style.width = player.health + '%'
    player.position.x -= Math.floor(Math.random() * 20)
  }



  if(enemy.health <= 0 || player.health <= 0){
    determineWinner({player , enemy, timerID})
  }
}

animate()



window.addEventListener('keydown' , event => {
  switch(event.key){
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w':
      player.velocity.y = -20
      break
    case 'u':
      player.attack()
      break

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      break
    case 'ArrowUp':
      enemy.velocity.y = -20
      break
    case 'Enter':
      enemy.attack()
      break
  }
})

window.addEventListener('keyup' , event => {
  switch(event.key){
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }


  // enemy keys

  switch(event.key){
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
