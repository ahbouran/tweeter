/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]




const createTweetElement = function(tweet) {
  
  const $tweet = $(`<article class="posted-tweet">
                      <header class="tweet-header">
                          <div class="name"><img src="${tweet.user.avatars}">${tweet.user.name} </div>
                          <div class="handle">${tweet.user.handle}</div>
                      </header>
                      <p class="text"> ${tweet.content.text}</p>
                      <footer class="tweet-footer">
                          <div class="time-created">${timeago.format(tweet.created_at)}</div>
                          <div> <i class="fa-solid fa-flag flag"></i> <i class="fa-solid fa-retweet retweet"></i> <i class="fa-solid fa-heart heart"></i> </div>
                      </footer>
                    </article>`);
  
  return $tweet
};



$(document).ready(function () {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (tweet of tweets) {
    let returnValue = createTweetElement(tweet)
    $('#tweets-container').prepend(returnValue)
    }

  }

  const $form = ('#submit-tweet')
  
  $($form).submit(function(e) {

    e.preventDefault()
    
    const clearArea = document.getElementById('tweet-text');

    const tweetInput = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    
    if (tweetLength > 140 || tweetLength === 0 || tweetLength === null) {
      alert('Sorry, invalid input')
      return
    };

    $.post('/tweets', tweetInput )
    .then(() => clearArea.value = "")
    .then(() => loadTweets())
  })


const loadTweets = function() {
  $.get('/tweets')
  .then((tweetData) => {
    // console.log('tweet Data:', tweetData)
    renderTweets(tweetData);
  })
};

 loadTweets()

});



// $(document).ready(function (){
//   renderTweets(data);
// });