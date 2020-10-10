document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('footer .time');
  const appWindow = document.querySelector('.container');
  const windowBtn = appWindow.querySelector('.dots');
  const resizeBtn = document.querySelector('footer .resize');
  let  windowRect = {};

  const singleColumn = () => {
    const { width } = window.getComputedStyle(appWindow);
    if(parseInt(width) < 640) {
      document.querySelector('main').classList.add('column');
    } else {
      document.querySelector('main').classList.remove('column');
    }
  };

  const media = () => {
    if(window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      appWindow.removeAttribute('style');
      appWindow.classList.add('mobile');
    } else {
      appWindow.classList.remove('mobile');
    }
  };

  const setLayout = () => {
    singleColumn();
    media();
  }

  const storeRect = () => {
    const { top, right, bottom, left, width, height } = window.getComputedStyle(appWindow);
    windowRect = { top, right, bottom, left, width, height };
  };

  const displayClock = (target) => {
    window.setInterval(() => {
      target.textContent = new Date().toLocaleTimeString().slice(0,5);
    })
  };

  const onDrag = (evt) => {
    const { left, top } = window.getComputedStyle(appWindow);
    appWindow.style.left = parseInt(left) + evt.movementX + 'px';
    appWindow.style.top = parseInt(top) + evt.movementY + 'px';
  };

  const onDrop = () => {
    const { top, right, bottom, left, width, height } = window.getComputedStyle(appWindow);
    if(parseInt(left) < 0) {
      appWindow.style.left = 0;
    }
    if(parseInt(right) < 0) {
      appWindow.style.left = (window.innerWidth - parseInt(width)) + 'px';
    }
    if(parseInt(top) < 0) {
      appWindow.style.top = 0;
    }
    if(parseInt(bottom) < 0) {
      appWindow.style.top = (window.innerHeight - parseInt(height)) + 'px';
    }
    if(appWindow.className === 'container') {
      storeRect();
    }
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onDrop);
  };

  const onResize = (evt) => {
    const { left, top } = window.getComputedStyle(appWindow);
    appWindow.style.width = (evt.clientX - parseInt(left)) + 'px';
    appWindow.style.height = (evt.clientY - parseInt(top)) + 'px';
    appWindow.style.minWidth = "320px";
    appWindow.style.minHeight = "400px";
    singleColumn();
  };

  const onGrab = (evt) => {
    if (evt.target.tagName === "H1") {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDrop);
    }
    if (evt.target.classList.contains('resize')) {
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', onDrop);
    }
  };

  displayClock(clock);
  appWindow.addEventListener('mousedown', onGrab);

  windowBtn.addEventListener('click', (evt) => {
    switch (evt.target.dataset.index) {
      case "1":
        appWindow.classList.remove('max-window');
        if (appWindow.classList.contains('min-window')) {
          appWindow.classList.remove('min-window');
          appWindow.style.top = windowRect.top;
          appWindow.style.left = windowRect.left;
          appWindow.style.width = windowRect.width;
          appWindow.style.height = windowRect.height;
        } else {
          appWindow.classList.add('min-window');
          appWindow.removeAttribute('style');
        }
        break;
        
      case "2":
        appWindow.classList.remove('min-window');
        if (appWindow.classList.contains('max-window')){
          appWindow.classList.remove('max-window');
          appWindow.style.top = windowRect.top;
          appWindow.style.left = windowRect.left;
          appWindow.style.width = windowRect.width;
          appWindow.style.height = windowRect.height;
        } else {
          storeRect();
          appWindow.classList.add('max-window');
          appWindow.removeAttribute('style');
        }
      break;
    
      case "3":
        appWindow.removeAttribute('style');
        appWindow.style.opacity = 0;
        window.setTimeout(() => {
          appWindow.className = "container";
        }, 300);
        window.setTimeout(() => {
          appWindow.style.opacity = 1;
        }, 4000);
        break;
    
      default:
        break;
    }
  })

  resizeBtn.addEventListener('mousedown', onGrab)
  window.onresize = setLayout();
  window.addEventListener('orientationchange', setLayout());
});