gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');

const updateProgress = (instance) => {
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;
};

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
  
  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
    gsap.fromTo(w, {  x  }, {
      x: xEnd,
      scrollTrigger: { 
        trigger: section, 
        scrub: 1.5 // Increased the scrub value to slow down the animation
      }
    });
  });
}

imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);


const imgContent = document.querySelectorAll('.img-content-hover');

function showImgContent(e) {
  for(var i = 0; i < imgContent.length; i++) {
    x = e.pageX;
    y = e.pageY;
    imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
};

document.addEventListener('mousemove', showImgContent);