/*global document, window, yall, setTimeout, Swiper, createElementWithClass, createRatingsHtmlElement, Cookies, semanticTabs, Image, Shopify, Event, getComputedStyle, CustomEvent, enquire, IntersectionObserver, MutationObserver */
/*//jshint esversion: 6 */
if (typeof html_tag == undefined) { let html_tag = document.documentElement } else { html_tag = document.documentElement }
if (typeof root_styles == undefined) { let root_styles = document.querySelector(':root') } else { root_styles = document.querySelector(':root') }
if (typeof top_id == undefined) { let top_id = document.querySelector('.shopify-section-header') } else { top_id = document.querySelector('.shopify-section-header') }
let nav_top_id = document.querySelector('#nav-top');
if (typeof header_outer == undefined) { let header_outer = document.querySelector('#header-outer') } else { header_outer = document.querySelector('#header-outer') }
let header_id = header_outer.querySelector('#header');
if (typeof header_inner == undefined) { let header_inner = document.querySelector('#header-inner') } else { header_inner = document.querySelector('#header-inner') }
let logo_id = document.querySelector('#logo');
let logo_img = logo_id.querySelector('img');
let search_id = document.querySelector('#search');
let nav_outer = document.querySelector('#nav-outer');
let nav_bar_id = document.querySelector('#nav-bar');
let nav_id = document.querySelector('#nav');
if (typeof content_id == undefined) { let content_id = document.getElementById('content') } else { content_id = document.getElementById('content') }


let html_width = html_tag.getBoundingClientRect().width;
let nav_main = nav_bar_id ?? nav_id;

let global_dir;
if (html_tag.getAttribute('dir') === 'rtl') {
	global_dir = ['rtl', false];
} else {
	global_dir = ['ltr', true];
}

function isTouchDevice() {
	'use strict';
	return window.matchMedia("(pointer: coarse)").matches;
}

const isMobile = window.mobileCheck() || isTouchDevice();

var listCollectionSliderEvt = new CustomEvent("listCollectionSlider"),
	announcementSliderEvt = new CustomEvent("announcementSlider"),
	moduleFeaturedSliderEvt = new CustomEvent("moduleFeaturedSlider"),
	listProductSliderEvt = new CustomEvent("listProductSlider"),
	listUspSliderEvt = new CustomEvent("listUspSlider"),
	listTestimonialsSliderEvt = new CustomEvent("listTestimonialsSlider"),
	listStaticSliderEvt = new CustomEvent("listStaticSlider"),
	searchClassesEvt = new CustomEvent("searchClasses"),
	createColsEvt = new CustomEvent("createCols"),
	moduleTabsEvt = new CustomEvent("moduleTabs"),
	formZindexEvt = new CustomEvent("formZindex"),
	ratingsEvt = new CustomEvent("ratings"),
	inputPaddingEvt = new CustomEvent("inputPadding"),
	topEvt = new CustomEvent("top"),
	backgroundEvt = new CustomEvent("background"),
  lazyVideoEvt = new CustomEvent("lazyVideo"),
  mediaFlexibleEvt = new CustomEvent("mediaFlexbile"),
	setCustomDropHeightEvt = new CustomEvent("setCustomDropHeight");

function isHasSelectorSupported() {
	const testElement = document.createElement('div');
	try {
		testElement.querySelector(':has(*)');
		return true;
	} catch (error) {
		return false;
	}
}
function getSiblings(el) {
	'use strict';
	return Array.from(el.parentNode.children).filter(function (sibling) {
		return sibling !== el;
	});
}

function append_url(el, content, className, href, access) {
	'use strict';
	const link = createElementWithClass('a', className);
  link.href = href || './';
	if (access === true) {
		link.setAttribute('tabindex', -1);
		link.setAttribute('aria-hidden', true);
		link.setAttribute('focusable', false);
	}
	link.innerHTML += content;
	if (el) {
		el.appendChild(link);
	}
}

function wrap(el, wrapper, className) {
	'use strict';
	el.parentNode.insertBefore(wrapper, el);
	if (className) {
		wrapper.classList.add(className);
	}
	wrapper.appendChild(el);
}

function new_css(id, href, media) {
	"use strict";
	if (!document.getElementById(id)) {
		const a = document.createElement('link');
		if (media === undefined) {
			media = 'screen';
		}
		a.setAttribute('id', id);
		a.setAttribute('rel', 'stylesheet');
		a.setAttribute('href', href);
		a.setAttribute('media', media);
		a.setAttribute('id', id);

		const b = document.querySelectorAll('link[id]');
		if (b.length) {
			Array.from(b).forEach(function (el) {
				el.after(a);
			});
		} else {
			document.head.appendChild(a);
		}
	}
}

function customDropHeight() {
	'use strict';
	if (nav_main) {
		const HH_req = ['.m6fr.wide-transparent', '.m6fr.size-xl', '.m6fr article.size-xl'];
		const hasHH = HH_req.some(selector => document.querySelector(selector));

		if (hasHH) {
			requestAnimationFrame(function () {
				if (header_outer && header_inner) {
					const headerHeight = header_outer.getBoundingClientRect().height + 'px';
					root_styles.style.setProperty('--header_height_static', headerHeight);
				}
				if (nav_top_id) {
					const nav_top_idHeight = nav_top_id.getBoundingClientRect().height + 'px';
					root_styles.style.setProperty('--nav_top_h', nav_top_idHeight);
				}
			});
		}
	}
}

let stickyOffsetCalculated = false;
function stickyOffset() {
	if (!stickyOffsetCalculated && nav_main) {
		const SO_req = ['.m6pr', '[id^="section-"]', '.f8ps', '.f8sr', '.m6cl'];
		if (header_outer && header_inner) {
			let headerHeight;

			if (SO_req.some(selector => document.querySelector(selector))) {
				const setStickyOffset = () => {
					const height = header_outer.getBoundingClientRect().height + 'px';
					root_styles.style.setProperty('--sticky_offset', height);
				};

				if (header_inner.classList.contains('sticky-nav')) {
					html_tag.classList.add('has-sticky-nav');
					enquire.register('screen and (max-width: 1000px)', function () {
						setStickyOffset();
					}).register('screen and (min-width: 1001px)', function () {
						const nav_mainHeight = nav_main.getBoundingClientRect().height + 'px';
						root_styles.style.setProperty('--sticky_offset', nav_mainHeight);
					});
				} else {
					setStickyOffset();
				}
			}
		}
		stickyOffsetCalculated = true;
	}
}

if (!isMobile) {
	document.addEventListener('mouseover', stickyOffset);
}
document.addEventListener('keyup', stickyOffset);
document.addEventListener('touchstart', stickyOffset);
document.addEventListener('scroll', stickyOffset);
window.addEventListener('resize', () => {
	stickyOffsetCalculated = false;
	stickyOffset();
});

setTimeout(function () {
	'use strict';
	customDropHeight();
}, 100);
window.addEventListener('resize', function () {
	'use strict';
	customDropHeight();
	if (header_outer && header_inner) {
		requestAnimationFrame(function () {
			//setTimeout(function () {
			//const header_outerHeight = header_outer.clientHeight + 'px';
			const header_outerHeight = header_outer.getBoundingClientRect().height + 'px';
			root_styles.style.setProperty('--header_height_static', header_outerHeight);
			//}, 500);
		});
	}
});
window.addEventListener("setCustomDropHeight", function(evt) {
	customDropHeight();
});

// delay scrollbar width
let scrollbarWidthCalculated = false;

function getScrollbarWidth() {
	'use strict';

	const SB_req = [".m6bx.wide", ".m6fr.wide", ".l4ft.fullwidth", ".shopify-section-breadcrumbs"];

	if (!scrollbarWidthCalculated && SB_req.some(selector => document.querySelector(selector))) {
		root_styles.style.setProperty('--scrollbar_width', window.innerWidth - html_tag.getBoundingClientRect().width + 'px');
		scrollbarWidthCalculated = true;
	}
}

if (!isMobile) {
	document.addEventListener('mouseover', getScrollbarWidth);
}
document.addEventListener('keyup', getScrollbarWidth);
document.addEventListener('touchstart', getScrollbarWidth);
document.addEventListener('scroll', getScrollbarWidth);

if (logo_img) {
	if (logo_img.complete) {
		customDropHeight();
	} else {
		logo_img.addEventListener('load', customDropHeight);
	}
} else {
	customDropHeight();
}

if (header_inner) {
	if (header_inner.classList.contains('mobile-visible-search')) {
		html_tag.classList.add('has-mobile-visible-search');
	}
	if (header_inner.classList.contains('t1nn')) {
		html_tag.classList.add('t1nn');
	}
}

if (content_id && header_inner) {
	const ffa = content_id.children[0];
	let ffc;
	let ffd = false;
	let ffe = false;


	if (ffa) {
		ffc = ffa.children[0];
		if (ffa.classList.contains('shopify-section') && header_inner.hasAttribute('data-transparent')) {
			ffd = true;
		}

		if (ffc && (ffc.classList.contains('m6bx') || ffc.classList.contains('m6fr')) && ffc.classList.contains('wide')) {
			ffe = true;
			ffc.classList.add('im-tr');
		}
		const announcementBar = document.querySelector('.shopify-section-header ~ [class*="shopify-section-announcement-bar"]');
		if (announcementBar) {
			ffd = false;
		}
		if (ffd && ffe && ffc && ffc.classList.contains('wide-transparent')) {
			top_id.classList.add('transparent');
			html_tag.classList.add('has-first-m6fr-wide');
			if (ffc.classList.contains('m6bx')) {
				html_tag.classList.add('has-first-m6bx-wide');
			}
		} else {
			header_inner.classList.remove('transparent');
		}
	}
}

