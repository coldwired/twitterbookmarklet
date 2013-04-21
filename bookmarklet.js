var button = '<a href="#" class="details with-icn js-details"> ' +
           '     <span class="details-icon js-icon-container"> ' +
           '         <i class="sm-image"></i> ' +
           '     </span> ' +
           '     <b> ' +
           '       <span class="expand-stream-item js-view-details"> ' +
           '           View photo ' +
           '       </span> ' +
           '       <span class="collapse-stream-item js-hide-details"> ' +
           '           Hide photo ' +
           '       </span> ' +
           '     </b> ' +
           '   </a>';

var media = '<div class="media"> ' + 
'    <a data-resolved-url-large="https://pbs.twimg.com/media/BGMZlp_CAAENz45.jpg:large" data-url="https://pbs.twimg.com/media/BGMZlp_CAAENz45.jpg:large" href="//twitter.com/SusanCalman/status/316124533557952512/photo/1/large" class="twitter-timeline-link media-thumbnail"> ' +
'     <img width="322" height="302" alt="Embedded image permalink" src="{{ImageUrl}}"> ' +
'    </a> ' +
'  </div>';

$(".js-new-tweets-bar").live('click', function () {
    InstagramIt();
});

function InstagramIt() {

    $(".twitter-timeline-link").each(function (i, item) {

        var url = $(this).attr('data-expanded-url');
        if (url != null && (url.indexOf('instagram.com') >= 0 || url.indexOf('instagr.am') >= 0)) {

            if ($(this).closest('.content').find('.stream-item-footer').attr('instagrammed') == null) {

                $(this).closest('.content').find('.stream-item-footer').attr('instagrammed', 'true');

                $(this).closest('.content').find('.stream-item-footer .context').after(button);
                $(this).closest('.content').find('.expand-action-wrapper').click();

                var obj = $(this);

                $.ajax({ url: "http://api.instagram.com/oembed",
                    dataType: "jsonp",
                    data: "url=" + url,
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        var temp = media;
                        temp = temp.replace('{{ImageUrl}}', result.url);
                        obj.closest('.content').find('.expanded-content .tweet-stats-container').next().after(temp);
                        obj.closest('.content').find('.collapse-stream-item').closest('.content').find('.expand-action-wrapper').click();

                    }
                });
          

            }

        }
    });

}


setInterval(InstagramIt, 10000);  

document.body.watch("clientHeight", function(property, oldHeight, newHeight) {
  InstagramIt();
});