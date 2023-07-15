AOS.init({
  easing: 'ease-in-out-sine'
});

function showloader() {
	$('.preload2').css({ 'display': 'block' });
}

function hideloader() {
	$('.preload2').css({ 'display': 'none' });
}

$(window).scroll(function() {
  var header = $(document).scrollTop();
  var headerHeight = $(".header").outerHeight();
  var firstSection = $(".main-content section:nth-of-type(1)").outerHeight();
  if (header > headerHeight) {
    $(".header").addClass("fixed");
  } else {
    $(".header").removeClass("fixed");
  }
  if (header > firstSection) {
    $(".header").addClass("in-view");
  } else {
    $(".header").removeClass("in-view");
  }
});

$(".btn-mobmenu").on('click', function(e){
    $('.menu').toggleClass('mobmenushow');
});  

$('.panel-collapse').on('show.bs.collapse', function () {
	$(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
	$(this).siblings('.panel-heading').removeClass('active');
});

$(".modeDropdown").click(function(e){
    e.stopPropagation(); 
});

$('.dropmenu').on('click', function(){	
	$(this).next('.user-dropdown').toggle();
});


$('.dropmenu').on('click', function(){
  $(this).next('.user-dropdown').toggle();
});

 $(document).ready(function() {
        //responsive menu toggle
        $("#menutoggle").click(function() {
          $('.xs-menu').toggleClass('displaynone');
          });
        //add active class on menu
      //drop down menu  
if($(window).width() >= 767){
$(".drop-down ").hover(function() {
   // e.stopPropagation(); 
            $('.drop-down').children('.mega-menu').removeClass('display-on');
            $(this).children('.mega-menu').addClass('display-on');
          });
          $(".drop-down ").mouseleave(function() {
            $(this).children('.mega-menu').removeClass('display-on');
            $('.mega-menu').removeClass('display-on');
          });
      $(".drop-down ").click(function() {
            $(this).children('.mega-menu').addClass('display-on');          
          });
}

if($(window).width() <= 767){ 
   $(".drop-down ").click(function() {
      // $('.drop-down').children('.mega-menu').removeClass('display-on');
      $(this).children('.mega-menu').addClass('display-on');
    }); 
  }     

    $(".drop-down ").mouseleave(function() {
      $(this).children('.mega-menu').removeClass('display-on');
      $('.mega-menu').removeClass('display-on');
    });
 });

 

/*search*/

function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}
/*search*/

$('.bannericon').click(function(){
  $('html, body').animate({
    scrollTop: $(this).closest("section").next().offset().top + 10
 }, "slow");
});

$('form#careerform').on('submit', function (e) {
    e.preventDefault();
    showloader();     

    var URL = $(this).attr('action');
    $(':input[type="submit"]').prop('disabled', true);
    //this.submitbutton.value='Please wait....';
    $(':input[type="submit"]').val("Please wait...")
    var form_data = new FormData($(this)[0]);
    form_data.append('file', $('#chooseFile')[0].files[0]);

    $.ajax({
      url: URL,
      type: 'POST',
      data: form_data,
      processData: false,
      contentType: false,
        success: function (response) {
        var jObj = JSON.parse(response);
        hideloader();

        $(':input[type="submit"]').prop('disabled', false);

        if (jObj.status === 'success') {
          $('form#careerform')[0].reset();
          $('#infotext').text('Thank you for submitting your information. We will get back to you soon.');
          
          $('#careermodal').modal('hide');
          $('#infomodal').modal('show');
  
        } else if (jObj.status === 'haserror') {
          $(':input[type="submit"]').prop('disabled', false);
          $(':input[type="submit"]').val("SUBMIT")
          alert(jObj.msg);
        }
      }
    });
});


$('form#contactform').on('submit', function (e) {
  e.preventDefault();
 
  var mobNum=$('#mobile').val();
  var filter = /^\d*(?:\.\d{1,2})?$/;

  if (filter.test(mobNum)) {
    if(mobNum.length==10){
      $('.contactmsg').removeClass('error').html('');
     } else {
         $('.contactmsg').addClass('error').html("Please put your 10 digit mobile number");
        return false;
      }
    }
    else {
       $('.contactmsg').addClass('error').html("Please enter your valid Mobile Number");   
      return false;
   }


  showloader();
  var URL = $(this).attr('action');
  $('#contactbtn').prop('disabled', true);  
  $('#contactbtn').val("Please wait...")

  var form_data=$( this ).serialize();
  $.ajax({
    url: URL,
    type: 'POST',
    data: form_data,    
    success: function (response) {
      hideloader();
      var jObj = JSON.parse(response);
      //$('.preload2').css({ 'display': 'none' });
      $('#contactbtn').prop('disabled', false);
      if (jObj.status === 'success') {
        $('form#contactform')[0].reset();
        $('.contactmsg').addClass('success').text('Thank you for submitting your information. We will get back to you soon.');
        //showpopup();
        window.location.href=SITE_URL+'thank-you';
      } else if (jObj.status === 'haserror') {
        $('#contactbtn').prop('disabled', false);
        $('#contactbtn').val("SUBMIT")
        //alert(jObj.msg);
        $('.contactmsg').addClass('error').html(jObj.msg);
      }
    }
  });
});