function create_slider(el, settings, minSlides) {
	'use strict';
	var sliderElement = el,
		items,
		paginationClass,
		dots,
		dots_cont,
		prev,
		next,
		bg = false,
		imgOverlays = [],
		child;
    if (el.getElementsByClassName('img-overlay').length) {
      Array.from(el.children).forEach(function (child) {
        if (child.classList.contains('img-overlay')) {
          bg = true;
          imgOverlays.push(child);
          child.remove();
        }
      });
    }

	if (el.children.length > 1) {
		if (el.tagName.toLowerCase() === "ul") {
			el.setAttribute('role', 'none');
			Array.from(el.children).forEach(child => {
				child.setAttribute('role', 'none');
				child.classList.add('li');
			});
		}

		items = sliderElement.children;

		if (!minSlides) {
			minSlides = 1;
		}
		if (items.length > parseFloat(minSlides)) {
			// if pagination class is different from default value (swiper-pagination), creates pagination element with correct class
			paginationClass = (settings && settings.pagination && settings.pagination.el) || ".swiper-pagination";
			paginationClass = paginationClass.replace(/\./g, " ").trim();

			dots = createElementWithClass('span', paginationClass);
			prev = createElementWithClass('span', 'swiper-button-prev');
			next = createElementWithClass('span', 'swiper-button-next');
			sliderElement.classList.add('s4wi');

      prev.classList.add('swiper-button-nav');
			next.classList.add('swiper-button-nav');
			prev.setAttribute('role', 'button');
			next.setAttribute('role', 'button');

      Array.from(items).forEach(el => wrap(el, document.createElement('div'), 'swiper-slide'));

			sliderElement.innerHTML = '<div class="swiper-outer"><div class="swiper-wrapper">' + sliderElement.innerHTML + '</div></div> <div class="swiper-custom-pagination"></div>';
			dots_cont = sliderElement.querySelector('.swiper-custom-pagination');
			if (settings && settings.pagination) {
				settings.pagination.el = settings.pagination.el || "." + paginationClass;
				// dots_cont.appendChild(prev);
				// dots_cont.appendChild(dots);
				// dots_cont.appendChild(createElementWithClass('span', 'swiper-custom-fraction'));
				// dots_cont.appendChild(next);
        dots_cont.append(prev, dots, createElementWithClass('span', 'swiper-custom-fraction'), next);

			} else {
				// sliderElement.appendChild(prev);
				// sliderElement.appendChild(next);
        sliderElement.append(prev, next);
			}

			return new Swiper(sliderElement.children[0], settings);
		}
	}
	if (bg = true) {
		imgOverlays.forEach(function (imgOverlay) {
			el.appendChild(imgOverlay);
		});
	}
	return null;
}

function randomize(el) {
	'use strict';
	el.setAttribute('data-random', Math.floor(Math.random() * 10000) + 1);
}

function clone_with_class(el, cl1, cl2) {
	'use strict';
  const cln = el.cloneNode(true);
	cln.classList.add(cl1);
	el.after(cln);
	el.classList.add(cl2);
}

function new_js(el) {
	'use strict';
	var tag = document.createElement('script');
	tag.src = el;
	document.body.appendChild(tag);
}

function checkIfImageExists(url, callback) {
	'use strict';
	const img = new Image();

	img.onload = () => callback(true);
	img.onerror = () => callback(false);

	img.src = url;
	if (img.complete) {
		img.onload();
	}
}

function assignIndex(elements) {
	'use strict';
	Array.from(elements).forEach((el, index) => {
		el.style.zIndex = elements.length - index;
	});
}

//Default.utils.start();
html_tag.classList.add('js');

//Default.utils.email();

