const queryClasses = '._8Rm4L.bLWKA.M9sTE.L_LMM.SgTZ1.ePUX4';
let post = null;
let posts = null;
let rect = null;
let author = null;

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
];

const zeStyles = (zePost) => {
  zePost.style.border = '1px solid #00b140';
  zePost.style.position = 'relative';
  zePost.style.marginBottom = '24px';
  zePost.style.borderRadius = '3px';
  zePost.style.zIndex = '1';

  const zeSign = document.createElement('div');
  zeSign.style.transition = 'all 0.15s ease';
  // middle
  setTimeout(() => {
    zeSign.style.top = '-110px';
    zeSign.style.right = '-110px';
    zeSign.style.width = '220px';
    zeSign.style.height = '220px';
  }, 150);
  // final
  setTimeout(() => {
    zeSign.style.top = '-90px';
    zeSign.style.right = '-90px';
    zeSign.style.width = '180px';
    zeSign.style.height = '180px';
  }, 300);

  zeSign.style.position = 'absolute';
  zeSign.style.top = '0';
  zeSign.style.right = '0';
  zeSign.style.width = '0';
  zeSign.style.height = '0';
  zeSign.style.background = '#00b140';
  zeSign.style.borderRadius = '100%';
  zeSign.style.display = 'flex';
  zeSign.style.justifyContent = 'center';
  zeSign.style.alignItems = 'center';
  zeSign.style.cursor = 'pointer';
  zeSign.style.boxShadow = '20px 0 5px 5px rgba(255, 255, 255, 0.7)';
  // zeSign.style.transition = 'all 0.15s ease';
  zeSign.addEventListener('mouseenter', () => {
    setTimeout(() => {
      zeSpan.style.transform = 'rotate(0)';
      zeSign.style.transform = 'scale(1)';
    }, 150);
    zeSpan.style.transform = 'rotate(-15deg)';
    zeSign.style.transform = 'scale(1.15)';
  });
  zeSign.addEventListener('mouseleave', () => {
    zeSpan.style.transform = 'rotate(-5deg)';
    zeSign.style.transform = 'scale(1)';
  });

  const zeSpan = document.createElement('span');
  zeSpan.style.position = 'absolute';
  zeSpan.style.top = '42%';
  zeSpan.style.transform = 'translateY(-60%)';
  zeSpan.style.color = '#fff';
  zeSpan.style.fontSize = '65px';
  zeSpan.style.fontFamily = 'Arial, sans-serif';
  zeSpan.style.fontWeight = '900';
  zeSpan.style.transform = 'rotate(-5deg)';
  zeSpan.style.transition = 'all 0.15s ease';

  const zeTxt = document.createTextNode('Зе!');

  zeSpan.appendChild(zeTxt); // adding text to span
  zeSign.appendChild(zeSpan); // adding span to div
  zePost.appendChild(zeSign);
};

// let firstPostLoaded = false;
const firstPost = () => {
  console.log('first post!!');
  setTimeout(() => {
    post = document.querySelector(queryClasses);
    console.log(post);
    author = post.querySelector('a').getAttribute('href');
    if (author == '/zelenskiy_official/') {
      zeStyles(post);
      // author = null;
      // firstPostLoaded = true;
    } else {
      post.style.border = '2px solid lime';
      console.log('else case');
    }
  }, 1000); // added on 07/01/2022
};

let mainUrl = 'https://www.instagram.com/';
// let canLoadZe = true;

let lastUrl = location.href;
let urlChanged = false;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    urlChanged = true;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  // if (lastUrl == mainUrl) {
  if (location.pathname == '/') {
    // canLoadZe = true;
    // if (!firstPostLoaded) {
    firstPost();
    // }
  }
  // else {
  // canLoadZe = false;
  // firstPostLoaded = false; // hidden in 2022 jan.
  // }
}

window.addEventListener('load', () => {
  // console.log('load');
  if (location.pathname == '/') {
    firstPost();
  }
});

// updated at 21/12/2021
let logoUrl = '/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png';
let logo = 'https://www.instagram.com' + logoUrl;
window.addEventListener('click', (event) => {
  if (location.pathname == '/' && !urlChanged) {
    let targetPath = event.target.innerHTML
      .split(' ')
      .filter((item) => item.includes('src='))
      .join('')
      .slice(5, this.length - 1);
    if (
      event.target.src == logo ||
      event.target.ariaLabel == 'Home' ||
      event.target.parentNode.ariaLabel == 'Home' ||
      targetPath == logoUrl
    ) {
      console.log('match');
      firstPost();
    }
  }
  urlChanged = false; // on second and further clicks url isn't changed
});
// end of updated

let zePosts = null;
window.addEventListener('scroll', () => {
  // console.log(location.pathname);
  // if (canLoadZe && location.pathname == '/') {
  if (location.pathname == '/') {
    rect = post.getBoundingClientRect();
    // console.log(rect.bottom);
    // console.log('scroll');

    // was 300
    if (rect.bottom <= window.innerHeight * 0.7) {
      console.log('next post');

      posts = document.querySelectorAll(queryClasses);
      for (let i = 1; i < posts.length; i++) {
        post = posts[i];
        // post.style.border = `1px solid ${colors[i - 1]}`;
        rect = posts[posts.length - 1].getBoundingClientRect(); // last from the posts

        author = post.querySelector('a').getAttribute('href');
        if (author == '/zelenskiy_official/') {
          post.setAttribute('data-ze-post', 'true');
          // author = null;
        }
      }
    }
    zePosts = document.querySelectorAll('[data-ze-post="true"]');
    if (zePosts.length > 0) {
      // console.log(zePosts);
      for (let i = 0; i < zePosts.length; i++) {
        let data = zePosts[i].getAttribute('data-ze-styles');
        if (
          zePosts[i].getBoundingClientRect().top < window.innerHeight * 0.7 &&
          !data
        ) {
          zeStyles(zePosts[i]); // is being applied several times
          // make apply just once
          zePosts[i].setAttribute('data-ze-styles', 'true');
        }
      }
    }
  }
});