$('#loadmoreblog').on('click',function(){
  showloader();
  let offset=$(this).attr('data-offset');
  let limit=$(this).attr('data-limit');
  let totalrecords=$(this).attr('data-totalrecords');
  let newoffset=parseInt(offset)+parseInt(limit);  
  var URL=SITE_URL+'loadmoreblog'; 
  if(offset<=totalrecords){
    $.ajax({
      type: "POST",
      url: URL,
      data: {offset:offset,limit:limit},   
   })
      .done(function (data) {
        hideloader();
         var jObj = JSON.parse(data);
         if (jObj.status == 'success') {
          $('#loadmoreblog').attr('data-offset',newoffset);       
          var ht='';
          var data=jObj.data;
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              ht+='<div class="col-md-4 col-sm-6">';
              ht+='<div class="commonblogSec"><div class="ImageBlock">';
              ht+='<img src="'+data[i].image+'" title="'+data[i].image_title+'"  alt="'+data[i].image_alt+'"/>';
              ht+='</div><div class="contentSec">';
              ht+='<h3>'+data[i].blog_title+'</h3>';
              ht+='<p>'+data[i].blog_brief+'</p>';
              ht+='<a class="anchortext" href="'+data[i].url+'">Read More  <img src="'+SITE_URL+'assets/front/images/arrow.png"></a>';
              ht+='</div>';
              ht+='</div></div>';
            }
            $('#bloglist').append(ht).hide().fadeIn("slow");
          }
         }else if (jObj.status == 'error') {
            alert(jObj.msg);
         }
      });
  }else{
    $('#loadmoreblog').hide();
  }
});


$('#loadmoreclient').on('click',function(){

  let offset=$(this).attr('data-offset');
  let limit=$(this).attr('data-limit');
  let totalrecords=$(this).attr('data-totalrecords');

  let newoffset=parseInt(offset)+parseInt(limit);  
  var URL=SITE_URL+'request/loadmoreclients'; 
  if(offset<=totalrecords){
    $.ajax({
      type: "POST",
      url: URL,
      data: {offset:offset,limit:limit},   
   })
      .done(function (data) {
         var jObj = JSON.parse(data);
         if (jObj.status == 'success') {
          $('#loadmoreclient').attr('data-offset',newoffset);

          var ht='';
          var data=jObj.data;
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              ht+='<div class="col-6 col-md-4 col-lg-3">';
              ht+='<div class="clientimgblock">';
              ht+='<img src="'+data[i].image+'" alt="'+data[i].client_name+'"/>';
              ht+='</div> ';
              ht+='</div>';
            }
             $(ht).appendTo('#client_list').slideDown("slow");
           }
         }else if (jObj.status == 'error') {
            //alert(jObj.msg);
         }
      });
  }else{
    $('#loadmoreclient').hide();
  }
});


$(document).ready(function () {
  $('.toggle').click(function () {
      $('.sidebar-contact').toggleClass('active')
      $('.toggle').toggleClass('active')
  });
 
});

$('form#slidequickenquiryform').on('submit', function (e) {
  e.preventDefault();

  var mobNums=$('#qphone').val();
  var filter = /^\d*(?:\.\d{1,2})?$/;

  if (filter.test(mobNums)) {
    if(mobNums.length==10){
      $('.enqmsg').removeClass('error').html('');
     } else {
         $('.enqmsg').addClass('error').html("Please put your 10 digit mobile number");
        return false;
      }
    }
    else {
       $('.enqmsg').addClass('error').html("Please enter your valid Mobile Number");
   
      return false;
   }


  showloader();
  //var form_data = new FormData(document.getElementById("slidequickenquiryform")); 
  var form_data=$(this).serialize();
  var URL = SITE_URL + "request/submitquick";
  $('#slidequickenquiryform :input[type="submit"]').prop('disabled', true);
  //this.submitbutton.value='Please wait....';
  $('#slidequickenquiryform :input[type="submit"]').val("Please wait...");

  $.ajax({
    url: URL,
    type: 'POST',
    data: form_data,    
    success: function (response) {
      hideloader();
      var jObj = JSON.parse(response);
        if (jObj.status === 'success') {
        $('#slidequickenquiryform')[0].reset();
       // $('.toggle').trigger('click');
        $('.enqmsg').addClass('success').text('Thank you for submitting your information. We will get back to you soon.');          
         window.location.href=SITE_URL+'thank-you';
      } else if (jObj.status === 'haserror') {
          $('.enqmsg').addClass('error').html(jObj.msg);
      }

      $('#slidequickenquiryform :input[type="submit"]').removeAttr('disabled');
      $('#slidequickenquiryform :input[type="submit"]').val("Submit");
    }
  });
});
  