//Default.utils.top();
window.addEventListener("top", function (evt) {
	if (logo_id) {
		const logo_text = logo_id.querySelectorAll('span');
		if (logo_id.parentElement.classList.contains('text-center-logo') && !header_inner.classList.contains('hide-btn')) {
			search_id.classList.add('compact');
		}
		if (logo_text.length) {
			header_inner.classList.add('logo-text');
		}
		const imgWithAlt = logo_id.querySelector('img[alt]');

		if (imgWithAlt) {
			const pt = imgWithAlt.parentNode;

			checkIfImageExists(imgWithAlt.getAttribute('src'), exists => {
				if (!exists) {
					const span = document.createElement('span');
					span.innerHTML = imgWithAlt.getAttribute('alt');
					pt.appendChild(span);
					pt.classList.add('broken-img');
				}
			});
		}
	}

	function calcLogoOffset() {
		if (header_id && logo_id && header_inner.classList.contains('text-center-logo')) {
			const header_width = header_id.getBoundingClientRect().width;
			root_styles.style.setProperty('--logo_offset', logo_id.offsetLeft / header_width * 100 + '%');
		}
	}

	if (nav_id?.classList.contains('no-wide')) {
		top_id.classList.add('has-no-wide');
	}

	if (nav_bar_id?.classList.contains('no-wide')) {
		top_id.classList.add('has-no-wide');
	}

	var navs = document.querySelectorAll('#nav, #nav-bar');

	function throttle(callback, delay) {
		let timeoutId;
		return function () {
			if (!timeoutId) {
				timeoutId = setTimeout(() => {
					callback();
					timeoutId = null;
				}, delay);
			}
		};
	}

	function checkInv(el, ratio) {
		"use strict";
		const el_rect = el.getBoundingClientRect();
		const el_off = global_dir[1] === false ? window.innerWidth - el_rect.left - el.offsetWidth : el_rect.left;
		if (el_off > window.innerWidth * ratio) {
			el.classList.add('inv');
		} else {
			el.classList.remove('inv');
		}
	}

	function countNavDist(el, em, nav) {
		const nav_id_offset = 0;
		const d = el.dataset.copy;
		const f = nav.querySelector(`.show-all li[data-copy="${d}"]`);

		if (el.classList.contains('temp-hidden')) {
			el.classList.remove('temp-hidden');
			if (f) {
				f.classList.remove('temp-hidden');
			}
		}

		const jf = el.getBoundingClientRect().width;
		const el_off = (global_dir[1] === false) ? nav.getBoundingClientRect().width - el.offsetLeft - el.getBoundingClientRect().width - nav_id_offset : el.offsetLeft - nav_id_offset;
		const el_tr = el.parentElement.querySelectorAll('.temp-hidden:not(.show-all)').length > 0 ? 1.2 : 0;

		if (nav.getBoundingClientRect().width < el_off + el.getBoundingClientRect().width + jf + em * el_tr) {
			el.classList.add('temp-hidden');
			if (f) {
				f.classList.add('temp-hidden');
			}
		} else {
			el.classList.remove('temp-hidden');
			if (f) {
				f.classList.remove('temp-hidden');
			}
		}
	}

	function countNavDistF(el, em, en, nav) {
		enquire.register('screen and (min-width: 1001px)', function () {
			let mdf;
			const mdm = Math.abs(parseFloat(getComputedStyle(el).getPropertyValue('margin-right')));

			if ((nav.classList.contains('text-justify') || nav.classList.contains('have-text-justify')) && !isNaN(mdm)) {
				mdf = mdm;
			} else {
				mdf = 0;
			}
			const replaceTextClass = (originalClass, replacementClass) => {
				if (nav.classList.contains(originalClass)) {
					nav.classList.remove(originalClass);
					nav.classList.add(replacementClass);
				}
			};
			if (!(el.clientWidth > nav.clientWidth + mdf)) {
				//html_tag.classList.remove('has-long-nav');

				replaceTextClass('have-text-center', 'text-center');
				replaceTextClass('have-text-justify', 'text-justify');
				replaceTextClass('have-text-end', 'text-end');
			} else {
				//html_tag.classList.add('has-long-nav');

				replaceTextClass('text-center', 'have-text-center');
				replaceTextClass('text-justify', 'have-text-justify');
				replaceTextClass('text-end', 'have-text-end');

				if (em.length) {
					en = em[0].getBoundingClientRect().width;
				}
				const children = Array.from(el.children);

				const handleResize = () => {
					children.forEach(eo => {
						countNavDist(eo, en, nav);
					});
				};
				handleResize();
				window.addEventListener('resize', throttle(handleResize, 200));
			}
		});
	}

	if (navs.length) {
		if (nav_outer) {
			top_id.classList.add('has-nav-outer');
		}
		Array.from(navs).forEach(function (nav_main) {
			if (nav_main.closest('#header-inner') !== null) {
				html_tag.classList.add('has-inside-nav');
				// search_id.classList.add('compact');
			} else {
				html_tag.classList.remove('has-inside-nav');
			}

			var nmu = nav_main.querySelector('[data-type]'),
				nml,
				nms = 0,
				nmt,
				nmv = nav_main.getElementsByClassName('sub-static'),
				all_submenu;

			if (nmu !== undefined) {
				nml = nmu.querySelectorAll('li.show-all');

				Array.from(nmu.children).forEach(function (el, index) {
					el.setAttribute('data-copy', nmu.children.length - index);
				});

				if (nml.length) {
					all_submenu = createElementWithClass('ul', 'show-all-submenu');
					nml[0].appendChild(all_submenu);
					nmt = nml[0].closest('ul').children;
					Array.from(nmt).forEach(function (el) {
						var clone_me = el.cloneNode(true);
						nml[0].querySelectorAll('.show-all-submenu')[0].appendChild(clone_me);
						Array.from(nml[0].querySelectorAll('.show-all-submenu')[0].querySelectorAll('.sub-static')).forEach(function (el) {
							el.remove();
						});
					});


					const logo_img = logo_id.querySelector('img');

					function logoLoad() {
						calcLogoOffset();
						countNavDistF(nmu, nml, nms, nav_main);
						top_id.classList.add('ready');
						header_id.classList.add('ready');
					}
					if (nav_outer) {
						calcLogoOffset();
						//setTimeout(function () {
						setTimeout(function () {
							if (logo_img) {
								if (logo_img.complete) {
									logoLoad();
								} else {
									logo_img.addEventListener('load', logoLoad);
								}
							} else {
								// html_tag.classList.add('has-long-nav');
								countNavDistF(nmu, nml, nms, nav_main);
								top_id.classList.add('ready');
								header_id.classList.add('ready');
							}
						}, 250);
						//}, 250);
					} else {
						setTimeout(function () {
							countNavDistF(nmu, nml, nms, nav_main);
							header_outer.classList.add('ready');
						}, 250);
					}

					window.addEventListener('resize', throttle(() => {
						calcLogoOffset();
						// html_tag.classList.add('has-long-nav');
						header_outer.classList.remove('ready');
						countNavDistF(nmu, nml, nms, nav_main);
						header_outer.classList.add('ready');
					}, 200));

					if (nav_main.closest('#header-inner') !== null && nav_main.closest('#header-inner').classList.contains('sticky-nav')) {
						function callback(mutationList, observer) {
							mutationList.forEach(function (mutation) {
								if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
									var temp_hidden = nav_main.getElementsByClassName('temp-hidden');
								}
							});
						}
						const observer = new MutationObserver(callback);
						observer.observe(nav_main, {
							attributes: true
						});
					}
				}
				if (nmv.length) {
					function executeCheckInv() {
						if (!checkInvExecuted) {
							Array.from(nmv).forEach(function (el) {
								//if (!el.classList.contains('show-all')) {
								checkInv(el, 0.5);
								//}
							});
						}
					}
					let checkInvExecuted = false;

					document.addEventListener('mouseover', function () {
						if (!checkInvExecuted) {
							executeCheckInv();
							checkInvExecuted = true;
						}
					});

					window.addEventListener('resize', () => {
						checkInvExecuted = false;
						executeCheckInv();
					});
				}
			}
		});
	}

	if (search_id && header_inner) {
		// if (!isHasSelectorSupported()) {
			if (search_id.classList.contains('no-bg') && !search_id.classList.contains('bd-b')) {
				top_id.classList.add('no-bd-m');
			}
			if (search_id.classList.contains('no-bg')) {
				top_id.classList.add('no-bd');
			}
			if (search_id.classList.contains('no-pd-t')) {
				top_id.classList.add('no-pd-t');
			}
		// }
		if (!search_id.classList.contains('compact') && header_inner.classList.contains('hide-btn') && header_inner.classList.contains('text-center-logo')) {
			search_id.classList.add('not-compact');
			if (search_id.classList.contains('not-compact')) {
				enquire.register('screen and (max-width: 1000px)', function () {
					search_id.classList.add('compact');
				}).register('screen and (min-width: 1001px)', function () {
					search_id.classList.remove('compact');
				});
			}
		}
	}

	// If #nav exists, create a #nav-top for mobile menu
	/*if (nav_id && nav_top_id && !nav_id.querySelectorAll('ul.nav-top').length) {
        Array.from(nav_top_id.querySelectorAll('ul[data-type]')).forEach(function (el) {
            var clone_me = el.cloneNode(true);
            clone_me.classList.add('nav-top');
            nav_id.appendChild(clone_me);
        });
    }*/

	// Detect empty URLs
	if (nav_main) {
		Array.from(nav_main.querySelectorAll('a[href="#"]')).forEach(el => {
			const parent = el.parentElement;
			if (parent) {
				parent.classList.add('empty-url');
			}
		});
	}

	// Searchbox
	if (search_id) {
		if (search_id.classList.contains('compact-handle')) {
			html_tag.classList.add('t1sh-mobile', 'search-compact-handle');
		} else {
			html_tag.classList.remove('t1sh-mobile', 'search-compact-handle');
		}
		if (search_id.classList.contains('compact-handle-mobile')) {
			html_tag.classList.add('t1sh-mobile', 'search-compact-handle', 'search-compact-handle-mobile');
		} else {
			html_tag.classList.remove('search-compact-handle-mobile');
		}
		if (search_id.classList.contains('compact')) {
			if (search_id.classList.contains('compact-handle')) {
				html_tag.classList.add('t1sh');
			} else {
				html_tag.classList.remove('t1sh');
			}
			html_tag.classList.add('t1sr');
		} else {
			html_tag.classList.remove('t1sr', 't1sh');
		}
		if (search_id.classList.contains('text-center-sticky')) {
			html_tag.classList.add('search-compact-is-centered');
		} else {
			html_tag.classList.remove('search-compact-is-centered');
		}
	}
});
window.dispatchEvent(topEvt);

var breadcrumb_back = document.querySelectorAll('.breadcrumb-back');
if (breadcrumb_back.length) {
	Array.from(breadcrumb_back).forEach(function (el) {
		if (document.referrer.indexOf(window.location.host) !== -1) {
			el.addEventListener('click', function (e) {
				history.go(-1); return false;
			})
		}
		else { el.remove(); }
	})
}

//Default.utils.forms();
var select_tag = document.getElementsByTagName('select');
window.addEventListener("formZindex", function (evt) {
	// Assign z-indexes to form elements
	// :placeholder-like support for <select> element
	Array.from(select_tag).forEach(el => {
		const parentNode = el.parentNode;
		const closestParagraph = el.closest('p');

		parentNode.classList.add('has-select');
		if (closestParagraph) {
			closestParagraph.classList.add('has-select');
		}

		el.addEventListener('change', () => {
			el.classList.add('changed');
		});
	});

	let handleFormChildrenCalculated = false;
	function handleFormChildren() {
		if(!handleFormChildrenCalculated){
			var formChildren = document.querySelectorAll('form > *, fieldset > *, .no-zindex, .no-zindex > *, .has-select, .f8pr > *, .l4ca.compact.in-panel > *, .l4cl.box > li, .f8pr-bulk > *');
			if (formChildren.length) {
				assignIndex(formChildren);
			}
			handleFormChildrenCalculated = true;
		}
	}
	if (!isMobile) {
		document.addEventListener('mouseover', handleFormChildren);
	}
	document.addEventListener('keyup', handleFormChildren);
	document.addEventListener('touchstart', handleFormChildren);
	document.addEventListener('scroll', handleFormChildren);
	window.addEventListener('resize', handleFormChildren);
});
window.dispatchEvent(formZindexEvt);

window.addEventListener("inputPadding", function (evt) {
	setTimeout(function () {
		function applyPadding(elements, property) {
			Array.from(elements).forEach(function (el) {
				var c = el.nextElementSibling;
				c.style[property] = el.offsetWidth + 'px';
			});
		}

		// Padding for ".input-prefix" element
		applyPadding(document.querySelectorAll('.input-prefix > span:first-child'), global_dir[1] === false ? 'paddingRight' : 'paddingLeft');

		// Padding for ".input-suffix" element
		applyPadding(document.querySelectorAll('.input-suffix > span:first-child'), global_dir[1] === false ? 'paddingLeft' : 'paddingRight');
	}, 500);
});
setTimeout(function () {
	window.dispatchEvent(inputPaddingEvt);
}, 500);

window.check_limit_event = function() {
	var check_limit = document.querySelectorAll('.check[data-limit]');
	if (check_limit.length) {
		Array.from(check_limit).forEach(function (el) {
			if (!el.classList.contains('check-limit-initialized')) {
				el.classList.add('check-limit-initialized');
				var tag_limit = 'a',
					limit,
					trigger,
					nextAll = false,
					lastDesc;
				if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
					tag_limit = 'li';
				}
				limit = createElementWithClass(tag_limit, 'limit');
				trigger = el.children[el.dataset.limit - 1];

				if (trigger !== undefined) {
					nextAll = [].filter.call(trigger.parentNode.children, function (htmlElement) {
						return (htmlElement.previousElementSibling === trigger) ? nextAll = true : nextAll;
					});
					nextAll.forEach(function (em) {
						if (!em.classList.contains('hidden')) {
							em.classList.add('hidden-check');
						}
					});
					limit.innerText = '+' + Math.abs(el.querySelectorAll('li:not(.hidden, .tip-cont)').length - el.dataset.limit);
					if (tag_limit = 'li') {
						limit.innerHTML = '<a href="./">' + limit.innerHTML + '</a>';
					}
					el.append(limit);
					lastDesc = el.querySelector('li.hidden');
					if (lastDesc) {
						el.appendChild(lastDesc);
					}
					Array.from(el.querySelectorAll('a.limit, .limit a')).forEach(function (em) {
						em.addEventListener('click', function (e) {
							el.classList.add('limit-clicked');
							e.preventDefault();
						});
					});
				}
			}
		});
	}
};
check_limit_event();

