/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (datum of data) {
  let returnValue = createTweetElement(datum)
// calls createTweetElement for each tweet
  //takes return value and appends it to the tweets container
  $('#tweets-container').append(returnValue)
  }
  
}


const createTweetElement = function(tweet) {
  
  const $tweet = $(`<article class="posted-tweet">
                      <header class="tweet-header">
                          <div class="name"><img src="${datum.user.avatars}">${datum.user.name} </div>
                          <div class="handle">${datum.user.handle}</div>
                      </header>
                      <p class="text"> ${datum.content.text}</p>
                      <footer class="tweet-footer">
                          <div class="time-created">${datum.created_at}</div>
                          <div> <i class="fa-solid fa-flag flag"></i> <i class="fa-solid fa-retweet retweet"></i> <i class="fa-solid fa-heart heart"></i> </div>
                      </footer>
                    </article>`);
  
  return $tweet
};

// renderTweets(data);

$(document).ready(function (){
  renderTweets(data);
});