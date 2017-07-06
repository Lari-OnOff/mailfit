var Slider = function()
{
  const
    FRAME_WIDTH = 632,
    TRACK_MOVING_RANGE = 681,
    SCROLL_STEPS = 10;

  var
    main, container, scroller, track, initX,
    frames = [],
    tracking = false,
    arrow = {},
    scale = 1,
    scrolling = false;

  function trackMDown(event)
  {
    initX = event.pageX - parseInt(track.style.left);
    tracking = true;
  }

  function trackMMove(event)
  {
    if (tracking)
    {
      var x = event.pageX - initX;
      x = x<0 ? 0 : x>TRACK_MOVING_RANGE*scale ? TRACK_MOVING_RANGE*scale : x;
      x /= scale;
      track.style.left = x.toString() + 'px';
      var q = x / TRACK_MOVING_RANGE, maxScrollX = parseInt(container.style.width) - document.body.clientWidth;
      scroller.scrollTo(maxScrollX*q,0);
    }
  }

  function trackMUp()
  {
    tracking = false;
  }

  function setTrackPosition(frameIndex)
  {
    if (frameIndex>=frames.length || frameIndex<0) return;
    track.style.left = Math.round(frameIndex/(frames.length-1)*TRACK_MOVING_RANGE).toString() + 'px';
  }

  function smoothScroll(x)
  {
    var x0 = scroller.scrollLeft, step = (x - x0) / SCROLL_STEPS, right = x>x0;
    function doStep()
    {
      x0 += step;
      scroller.scrollTo(x0,0);
      if (right && x0<x || !right && x0>x)
      {
        requestAnimationFrame(doStep);
      } else {
        scrolling = false;
        scroller.scrollTo(x,0);
      }
    }
    scrolling = true;
    requestAnimationFrame(doStep);
  }

  function previousFrame(event)
  {
    if (scrolling) return;
    var index = Math.ceil(scroller.scrollLeft / FRAME_WIDTH) - 1;
    smoothScroll(index*FRAME_WIDTH);
    setTrackPosition(index);
  }

  function nextFrame()
  {
    if (scrolling) return;
    var index = Math.floor(scroller.scrollLeft / FRAME_WIDTH) + 1;
    smoothScroll(index*FRAME_WIDTH);
    setTrackPosition(index);
  }

  function resize()
  {
    if (window.innerWidth>=800)
    {
      scale = 1;
      main.removeAttribute('style');
    } else {
      scale = window.innerWidth / 800;
      main.style.transform = 'scale(' + scale + ')';
      main.style.marginBottom = '-' + (600 * (1 - scale)).toString() + 'px';
    }
    container.style.width = (frames.length * FRAME_WIDTH + window.innerWidth / scale - FRAME_WIDTH).toString() + 'px';
  }

  function scrollEventHandler()
  {
    if (!tracking) track.style.left = (scroller.scrollLeft / ((frames.length - 1) * FRAME_WIDTH) * TRACK_MOVING_RANGE).toString() + 'px';
  }

  return {
    initialize: function(element)
    {
      main = element;
      container = element.getElementsByClassName(element.className+'__frames')[0];
      scroller = element.getElementsByClassName(element.className+'__frames-scroller')[0];
      track = element.getElementsByClassName(element.className+'__control-track')[0];
      arrow.previous = document.querySelector('.slider__side.--left');
      arrow.next = document.querySelector('.slider__side.--right');
      track.addEventListener('mousedown',trackMDown);
      document.body.addEventListener('mousemove',trackMMove);
      document.body.addEventListener('mouseup',trackMUp);
      arrow.previous.addEventListener('click',previousFrame);
      arrow.next.addEventListener('click',nextFrame);
      window.addEventListener('resize',resize);
      scroller.addEventListener('scroll',scrollEventHandler);
      scroller.addEventListener('touchmove',scrollEventHandler);
      var frameElements = container.getElementsByClassName(element.className+'__frame');
      for (var i=0; i<frameElements.length; i++) frames.push(frameElements[i]);
      container.style.width = ((frames.length * FRAME_WIDTH + window.innerWidth - FRAME_WIDTH) / scale).toString() + 'px';
      resize();
    }
  };
}();