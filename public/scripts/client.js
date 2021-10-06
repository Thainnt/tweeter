/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
'use strict';

// Fake data taken from initial-tweets.json
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
    "created_at": 1261113959088
  },

  {
    "user": {
      "name": "Grandma",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@gr"
    },
    "content": {
      "text": "Home food is best food."
    },
    "created_at": 1561116232290
  }
]


$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('article-tweet');

    const $headerContainer = $('<header>').addClass('article-tweet-header');
    const $userContainer = $('<span>').addClass('article-tweet-user');
    const $avatar = $('<img>').attr('src', tweet.user.avatars);
    const $username = $('<span>').text(tweet.user.name);
    const $handle = $('<span>').addClass('article-tweet-handle').text(tweet.user.handle);
    
    const $tweetContent = $('<p>').addClass('article-tweet-content').text(tweet.content.text);
    const $tweetBorder = $('<hr/>').addClass('hr');
    
    const $footerContainer = $('<footer>').addClass('article-tweet-footer');
    const $createdTime = $('<span>').addClass('tweet-age').text(timeago.format(tweet.created_at));
    
    const $iconContainer = $('<span>').addClass('article-tweet-icons');
    const $flagIcon = $('<i>').addClass('fas fa-flag');
    const $retweeticon = $('<i>').addClass('fas fa-retweet');
    const $heartIcon = $('<i>').addClass('fas fa-heart');
  
    $userContainer.append($avatar, $username);
    $headerContainer.append($userContainer, $handle);
    
    $iconContainer.append($flagIcon, $retweeticon, $heartIcon);
    $footerContainer.append($createdTime, $iconContainer);

    $tweet.append($headerContainer, $tweetContent, $tweetBorder, $footerContainer);
    
    return $tweet;
  }

  const renderTweets = function(tweets) {
    const $tweetContainer = $('#tweets-container');

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    }
  };

  const $form = $('#new-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    console.log('submitted...');

    const serializeData = $(this).serialize();
    console.log(serializeData);

    $.post('/tweets', serializeData, (response) => {
      console.log(response);
    })  
  })

  renderTweets(data);
  
});