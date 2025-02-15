/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
'use strict';

$(document).ready(function() {
  
  const loadTweets = () => {

    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'json',
      success: (tweetData) => {

        //Sort tweets by creation time before rendering all tweets
        // let tweets = tweetData;
        // tweets.sort((a, b) => {
        //   return b.created_at - a.created_at;
        // });
        // console.log(tweets);

        renderTweets(tweetData);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }

    });
  };

  loadTweets();

  const createTweetElement = function(tweet) {
    //Create all elements of a tweet
    const $tweet = $('<article>').addClass('article-tweet');

    const $headerContainer = $('<header>').addClass('article-tweet-header');
    const $userContainer = $('<span>').addClass('article-tweet-user');
    const $avatar = $('<img>').attr('src', tweet.user.avatars);
    const $username = $('<span>').text(tweet.user.name);
    const $handle = $('<span>').addClass('article-tweet-handle').text(tweet.user.handle);
    
    const $tweetContent = $('<p>').addClass('article-tweet-content').text(tweet.content.text);
    
    const $footerContainer = $('<footer>').addClass('article-tweet-footer');
    const $createdTime = $('<span>').addClass('tweet-age').text(timeago.format(tweet.created_at));
    
    const $iconContainer = $('<span>').addClass('article-tweet-icons');
    const $flagIcon = $('<i>').addClass('fas fa-flag');
    const $retweeticon = $('<i>').addClass('fas fa-retweet');
    const $heartIcon = $('<i>').addClass('fas fa-heart');
    //Append elements to sub containers, then append usb containers to a tweet
    $userContainer.append($avatar, $username);
    $headerContainer.append($userContainer, $handle);
    
    $iconContainer.append($flagIcon, $retweeticon, $heartIcon);
    $footerContainer.append($createdTime, $iconContainer);

    $tweet.append($headerContainer, $tweetContent, $footerContainer);
    
    return $tweet;
  }

  const renderTweets = (tweets) => {
    const $tweetContainer = $('#tweets-container');
    $tweetContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };

  const $form = $('#new-tweet');
  $form.on('submit', function(event) {
    event.preventDefault();
    
    
    //Validate if the new tweet is empty or too long and display related messages
    const inputTweet = $(this)[0][0].value;
    $('.error-message').hide();
    if (inputTweet.length < 1) {
      $('#error-empty').show(400);
    } else if (inputTweet.length > 140) {
      $('#error-exceed-length').show(400);
    } else {
      $('.error-message').hide();
      const serializeData = $(this).serialize();
  
      $(this)[0].reset();
      
      $.post('/tweets', serializeData, function(response) {
        loadTweets();
      });
    }

  });
});