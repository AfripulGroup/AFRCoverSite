/**
 * Immediately Invoked Function Expression (IIFE) to manage ad announcements and interactions.
 */
(function () {
  const announcement = $(".announcement");
  const nextTime = $(".next-time");
  const navLink = $("a.nav-link.dropdown-toggle");

  $(function () {
    // Initial delay time for showing the ad in milliseconds(3 minute)
    let time = 180000;

    /**
     * Show ads with a delay if they haven't been shown already.
     * @param {number} time - Delay time in milliseconds before showing the ad.
     */
    const showAds = (time) => {
      const alreadyShown = sessionStorage.getItem("adsShown");
      if (alreadyShown != 1) {
        setTimeout(() => {
          // Show the announcement and mark it as shown in session storage
          announcement.removeClass("d-none").addClass("slideIn");
          sessionStorage.setItem("adsShown", 1);
        }, time);
      }
    };

    // Call showAds on page load
    showAds(time);

    // Event listener for clicking links inside the announcement overlay
    $(".announcement .overlay .links").on("click", "a", function () {
      // Hide the announcement
      announcement.addClass("d-none").removeClass("slideIn");
    });

    // Event listener for clicking buttons inside the announcement overlay
    $(".announcement .overlay .links").on("click", "button", function (e) {
      e.preventDefault();
      // Hide the announcement with a skew out animation
      announcement.removeClass("slideIn").addClass("skewOut");
      setTimeout(() => {
        announcement.addClass("d-none").removeClass("skewOut");
        // Reset the ad shown status and double the delay time
        sessionStorage.removeItem("adsShown");
        time *= 3;
        console.log(time);
        showAds(time);
      }, 1000);
    });

    // Event listener for closing the announcement
    $(".announcement .overlay").on("click", "button.close", function (e) {
      e.preventDefault();
      // Show the "next time" message and hide the announcement
      nextTime.removeClass("d-none").addClass("toTop");
      announcement.addClass("d-none").removeClass("slideIn skewOut");

      setTimeout(() => {
        nextTime.addClass("d-none").removeClass("toTop");
      }, 2000);

      // Blink the navigation link and navbar-toggler for 7 seconds
      const blinkLink = setInterval(() => {
        navLink.toggleClass("active");
        $(".navbar-toggler").toggleClass("text-primary");
      }, 500);

      setTimeout(() => {
        clearInterval(blinkLink);
        navLink.removeClass("active");
        $(".navbar-toggler").removeClass("text-primary");
      }, 7000);
    });
  });
})();