//Default.utils.footer();
// Change the position of background element (just for security)
window.addEventListener("background", function(evt) {
	// Change the position of background element (just for security)
	if (document.querySelector('#background.done')) {
		document.querySelector('#background.done').remove();
	}
	const background_id = document.getElementById('background');
	if (background_id && !background_id.classList.contains('static') && (background_id.parentNode.id === 'content' || background_id.parentNode.classList.contains('shopify-section'))) {
		document.getElementById('root').appendChild(background_id);
		background_id.classList.add('done');
	}
});
window.dispatchEvent(backgroundEvt);

//Default.utils.tabs();
// Create tabs
window.addEventListener("moduleTabs", function(evt) {
	var tabs_holder = document.querySelectorAll('#content, .m6pn');
	if (tabs_holder.length) {
		Array.from(tabs_holder).forEach(function (el) {
			const module_tabs = el.getElementsByClassName('m6tb');
			if (module_tabs.length) {
				Array.from(module_tabs).forEach(function (el) {
					if (typeof semanticTabs === 'function' && !el.classList.contains('tabs-initialized')) {
						semanticTabs(el);
					}
					el.classList.add('tabs-initialized');
				});
			}
		});
	}
});
window.dispatchEvent(moduleTabsEvt);

//Default.utils.swipers();
var list_testimonials, list_static, popup_a, list_collection_slider;
window.addEventListener("moduleFeaturedSlider", function(event) {
	const module_featured = document.querySelectorAll('.m6fr:not(.s4wi)');
	if (module_featured.length) {
		Array.from(module_featured).forEach(function (el) {
			var pagination_type = 'bullets',
				autoplay_int = false,
				total_sl = el.children.length,
				featuredSlider;
			el.querySelectorAll('figure').forEach(function (em) {
				if (em.getElementsByTagName('picture').length > 1) {
					em.classList.add('has-pics');
				}
			});
			if (el.classList.contains('slider-fraction')) {
				pagination_type = 'fraction';
			}
			if (el.getAttribute('data-autoplay')) {
				autoplay_int = {
					delay: parseFloat(el.getAttribute('data-autoplay')),
					pauseOnMouseEnter: true
				};
			}
			randomize(el);
			const randomId = el.getAttribute('data-random');
			featuredSlider = create_slider(el, {
				direction: 'horizontal',
				loop: true,
				autoHeight: true,
				resizeObserver: true,
				autoplay: autoplay_int,
				threshold: 50,
				pagination: {
					el: '.swiper-pagination-' + randomId,
					clickable: true,
					type: pagination_type,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + "<span class='prg'></span></span>";
					},
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							' <span class="slash">/</span> ' +
							'<span class="' + totalClass + '"></span>';
					}
				},
				navigation: {
					nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
					prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
				},
				on: {
					afterInit: function (swiper) {
						updateSwiper(swiper);
					},
					slideChangeTransitionStart: function (swiper) {
						updateSwiper(swiper);
						if (el.classList.contains('is-first-m6fr-wide') && html_tag.classList.contains('has-first-m6fr-wide') && !html_tag.classList.contains('has-first-flexbile-wide')) {
							var active_content = swiper.el.querySelectorAll('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > article')[0];
							if (typeof active_content !== 'undefined') {
								el.setAttribute('data-active-content', active_content.getAttribute('data-color-palette'));
							}
							var palette = active_content.getAttribute('data-color-palette');
							root_styles.style.setProperty('--transparent_header_fg', 'var(--' + palette.replace('_gradient', '') + '_fg)');
							root_styles.style.setProperty('--transparent_header_bg', 'var(--' + palette + '_bg)');
							root_styles.style.setProperty('--transparent_header_btn_bg', 'var(--' + palette.replace('_gradient', '') + '_btn_bg)');
							root_styles.style.setProperty('--transparent_header_btn_fg', 'var(--' + palette.replace('_gradient', '') + '_btn_fg)');
							if (palette.includes('white') || palette.includes('light')) {
								root_styles.style.setProperty('--transparent_header_bd', 'var(--header_border_color_light)');
							} else {
								root_styles.style.setProperty('--transparent_header_bd', 'var(--header_border_color_dark)');
							}
						}
					},
					resize: function (swiper) {
						if (typeof Shopify !== 'undefined' && Shopify.designMode) {
							Array.from(featuredSlider.slides).forEach(function () {
								featuredSlider.slideNext(0);
							});
						}
						setTimeout(function () {
							featuredSlider.updateAutoHeight();
						}, 500);

					}
				}

			});
			function updateSwiper(swiper) {
				Array.from(el.querySelectorAll('.swiper-slide > article.aside')).forEach(em => {
					em.parentNode.classList.add('has-aside');
				});
				const active_content = swiper.el.querySelector('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > article');
				if (typeof active_content !== 'undefined') {
					el.setAttribute('data-active-content', active_content.getAttribute('data-color-palette'));
				}
				if (swiper.realIndex > 0) {
					el.classList.add('changed');
				} else {
					el.classList.remove('changed');
				}
				if (swiper.realIndex + 1 === total_sl) {
					el.classList.add('last-slide-active');
				} else {
					el.classList.remove('last-slide-active');
				}
			}
			if (featuredSlider !== null) {
				if (el.getAttribute('data-autoplay') && !el.classList.contains('no-controls')) {
					append_url(el, 'Play/Pause', 'play-pause');
					el.querySelector('.play-pause').addEventListener('click', function (e) {
						if (el.classList.contains('paused')) {
							el.classList.remove('paused');
							featuredSlider.autoplay.start();
						} else {
							el.classList.add('paused');
							featuredSlider.autoplay.stop();
						}
						e.preventDefault();
					});
					el.addEventListener('mouseleave', function () {
						if (!el.classList.contains('paused')) {
							featuredSlider.autoplay.start();
						}
					});
				}
				window.addEventListener('resize', function (event) {
					html_tag.classList.add('resized');
				}, true);
				setTimeout(function () {
					featuredSlider.updateAutoHeight();
				}, 500);
			}
			if (el.classList.contains('s4wi')) {
				setTimeout(function () {
					if (typeof updateSlidersEvt != 'undefined') {
						window.dispatchEvent(updateSlidersEvt);
					}
				}, 300);
			}
		});
	}
});
window.dispatchEvent(moduleFeaturedSliderEvt);

window.addEventListener("announcementSlider", function(event) {
	top_bar = document.querySelector('.shopify-section-announcement-bar:not(.s4wi)');
	var top_bar_children = document.querySelectorAll('.shopify-section-announcement-bar:not(.s4wi) > *:not(.close, .overlay-close)');
	if (top_bar && top_bar_children.length > 1 && !top_bar.classList.contains('m6kn')) {
		Array.from(top_bar.querySelectorAll('.close, .overlay-close')).forEach(function (el) {
			el.remove();
		});
		let autoplay_top_int = false;

		const dataAutoplay = top_bar.getAttribute('data-autoplay');
		if (dataAutoplay) {
			autoplay_top_int = {
				delay: parseFloat(dataAutoplay),
				pauseOnMouseEnter: true,
				disableOnInteraction: false
			};
		}
		if (top_bar.querySelector('.no-nav')) {
			top_bar.classList.add('no-nav');
		}
		randomize(top_bar);
		const randomId = top_bar.getAttribute('data-random');
		create_slider(top_bar, {
			direction: 'horizontal',
			loop: true,
			autoHeight: true,
			spaceBetween: window.innerWidth * 0.5,
			autoplay: autoplay_top_int,
			pagination: false,
			navigation: {
				nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
				prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
			}
		});
	}
});
window.dispatchEvent(announcementSliderEvt);

list_panel_slider = document.getElementsByClassName('l4ps');
if (list_panel_slider.length) {
	Array.from(list_panel_slider).forEach(function (el) {
		var pagination_type = 'bullets',
			autoplay_int = false,
			total_sl = el.children.length;
		if (el.classList.contains('slider-fraction')) {
			pagination_type = 'fraction';
		}
		if (el.getAttribute('data-autoplay')) {
			autoplay_int = {
				delay: parseFloat(el.getAttribute('data-autoplay')),
				pauseOnMouseEnter: true,
				disableOnInteraction: false
			};
		}
		randomize(el);
		const randomId = el.getAttribute('data-random');
		create_slider(el, {
			direction: 'horizontal',
			loop: false,
			autoHeight: true,
			autoplay: autoplay_int,
			pagination: {
				el: '.swiper-pagination-' + randomId,
				clickable: true,
				type: pagination_type
			},
			navigation: {
				nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
				prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
			},
			on: {
				slideChangeTransitionStart: function (swiper) {
					swiper.el.parentNode.classList.toggle('changed', swiper.realIndex > 0);
					swiper.el.parentNode.classList.toggle('last-slide-active', swiper.realIndex + 1 === total_sl);
				}
			}
		});
	});
}

