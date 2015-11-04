// function($){
  console.log('aaa');
  var photoCount = 8;
  var container = $('#galleryContainer');
  var tag = 'ronfitnycdotcom';

  var currentPage = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + "ca710f787fa246c3b08792d5b91e970e";

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: currentPage , // This is where the URL needs to go.
    success: function(response) {
      var length = response.data != 'undefined' ? response.data.length : 0;
      var limit = photoCount != null && photoCount < length ? photoCount : length;
      if(limit > 0) {
        var counter = 0;
        var lastRowDiv = $('<div>', {
              class: "row 0% images"
            });
        console.log(response.data.length);
        for(var i = 0; i < limit; i++) {
          var rowDiv = lastRowDiv
          var div = $('<div>', {
            class: "6u 12u(mobile)"
          });
          div.append($('<img>', {
            class: "instagram-photo",
            src: response.data[i].images.standard_resolution.url
          }));
            rowDiv.append(div);
            counter += 1;
            lastRowDiv = rowDiv;
          if (counter === 2) {
            console.log('it is 2')
            container.append(rowDiv);
            lastRowDiv = $('<div>', {
              class: "row 0% images"
            });
            counter = 0;
          };
        }
      }

      console.log('page ' + response.pagination);
      var nextPage = response.pagination.next_url;
      console.log(nextPage);
    }
  });
// }(jQuery);

// <div class="6u 12u(mobile)"><a href="images/fulls/1.png" class="image fit from-left"><img src="images/ron/thumbs/1.png" title="The Anonymous Red" alt="" /></a></div>
