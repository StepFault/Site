// Animated Dots Background for Sections
(function() {
  function createDotsCanvas(section) {
    const canvas = document.createElement('canvas');
    canvas.className = 'dots-bg-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = 0.25;
    section.style.position = 'relative';
    section.insertBefore(canvas, section.firstChild);
    return canvas;
  }

  function animateDots(canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let dots = [];
    const DOTS_X = 18;
    const DOTS_Y = 8;
    const DOT_RADIUS = 2.2;
    const DOT_SPACING_X = 50;
    const DOT_SPACING_Y = 50;
    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      // Generate dots
      dots = [];
      for (let y = 0; y < DOTS_Y; ++y) {
        for (let x = 0; x < DOTS_X; ++x) {
          let px = (x + 0.5) * (width / DOTS_X);
          let py = (y + 0.5) * (height / DOTS_Y);
          let phase = Math.random() * Math.PI * 2;
          dots.push({ x: px, y: py, phase });
        }
      }
    }
    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        const offset = Math.sin(t / 900 + dot.phase) * 5;
        ctx.beginPath();
        ctx.arc(dot.x + offset, dot.y + offset, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = '#09B6A2';
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  // Add to hero, about, services
  ['hero', 'about', 'services'].forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const canvas = createDotsCanvas(section);
      animateDots(canvas);
    }
  });
})();
