<template>
  <div class="test-container" id="test-container">
    <div class="test-menu">
      <div class="test-btn" @click="startHydras()">
        <p>start</p>
      </div>
      <div class="test-btn" @click="addHydra()">
        <p>add</p>
      </div>
      <div class="test-btn" @click="destroyRandomHydra()">
        <p>delete</p>
      </div>
      <div class="test-btn2" @click="destroyHydras()">
        <p>stop</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  console.log('♕ group 2 ♕')
  import Hydra from 'hydra-synth'
  import * as Tone from 'tone'
  let counter = 0
  let w = window.innerWidth
  let h = window.innerHeight
  let hw = 720
  let hh = 420
  let intervalID = null
  let runnging = false
  const synth1 = new Tone.Synth({
    oscillator: {
      type: 'triangle'
    },
    envelope: {
      attack: 0.5,
      decay: 0.1,
      sustain: 0.3,
      release: 1
    }
  }).toDestination()
  let rev = new Tone.Reverb(7).toDestination()
  let dist = new Tone.Distortion(1).toDestination()
  const synthNew = new Tone.Synth().toDestination()
  const synthDel = new Tone.Synth().toDestination()
  synthNew.connect(rev)
  synthDel.connect(dist)
  const loop = new Tone.Loop((time) => {
    synth1.triggerAttackRelease('C2', '1n', time)
  }, '3n')
  let colors = [
    'rgb(0,255,0)',
    'rgb(0,0,0)'
  ]
  let sketches = [
    `s0.initVideo("102-webcam-video-726578.mp4")
    src(s0)
      .luma(0.013)
      .add(shape(0.164, 0.931)
        .luma(1.142))
      .modulate(osc(-1977.88, -0.9)
        .modulate(osc()
          .luma()))
      .blend(o0)
      .blend(o0)
      .blend(o0)
      .out()`,
      `s0.initVideo("20231219dayvideo.mp4")
    src(s0)
      .luma(0.013)
      .add(shape(0.164, 0.931)
        .luma(1.142))
      .modulate(osc(-1977.88, -0.9)
        .modulate(osc()
          .luma()))
      .blend(o0)
      .blend(o0)
      .blend(o0)
      .out()`,
      `s0.initVideo("https://static.videezy.com/system/resources/previews/000/038/566/original/alb_angel0104_1080p.mp4")
      src(s0).invert().rotate(10).
      sub(osc(1, 0.8, 0.3).rotate(30)).
      repeatY(2, 0.0).
      scrollY(1,-0.5).
        out(o0)
      osc(10,0).
        brightness( () => Math.sin(time) ).
      sub(o0).
      invert().
        out(o1)
      noise(1,0.1).thresh(0.1,0.1).
      sub(src(s0)).
      out(o2)
      src(o1).
      add(o2).
      out(o3)
      render(o3)`,
      `s0.initVideo("https://static.videezy.com/system/resources/previews/000/043/457/original/00005.mp4")
      src(s0).rotate(0).modulateScale(osc(1,-1,0.6).kaleid(10).scale(1),10,0.2)
      .invert(0.55)
      .modulateHue(src(o0).scale(1.01),1)
        .sub(osc(4,1,0).mask(shape(3,0.3,0.1)))
      .out(o0)`,
      `s0.initVideo("https://i.imgur.com/zgXHFNg.mp4")
      src(s0).invert().rotate(10).
      sub(osc(4, 0.6, 0.4).rotate(30)).
      repeatY(2, 0.0).
      scrollY(1,-0.02).
        out(o0)
      src(s0).
      sub(o0).
      //invert().
      scrollX(1,0).
      scrollY(1,0.05).
        out(o1)
      render(o1)`,
      `osc(5,0.3,2).kaleid(4).out()`,
      `gradient(5).repeat(50,50).kaleid([3,5,7,9].fast(0.5))
      .modulateScale(osc(4,-0.5,0).kaleid(50).scale(0.5),15,0)
      .modulateRotate(osc(12,0).kaleid(100),4).blend(o0,0.4).repeat(2,2)
      .out()`,
      `s0.initVideo("https://media3.giphy.com/media/AMQq7nlQVTzWqBEubW/giphy.mp4")
      src(s0).modulate(voronoi()
        .color(0.9,0.25,0.15)
        .rotate(({time})=>(time%360)/2)
        .saturate( () => Math.sin(time) * 10 )
        .modulate(osc(10,0,1)
                    .saturate( () => Math.sin(time) * 10 )
                    .mult(osc(13,0.5,5))
                    .kaleid(50)
                    .scale(({time})=>Math.sin(time*1)*0.5+1)
                    .modulate(noise(0.6,0.5)),
                    0.5))

        .out(o0)`,
        `s0.initVideo("https://static.videezy.com/system/resources/previews/000/004/299/original/23.mp4")
        src(s0).
        pixelate(200,100).
        scrollX([0,1,0.1,0.3,7].fit(-0.7,0.5)).
        scrollY([0,1,0.1,0.3,7].fit(-0.7,0.5)).
        invert(0.2).
          out(o0)`,
          `s0.initVideo("https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3hvYmt6YXZ3MTFjNG5mN2hpZzhnMzd0NHhvMjRwMHN6b3V6OHhkdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dh5q0sShxgp13DwrvG/giphy.mp4")
          src(s0).rotate((()=>Math.sin(time)*1)).blend(shape(9,0.8)
            .mult(osc(2,5,7))
            .modulateRepeat(osc(100), 2, 2, 0.5, 0.5))
            .out(o0)`,
        `s0.initVideo("https://static.videezy.com/system/resources/previews/000/005/825/original/Images_de_recurs_documentaci%C3%B3.mp4")
        src(s0).
        repeatX(2.0, 4).
        contrast([3, -6, -1.5, 2] , 0.15).
        posterize( [5, 30, 10, 1, 50] , 1 ).
          out(o0)`,
        `s0.initImage("https://upload.wikimedia.org/wikipedia/commons/9/91/Liaison_covalante_oxyg%C3%A8ne11.gif")
        src(s0).
        contrast([3, -6, -1.5, 2, 4] , 0.15).
        posterize( [5, 30, 10, 1, 50] , 1 ).
        scale([3, -6, -1.5, 2, 0.5, -20],0.4).
          out(o0)`,
      `s0.initVideo("https://media0.giphy.com/media/ccqUwRRof2HMk/giphy.mp4")
      src(s0).brightness( () => Math.sin(time)*2 ).invert([0,1]).modulate(noise(9),0.02)
        .out(o0)`,
      `s0.initImage("https://upload.wikimedia.org/wikipedia/commons/2/2b/Pixel-example.png")
      speed = 2
      src(s0).
      invert([0,1,0,0,0,1,1]).
      scale([0.7, 0.4, 1.4],0.4).
      kaleid(10).
      modulateRepeatY(osc(10), 1.0, ({time}) => Math.sin(time) * 0.2).
        out(o0)`,
      `s0.initImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Satellietschotel_met_monoblock.jpg/1280px-Satellietschotel_met_monoblock.jpg")
      src(s0).
      sub(osc(10,0.2,1).saturate( () => Math.sin(time) * 0.3 ),0.4).
      rotate( () => time%360 *0.3 ).
      out(o0)`,
      `s0.initVideo("https://media4.giphy.com/media/DYGbtrltNhHVX7xZTk/giphy.mp4")
      src(s0).repeat(3.0, 3.0, 0.0, 0.0).saturate( () => Math.sin(time) * 20 ).kaleid(0.5).add(shape(4).scale(0.9).blend(voronoi(100,3,5)))
        .modulateRotate(osc(1,0.5,0).kaleid(50).scale(0.5),15,0)
        .mult(osc(50,-0.1,8).kaleid(9))
      .out()`
  ]
  let texts = []
  for (let i=0; i<sketches.length; i++) {
    texts[i] = sketches[i].replace(/[\r\n]/gm, '')
    texts[i].trim()
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  function startHydras() {
    startSound()
    ambient()
    if (intervalID) {
      clearInterval(intervalID)
      destroyHydras()
    } 
    createHydra()
    intervalID = setInterval(function () {
      createHydra()
      startSound()
    }, getRandomInt(5,45)*1000)
  }
  function createHydra() {
    counter += 1
    let whichOne = getRandomInt(0,sketches.length-1)
    const container = document.getElementById("test-container")
    let canvas = document.createElement('canvas')
    let text = document.createElement('div')
    text.innerText = texts[whichOne]
    container.appendChild(canvas)
    container.appendChild(text)
    canvas.id = "hydra"+counter
    canvas.style.width = hw+'px'
    canvas.style.height = hh+'px'
    canvas.style.left = getRandomInt(0,w-hw)+'px'
    canvas.style.top = getRandomInt(0,h-hh)+'px'
    canvas.style.position = 'absolute'
    canvas.style.mixBlendMode = 'difference'
    text.id = "htext"+counter
    text.style.position = 'absolute'
    text.style.left = getRandomInt(0,w-200)+'px'
    text.style.top = getRandomInt(0,h-50)+'px'
    text.style.color = colors[getRandomInt(0,1)]
    const hydra = new Hydra({
      canvas: document.getElementById("hydra"+counter),
      detectAudio: false,
    })
    eval(sketches[whichOne])
  }
  function addHydra() {
    createHydra()
    addHydraSound()
  }
  function destroyRandomHydra() {
    destroyRandomSound()
    let hydras = document.querySelectorAll('[id^="hydra"]')
    let hTexts = document.querySelectorAll('[id^="htext"]')
    let randomHydra = getRandomInt(0,hydras.length-1)
    hydras[randomHydra].remove()
    hTexts[randomHydra].remove()
  }
  function destroyHydras() {
    destroyHydrasSound()
    loop.stop()
    clearInterval(intervalID)
    let hydras = document.querySelectorAll('[id^="hydra"]')
    let hTexts = document.querySelectorAll('[id^="htext"]')
    for (let i=0; i<hydras.length; i++) {
      hydras[i].remove()
      hTexts[i].remove()
    }
  }
  function ambient() {
    loop.start(0)
    Tone.Transport.start()
  }
  function startSound() {
    synthNew.triggerAttackRelease("C4", "8n")
  }
  function addHydraSound() {
    synthNew.triggerAttackRelease("C5", "8n")
  }
  function destroyRandomSound() {
    synthDel.triggerAttackRelease("E3", "8n")
  }
  function destroyHydrasSound() {
    synthDel.triggerAttackRelease("C3", "8n")
  }
</script>

<style lang="scss">
.test-container {
  width: 100%;
  overflow: hidden;
}
.test-menu {
  position: fixed;
  left: 1vh;
  top: 1vh;
  z-index: 99;
  display: flex;
  flex-direction: row;
  gap: 1vh;
}
.test-btn {
  border: solid grey;
  border-radius: 20px;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
		cursor: pointer;
		color: rgb(0,255,0);
	}
}
.test-btn2 {
  border: solid grey;
  border-radius: 20px;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
		cursor: pointer;
		color: rgb(255,0,0);
	}
}
.hydra {
  position: absolute;
  width: 100%;
  height: 100%;
}
@media (max-width: 600px) {
}
</style>