// JavaScript Document

$(window).on("load", function () {
  "use strict";

  /*----------------------------------------------------*/
  /*	Preloader
		/*----------------------------------------------------*/

  var preloader = $("#loader-wrapper"),
    loader = preloader.find(".cssload-contain");
  loader.fadeOut();
  preloader.delay(400).fadeOut("slow");

  
});

$(window).on("scroll", function () {
  "use strict";

  /*----------------------------------------------------*/
  /*	Navigtion Menu Scroll
		/*----------------------------------------------------*/

  var b = $(window).scrollTop();

  if (b > 72) {
    $(".navbar").addClass("scroll");
  } else {
    $(".navbar").removeClass("scroll");
  }
});

$(document).ready(function () {
  "use strict";

  /*----------------------------------------------------*/
  /*	Animated Scroll To Anchor
		/*----------------------------------------------------*/

  $(
    '.header a[href^="#"], .page a.btn[href^="#"], .page a.internal-link[href^="#"]'
  ).on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = jQuery(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top - 60, // - 200px (nav-height)
        },
        "slow",
        "easeInSine",
        function () {
          window.location.hash = "1" + target;
        }
      );
  });

  /*----------------------------------------------------*/
  /*	ScrollUp
		/*----------------------------------------------------*/

  $.scrollUp = function (options) {
    // Defaults
    var defaults = {
      scrollName: "scrollUp", // Element ID
      topDistance: 600, // Distance from top before showing element (px)
      topSpeed: 800, // Speed back to top (ms)
      animation: "fade", // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      scrollText: "", // Text for element
      scrollImg: false, // Set true to use image
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    };

    var o = $.extend({}, defaults, options),
      scrollId = "#" + o.scrollName;

    // Create element
    $("<a/>", {
      id: o.scrollName,
      href: "#top",
      title: o.scrollText,
    }).appendTo("body");

    // If not using an image display text
    if (!o.scrollImg) {
      $(scrollId).text(o.scrollText);
    }

    // Minium CSS to make the magic happen
    $(scrollId).css({ display: "none", position: "fixed", "z-index": "99999" });

    // Active point overlay
    if (o.activeOverlay) {
      $("body").append("<div id='" + o.scrollName + "-active'></div>");
      $(scrollId + "-active").css({
        position: "absolute",
        top: o.topDistance + "px",
        width: "100%",
        "border-top": "1px dotted " + o.activeOverlay,
        "z-index": "99999",
      });
    }

    // Scroll function
    $(window).on("scroll", function () {
      switch (o.animation) {
        case "fade":
          $(
            $(window).scrollTop() > o.topDistance
              ? $(scrollId).fadeIn(o.animationInSpeed)
              : $(scrollId).fadeOut(o.animationOutSpeed)
          );
          break;
        case "slide":
          $(
            $(window).scrollTop() > o.topDistance
              ? $(scrollId).slideDown(o.animationInSpeed)
              : $(scrollId).slideUp(o.animationOutSpeed)
          );
          break;
        default:
          $(
            $(window).scrollTop() > o.topDistance
              ? $(scrollId).show(0)
              : $(scrollId).hide(0)
          );
      }
    });

    // To the top
    $(scrollId).on("click", function (event) {
      $("html, body").animate({ scrollTop: 0 }, o.topSpeed);
      event.preventDefault();
    });
  };

  $.scrollUp();

  /*----------------------------------------------------*/
  /*	Quick Form Validation
		/*----------------------------------------------------*/

//   $(".quick-form").validate({
//     rules: {
//       name: {
//         required: true,
//         minlength: 1,
//         maxlength: 16,
//       },
//       email: {
//         required: true,
//         email: true,
//       },
//       message: {
//         required: true,
//         minlength: 2,
//       },
//     },
//     messages: {
//       name: {
//         required: "Please enter no more than (1) characters",
//       },
//       email: {
//         required: "We need your email address to contact you",
//         email: "Your email address must be in the format of name@domain.com",
//       },
//       message: {
//         required: "Please enter no more than (2) characters",
//       },
//     },
//   });


  
  /*----------------------------------------------------*/
  /*	Sign In Form Validation
		/*----------------------------------------------------*/

//   $(".sign-in-form").validate({
//     rules: {
//       password: {
//         required: true,
//         minlength: 2,
//         maxlength: 16,
//       },
//       email: {
//         required: true,
//         email: true,
//       },
//     },
//     messages: {
//       password: {
//         required: "Please enter no more than (1) characters",
//       },
//       email: {
//         required: "Please enter valid email address",
//         email: "Your email address must be in the format of name@domain.com",
//       },
//     },
//   });

  /*----------------------------------------------------*/
  /*	Sign Up Form Validation
		/*----------------------------------------------------*/

//   $(".sign-up-form").validate({
//     rules: {
//       name: {
//         required: true,
//         minlength: 2,
//         maxlength: 16,
//       },
//       password: {
//         required: true,
//         minlength: 2,
//         maxlength: 16,
//       },
//       email: {
//         required: true,
//         email: true,
//       },
//     },
//     messages: {
//       name: {
//         required: "Please enter no more than (1) characters",
//       },
//       password: {
//         required: "Please enter no more than (1) characters",
//       },
//       email: {
//         required: "Please enter valid email address",
//         email: "Your email address must be in the format of name@domain.com",
//       },
//     },
//   });

  /*----------------------------------------------------*/
  /*	Sticky Bottom Quick
		/*----------------------------------------------------*/

//   $(".help-btn").on("click", function () {
//     $(".sticky-form").toggleClass("open");
//     $(this).toggleClass("clicked");
//   });

  /*----------------------------------------------------*/
  /*	Newsletter Subscribe Form
		/*----------------------------------------------------*/

//   $(".newsletter-form").ajaxChimp({
//     language: "cm",
//     url: "http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx",
//   });

//   $.ajaxChimp.translations.cm = {
//     submit: "Submitting...",
//     0: "We have sent you a confirmation email",
//     1: "Please enter your email address",
//     2: "An email address must contain a single @",
//     3: "The domain portion of the email address is invalid (the portion after the @: )",
//     4: "The username portion of the email address is invalid (the portion before the @: )",
//     5: "This email address looks fake or invalid. Please enter a real email address",
//   };
});