window.addEventListener("listTestimonialsSlider", function(event) {
	list_testimonials = document.querySelectorAll('.l4ts:not(.s4wi)');
	if (list_testimonials.length) {
		Array.from(list_testimonials).forEach(function (el) {
			var ln = [1, 2, 3],
				pagination_type = 'bullets',
				autoplay_int = false,
				total_sl = el.children.length,
				options;
			if (el.classList.contains('wide') || el.classList.contains('w100')) {
				ln = [1, 1, 1];
			}
			if (el.classList.contains('w50')) {
				ln = [1, 2, 2];
			}
			if (el.classList.contains('slider-fraction')) {
				pagination_type = 'fraction';
			}
			if (el.getAttribute('data-autoplay')) {
				autoplay_int = {
					delay: parseFloat(el.getAttribute('data-autoplay')),
					pauseOnMouseEnter: true,
					disableOnInteraction: false
				};
			}
			randomize(el);
			options = {
				direction: 'horizontal',
				loop: true,
				autoHeight: true,
				spaceBetween: 16,
				slidesPerView: ln,
				slidesPerGroup: ln,
				autoplay: autoplay_int,
				pagination: {
					el: '.swiper-pagination-' + el.getAttribute('data-random'),
					clickable: true,
					type: pagination_type,
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							' <span class="slash">/</span> ' +
							'<span class="' + totalClass + '"></span>';
					}
				},
				navigation: {
					nextEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-next',
					prevEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-prev'
				},
				on: {
					slideChangeTransitionStart: function (swiper) {
						swiper.el.parentNode.classList.toggle('changed', swiper.realIndex > 0);
						swiper.el.parentNode.classList.toggle('last-slide-active', swiper.realIndex + 1 === total_sl);
					}
				},
				breakpoints: {
					0: {
						slidesPerView: ln[0],
						slidesPerGroup: ln[0]
					},
					760: {
						slidesPerView: ln[1],
						slidesPerGroup: ln[1]
					},
					1000: {
						slidesPerView: ln[2],
						slidesPerGroup: ln[2]
					}
				}
			};
			if (el.classList.contains('slider') && el.children.length > ln[2]) {
				create_slider(el, options);
			}
			if (el.classList.contains('slider-mobile') && el.children.length > ln[0]) {
				const nextSibling = el.nextElementSibling;
				clone_with_class(el, 'mobile-only', 'mobile-hide');
				if (nextSibling && nextSibling.classList.contains('mobile-only')) {
					if (nextSibling.hasAttribute('id')) {
						nextSibling.removeAttribute('id');
					}
					create_slider(el.nextElementSibling, options);
				}
			}
		});
	}
});
window.dispatchEvent(listTestimonialsSliderEvt);

window.addEventListener("listStaticSlider", function(event) {
	list_static = document.querySelectorAll('.l4st:not(.s4wi)');
	if (list_static.length) {
		Array.from(list_static).forEach(function (el) {
			if (!el.classList.contains('static')) {
				var pagination_type = 'bullets',
					autoplay_int = false,
					total_sl = el.children.length;
				if (el.classList.contains('slider-fraction')) {
					pagination_type = 'fraction';
				}
				if (el.getAttribute('data-autoplay')) {
					autoplay_int = {
						delay: parseFloat(el.getAttribute('data-autoplay')),
						pauseOnMouseEnter: true,
						disableOnInteraction: false
					};
				}
				randomize(el);
				const randomId = el.getAttribute('data-random');
				clone_with_class(el, 'mobile-only', 'mobile-hide');
				if (el.nextElementSibling.classList.contains('mobile-only')) {
					if (el.nextElementSibling.hasAttribute('id')) {
						el.nextElementSibling.removeAttribute('id');
					}
					create_slider(el.nextElementSibling, {
						direction: 'horizontal',
						loop: true,
						autoHeight: true,
						spaceBetween: 16,
						autoplay: autoplay_int,
						pagination: {
							el: '.swiper-pagination-' + randomId,
							clickable: true,
							type: pagination_type,
							renderFraction: function (currentClass, totalClass) {
								return '<span class="' + currentClass + '"></span>' +
									' <span class="slash">/</span> ' +
									'<span class="' + totalClass + '"></span>';
							}
						},
						navigation: {
							nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
							prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
						},
						on: {
							slideChangeTransitionStart: function (swiper) {
								swiper.el.parentNode.classList.toggle('changed', swiper.realIndex > 0);
								swiper.el.parentNode.classList.toggle('last-slide-active', swiper.realIndex + 1 === total_sl);
							}
						}
					});
				}
			}
			/*if (el.classList.contains('slider')) {
                randomize(el);
            }*/
		});
	}
});
window.dispatchEvent(listStaticSliderEvt);

window.addEventListener("listUspSlider", function(event) {
	list_usp = document.querySelectorAll('.l4us:not(.s4wi)');
	if (list_usp.length) {
		Array.from(list_usp).forEach(function (el) {
			if (!el.classList.contains('static')) {
				let autoplay_int = false;
				let autowidth_int = 1;
				let space_between;

				if (el.classList.contains('no-arrows')) {
					space_between = 16;
				} else {
					space_between = 44;
				}

				if (el.hasAttribute('data-autoplay')) {
					autoplay_int = {
						delay: parseFloat(el.getAttribute('data-autoplay')),
						pauseOnMouseEnter: true,
						disableOnInteraction: false
					};
				}
				randomize(el);
				const randomId = el.getAttribute('data-random');

				if (el.querySelectorAll('li').length === 1) {
					el.classList.remove('slider', 'slider-single');
				}
				if (el.closest('#nav-top') !== null && el.classList.contains('slider')) {
					el.classList.add('slider-in-header');
					if (!el.classList.contains('slider-single')) {
						autowidth_int = 'auto';
					}
				}
				const options = {
					direction: 'horizontal',
					loop: true,
					pagination: false,
					autoplay: autoplay_int,
					slidesPerView: autowidth_int,
					autoHeight: true,
					//spaceBetween: 10,
					spaceBetween: space_between,
					navigation: {
						nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
						prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
					},
					breakpoints: {
						0: {
							slidesPerView: 1
						},
						760: {
							slidesPerView: autowidth_int
						},
						1000: {
							spaceBetween: space_between
						},
						1100: {
							spaceBetween: 20
						}
					}
				};
				if (!el.classList.contains('l4ch')) {
					if (el.classList.contains('slider')) {
						create_slider(el, options);
					} else {
						clone_with_class(el, 'l4us-mobile', 'mobile-hide');
						const nextElement = el.nextElementSibling;
						if (nextElement.classList.contains('l4us-mobile')) {
							nextElement.classList.remove('slider', 'slider-in-header');
							if (nextElement.hasAttribute('id')) {
								nextElement.removeAttribute('id');
							}
							create_slider(nextElement, options);
						}
					}
				}
			}
		});
	}
});
window.dispatchEvent(listUspSliderEvt);

popup_a = document.getElementsByClassName('popup-a');
if (popup_a.length) {
	Array.from(popup_a).forEach(function (el) {
		Array.from(el.getElementsByClassName('l4cl')).forEach(function (el) {
			el.classList.add('in-popup');
		});
	});
}

list_collection_slider = document.querySelectorAll('.l4cl.slider:not(.in-popup, .s4wi)');
const module_collection = document.getElementsByClassName('m6cl');
if (module_collection.length) {
	Array.from(module_collection).forEach(function (el) {
		Array.from(el.querySelectorAll('.l4cl.slider:not(.w12, .w14, .w16, .w20, .w25, .w33, .w50)')).forEach(function (el) {
			el.classList.add('in-col');
		});
	});
}

const list_collection = document.getElementsByClassName('l4cl');
if (list_collection.length) {
	Array.from(list_collection).forEach(el => {
		if (el.classList.contains('hr')) {
			if (el.clientHeight < el.scrollHeight) {
				el.classList.add('is-scrollable');
			}
		}
		Array.from(el.querySelectorAll('div.box')).forEach(em => {
			const closestLi = em.closest('li');
			if (closestLi) {
				closestLi.classList.add('has-div-box');
			}
		});
		Array.from(el.querySelectorAll('li')).forEach(em => {
			if (em.querySelectorAll('[class*="l4ml"]').length) {
				em.classList.add('has-l4ml');
			}
			if (em.querySelectorAll('picture ~ picture').length) {
				em.classList.add('has-picture-picture');
			}
		});
	});
}

