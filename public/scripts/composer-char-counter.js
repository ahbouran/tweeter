$(document).ready(function () {
  $('#tweet-text').on('input', function() {
    let charCount = this.value.length;
    const maxNumber = 140;
    let remainingCharCount = maxNumber - charCount; 
    $('.counter').text(remainingCharCount);
    
    if (remainingCharCount < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'rgb(78, 78, 78)')
    }
  })
});