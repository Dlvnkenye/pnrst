(function (e) {
  e.skdslider = function (t, n) {
    var r = {
      delay: 2e3,
      animationSpeed: 500,
      showNav: true,
      autoSlide: true,
      showNextPrev: false,
      pauseOnHover: false,
      numericNav: false,
      showPlayButton: false,
      animationType: "fading",
    };
    if (n) {
      e.extend(r, n);
    }
    var i =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch);
    e(t).wrap('<div class="skdslider"></div>');
    var s = e(t).closest("div.skdslider");
    s.find("ul").addClass("slides");
    var o = s.find("ul.slides li");
    var u = 0;
    r.currentSlide = 0;
    r.currentState = "pause";
    r.running = false;
    // for fading  mode
    if (r.animationType == "fading") {
      o.each(function () {
        e(this).css({
          position: "absolute",
          left: "0",
          top: "0",
          bottom: "0",
          right: "0",
        });
      });
    }
    // for sliding mode
    if (r.animationType == "sliding") {
      o.each(function () {
        e(this).css({ float: "left", display: "block", position: "relative" });
      });
      var a = s.outerWidth() * o.size();
      s.find("ul.slides").css({ position: "absolute", left: "0", width: a });
      o.css({ width: s.outerWidth(), height: s.outerHeight() });
      e(window).resize(function () {
        var e = s.outerWidth() * o.size();
        s.find("ul.slides").css({ position: "absolute", left: "0", width: e });
        o.css({ width: s.outerWidth(), height: s.outerHeight() });
      });
    }
    e.skdslider.enableTouch(s, o, r);
    e.skdslider.createNav(s, o, r);
    o.eq(u).show();
    if (r.autoSlide == true) {
      r.currentState = "play";
      r.interval = setTimeout(function () {
        e.skdslider.playSlide(s, o, r);
      }, r.delay);
    }
    if (r.pauseOnHover == true) {
      o.hover(
        function () {
          if (r.autoSlide == true) {
            r.currentState = "pause";
            clearTimeout(r.interval);
          }
        },
        function () {
          if (r.autoSlide == true) {
            r.currentState = "play";
            if (r.autoSlide == true) e.skdslider.playSlide(s, o, r);
          }
        }
      );
    }
  };
  e.skdslider.createNav = function (t, n, r) {
    var s = '<ul class="slide-navs">';
    for (i = 0; i < n.length; i++) {
      var o = "";
      if (r.numericNav == true) o = i + 1;
      if (i == 0)
        s +=
          '<li class="current-slide slide-nav-' + i + '"><a>' + o + "</a></li>";
      else s += '<li class="slide-nav-' + i + '"><a>' + o + "</a></li>";
    }
    s += "</ul>";
    if (r.showNav == true) {
      t.append(s);
      var u = t.find(".slide-navs")[0].offsetWidth;
      u = parseInt(u / 2);
      u = -1 * u;
      t.find(".slide-navs").css("margin-left", u);
      t.find(".slide-navs li").click(function () {
        index = t.find(".slide-navs li").index(this);
        targetSlide = index;
        clearTimeout(r.interval);
        r.currentState = "play";
        r.running = false;
        e.skdslider.playSlide(t, n, r, targetSlide);
        return false;
      });
    }
    if (r.showNextPrev == true) {
      var a = '<a class="prev"></a>';
      a += '<a class="next"></a>';
      t.append(a);
      t.find("a.prev").click(function () {
        e.skdslider.prev(t, n, r);
      });
      t.find("a.next").click(function () {
        e.skdslider.next(t, n, r);
      });
    }
    if (r.showPlayButton == true) {
      var f =
        r.currentState == "play" || r.autoSlide == true
          ? '<a class="play-control pause"></a>'
          : '<a class="play-control play"></a>';
      t.append(f);
      t.hover(
        function () {
          t.find("a.play-control").css("display", "block");
        },
        function () {
          t.find("a.play-control").css("display", "none");
        }
      );
      t.find("a.play-control").click(function () {
        if (r.autoSlide == true) {
          clearTimeout(r.interval);
          r.autoSlide = false;
          r.currentState = "pause";
          e(this).addClass("play");
          e(this).removeClass("pause");
        } else {
          r.currentState = "play";
          r.autoSlide = true;
          e(this).addClass("pause");
          e(this).removeClass("play");
          if (r.currentSlide + 1 == n.length) targetSlide = 0;
          else targetSlide = r.currentSlide + 1;
          clearTimeout(r.interval);
          e.skdslider.playSlide(t, n, r, targetSlide);
        }
        return false;
      });
    }
  };
  e.skdslider.next = function (t, n, r) {
    if (r.currentSlide + 1 == n.length) targetSlide = 0;
    else targetSlide = r.currentSlide + 1;
    clearTimeout(r.interval);
    r.currentState = "play";
    e.skdslider.playSlide(t, n, r, targetSlide);
    return false;
  };
  e.skdslider.prev = function (t, n, r) {
    if (r.currentSlide == 0) targetSlide = n.length - 1;
    else targetSlide = r.currentSlide - 1;
    clearTimeout(r.interval);
    r.currentState = "play";
    r.running = false;
    e.skdslider.playSlide(t, n, r, targetSlide);
    return true;
  };
  e.skdslider.prev = function (t, n, r) {
    if (r.currentSlide == 0) targetSlide = n.length - 1;
    else targetSlide = r.currentSlide - 1;
    clearTimeout(r.interval);
    r.currentState = "play";
    r.running = false;
    e.skdslider.playSlide(t, n, r, targetSlide);
    return true;
  };
  e.skdslider.playSlide = function (t, n, r, i) {
    if (r.currentState == "play" && r.running == false) {
      t.find(".slide-navs li").removeClass("current-slide");
      if (typeof i == "undefined") {
        i = r.currentSlide + 1 == n.length ? 0 : r.currentSlide + 1;
      }
      if (r.animationType == "fading") {
        r.running = true;
        n.eq(r.currentSlide).fadeOut(r.animationSpeed);
        n.eq(i).fadeIn(r.animationSpeed, function () {
          e.skdslider.removeIEFilter(e(this)[0]);
          r.running = false;
        });
      }
      if (r.animationType == "sliding") {
        var s = i * t.outerWidth() * -1;
        r.running = true;
        t.find("ul.slides").animate({ left: s }, r.animationSpeed, function () {
          r.running = false;
        });
      }
      t.find(".slide-navs li").eq(i).addClass("current-slide");
      r.currentSlide = i;
    }
    if (r.autoSlide == true && r.currentState == "play") {
      r.interval = setTimeout(function () {
        e.skdslider.playSlide(t, n, r);
      }, r.delay);
    }
  };
  e.skdslider.enableTouch = function (t, n, r) {
    function a(e) {
      i = e.touches[0].pageX;
      s = e.touches[0].pageY;
      t[0].addEventListener("touchmove", f, false);
      t[0].addEventListener("touchend", l, false);
    }
    function f(e) {
      e.preventDefault();
      var t = e.touches[0].pageX;
      var n = e.touches[0].pageY;
      o = i - t;
      u = s - n;
    }
    function l(i) {
      t[0].removeEventListener("touchmove", f, false);
      if (o > 0) {
        e.skdslider.next(t, n, r);
      } else {
        e.skdslider.prev(t, n, r);
      }
      t[0].removeEventListener("touchend", l, false);
    }
    t[0].addEventListener("touchstart", a, false);
    var i;
    var s;
    var o;
    var u;
  };
  e.skdslider.removeIEFilter = function (e) {
    if (e.style.removeAttribute) {
      e.style.removeAttribute("filter");
    }
  };
  e.fn.skdslider = function (t) {
    return this.each(function () {
      new e.skdslider(this, t);
    });
  };
})(jQuery);