window.addEventListener("listCollectionSlider", function(event) {
	list_collection_slider = document.querySelectorAll('.l4cl.slider:not(.in-popup, .s4wi)');
	if (list_collection_slider.length) {
		Array.from(list_collection_slider).forEach(function (el) {
			var items, hasImg = false,
				autoHeight = true,
				loopMe = false,
				spacing = 16,
				//dist_a = parseFloat(getComputedStyle(el).getPropertyValue('--dist_a')),
				figureElement = el.querySelector('figure:not(:last-child)'),
				hasImg_H,
				allowTouch = false;

			if (el.matches('[style*="--dist_a"]')) {
				var dist_a = parseFloat(getComputedStyle(el).getPropertyValue('--dist_a'));
				spacing = dist_a;
			}
			if (figureElement) {
				hasImg = true;
			} else {
				el.classList.add('no-img');
			}
			if (el.classList.contains('slider-loop')) {
				loopMe = true;
			}
			if (el.classList.contains('static-height') && !el.classList.contains('align-stretch')) {
				autoHeight = false;
			}
			if (el.classList.contains('static-height') || el.classList.contains('align-center') || el.classList.contains('align-stretch')) {
				allowTouch = true;
			}
			if (el.classList.contains('text-justify') || el.classList.contains('auto-width')) {
				items = ['auto', 'auto', 'auto'];
				autoHeight = false;
			} else {
				if (el.classList.contains('in-col')) {
					items = [4, 4, 3];
				} else if (el.classList.contains('w12')) {
					items = [8, 6, 4];
				} else if (el.classList.contains('w14')) {
					items = [7, 6, 4];
				} else if (el.classList.contains('w16')) {
					items = [6, 5, 3];
				} else if (el.classList.contains('w20')) {
					items = [5, 5, 3];
				} else if (el.classList.contains('w25')) {
					items = [4, 4, 3];
				} else if (el.classList.contains('w33')) {
					items = [3, 3, 3];
				} else if (el.classList.contains('w50')) {
					items = [2, 2, 2];
				} else {
					items = [5, 5, 3];
				}
			}
			randomize(el);
			const randomId = el.getAttribute('data-random');
			create_slider(el, {
				direction: 'horizontal',
				loop: loopMe,
				autoHeight: autoHeight,
				slidesPerView: items[0],
				focusableElements: 'input',
				spaceBetween: spacing,
				touchStartPreventDefault: false,
				lazy: {
					loadPrevNext: true
				},
				pagination: {
					el: '.swiper-pagination-' +randomId,
					clickable: true
				},
				navigation: {
					nextEl: '[data-random="' + randomId + '"] .swiper-button-next',
					prevEl: '[data-random="' + randomId + '"] .swiper-button-prev'
				},
				breakpoints: {
					0: {
						simulateTouch: allowTouch,
						allowTouchMove: allowTouch
					},
					760: {
						slidesPerView: items[2],
						simulateTouch: allowTouch,
						allowTouchMove: allowTouch
					},
					1000: {
						slidesPerView: items[1],
						simulateTouch: allowTouch,
						allowTouchMove: allowTouch
					},
					1100: {
						slidesPerView: items[0],
						simulateTouch: allowTouch,
						allowTouchMove: allowTouch
					}
				},
				on: {
					afterInit: function (swiper) {
						// handleInit();
						window.dispatchEvent(lazyVideoEvt);
					},
          resize: handleInit,
          transitionStart: function (swiper) {
            swiper.el.classList.add('transition');
          },
          transitionEnd: function (swiper) {
            swiper.el.classList.remove('transition');
          }
				}
			});
			let handleInitCalculated = false;
			//if (!isHasSelectorSupported()) {
			Array.from(el.getElementsByClassName('has-text')).forEach(function (em) {
				em.parentElement.classList.add('has-text');
			});
			//}
			function handleInit(swiper) {
				if(!handleInitCalculated){
					if (hasImg === true) {
						const firstFig = el.querySelector('.swiper-slide-active figure');
						if (firstFig) {
							if (firstFig.clientHeight === 0) {
								el.style.removeProperty('--fih');
							} else {
								el.style.setProperty('--fih', firstFig.clientHeight + 'px');
							}
						}
					}
					handleInitCalculated = true;
				}
			}


			if (hasImg === true) {
				if (!isMobile) {
					document.addEventListener('mouseover', handleInit);
				}
				document.addEventListener('keyup', handleInit);
				document.addEventListener('touchstart', handleInit);
				document.addEventListener('scroll', handleInit);
				window.addEventListener('resize', function(){
					handleInitCalculated = false;
					handleInit();
				});

				const closestTabs = el.closest('.m6tb');
				if (closestTabs) {
					const links = closestTabs.children[0].querySelectorAll('a');
					links.forEach(link => {
						link.addEventListener('click', () => {
							setTimeout(function () {
								handleInitCalculated = false;
								handleInit();
							}, 100);
						});
					});
				}

				const handleIntersection = (entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							handleInit();
							observer.unobserve(entry.target);
						}
					});
				};

				const observer = new IntersectionObserver(handleIntersection, {
					root: null,
					rootMargin: '0px',
					threshold: 0.5,
				});

				observer.observe(el);

				if (el.closest('li.sub') !== null) {
					el.closest('li.sub').addEventListener('mouseenter', handleResize);
				}
			}
			const wrapperId = el.querySelector('.swiper-wrapper[id]');
			if (wrapperId) {
				wrapperId.removeAttribute('id');
				Array.from(el.querySelectorAll('.swiper-button-nav[aria-controls]')).forEach(em => {
					em.removeAttribute('aria-controls');
				});
			}
		});
	}
});
window.dispatchEvent(listCollectionSliderEvt);
window.addEventListener("listProductSlider", function(event) {
	const list_product_slider = document.querySelectorAll('.l4pr:not(.s4wi)');
	if (list_product_slider.length) {
		Array.from(list_product_slider).forEach(function (el) {
			var hasStickyNote = false;
			var stickyNote = [];
			if (el.classList.contains('static')) {
				var clone_me = el.cloneNode(true);
				clone_me.classList.remove('static');
				clone_me.classList.add('desktop-hide');
				el.classList.add('desktop-only');
				el.after(clone_me);

				el = el.nextElementSibling;
			} else {
				var stickyNotes = el.querySelectorAll('li.sticky');
				if (stickyNotes.length) {
					hasStickyNote = true;
					stickyNote = Array.from(stickyNotes);
					stickyNotes.forEach(child => child.remove());
				}
			}
			var mainSliderElement = el,
				children = mainSliderElement.children,
				qttChildren = children.length,
				total_sl = el.children.length,
				mainSlider,
				slides,
				initial_slide = 0;

			const firstModel = mainSliderElement.querySelectorAll('a > .model-3d:first-child model-viewer[poster]');
			Array.from(firstModel).forEach(em => {
				const staticPosterWrapper = document.createElement('picture');
				const posterSrc = em.getAttribute('poster');

				const staticPoster = document.createElement('img');
				staticPoster.setAttribute('src', posterSrc);
				staticPoster.setAttribute('data-src', posterSrc);
				staticPosterWrapper.prepend(staticPoster);

				staticPosterWrapper.classList.add('just-poster');

				const altAttribute = em.getAttribute('alt');
				if (altAttribute) {
					staticPoster.setAttribute('alt', altAttribute);
				}

				const closestLink = em.closest('a');
				if (closestLink) {
					closestLink.prepend(staticPosterWrapper);
				}
			});

			if (!el.classList.contains('thumbs-static') && !el.classList.contains('thumbs-slider')) {
				const fifthChild = children[4];

				if (fifthChild) {
					fifthChild.classList.add('more');
					append_url(fifthChild, '+' + (qttChildren - 5), 'more');
				}
				/*if (typeof children[5] !== 'undefined') {
                    children[4].classList.add('more');
                    append_url(children[4], '+' + qttChildren - 5, 'more');
                }*/
			}

			const featuredMediaPosition = el.getAttribute('data-featured_media_position');
			if (featuredMediaPosition) {
				initial_slide = parseFloat(featuredMediaPosition) - 1;
			}

			// clone all slides before swiper uses them and change the DOM - used to create custom pagination
			slides = mainSliderElement.cloneNode(true).children;
			Array.from(el.getElementsByClassName('m6bx')).forEach(em => {
				em.classList.add('m6bx-inside');
				el.firstElementChild.appendChild(em);
				em.parentElement.removeChild(em);
			});
			randomize(el);
			const randomId = el.getAttribute('data-random');
			function setNavigationHeight(swiper) {
				const h = `${swiper.height}px`;
				swiper.navigation.prevEl[0].style.height = h;
				swiper.navigation.nextEl[0].style.height = h;
			}
			mainSlider = create_slider(mainSliderElement, {
				direction: 'horizontal',
				loop: false,
				autoHeight: true,
				preloadImages: false,
				initialSlide: initial_slide,
				pagination: {
					el: '.swiper-pagination-' + randomId,
					clickable: true,
					renderBullet: function (index, className) {
						var finalSpan = document.createElement("a"),
							img_type,
							add_class,
							img,
							divFlex,
							moreLink,
							icon,
							span,
							a_thumb,
							a_thumb_img,
							a_thumb_pic,
							a_thumb_pic_class;
						finalSpan.classList.add(className);
						if (slides[index].hasAttribute('class')) {
							add_class = slides[index].getAttribute('class');
							if (add_class.includes('portrait')) {
								finalSpan.classList.add('portrait');
							}
							if (add_class.includes('landscape')) {
								finalSpan.classList.add('landscape');
							}
							if (add_class.includes('auto')) {
								finalSpan.classList.add('auto');
								finalSpan.classList.remove('landscape', 'portrait');
							}
						}
						if (slides[index].querySelector("picture")) {
							img_type = 'picture';
						} else {
							img_type = 'img';
						}
						img = slides[index].querySelector(img_type);
						if (img !== null) {
							const a_thumb = img.closest('a[data-gallery-thumb]');
							const a_thumb_img = document.createElement('img');
							const a_thumb_pic = document.createElement('picture');

							if (a_thumb) {
								const thumbSrc = a_thumb.getAttribute('data-gallery-thumb');
								a_thumb_img.setAttribute('src', thumbSrc);

								const a_thumb_pic_class = a_thumb.querySelector('picture[class]');
								if (a_thumb_pic_class) {
									const classValue = a_thumb_pic_class.getAttribute('class');
									const classes = classValue.split(' ');
									classes.forEach(className => {
										a_thumb_pic.classList.add(className);
									});
								}

								a_thumb_img.setAttribute('alt', 'Thumbnail');
								a_thumb_pic.appendChild(a_thumb_img);
								finalSpan.appendChild(a_thumb_pic);
							} else if (img) {
								finalSpan.appendChild(img);
							}
						}

						divFlex = document.createElement("span");

						moreLink = slides[index].querySelector("a.more");
						if (moreLink && ((qttChildren - 1) - index) > 0) {
							span = document.createElement("span");
							span.innerText = '+' + ((qttChildren - 1) - index).toString();

							divFlex.appendChild(span);
							finalSpan.classList.add('has-more');
							if (slides[index].querySelectorAll('a[data-fancybox]')) {
								Array.from(slides[index].querySelectorAll('a[data-fancybox]')).forEach(function (em) {
									finalSpan.setAttribute('href', em.getAttribute('href'));
								});
							}
						}

						icon = slides[index].querySelector("i[class^=icon-]");
						if (icon) {
							divFlex.appendChild(icon);
						}

						finalSpan.appendChild(divFlex);

						return finalSpan.outerHTML;
					}
				},
				navigation: {
					nextEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-next',
					prevEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-prev'
				},
				on: {
					// "this" keyword within event handler always points to Swiper instance (from documentation https://swiperjs.com/swiper-api#events)
					activeIndexChange: function () {
						var activeIndex = this.activeIndex;
						Array.from(this.el.parentNode.getElementsByClassName('custom-progressbar-inner')).forEach(function (el) {
							el.style.width = 100 * (activeIndex + 1) / qttChildren + '%';
						});
					},
					afterInit: function (swiper) {
						// create progress bar
						const progress_bar = createElementWithClass('div', 'custom-progressbar');
						progress_bar.innerHTML = '<div class="custom-progressbar-inner" style="width:' + 100 / qttChildren + '%;"></div>';
						swiper.el.appendChild(progress_bar);

						Array.from(swiper.el.querySelectorAll('.s1lb, .label')).forEach(em => {
							swiper.el.parentNode.appendChild(em);
						});
						Array.from(swiper.el.getElementsByClassName('m6bx-inside')).forEach(em => {
							swiper.el.appendChild(em);
						});

						let custom_fraction;
						if (el.classList.contains('no-thumbs-mobile') || el.classList.contains('slider-fraction')) {
							custom_fraction = swiper.el.parentNode.querySelector('.swiper-custom-fraction');
							custom_fraction.innerHTML = '<span class="swiper-pagination-current">1</span> <span class="slash">/</span> <span class="total-el">' + swiper.slides.length + '</span>';
						}

						setTimeout(function () {
							setNavigationHeight(swiper);
						}, 300);
					},
					slideChangeTransitionEnd: function (swiper) {
						setTimeout(function () {
							setNavigationHeight(swiper);
						}, 300);
					},
					slideChangeTransitionStart: function (swiper) {
						setTimeout(function () {
							if (el.classList.contains('no-thumbs-mobile') || el.classList.contains('slider-fraction')) {
								var custom_fraction = swiper.el.parentNode.getElementsByClassName('swiper-pagination-current')[0];
								custom_fraction.innerHTML = swiper.realIndex + 1;
								if (swiper.realIndex > 0) {
									swiper.el.classList.add('changed');
								} else {
									swiper.el.classList.remove('changed');
								}
							}
							if (swiper.realIndex + 1 === total_sl) {
								swiper.el.classList.add('last-slide-active');
							} else {
								swiper.el.classList.remove('last-slide-active');
							}
						}, 300);
					},
					resize: function (swiper) {
						setNavigationHeight(swiper);
					}
				}
			});

			if (hasStickyNote = true) {
				stickyNote.forEach(function (imgOverlay) {
					const swiperOuter = el.querySelector('.swiper-outer');
					if (swiperOuter !== null) {
						swiperOuter.appendChild(imgOverlay);
					} else {
						el.appendChild(imgOverlay);
					}
				});
			}

			function assignSlideIndex(elements) {
				'use strict';
				Array.from(elements).forEach((el, index) => {
					el.style.zIndex = elements.length - index;
				});
			}

			if (el.classList.contains('thumbs-slider')) {
				const randomIdSelector = '[data-random="' + randomId + '"]';
				const bulletsSelector = `${randomIdSelector} .swiper-pagination-bullets`;
				const customBullets = el.querySelector(bulletsSelector);

				clone_with_class(customBullets, 'cloned', 'hidden');

				const clonedBullets = el.querySelector(`${bulletsSelector}.cloned`);

				Array.from(clonedBullets.children).forEach((bullet, index) => {
					bullet.setAttribute('data-l4pr-index', index);
				});

				create_slider(clonedBullets, {
					direction: 'horizontal',
					loop: false,
					autoHeight: false,
					slidesPerView: 'auto',
					navigation: {
						nextEl: `${bulletsSelector} .swiper-button-next`,
						prevEl: `${bulletsSelector} .swiper-button-prev`
					}
				});
			}

			const data_update_product_slider = document.querySelectorAll('[data-l4pr-index]');
			if (data_update_product_slider.length) {
				Array.from(data_update_product_slider).forEach(el => {
					const isOption = el.tagName.toLowerCase() === 'option';
					const clickHandler = e => {
						const index = parseInt(el.getAttribute('data-l4pr-index'));
						mainSlider.slideTo(index);

						if (el.tagName.toLowerCase() === 'a') {
							if (el.classList.contains('swiper-pagination-bullet')) {
								const slide = el.closest('.swiper-slide');
								const siblings = Array.from(getSiblings(slide));

								siblings.forEach((em) => {
									em.children[0].classList.remove('swiper-pagination-bullet-active');
								});

								el.classList.add('swiper-pagination-bullet-active');
							}
							e.preventDefault();
						}
					};

					if (isOption) {
						const em = el.parentNode;
						em.addEventListener('change', () => {
							const dx = em.options[em.selectedIndex].getAttribute('data-l4pr-index');
							if (dx !== null) {
								mainSlider.slideTo(dx);
							}
						});
					} else {
						el.addEventListener('click', clickHandler);
					}
				});
			}
		});
	}
});
window.dispatchEvent(listProductSliderEvt);

