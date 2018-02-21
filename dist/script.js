$(function() {

  //
  //
  var orderPage = $('#order-page');
  if (orderPage.length){

    //SLIDER
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
    });

    // ADDITIONAL
    var withFrameCheckbox = $('.text-info .with-frame', orderSummary);
    var withFramePrice = $('.price-field .with-frame', orderSummary);

    withFrameCheckbox.on('click', function toggleWithFrame(){
      withFramePrice.toggleClass('active');
      withFrameCheckbox.toggleClass('active');
      calculateTotal();
    });

    // ORDER CALCULATION
    var calcPrice = $('#calc-price', orderSummary);
    var calcFrame = $('#calc-frame', orderSummary);
    var withFrameActive = $('#with-frame-active', orderSummary);
    var calcGst = $('#calc-gst', orderSummary);
    var calcShipping = $('#calc-shipping', orderSummary);
    var calcTotal = $('#calc-total', orderSummary);

    var totalAudFrame = $('#total-aud', orderPayment);
    var totalUsdFrame = $('#total-usd', orderPayment);
    var totalEurFrame = $('#total-eur', orderPayment);
    var currenciesFrame = $('#currencies-frame', orderPayment);

    function calculateTotal(){
      var gstRawPercentage = (8 / 100) * Number(calcPrice.text());
      var gstNumber = Math.trunc(gstRawPercentage);
      calcGst.text(gstNumber);
      var total = Number(calcPrice.text()) + frameCharged() + gstNumber + Number(calcShipping.text());
      calcTotal.text(total);
      totalAudFrame.text(total);
      calculateCurrencies();

      function frameCharged(){
        if (withFrameActive.hasClass('active')){
          return Number(calcFrame.text());
        } else {
          return 0;
        }
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


  }


});

