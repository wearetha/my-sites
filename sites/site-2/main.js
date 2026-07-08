/* Polish and Press - Main JS */
(function(){
  'use strict';

  // Detect touch
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // ===== LENIS SMOOTH SCROLL =====
  let lenis;
  if(typeof Lenis !== 'undefined'){
    lenis = new Lenis({duration:1.2,easing:function(t){return 1-Math.pow(1-t,3)},smooth:true});
    function raf(time){lenis.raf(time);requestAnimationFrame(raf)}
    requestAnimationFrame(raf);
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(function(time){lenis.raf(time*1000)});
    gsap.ticker.lagSmoothing(0);
  }

  // ===== HEADER SCROLL =====
  var header = document.getElementById('header');
  var scrolled = false;
  function onScroll(){
    var s = window.pageYOffset > 50;
    if(s !== scrolled){header.classList.toggle('scrolled',s);scrolled=s}
  }
  window.addEventListener('scroll',onScroll,{passive:true});

  // ===== MOBILE MENU =====
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click',function(){
    var open = menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active',open);
    menuBtn.setAttribute('aria-expanded',open);
    mobileMenu.setAttribute('aria-hidden',!open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    });
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var href = a.getAttribute('href');
      if(href === '#') return;
      var target = document.querySelector(href);
      if(target){e.preventDefault();lenis?lenis.scrollTo(target):target.scrollIntoView({behavior:'smooth'})}
    });
  });

  // ===== PARTICLES =====
  var particlesContainer = document.getElementById('particles');
  if(particlesContainer){
    for(var i=0;i<25;i++){
      var p = document.createElement('div');
      p.style.cssText = 'position:absolute;width:'+(Math.random()*4+2)+'px;height:'+(Math.random()*4+2)+'px;background:rgba(255,255,255,'+(Math.random()*0.3+0.1)+');border-radius:50%;left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation:float '+(Math.random()*10+10)+'s ease-in-out infinite;animation-delay:'+(Math.random()*5)+'s';
      particlesContainer.appendChild(p);
    }
  }
  var particleStyle = document.createElement('style');
  particleStyle.textContent = '@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}';
  document.head.appendChild(particleStyle);

  // ===== CUSTOM CURSOR =====
  if(!isTouch){
    var cursor = document.getElementById('cursor');
    var follower = document.getElementById('cursorFollower');
    var mouseX=0,mouseY=0,followerX=0,followerY=0;
    document.addEventListener('mousemove',function(e){mouseX=e.clientX;mouseY=e.clientY;if(cursor){cursor.style.left=mouseX+'px';cursor.style.top=mouseY+'px'}});
    function animateFollower(){
      followerX+=(mouseX-followerX)*0.15;
      followerY+=(mouseY-followerY)*0.15;
      if(follower){follower.style.left=followerX+'px';follower.style.top=followerY+'px'}
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll('a,button,.magnetic-btn').forEach(function(el){
      el.addEventListener('mouseenter',function(){if(cursor)cursor.classList.add('hover')});
      el.addEventListener('mouseleave',function(){if(cursor)cursor.classList.remove('hover')});
    });
  }

  // ===== MAGNETIC BUTTONS =====
  if(!isTouch){
    document.querySelectorAll('.magnetic-btn').forEach(function(btn){
      btn.addEventListener('mousemove',function(e){
        var rect = btn.getBoundingClientRect();
        gsap.to(btn,{x:(e.clientX-rect.left-rect.width/2)*0.3,y:(e.clientY-rect.top-rect.height/2)*0.3,duration:0.3,ease:'power2.out'});
      });
      btn.addEventListener('mouseleave',function(){gsap.to(btn,{x:0,y:0,duration:0.5,ease:'elastic.out(1,0.3)'})});
    });
  }

  // ===== GSAP SCROLL ANIMATIONS =====
  gsap.registerPlugin(ScrollTrigger);

  // Hero title reveal
  gsap.from('.hero-title .line',{y:80,opacity:0,duration:1,stagger:0.15,ease:'power3.out',delay:0.3});
  gsap.from('.hero-subtitle',{y:30,opacity:0,duration:0.8,ease:'power2.out',delay:0.7});
  gsap.from('.hero-cta',{y:20,opacity:0,duration:0.6,ease:'power2.out',delay:0.9});
  gsap.from('.hero-badges',{y:20,opacity:0,duration:0.6,ease:'power2.out',delay:1.1});

  // Stats counter
  document.querySelectorAll('.stat-number[data-count]').forEach(function(el){
    var target = parseInt(el.dataset.count,10);
    gsap.from(el,{textContent:0,duration:2,ease:'power2.out',snap:{textContent:1},scrollTrigger:{trigger:el,start:'top 85%'},onUpdate:function(){el.textContent=Math.round(gsap.getProperty(el,'textContent'))}});
  });

  // Service cards
  gsap.from('.service-card',{y:50,opacity:0,duration:0.7,stagger:0.1,ease:'power2.out',scrollTrigger:{trigger:'.services-grid',start:'top 80%'}});

  // Steps
  gsap.from('.step',{y:40,opacity:0,duration:0.6,stagger:0.15,ease:'power2.out',scrollTrigger:{trigger:'.steps',start:'top 80%'}});
  gsap.from('.step-arrow',{opacity:0,duration:0.4,stagger:0.15,ease:'power2.out',scrollTrigger:{trigger:'.steps',start:'top 80%'}});

  // About
  gsap.from('.about-content',{x:-50,opacity:0,duration:0.8,ease:'power2.out',scrollTrigger:{trigger:'.about',start:'top 70%'}});
  gsap.from('.about-img',{x:50,opacity:0,duration:0.8,ease:'power2.out',scrollTrigger:{trigger:'.about',start:'top 70%'}});
  gsap.from('.about-float-card',{y:30,opacity:0,duration:0.6,delay:0.3,ease:'power2.out',scrollTrigger:{trigger:'.about',start:'top 70%'}});

  // Reviews
  gsap.from('.review-card',{y:40,opacity:0,duration:0.6,stagger:0.12,ease:'power2.out',scrollTrigger:{trigger:'.review-grid',start:'top 80%'}});

  // Contact
  gsap.from('.contact-info',{x:-30,opacity:0,duration:0.7,ease:'power2.out',scrollTrigger:{trigger:'.contact',start:'top 75%'}});
  gsap.from('.contact-form-wrap',{x:30,opacity:0,duration:0.7,ease:'power2.out',scrollTrigger:{trigger:'.contact',start:'top 75%'}});

  // Parallax on hero bg
  gsap.to('.hero-bg',{yPercent:20,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  // ===== FORM =====
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      if(!name||!phone){formStatus.textContent='Please fill in your name and phone number.';formStatus.className='form-status error';return}
      formStatus.textContent='Sending...';formStatus.className='form-status';
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
        .then(function(r){if(r.ok){formStatus.textContent='Thank you! We\'ll be in touch soon.';formStatus.className='form-status success';form.reset()}else{throw new Error()}})
        .catch(function(){formStatus.textContent='Something went wrong. Please call us directly.';formStatus.className='form-status error'});
    });
  }

  // ===== MOBILE CALL BAR =====
  var callBar = document.getElementById('callBar');
  if(callBar){
    var callBarVisible = false;
    window.addEventListener('scroll',function(){
      var heroH = document.querySelector('.hero').offsetHeight;
      var show = window.pageYOffset > heroH * 0.8;
      if(show !== callBarVisible){callBar.style.transform=show?'translateY(0)':'translateY(100%)';callBarVisible=show}
    },{passive:true});
  }

})();