//Default.utils.ratings();
window.addEventListener("ratings", function(evt) {
	const ratingElements = document.querySelectorAll('[data-val][data-of]:not(.rating-initialized)');

	if (ratingElements.length) {
		Array.from(ratingElements).forEach(el => {
			el.classList.add('rating-initialized');
			const fragment = document.createDocumentFragment();
			const reviewsElem = createElementWithClass('span', 'rating-label');
			const reviews = el.innerHTML;
			const rating = el.dataset.val;
			const total = el.dataset.of;

			const isNotS1ld = !(el.classList.contains('s1ld') || el.classList.contains('s1br'));

			if (isNotS1ld) {
				fragment.appendChild(createRatingsHtmlElement(rating, total));
				reviewsElem.innerHTML = reviews;
			} else {
				reviewsElem.innerHTML = `<span class="bar" style="width: ${rating / total * 100}%;"></span>`;
			}

			fragment.appendChild(reviewsElem);
			el.textContent = '';
			el.appendChild(fragment);
		});
	}
});
window.dispatchEvent(ratingsEvt);

const alignMiddleElements = document.getElementsByClassName('align-middle');
const alignCenterElements = document.getElementsByClassName('align-center');

function checkAndAddClass(elements, className) {
	if (elements.length) {
		Array.from(elements).forEach(el => {
			const parent = el.parentNode;
			const grandparent = parent.parentNode;

			const isCenterElement = (
				(el.previousElementSibling === null && el.nextElementSibling === null && parent.id === 'content') ||
				(el.previousElementSibling === null && el.nextElementSibling === null && parent.previousElementSibling === null && parent.nextElementSibling === null && grandparent.id === 'content')
			);

			if (isCenterElement) {
				document.getElementById('content').classList.add(className);
			}
		});
	}
}

//Default.utils.background();
checkAndAddClass(alignMiddleElements, 'align-center');
checkAndAddClass(alignCenterElements, 'align-center-static');

if (!isHasSelectorSupported()) {
	Array.from(el.querySelectorAll('.small a')).forEach(em => {
		em.classList.add('has-link');
	});
	const list_featured_content_box = document.querySelectorAll('.l4ft .content.box');
	if (list_featured_content_box.length) {
		Array.from(list_featured_content_box).forEach(el => {
			const closestLi = el.closest('li');
			if (closestLi) {
				closestLi.classList.add('has-content-box');
			}
		});
	}
}

//Default.utils.mobile();
if (isMobile) {
	html_tag.classList.add('mobile');
} else {
	html_tag.classList.add('no-mobile');
}

//Default.utils.done();
new_js(window.filepaths['scripts_async_js']);

