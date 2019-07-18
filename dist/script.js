$(function() {

  var visualMain = $('.section-visual.main');
  var sectionTop = $('.section-top');
  var sectionPaintings = $('.section-paintings');
  var globalPage = $('#global-page');


  //
  // LINKS IN THE BOTTOM
  //
  var instagramLink = 'https://www.instagram.com/reginanovak.art';
  var mailLink = 'mailto:reginanovakart@gmail.com?subject=Mail+ReginaNovakArt';
  $('body').append('<div class="fixed-buttons"><a href="'+instagramLink+'" target="blank">instagram</a><a href="'+mailLink+'"">email</a></div>');
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    var fixedButtons = $('.fixed-buttons');
    if (scroll < 10) {
      fixedButtons.show();
    } else {
      fixedButtons.hide();
    }
  })


  //
  // HEADER PARALLAX
  //
  var defaultYposition = -30;
  visualMain.css('backgroundPosition', 'center '+ calculateYPosition(0) +'px');
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    visualMain.css('backgroundPosition', 'center '+ calculateYPosition(scroll) +'px');
  })
  function calculateYPosition(scrollTop){
    return (scrollTop/3)+defaultYposition;
  }


  //
  // CALCULATE HEADER
  //
  visualMain.css('backgroundSize', calculateHeaderBackgroundWidth() +' auto');
  visualMain.css('height', calculateHeaderHeight());
  $(window).resize(function(){
    visualMain.css('backgroundSize', calculateHeaderBackgroundWidth() +' auto');
    visualMain.css('height', calculateHeaderHeight());
  })
  function calculateHeaderBackgroundWidth(){
    var defaultBackgroundWidthValue = 960;
    // var screenWidth = window.innerWidth * window.devicePixelRatio;
    var screenWidth = window.innerWidth;
    if (screenWidth < 600){
      var resizeRatio = screenWidth/600;
      return defaultBackgroundWidthValue*resizeRatio+'px';
    }
    return defaultBackgroundWidthValue+'px';
  }
  function calculateHeaderHeight(){
    // var screenWidth = window.innerWidth * window.devicePixelRatio;
    var screenWidth = window.innerWidth;
    var defaultHeightValue = 210;
    if (screenWidth < 600){
      var resizeRatio = screenWidth/600;
      return defaultHeightValue*resizeRatio+'px';
    }
    return defaultHeightValue+'px';
  }


  //
  // CALCULATE HEADER INDENT
  //
  sectionPaintings.css('paddingTop', calculateHeaderIndent());
  $(window).resize(function(){
    sectionPaintings.css('paddingTop', calculateHeaderIndent());
  })
  function calculateHeaderIndent(){
    return sectionTop.height()+'px';
  }





  // MAIN PAGE HEADER SIZE
  /*
  function setHeaderHeight(){
    var viewportHeight = $(window).height();
    var headerHeight = viewportHeight / 5;
    console.log(viewportHeight, 'viewportHeight');
    $('.section-visual.main').css('height', headerHeight+'px');
    // $('.section-visual .visual-title').css('padding', headerHeight/);
  }

  setHeaderHeight();
  */

  //
  //
  var orderPage = $('#order-page');
  if (orderPage.length){

    //SLIDER
    /*
    var labelContainerImage = $('.slider-item .label-container img', orderPage);
    var sliderPreviewItem = $('.slider-preview li', orderPage);

    sliderPreviewItem.first().addClass('active');

    sliderPreviewItem.on('click', function clicked(ev){
      var el = $(this);
      var imageSrc = el.find('img').attr('src');
      sliderPreviewItem.removeClass('active');
      labelContainerImage.attr('src', imageSrc);
      el.addClass('active');
    });
    */


    // PURCHASE
    var purchaseButton = $('#purchase-button');
    var continueButton = $('#continue-button');
    var orderSummary = $('#order-summary');
    var orderPayment = $('#order-payment');

    purchaseButton.on('click', function purchaseButtonClick(){
      purchaseButton.hide();
      orderSummary.show();
      calculateTotal();
    });
    continueButton.on('click', function continueButtonClick(){
      continueButton.hide();
      orderSummary.hide();
      orderPayment.show();
      dotsPager.show();
      updatePayPalLink();
    });

    // ADDITIONAL
    var withFrameCheckbox = $('.text-info .with-frame', orderSummary);
    var withFramePrice = $('.price-field .with-frame', orderSummary);
    var rollUpCheckbox = $('.text-info .roll-up', orderSummary);
    var rollUpDiscount = $('.price-field .roll-up', orderSummary);
    var calcPriceParent = $('#calc-price').parent();
    var newPriceParent = $('#new-price').parent();

    withFrameCheckbox.on('click', function toggleWithFrame(){
      withFramePrice.toggleClass('active');
      withFrameCheckbox.toggleClass('active');
      calculateTotal();
    });
    rollUpCheckbox.on('click', function toggleWithFrame(){
      rollUpCheckbox.toggleClass('active');
      rollUpDiscount.toggleClass('active');

      withFramePrice.removeClass('active');
      withFrameCheckbox.removeClass('active');
      withFramePrice.toggleClass('disabled');
      withFrameCheckbox.toggleClass('disabled');
      calcPriceParent.toggleClass('strikethrough').toggleClass('opacity-5');
      newPriceParent.toggle();

      calculateTotal();
    });

    // ORDER CALCULATION
    var calcPrice = $('#calc-price', orderSummary);
    var newPrice = $('#new-price', orderSummary);
    var calcFrame = $('#calc-frame', orderSummary);
    var calcRollUp = $('#calc-roll-up', orderSummary);
    var withFrameActive = $('#with-frame-active', orderSummary);
    var rollUpActive = $('#roll-up-active', orderSummary);
    var calcGst = $('#calc-gst', orderSummary);
    var calcShipping = $('#calc-shipping', orderSummary);
    var calcTotal = $('#calc-total', orderSummary);

    var totalAudFrame = $('#total-aud', orderPayment);
    var totalUsdFrame = $('#total-usd', orderPayment);
    var totalEurFrame = $('#total-eur', orderPayment);
    var currenciesFrame = $('#currencies-frame', orderPayment);

    function calculateTotal(){
      var paintingPrice = Number(calcPrice.text());

      paintingPrice = rolledUp(paintingPrice);
      // var gstRawPercentage = (8 / 100) * paintingPrice;
      // var gstNumber = Math.trunc(gstRawPercentage);
      // calcGst.text(gstNumber);
      var total = paintingPrice + frameCharged() + Number(calcShipping.text());
      calcTotal.text(total);
      totalAudFrame.text(total);
      calculateCurrencies();

      function frameCharged(){
        if (withFrameActive.hasClass('active') && !rollUpActive.hasClass('active')){
          return Number(calcFrame.text());
        } else {
          return 0;
        }
      }
      function rolledUp(pictureValue){
        newPrice.text('-');
        if (rollUpActive.hasClass('active')){
          var pct = Number(calcRollUp.text())*.01;
          newPaintingPrice = Math.trunc( Number(pictureValue) - pictureValue*pct );
          newPrice.text(newPaintingPrice);
          return newPaintingPrice;
        }
        return pictureValue;
      }
    }
    function updatePayPalLink(){
      var ppButton = $('.paypal-button');
      var url = ppButton.attr('href');
      console.log(ppButton, 'ppButton');
      if (!ppButton.attr('paypalready')){
        ppButton.attr('paypalready', true);
        // ppButton.attr('href', url+'/'+totalAudFrame.text()+'eur');
        ppButton.attr('href', url+'/'+totalAudFrame.text());
      }
    }

    function calculateCurrencies(){
      var reqString = 'https://api.fixer.io/latest?base=AUD&symbols=USD,EUR';
      $.getJSON(reqString, function( data ) {
        currenciesFrame.show();
        var aud = Number(totalAudFrame.text());
        totalUsdFrame.text(Math.trunc(aud*data.rates.USD));
        totalEurFrame.text(Math.trunc(aud*data.rates.EUR));
        // console.log(data, 'data');
      }).fail(function() {
        currenciesFrame.hide();
        console.log( "error" );
      })
    }

    // DOTS
    var dotsPager = $('#dots-pager');
    var dotBack = $('#dot-back');
    dotBack.on('click', function dotBack(){
      orderSummary.show();
      orderPayment.hide();
      dotsPager.hide();
      continueButton.show();
    });

    // MAIN SCROLL ON CLICK
    var sectionVisualMain = $('#section-visual-main');
    var sectionConnect = $('#section-connect');
    var htmlAndBody = $('html, body');
    sectionVisualMain.on('click', function scrollUnderSectionConnect(){
      if (htmlAndBody.width() < 768){
        htmlAndBody.animate({scrollTop: sectionConnect.offset().top+40}, 800);
      }
    });

    // RETURN BACK MOBILE
    var sectionPaintings = $('#section-paintings');
  }







});

