(function () {
  'use strict';

  var root = '/ascella.qodeinteractive.com/';
  var heroAssetRoot = root + 'wp-content/uploads/tarushi-hero/';

  function arrowMarkup() {
    return '<svg class="qodef-svg--menu-arrow qodef-menu-item-arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M 13.8,24.196c 0.39,0.39, 1.024,0.39, 1.414,0l 6.486-6.486c 0.196-0.196, 0.294-0.454, 0.292-0.71 c 0-0.258-0.096-0.514-0.292-0.71L 15.214,9.804c-0.39-0.39-1.024-0.39-1.414,0c-0.39,0.39-0.39,1.024,0,1.414L 19.582,17 L 13.8,22.782C 13.41,23.172, 13.41,23.806, 13.8,24.196z"></path></svg>';
  }

  function menuMarkup() {
    return [
      '<li class="menu-item"><a href="' + root + 'index.html"><span class="qodef-menu-item-text">Home</span></a></li>',
      '<li class="menu-item"><a href="' + root + 'about-us/index.html"><span class="qodef-menu-item-text">About Us</span></a></li>',
      '<li class="menu-item"><a href="' + root + 'gift-card/index.html"><span class="qodef-menu-item-text">Gift Card</span></a></li>',
      '<li class="menu-item"><a href="' + root + 'contact-us/index.html"><span class="qodef-menu-item-text">Contact Us</span></a></li>',
      '<li class="menu-item menu-item-has-children qodef-menu-item--narrow"><a href="' + root + 'shop-list-with-baner/index.html"><span class="qodef-menu-item-text">Collections' + arrowMarkup() + '</span></a><div class="qodef-drop-down-second"><div class="qodef-drop-down-second-inner"><ul class="sub-menu">' +
        '<li class="menu-item"><a href="' + root + 'product-category/style/rings/index.html"><span class="qodef-menu-item-text">Rings</span></a></li>' +
        '<li class="menu-item"><a href="' + root + 'product/necklaces/index.html"><span class="qodef-menu-item-text">Necklaces</span></a></li>' +
        '<li class="menu-item"><a href="' + root + 'product-category/beauty-bracelests/index.html"><span class="qodef-menu-item-text">Bangles</span></a></li>' +
        '<li class="menu-item"><a href="' + root + 'product-category/style/earrings/index.html"><span class="qodef-menu-item-text">Earrings</span></a></li>' +
      '</ul></div></div></li>'
    ].join('');
  }

  function updateNavigation() {
    document.querySelectorAll('.qodef-header-navigation ul.menu, #qodef-mobile-header ul.menu').forEach(function (menu) {
      menu.innerHTML = menuMarkup();
    });
  }

  function addImportedHero() {
    if (!document.body.classList.contains('home') || document.getElementById('site-imported-hero')) return;
    var pageContent = document.getElementById('qodef-page-content');
    if (!pageContent) return;
    var originalHero = pageContent.querySelector('[data-id="4c023ee"]');
    if (originalHero) originalHero.style.display = 'none';

    var categories = [
      ['Rings', 'Quiet strength', 'tarushi-category-panel-0.png'],
      ['Earrings', 'A little light', 'tarushi-category-panel-1.png'],
      ['Necklaces', 'Fine lines', 'tarushi-category-panel-2.png'],
      ['Bangles', 'Every curve', 'tarushi-category-panel-3.png'],
      ['Pendants', 'Made personal', 'tarushi-category-panel-4.png']
    ];
    var hero = document.createElement('section');
    hero.id = 'site-imported-hero';
    hero.className = 'site-imported-hero';
    hero.innerHTML = '<div class="site-imported-hero__background"></div><div class="site-imported-hero__shade"></div>' +
      '<div class="site-imported-hero__top"><span>Visual discovery</span><span class="site-imported-hero__counter">02 / 05</span></div>' +
      '<button class="site-imported-hero__arrow site-imported-hero__arrow--left" type="button" aria-label="Previous category">←</button>' +
      '<div class="site-imported-hero__content"><span class="site-imported-hero__overline">The everyday extraordinary</span><h1>She shines.<br><em>She conquers.</em></h1><p>Contemporary jewellery for the woman who has already arrived.</p><a class="site-imported-hero__button" href="' + root + 'shop-list-with-baner/index.html">Explore the collection</a></div>' +
      '<button class="site-imported-hero__arrow site-imported-hero__arrow--right" type="button" aria-label="Next category">→</button>' +
      '<div class="site-imported-hero__discovery"><div class="site-imported-hero__cards">' + categories.map(function (category, index) { return '<button class="site-imported-hero__card ' + (index === 1 ? 'is-active' : '') + '" type="button" data-hero-index="' + index + '"><img src="' + heroAssetRoot + category[2] + '" alt="' + category[0] + ' jewellery"><span><small>' + category[1] + '</small><strong>' + category[0] + '</strong></span></button>'; }).join('') + '</div></div>' +
      '<div class="site-imported-hero__bottom"><span>© 2026 Tarushi Jewellery · India</span><span>Made with intention</span></div>';
    pageContent.insertBefore(hero, pageContent.firstChild);
    hero.querySelector('.site-imported-hero__background').style.backgroundImage = 'url("' + heroAssetRoot + 'tarushi-jewellery-hero.png")';

    var activeIndex = 1;
    var cards = hero.querySelector('.site-imported-hero__cards');
    var mobileSlider = window.matchMedia('(max-width: 700px)').matches;
    var mobileHeroPositions = ['62% 78%', '72% 32%', '67% 70%', '64% 78%', '67% 68%'];
    var mobileFocusPositions = ['58% 78%', '78% 34%', '67% 71%', '61% 80%', '69% 66%'];
    var mobileHeroImage = 'url("' + heroAssetRoot + 'tarushi-jewellery-hero.png")';
    var mobileBackground = hero.querySelector('.site-imported-hero__background');
    var activePosition = activeIndex;
    if (mobileSlider) {
      var originalCards = Array.prototype.slice.call(cards.children).map(function (card) { return card.cloneNode(true); });
      cards.innerHTML = '';
      for (var cycle = 0; cycle < 5; cycle += 1) originalCards.forEach(function (card) { cards.appendChild(card.cloneNode(true)); });
      activePosition = categories.length * 2 + activeIndex;
    }
    var update = function (nextIndex) {
      activeIndex = (nextIndex + categories.length) % categories.length;
      activePosition = mobileSlider ? categories.length * 2 + activeIndex : activeIndex;
      var heroCards = hero.querySelectorAll('.site-imported-hero__card');
      heroCards.forEach(function (card, index) { card.classList.toggle('is-active', index === activePosition); });
      hero.querySelector('.site-imported-hero__counter').textContent = String(activeIndex + 1).padStart(2, '0') + ' / 05';
      if (mobileSlider && heroCards[activePosition]) {
        mobileBackground.style.setProperty('--site-mobile-hero-image', mobileHeroImage);
        mobileBackground.style.setProperty('--site-mobile-hero-position', mobileHeroPositions[activeIndex]);
        mobileBackground.style.setProperty('--site-category-focus', mobileFocusPositions[activeIndex]);
        window.requestAnimationFrame(function () {
          var card = heroCards[activePosition];
          var discovery = hero.querySelector('.site-imported-hero__discovery');
          var offset = discovery.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
          cards.dataset.baseOffset = offset;
          cards.style.setProperty('--mobile-track-offset', offset + 'px');
        });
      }
    };
    hero.querySelector('.site-imported-hero__arrow--left').addEventListener('click', function () { update(activeIndex - 1); });
    hero.querySelector('.site-imported-hero__arrow--right').addEventListener('click', function () { update(activeIndex + 1); });
    var suppressCardClick = false;
    hero.querySelectorAll('.site-imported-hero__card').forEach(function (card) { card.addEventListener('click', function () { if (suppressCardClick) { suppressCardClick = false; return; } update(Number(card.dataset.heroIndex)); }); });
    var touchStartX = 0;
    var touchStartY = 0;
    var dragging = false;
    cards.addEventListener('touchstart', function (event) { touchStartX = event.changedTouches[0].clientX; touchStartY = event.changedTouches[0].clientY; dragging = false; cards.style.transition = 'none'; }, { passive: true });
    cards.addEventListener('touchmove', function (event) {
      var dx = event.changedTouches[0].clientX - touchStartX;
      var dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy)) {
        dragging = true;
        suppressCardClick = true;
        event.preventDefault();
        cards.style.transform = 'translateX(' + (parseFloat(cards.dataset.baseOffset || '0') + dx) + 'px)';
      }
    }, { passive: false });
    cards.addEventListener('touchend', function (event) {
      var dx = event.changedTouches[0].clientX - touchStartX;
      var dy = event.changedTouches[0].clientY - touchStartY;
      cards.style.transition = '';
      cards.style.transform = '';
      if (dragging && Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy)) update(activeIndex + (dx < 0 ? 1 : -1));
      else if (mobileSlider) update(activeIndex);
      dragging = false;
    }, { passive: true });
    update(activeIndex);
  }

  function addFaqToContact() {
    if (!/\/contact-us\//.test(window.location.pathname) || document.getElementById('site-contact-faq')) return;
    var pageContent = document.getElementById('qodef-page-content');
    if (!pageContent) return;

    var section = document.createElement('section');
    section.id = 'site-contact-faq';
    section.className = 'site-contact-faq';
    section.innerHTML = '<div class="site-contact-faq__inner">' +
      '<p class="site-eyebrow">Need help?</p>' +
      '<h2>Frequently asked questions</h2>' +
      '<p class="site-contact-faq__intro">Find quick answers about ordering, delivery, returns and gift cards. If you need anything else, our team is happy to help.</p>' +
      '<div class="site-faq-list">' +
      faqItem('How Can I Order?', 'Browse our products, open the item you love, choose your quantity, and select Add to Cart. You can review your order in the cart before checkout.') +
      faqItem('Do you ship internationally?', 'Yes. We ship internationally. Delivery times and shipping charges are shown during checkout and may vary by destination.') +
      faqItem('How do I return or exchange my order?', 'Please contact us with your order number and reason for the return. Our team will guide you through the return or exchange process.') +
      faqItem('How Do I Know If My Order Went Through?', 'You will see an order confirmation after checkout and receive a confirmation email with your order details.') +
      faqItem('Can I Change My Order?', 'Contact us as soon as possible after placing your order. We will do our best to make changes before it is processed.') +
      faqItem('How To Use Gift Cards?', 'Choose Gift Card from the menu to learn more, then enter your gift card details at checkout when placing an order.') +
      faqItem('What is your return policy?', 'Items must be returned in their original condition. Contact us before sending anything back so we can confirm the next steps.') +
      faqItem('Do you have order tracking?', 'When tracking is available, your shipping confirmation will include the tracking information.') +
      faqItem('What are your payment methods?', 'Available payment methods are shown securely at checkout and may vary depending on your location.') +
      '</div></div>';
    pageContent.insertBefore(section, pageContent.firstChild);

    section.querySelectorAll('.site-faq-question').forEach(function (question) {
      question.addEventListener('click', function () {
        var item = question.parentElement;
        var open = item.classList.contains('is-open');
        section.querySelectorAll('.site-faq-item').forEach(function (other) { other.classList.remove('is-open'); });
        if (!open) item.classList.add('is-open');
      });
    });
  }

  function faqItem(question, answer) {
    return '<div class="site-faq-item"><button class="site-faq-question" type="button"><span>' + question + '</span><span class="site-faq-plus" aria-hidden="true">+</span></button><div class="site-faq-answer"><p>' + answer + '</p></div></div>';
  }

  function addProductControls() {
    if (!document.body.classList.contains('single-product') || !document.body.classList.contains('qodef-product-layout--big_images')) return;
    var summary = document.querySelector('.summary.entry-summary');
    if (!summary || document.getElementById('site-product-cart')) return;
    var controls = document.createElement('div');
    controls.id = 'site-product-cart';
    controls.className = 'site-product-cart';
    controls.innerHTML = '<div class="site-quantity" role="group" aria-label="Quantity"><button type="button" class="site-quantity__button" data-step="-1" aria-label="Decrease quantity">−</button><input class="site-quantity__input" type="number" min="1" value="1" aria-label="Quantity"><button type="button" class="site-quantity__button" data-step="1" aria-label="Increase quantity">+</button></div><button type="button" class="site-add-to-cart">Add to Cart</button>';
    var description = summary.querySelector('.woocommerce-product-details__short-description');
    (description || summary.firstElementChild).insertAdjacentElement('afterend', controls);
    controls.querySelectorAll('.site-quantity__button').forEach(function (button) {
      button.addEventListener('click', function () {
        var input = controls.querySelector('.site-quantity__input');
        input.value = Math.max(1, parseInt(input.value || '1', 10) + parseInt(button.dataset.step, 10));
      });
    });
    controls.querySelector('.site-add-to-cart').addEventListener('click', function () {
      var link = document.createElement('a');
      link.href = root + 'cart/index.html';
      link.click();
    });
  }

  function replaceBrandCopy() {
    var substitutions = {
      'Ascella': 'Tarushi',
      'Shop List With Baner': 'The Tarushi Collection',
      'Sale up to 40%': 'Grace, earned.',
      'Free express worldwide shipping.': 'Everyday gold. Timeless victory.',
      'Why’s it called Aureum beauty': 'Why Tarushi?',
      'Eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc.': 'Tarushi is jewellery for the woman who knows her worth and wears her achievements with grace.',
      'Suscipit adipiscing bibendum est ultricies. Lobortis mattis aliquam faucibus purus in massa. Sit amet mattis vulputate enim nulla aliquet.': 'Our gold-plated pieces carry the warmth of legacy and ritual, while our silver-plated pieces move effortlessly through the everyday.',
      'Dictum sit amet justo donec enim. Nunc vel risus commodo viverra maecenas. Lobortis mattis aliquam faucibus purusinus. Nunc eget lorem dolor sed viverra.': 'Like a lotus rising into radiance, every piece mirrors the strength and grace she has earned.',
      'Lorem Ipsum estibulum blandit libero at mauris condimentum scelerisque. In scelerisque in mauris.': 'Pieces that move with her from quiet mornings to luminous celebrations.'
    };
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].indexOf(node.parentElement.tagName) !== -1) continue;
      Object.keys(substitutions).forEach(function (from) {
        if (node.nodeValue.indexOf(from) !== -1) node.nodeValue = node.nodeValue.split(from).join(substitutions[from]);
      });
    }
  }

  function removeGaurHarmony() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].indexOf(node.parentElement.tagName) !== -1) continue;
      if (/gaur\s+harmony/i.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(/gaur\s+harmony/ig, '');
        if (!node.nodeValue.trim() && node.parentElement) node.parentElement.style.display = 'none';
      }
    }
  }

  function removePartnerSection() {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(function (heading) {
      if (/^\s*our\s+partners\s*$/i.test(heading.textContent || '')) {
        var section = heading.closest('section');
        if (section) section.style.display = 'none';
      }
    });
  }

  function removeFooterEmail() {
    document.querySelectorAll('a, p, span, div, li').forEach(function (element) {
      var text = (element.textContent || '').trim();
      if (/^[\w.+-]+@(?:example\.com|tarushi\.com)$/i.test(text) && element.children.length === 0) {
        var footer = element.closest('.qodef-page-footer, footer');
        var widget = element.closest('.widget');
        (widget || footer && element.parentElement || element).style.display = 'none';
      }
    });
  }

  function standardizeShopButtons() {
    document.querySelectorAll('a, button').forEach(function (element) {
      var label = (element.textContent || '').trim().replace(/\s+/g, ' ').toLowerCase();
      if (label === 'shop now' || label === 'shop more') element.classList.add('site-standard-shop-button');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateNavigation();
    addImportedHero();
    addFaqToContact();
    addProductControls();
    replaceBrandCopy();
    removeGaurHarmony();
    removePartnerSection();
    removeFooterEmail();
    standardizeShopButtons();
  });
}());
