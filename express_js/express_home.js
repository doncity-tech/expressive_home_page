const qs = (elem) => {
  return document.querySelector(elem);
}
const cEl = (para, att, attValue) => {
  let temp1 = document.createElement(para);
  temp1.setAttribute(att, attValue);
  return temp1;
};

const getEachWord = (myString) => {
  return myString.split(' ').slice(0, 28).join(' ');
}
const myDateFormat = (date) => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let m = date.split('T')[0].split('-')
  return `${month[Number(m[1]) - 1]} ${m[2]}, ${m[0]}`;
}
const displayEachPost = (data, className, type) => {
  let postDom = (type === 'news') ? qs('#exp-news-body') : qs('#exp-skill-body');
  data.slice(0, 4).forEach(x => {
    const { _embedded, title, date, excerpt, link } = x;
    const { source_url } = _embedded[`wp:featuredmedia`][0];
    const myDate = myDateFormat(date);
    const excerptText = getEachWord(excerpt[`rendered`]);
    const postTitle = title[`rendered`];
    const expDomElem = cEl('div', 'class', className);
    const postCard = `
        <div class="exp_card_img"><img src="${source_url}" alt="Card Image" height="180px"></div>
        <div class="exp_card_content">
          <h3>${postTitle}</h3>
          <time>${myDate}</time>
          ${excerptText}...
          <p style="text-align: right;" class="exp-more-read"><a href="${link}">
            Continue Reading <i class="fa-solid fa-angles-right" style="font-size: 12px"></i>
          </a></p>
        </div>
    `
    expDomElem.innerHTML = postCard;
    postDom.appendChild(expDomElem);
  })
}

const fetchPosts = (url, className, type) => {
  fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res
    })
    .then((res) => { return res.json() })
    .then(data => {
      displayEachPost(data, className, type);
    })
    .catch(err => {
      console.log(err);
    })
}

const newsURL = "https://www.expressiveinfo.com/wp-json/wp/v2/posts?categories=1&_embed";
const skillURL = "https://www.expressiveinfo.com/wp-json/wp/v2/posts?categories=1375&_embed";
fetchPosts(newsURL, 'exp_news_card', 'news');
fetchPosts(skillURL, 'exp_skill_card', 'skill');

//Handle top new
const topNews = () => {
  let url = 'https://www.expressiveinfo.com/wp-json/wp/v2/posts?categories=1380';
  fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res
    })
    .then((res) => { return res.json() })
    .then(data => {
      qs('#exp_marquee').innerHTML = data[0].title.rendered;
    })
    .catch(err => {
      console.log(err);
    })
}
topNews();