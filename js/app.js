document.addEventListener('DOMContentLoaded', () => {
  const clock = document.querySelector('footer .time');
  const appWindow = document.querySelector('.container');
  const windowBtn = appWindow.querySelector('.dots');
  const main = appWindow.querySelector('main');
  const footer = appWindow.querySelector('footer');
  const resizeBtn = document.querySelector('footer .resize');

  const displayClock = (target) => {
    window.setInterval(() => {
      target.textContent = new Date().toLocaleTimeString().slice(0,5);
    })
  };

  const onDrag = (evt) => {
    const { left, top } = window.getComputedStyle(appWindow);
    appWindow.style.left = parseInt(left) + evt.movementX + 'px'
    appWindow.style.top = parseInt(top) + evt.movementY + 'px'
  };

  const onDrop = () => {
    const dimensions = appWindow.getBoundingClientRect();
    if(parseInt(dimensions.left) < 0) {
      appWindow.style.left = 0;
    }
    if(parseInt(dimensions.right) > window.innerWidth) {
      appWindow.style.left = (window.innerWidth - dimensions.width) + 'px';
    }
    if(parseInt(dimensions.top) < 0) {
      appWindow.style.top = 0;
    }
    if(parseInt(dimensions.bottom) > window.innerHeight) {
      appWindow.style.top = (window.innerHeight - dimensions.height) + 'px';
    }
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', onDrop);
  };

  const onResize = (evt) => {
    const { left, top } = window.getComputedStyle(appWindow);
    appWindow.style.width = (evt.clientX - parseInt(left)) + 'px';
    appWindow.style.height = (evt.clientY - parseInt(top)) + 'px';
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
        appWindow.classList.toggle('min-window');
        if (appWindow.classList.contains('min-window')) {
          appWindow.removeAttribute('style');
          main.style.display = "none";
          footer.style.display = "none";
        } else {
          main.removeAttribute('style');
          footer.removeAttribute('style');
        }
        break;
        
        case "2":
        appWindow.removeAttribute('style');
        appWindow.classList.remove('min-window');
        appWindow.classList.toggle('max-window');
        main.style.display = "";
        footer.style.display = "";
        break;
    
      case "3":
        appWindow.removeAttribute('style');
        main.removeAttribute('style');
        footer.removeAttribute('style');
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

});