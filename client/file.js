  Meteor.subscribe('thePlayers');
  
  Template.leaderboard.helpers({
    'player': function(){
        var currentUserId = Meteor.userId();
        return PlayersList.find({}, {sort: {score: -1, name: 1} })//-1 sorts descending, while 1 will sort ascending
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
          return "selected"
    }
  },
  'count': function(){
    return PlayersList.find().count()
  },
  'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)

  }
});

  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id; 
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault(); 
      var playerNameVar = event.target.playerName.value;
      var playerScoreVar = Number(event.target.playerScore.value);
      Meteor.call('insertPlayerData', playerNameVar);
      var playerNameVar = event.target.playerName.value = "";
      var playerScoreVar = event.target.playerScore.value = "";
    }
  });