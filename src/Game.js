function Game() {
  this.rolls = [];
  this.framez = [];
  this.result = 0
};

Game.prototype.cleanRolls = function() {
  this.rolls = [];
};

Game.prototype.recordRoll = function(roll) {
  this.rolls.push(roll);
  if (this.isFrameCompleted()) {
    this.recordFrame();
  }
};
Game.prototype.isFrameCompleted = function() {
  return (this.rolls.length === 2 || this.isStrike());
};
Game.prototype.isStrike = function() {
  return this.rolls[0] === 10
};

Game.prototype.isLastFrameStrike = function() {
  return this.framez.length !== 0 && this.framez[this.framez.length - 1][0] === 10
};

Game.prototype.isDoubleStrike = function() {
  return this.framez.length >= 2 && this.framez[this.framez.length - 2][0] === 20
};

Game.prototype.calculateStrike = function() {
  if (this.isDoubleStrike()) {
    this.framez[this.framez.length - 2][0] += this.rolls.reduce(function(a, b=0) {
          return b;
      }, 0);
  }
  if (this.isLastFrameStrike()) {
    this.framez[this.framez.length - 1][0] += this.rolls.reduce(function(a, b=0) {
          return a + b;
      }, 0);
  }
};

Game.prototype.recordFrame = function() {
  this.calculateStrike();
  this.framez.push(this.rolls);
  this.cleanRolls();
  if (this.isGameCompleted()) {
    this.calculateResult();
  }
};
Game.prototype.isGameCompleted = function () {
  return this.framez.length === 10
};

Game.prototype.calculateResult = function() {

  var allRolls = this.framez.reduce(function(a, b) {
    return a.concat(b);
  }, []);
  this.result = allRolls.reduce(function(a, b=0) {
        return a + b;
    }, 0);
};
