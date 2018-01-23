$(function() {
  console.log($, '$');
  $.getJSON({
    dataType: 'json',
    url: 'data/arts.json',
    success: success
  });
  function success(data){
    console.log(data, 'data');
    //
  }
});

