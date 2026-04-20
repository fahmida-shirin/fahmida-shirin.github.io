/* Vanilla Port of MagicBento from React Bits */
class MagicBento {
  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign({
      textAutoHide: true,
      enableStars: true,
      enableSpotlight: true,
      enableBorderGlow: true,
      enableTilt: true,
      enableMagnetism: true,
      clickEffect: true,
      spotlightRadius: 300,
      particleCount: 12,
      glowColor: "132, 0, 255"
    }, options);

    this.particles = [];
    this.timeouts = [];
    this.isHovered = false;
    this.isInitialized = false;
    this.magnetismAnimation = null;
    this.spotlightEl = null;

    this.init();
  }

  init() {
    this.element.classList.add('magic-bento-card');
    if (this.options.textAutoHide) this.element.classList.add('magic-bento-card--text-autohide');
    if (this.options.enableBorderGlow) this.element.classList.add('magic-bento-card--border-glow');
    
    this.element.style.setProperty('--glow-color', this.options.glowColor);

    if (this.options.enableSpotlight) {
      this.initSpotlight();
    }

    this.addEventListeners();
  }

  initSpotlight() {
    this.spotlightEl = document.createElement('div');
    this.spotlightEl.className = 'global-spotlight';
    this.spotlightEl.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${this.options.glowColor}, 0.15) 0%,
        rgba(${this.options.glowColor}, 0.08) 15%,
        rgba(${this.options.glowColor}, 0.04) 25%,
        rgba(${this.options.glowColor}, 0.02) 40%,
        rgba(${this.options.glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      pointer-events: none;
      will-change: transform, opacity;
    `;
    document.body.appendChild(this.spotlightEl);
  }

  createParticleElement(x, y) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(${this.options.glowColor}, 1);
      box-shadow: 0 0 6px rgba(${this.options.glowColor}, 0.6);
      pointer-events: none;
      z-index: 100;
      left: ${x}px; top: ${y}px;
    `;
    return el;
  }

  clearAllParticles() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    if (this.magnetismAnimation) this.magnetismAnimation.kill();

    this.particles.forEach(p => {
      gsap.to(p, {
        scale: 0, opacity: 0, duration: 0.3,
        onComplete: () => p.parentNode?.removeChild(p)
      });
    });
    this.particles = [];
  }

  animateParticles() {
    if (!this.isHovered) return;
    const rect = this.element.getBoundingClientRect();
    
    for (let i = 0; i < this.options.particleCount; i++) {
        const timeoutId = setTimeout(() => {
            if (!this.isHovered) return;
            const px = Math.random() * rect.width;
            const py = Math.random() * rect.height;
            const p = this.createParticleElement(px, py);
            this.element.appendChild(p);
            this.particles.push(p);

            gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(p, {
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 80,
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                repeat: -1, yoyo: true, ease: 'none'
            });
            gsap.to(p, { opacity: 0.3, duration: 1.5, repeat: -1, yoyo: true });
        }, i * 100);
        this.timeouts.push(timeoutId);
    }
  }

  addEventListeners() {
    const el = this.element;

    el.addEventListener('mouseenter', () => {
      this.isHovered = true;
      if (this.options.enableStars) this.animateParticles();
      if (this.options.enableTilt) {
        gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, transformPerspective: 1000 });
      }
    });

    el.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.clearAllParticles();
      if (this.options.enableTilt) {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3 });
      }
      if (this.options.enableMagnetism) {
        gsap.to(el, { x: 0, y: 14, duration: 0.3 }); // Adjusting to the form's natural state
      }
      if (this.spotlightEl) {
        gsap.to(this.spotlightEl, { opacity: 0, duration: 0.3 });
      }
      el.style.setProperty('--glow-intensity', '0');
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isHovered && !this.options.enableSpotlight) return;

      const rect = el.getBoundingClientRect();
      const section = el.closest('section') || el;
      const sRect = section.getBoundingClientRect();
      
      const isInsideSection = 
        e.clientX >= sRect.left && e.clientX <= sRect.right && 
        e.clientY >= sRect.top && e.clientY <= sRect.bottom;

      if (this.options.enableSpotlight && this.spotlightEl) {
        if (isInsideSection) {
            gsap.to(this.spotlightEl, { left: e.clientX, top: e.clientY, opacity: 0.7, duration: 0.1 });
        } else {
            gsap.to(this.spotlightEl, { opacity: 0, duration: 0.3 });
        }
      }

      if (this.isHovered) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cX = rect.width / 2;
        const cY = rect.height / 2;

        if (this.options.enableTilt) {
          const rX = ((y - cY) / cY) * -8;
          const rY = ((x - cX) / cX) * 8;
          gsap.to(el, { rotateX: rX, rotateY: rY, duration: 0.1 });
        }

        if (this.options.enableMagnetism) {
          const mX = (x - cX) * 0.05;
          const mY = (y - cY) * 0.05;
          gsap.to(el, { x: mX, y: mY, duration: 0.3 });
        }

        if (this.options.enableBorderGlow) {
          el.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
          el.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
          el.style.setProperty('--glow-intensity', '1');
          el.style.setProperty('--glow-radius', `${this.options.spotlightRadius}px`);
        }
      }
    });

    el.addEventListener('click', (e) => {
      if (!this.options.clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDist = Math.max(Math.hypot(cX, cY), Math.hypot(cX - rect.width, cY), Math.hypot(cX, cY - rect.height), Math.hypot(cX - rect.width, cY - rect.height));

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute; width: ${rect.width * 2}px; height: ${rect.width * 2}px;
        border-radius: 50%; background: radial-gradient(circle, rgba(${this.options.glowColor}, 0.3) 0%, transparent 70%);
        left: ${x - rect.width}px; top: ${y - rect.width}px; pointer-events: none; z-index: 1000;
      `;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, onComplete: () => ripple.remove() });
    });
  }
}
