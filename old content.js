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

const zeStyles = () => {
  post.style.border = '1px solid #00b140';
  post.style.position = 'relative';
  post.style.zIndex = '1';

  const zeSign = document.createElement('div');
  zeSign.style.position = 'absolute';
  zeSign.style.top = '-90px';
  zeSign.style.right = '-90px';
  zeSign.style.width = '180px';
  zeSign.style.height = '180px';
  zeSign.style.background = '#00b140';
  zeSign.style.borderRadius = '100%';
  zeSign.style.display = 'flex';
  zeSign.style.justifyContent = 'center';
  zeSign.style.alignItems = 'center';
  zeSign.style.cursor = 'pointer';
  zeSign.style.boxShadow = '20px 0 5px 5px rgba(255, 255, 255, 0.7)';
  zeSign.style.transition = 'all 0.15s ease';
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
  post.appendChild(zeSign);
};

const firstPost = () => {
  post = document.querySelector(queryClasses);
  author = post.querySelector('a').getAttribute('href');
  if (author == '/zelenskiy_official/') {
    zeStyles();
    author = null;
  }
  // else {
  //   post.style.border = '2px solid cyan';
  // }
};

let reload = false;
if (window.performance.getEntriesByType('navigation')) {
  p = window.performance.getEntriesByType('navigation')[0].type;
  console.log(p);
  // first load or feed reload
  if (
    (p == 'navigate' && location.pathname == '/') ||
    (p == 'reload' && location.pathname == '/')
  ) {
    console.log('first load or feed reload');
    firstPost();
  }
  // navigate to some other path
  if (p == 'navigate' && location.pathname != '/') {
    reload = true;
    console.log('navigate to some other path', reload);
  }
  // reload some other page
  if (p == 'reload' && location.pathname != '/') {
    reload = true;
    console.log('main page left', reload);
  }
}

window.addEventListener('click', () => {
  if (!reload && location.pathname === '/') {
    firstPost();
    console.log('simple click');
    // post = document.querySelector(queryClasses);
    // console.log(post);
    // post.style.border = '2px solid crimson';
  }
  if (reload && location.pathname === '/') {
    console.log('current case of interest');
    setTimeout(() => {
      firstPost();
    }, 1000);
    reload = false;
  }
});

window.addEventListener('scroll', () => {
  if (location.pathname === '/') {
    rect = post.getBoundingClientRect();
    // console.log(rect.bottom);

    if (rect.bottom <= 300) {
      console.log('next post');

      posts = document.querySelectorAll(queryClasses);
      for (let i = 1; i < posts.length; i++) {
        post = posts[i];
        // post.style.border = `1px solid ${colors[i - 1]}`;
        // rect = post.getBoundingClientRect(); // last from the posts
        rect = posts[posts.length - 1].getBoundingClientRect(); // last from the posts

        author = post.querySelector('a').getAttribute('href');
        if (author == '/zelenskiy_official/') {
          let zeRect = post.getBoundingClientRect();
          console.log('ze rect', zeRect.top);
          zeStyles();
          author = null;
        }
      }
    }
  }
});
