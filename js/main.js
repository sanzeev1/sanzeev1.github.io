//transpaernt to solid navabar


// var nav = document.getElementById('nav');
// $( document ).ready(function() {
//     window.onscroll = function(){
//         if (window.scrollY > 100){
//             scrollToTop.style.display='block';
            
//             $('.navbar').addClass('solid');
//             $('.navbar-brand img').css("height","65px");
//             $('.navbar-brand img').css("transition","all 0.3s ease-in");
//         }
//         else{
//             scrollToTop.style.display='none';
//             $('.navbar').removeClass('solid');
//             $('.navbar-brand img').css("height","80px");
//             $('.navbar-brand img').css("transition","all 0.3s ease-in");
            
//         }
//     }
// });




//click to move up

// const scrollToTop = document.querySelector('.scrollToTop');
// window.addEventListener('scroll',()=>{
//     if(window.pageYOffset > 100){
//         scrollToTop.style.display='block';
        
//     }
//     else{
//         scrollToTop.style.display='none';
//     }
// })

// scrollToTop.addEventListener('click', backToTop)
//    function backToTop(){

//     $('html, body').animate({scrollTop: 0}, 1000);
// }


//navbar active class

// $(document).on('click','.navbar-nav .nav-item', function(){
//     $(this).addClass('active').siblings().removeClass('active')
// })

// //collapsed navbar
// $(document).on('click','.navbar-collapse .nav-item li', function(){
//     $(this).addClass('active').siblings().removeClass('active')
 
// })


// ES6 Class
class TypeWritter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    // Type Method
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      //Insert txt into element
      this.txtElement.innerHTML = `<h1 class="txt font-weight-bold">${
        this.txt
      }<span class="blinking-cursor">|</span></h1>`;
  
      // Initial type Speed
      let typeSpeed = 150;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init on DOM  Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWritter
    new TypeWritter(txtElement, words, wait);
  }
  




  $('#grid').mediaBoxes({
    filterContainer: '#filter',
    search: '#search',
    columns: 3,
    boxesToLoadStart: 9,
    boxesToLoad: 9,
    horizontalSpaceBetweenBoxes: 30,
      verticalSpaceBetweenBoxes: 30,
      minBoxesPerFilter: 20,
      deepLinkingOnFilter: false,
      deepLinkingOnPopup: false,
      animation_on_thumbnail_overlay_hover : [
        { item : '.media-box-title', animation : 'from-top' },
        { item : '.media-box-date', animation : 'from-bottom' }
      ],
      fancybox: {
        idleTime : 99999999999,    // Display thumbnails on opening/closing
        buttons             :   [ '','', '', 'close' ],
        arrows              : false,
        keyboard            : false,
      },
  }); 



  class GlitchEffect {
    constructor() {
      this.root = document.body
      this.cursor = document.querySelector(".curzr")
  
      this.distanceX = 0, 
      this.distanceY = 0,
      this.pointerX = 0,
      this.pointerY = 0,
      this.previousPointerX = 0
      this.previousPointerY = 0
      this.cursorSize = 25
      this.glitchColorB = '#00feff'
      this.glitchColorR = '#ff4f71'
  
      this.cursorStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        top: `${ this.cursorSize / -2 }px`,
        left: `${ this.cursorSize / -2 }px`,
        zIndex: '2147483647',
        width: `${ this.cursorSize }px`,
        height: `${ this.cursorSize }px`,
        backgroundColor: '#222',
        borderRadius: '50%',
        boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
        transition: '100ms, transform 100ms',
        userSelect: 'none',
        pointerEvents: 'none'
      }
  
      if (CSS.supports("backdrop-filter", "invert(1)")) {
        this.cursorStyle.backdropFilter = 'invert(1)'
        this.cursorStyle.backgroundColor = '#fff0'
      } else {
        this.cursorStyle.backgroundColor = '#222'
      }
  
      this.init(this.cursor, this.cursorStyle)
    }
  
    init(el, style) {
      Object.assign(el.style, style)
      this.cursor.removeAttribute("hidden")
      
    }
  
    move(event) {
      this.previousPointerX = this.pointerX
      this.previousPointerY = this.pointerY
      this.pointerX = event.pageX + this.root.getBoundingClientRect().x
      this.pointerY = event.pageY + this.root.getBoundingClientRect().y
      this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
      this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)
  
      if (event.target.localName === 'button' || 
          event.target.localName === 'a' || 
          event.target.onclick !== null ||
          event.target.className.includes('curzr-hover')) {
        this.hover()
      } else {
        this.hoverout()
      }
  
      this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
      this.cursor.style.boxShadow = `
        ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB}, 
        ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
      this.stop()
    }
  
    hover() {
    }
  
    hoverout() {
    }
  
    click() {
      this.cursor.style.transform += ` scale(0.75)`
      setTimeout(() => {
        this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
      }, 35)
    }
  
    stop() {
      if (!this.moving) {
        this.moving = true
        setTimeout(() => {
          this.cursor.style.boxShadow = ''
          this.moving = false
        }, 50)
      }
    }
  
    remove() {
      this.cursor.remove()
    }
  }
  
  (() => {
    const cursor = new GlitchEffect()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.onmousemove = function (event) {
        cursor.move(event)
      }
      document.onclick = function () {
        cursor.click()
      }
    } else {
      cursor.remove()
    }
  })()
