describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });
  describe("recordRoll", function() {
    it("should be able to record roll results", function() {
      game.recordRoll(6);
      expect(game.rolls).toEqual([6]);
    });
  });

  describe("recordFrame", function() {
    it("should record a frame after two rolls", function() {
      for(var i=0; i < 2; i++){
        game.recordRoll(6);
      }
      expect(game.framez).toEqual([[6,6]])
    });

    it("should record a frame after a strike", function() {
      game.recordRoll(10);
      expect(game.framez).toEqual([[10]])
    });

    it("should calculate correct score for a strike", function() {
      game.recordRoll(10);
      for(var i=0; i < 2; i++){
        game.recordRoll(6);
      }
      expect(game.framez).toEqual([[22],[6,6]])
    });

    it("should clean the rolls after frame is recorded", function() {
      for(var i=0; i < 2; i++){
        game.recordRoll(6);
      }
      expect(game.rolls).toEqual([])
    });
  });

  describe("calculateResult", function() {
    it("calculates results after 10 rolls", function() {
      for(var i=0; i < 20; i++){
        game.recordRoll(6);
      }
      expect(game.result).toEqual(120)
    });
  });



});