/*document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	var nav_main,
		top_bar,

		Default = {
			utils: {
				start: function () {

				},
				links: function () {


				},
				mails: function () {

				},
				forms: function () {

				},
				top: function () {

				},
				footer: function () {
					// Togglable headers on mobile
					// if (footer_id) {
					// 	Array.from(footer_id.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(function (el) {
					// 		append_url(el, 'Close', 'header-toggle');
					// 		el.querySelector('a.header-toggle').addEventListener('click', function (e) {
					// 			toggle_dropdowns_simple(el.parentElement);
					// 			e.preventDefault();
					// 		});
					// 	});
					// }

				},
				mobile: function () {

				},
				done: function () {

				},
				ratings: function () {
				},
				backgrounds: function () {

				},
				tabs: function () {

				},
				swipers: function () {
				}
			},
		};

	setTimeout(function () {
		Default.utils.start();
		Default.utils.top();
		Default.utils.links();
		Default.utils.mails();
		Default.utils.forms();
		Default.utils.footer();
		Default.utils.tabs();
		Default.utils.swipers();
		Default.utils.ratings();
		Default.utils.backgrounds();
		Default.utils.mobile();
		Default.utils.done();
	}, 0);
});*/

window.addEventListener("mediaFlexbile", function(evt) {
const media_flexible = document.getElementsByClassName('media-flexible');
if (media_flexible.length) {
	Array.from(media_flexible).forEach(function (el) {
    if ((!el.parentElement.classList.contains('flexible-stack') && (el.classList.contains('slider-mobile') || el.parentElement.classList.contains('mobile-static'))) && (!el.classList.contains('media-flexible-initialized'))) {
			var cloned_mobile, link, emc, pt = el.parentElement,
				tag = document.createElement('div'),
				fl = pt.querySelectorAll('.media-flexible:not(.mobile-hide-media-flexible) > *:not(.mobile-hide-media-flexible)');
			if (!el.parentElement.getElementsByClassName('media-flexible-mobile').length) {
				tag.classList.add('media-flexible-mobile');
				el.after(tag);
				el.classList.add('mobile-hide');
				const cloned_mobile = pt.querySelector('.media-flexible-mobile');
				Array.from(fl).forEach(function (em) {
					emc = em.cloneNode(true);
					cloned_mobile.appendChild(emc);
				});

				if (cloned_mobile.classList.contains('media-flexible-mobile')) {
					cloned_mobile.classList.remove('media-flexible', 'mobile-hide');
					if (cloned_mobile.hasAttribute('id')) {
						cloned_mobile.removeAttribute('id');
					}

					Array.from(cloned_mobile.children).forEach(function (el) {
						if (el.classList.contains('mobile-hide')) {
							el.remove();
						}
					});
					randomize(cloned_mobile);
					const randomId = cloned_mobile.getAttribute('data-random');
					if (!cloned_mobile.classList.contains('s4wi')) {
						create_slider(cloned_mobile, {
							direction: 'horizontal',
							loop: true,
							autoHeight: true,
							pagination: {
								el: '.swiper-pagination-' + randomId,
								clickable: true,
								type: 'bullets',
								renderBullet: function (index, className) {
									return '<span class="' + className + '">' + (index + 1) + "<span class='prg'></span></span>";
								}
							},
							on: {
								slideChangeTransitionStart: function (swiper) {
									var active_content = swiper.el.querySelectorAll('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > *')[0];
									if (typeof active_content !== 'undefined') {
										el.closest('.m6fr').setAttribute('data-active-content', active_content.getAttribute('data-color-palette'));
									}
								}
							}
						});
					}
				}
			}
      el.classList.add('media-flexible-initialized');
		}
	});
}
});
window.dispatchEvent(mediaFlexibleEvt);

/*!*/
window.addEventListener("createCols", function(event) {
	var servicePageElement = document.querySelector('[id$="page-service-info-blocks"]');
	if (servicePageElement != null) {
		if (servicePageElement.parentElement.classList.contains('cols')) {
			var parent = servicePageElement.parentElement;
			var article = servicePageElement.parentElement.querySelector('article.w64.t55');
			if (article) { article.replaceWith(...article.childNodes); }
			parent.replaceWith(...parent.childNodes);
		}

		var anySiblingFound = false;
		var wrapper = document.createElement('div');
		wrapper.classList.add('cols');
		var wrapperInner = document.createElement('article');
		wrapperInner.classList.add('w64','t55');
		wrapper.appendChild(wrapperInner);
		var possibleSiblings = ['shopify-section-page-service-menu', 'shopify-section-faq', 'shopify-section-contact-form', 'shopify-section-google-maps'];

		var findSibling = function() {
			var prevSibling = servicePageElement.previousSibling;
			if (prevSibling) {
				var correctSiblingFound = false;
				for (var i = 0; i < possibleSiblings.length; i++) {
					if (prevSibling.classList.contains(possibleSiblings[i])) {
						correctSiblingFound = true;
						anySiblingFound = true;
						prevSibling.classList.add('w64','t55')
						wrapperInner.appendChild(prevSibling);
					}
				}
				if (correctSiblingFound) {
					findSibling();
				} else {
					for (var i = 1; i < wrapperInner.childNodes.length; i++){
						wrapperInner.insertBefore(wrapperInner.childNodes[i], wrapperInner.firstChild);
					}
					if (anySiblingFound) {
						servicePageElement.parentNode.insertBefore(wrapper, servicePageElement);
						wrapper.appendChild(servicePageElement);
					}
				}
			}
		}
		findSibling();
	}
});
window.dispatchEvent(createColsEvt);

window.addEventListener("showAlert", function(event) {
	var messageText = event.detail.message,
		messageType = event.detail.type,
		messageHeader = event.detail.header ? event.detail.header : false,
		messageOrigin = event.detail.origin ? 'message-' + event.detail.origin : false,
		messageColor = '';
	switch(messageType) {
		case "success":
			messageColor = 'lime';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_success_text; }
			break;
		case "info":
			messageColor = 'pine';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_info_text; }
			break;
		case "error":
			messageColor = 'rose';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_error_text; }
			break;
		default:
			messageColor = 'lime';
			if (!messageHeader) { messageHeader = ''; }
	}
	var message = '<li class="overlay-'+ messageColor +' '+ messageOrigin +'"><i aria-hidden="true" class="icon-'+ messageType +'"></i><p class="strong">'+ messageHeader +'</p><p>'+ messageText +'</p><a href="./" class="close">Close</a></li>';
	var list_alerts = document.querySelector('.l4al:not(.inline):not(.l4al-trustbadge)');

	if (list_alerts === null) {
		list_alerts = document.createElement("ul");
		list_alerts.classList.add('l4al', 'fixed');
		document.getElementById('root').appendChild(list_alerts);
	}
	if ((messageOrigin && list_alerts.getElementsByClassName(messageOrigin).length == 0) || !messageOrigin) { // Prevent double messages (multiple of the same forms are being triggered when posted in shopfiy)
		list_alerts.innerHTML += message;
	}
	if (typeof alertsEvt != 'undefined') { window.dispatchEvent(alertsEvt); }
}, false);

function scrollToTargetAdjusted(el) {
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
	el.scrollIntoView({
		block: 'center'
	});
}
let loadMoreItemClicked = localStorage.getItem('loadMoreItemClicked');
if (loadMoreItemClicked != null) {
	let el = document.querySelector('#collection > li > figure > a[href="'+ loadMoreItemClicked +'"], .m6cl .results > div a[href="'+ loadMoreItemClicked +'"], .m6cl .results > .l4ne a[href="'+ loadMoreItemClicked +'"]'),
		url = window.location.href;
	if (el && !url.includes(loadMoreItemClicked)) {
		scrollToTargetAdjusted(el);
		localStorage.removeItem('loadMoreItemClicked');
	} else if (!url.includes(loadMoreItemClicked)) {
		localStorage.removeItem('loadMoreItemClicked');
	}
}

window.addEventListener("lazyVideo", function(evt) {
	var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
	if ("IntersectionObserver" in window) {
		var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(video) {
        console.log(video);
				if (video.isIntersecting) {
					for (var source in video.target.children) {
						var videoSource = video.target.children[source];
						if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
							videoSource.src = videoSource.dataset.src;
						}
					}

					video.target.load();
					video.target.classList.remove("lazy");
					lazyVideoObserver.unobserve(video.target);
				}
			});
		});

		lazyVideos.forEach(function(lazyVideo) {
			lazyVideoObserver.observe(lazyVideo);
		});
	}
});
document.addEventListener("DOMContentLoaded", function() {
	window.dispatchEvent(lazyVideoEvt);
});

/*!*/
// Animations .t1an
var a_js_animations = 'js/plugin-animations.js';
var a_css_animations = 'styles/async-animations.css';
function loadRes(u, c, i) {
	'use strict';
	if (html_tag.classList.contains(i)) {
		c();
		return true;
	}
	var s = document.createElement('script');
	s.src = u;
	s.async = true;
	s.onload = c;
	document.body.appendChild(s);
	if (!html_tag.classList.contains(i)) {
		html_tag.classList.add(i);
	}
	return true;
}
// NOTE: this plugin will animate only the elements with the [data-sal] attribute defined.
var data_sal = document.querySelectorAll('[data-sal]');
if (data_sal.length) {
	loadRes(a_js_animations, function () {
		"use strict";
		new_css('animations-css', a_css_animations);
		sal({
			threshold: 1,
			once: true
		});
	});
}