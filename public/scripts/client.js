/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

////////////////////////////////////////////////Helper Functions/////////////////////////////////////////////////////

const escape = function (text) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const createTweetElement = function(tweet) {
  

  const $tweet = $(`<article class="posted-tweet">
                      <header class="tweet-header">
                          <div class="name"><img src="${tweet.user.avatars}">${tweet.user.name} </div>
                          <div class="handle">${tweet.user.handle}</div>
                      </header>
                      <p class="text"> ${escape(tweet.content.text)}</p>
                      <footer class="tweet-footer">
                          <div class="time-created">${timeago.format(tweet.created_at)}</div>
                          <div> <i class="fa-solid fa-flag flag"></i> <i class="fa-solid fa-retweet retweet"></i> <i class="fa-solid fa-heart heart"></i> </div>
                      </footer>
                    </article>`);
  
  return $tweet;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (tweet of tweets) {
      let returnValue = createTweetElement(tweet);
      $('#tweets-container').prepend(returnValue);
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const $form = ('#submit-tweet');
  
  $($form).submit(function(e) {

    e.preventDefault();
    
    const clearArea = document.getElementById('tweet-text');

    const tweetInput = $(this).serialize();
    const tweetLength = $('textarea').val().length;

    
    if (tweetLength > 140 || tweetLength === 0 || tweetLength === null) {
      $('.error-alert').slideDown();
      return false;
    } else {
      $('.error-alert').hide();
      $.post('/tweets', tweetInput )
        .then(() => {
          clearArea.value = ""
          $('.counter').val(140)
        })
        .then(() => loadTweets()) };
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const loadTweets = function() {
    $.get('/tweets')
      .then((tweetData) => {
        renderTweets(tweetData);
      });
  };

  loadTweets();

});



