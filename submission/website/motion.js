/* Progressive motion: content stays readable without JavaScript or animation support. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.22,.61,.36,1)';
  const active = new Set();
  function animate(element, frames, options = {}) {
    if (!element || preference.matches || !element.animate) return;
    const animation = element.animate(frames, {duration: 560, easing: ease, ...options});
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
    return animation;
  }
  const enter = (element, delay = 0) => animate(element,
    [{opacity: 0, transform: 'translateY(20px)'}, {opacity: 1, transform: 'none'}],
    {delay, fill: 'backwards'});
  document.querySelectorAll('.banner-brand,.banner-title,.banner-value').forEach((el, i) => enter(el, i * 85));
  document.querySelectorAll('.hero>div,.hero>figure').forEach((el, i) => enter(el, 100 + i * 90));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      for (const entry of entries) if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        enter(entry.target, Math.min(stagger++ * 55, 180));
      }
    }, {threshold: 0.04});
    document.querySelectorAll('.quick-overview a,.section-head,.product-film,.demo-shot,.feature-tabs button,.principle-grid article,.start-list li,.more>details,.closing').forEach(el => observer.observe(el));
    const nav = document.querySelector('.nav'), banner = document.querySelector('.value-banner');
    if (nav && banner) new IntersectionObserver(([entry]) => {
      nav.classList.toggle('is-stuck', !entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    }).observe(banner);
  }
  // DOM updates remain immediate, including rapid tab changes and keyboard navigation.
  const swaps = new WeakMap();
  for (const element of [document.querySelector('#panel-title'), document.querySelector('#interactive'), document.querySelector('#evidence-content')].filter(Boolean)) {
    new MutationObserver(() => {
      swaps.get(element)?.cancel();
      swaps.set(element, animate(element, [{opacity: .3, transform: 'translateY(9px)'}, {opacity: 1, transform: 'none'}], {duration: 300}));
    }).observe(element, {childList: true});
  }
  document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector(':scope>summary');
    if (!summary || details.id === 'deep-detail') return;
    let animation, target = details.open;
    const clean = () => { details.style.height = ''; details.style.overflow = ''; };
    summary.addEventListener('click', event => {
      if (preference.matches || !details.animate) return;
      event.preventDefault();
      const from = details.getBoundingClientRect().height;
      target = animation ? !target : !details.open;
      if (animation) { animation.onfinish = null; animation.cancel(); }
      clean();
      details.open = target;
      const to = details.getBoundingClientRect().height;
      details.open = true;
      details.style.overflow = 'hidden';
      animation = animate(details, [{height: from + 'px'}, {height: to + 'px'}], {duration: target ? 400 : 280});
      const finish = () => { details.open = target; clean(); animation = undefined; };
      animation.onfinish = finish;
      animation.oncancel = clean;
    });
    preference.addEventListener('change', () => {
      if (preference.matches && animation) { animation.cancel(); animation = undefined; details.open = target; clean(); }
    });
  });
  preference.addEventListener('change', () => { if (preference.matches) for (const animation of active) animation.cancel(); });
})();
