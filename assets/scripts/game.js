// main.js
// ——————————————————————————————————————————————
// Phaser 3 mini-game that fetches its art directly
// from the official Phaser Labs CDN (no local assets)
// ——————————————————————————————————————————————

const config = {
  type: Phaser.AUTO,
  width: 760,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create, update }
};

let player, goal, cursors, textScore, score;

new Phaser.Game(config);

// ---------------- PRELOAD -----------------
function preload () {
  // Images hosted on https://labs.phaser.io/assets/
  this.load.image('background', 'https://labs.phaser.io/assets/skies/sky4.png');
  this.load.image('player',     'https://labs.phaser.io/assets/sprites/knight.png');
  this.load.image('goal',       'https://labs.phaser.io/assets/sprites/star.png');
}

// ---------------- CREATE ------------------
function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0);

  // player
  player = this.physics.add.sprite(250, 600, 'player')
                       .setCollideWorldBounds(true)
                       .setScale(0.5);

  // goal
  goal = this.physics.add.sprite(500, 350, 'goal');

  // score text
  score = 0;
  textScore = this.add.text(50, 50, 'Score: 0',
               { font: '50px Arial', fill: '#FFFB03' });

  // input
  cursors = this.input.keyboard.createCursorKeys();

  // win condition
  this.physics.add.overlap(player, goal, winGame, null, this);
}

// ---------------- UPDATE ------------------
function update () {
  player.setVelocity(0);

  if (cursors.left.isDown)  { player.setVelocityX(-200); player.flipX = true;  }
  if (cursors.right.isDown) { player.setVelocityX( 200); player.flipX = false; }
  if (cursors.up.isDown)    { player.setVelocityY(-200); }
  if (cursors.down.isDown)  { player.setVelocityY( 200); }
}

// -------------- CALLBACK ------------------
function winGame () {
  score += 100;
  textScore.setText('Score: ' + score);
  goal.disableBody(true, true);
  alert('YOU WON THE GAME');
}
