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
const postDom = qs('#exp-news-body');
const displayEachPost = (data) => {
  data.forEach(x => {
    const { _embedded, title, date, excerpt, link } = x;
    const { source_url } = _embedded[`wp:featuredmedia`][0];
    const myDate = myDateFormat(date);
    const excerptText = getEachWord(excerpt[`rendered`]);
    const postTitle = title[`rendered`];
    const expDomElem = cEl('div', 'class', 'exp_news_card')
    const postCard = `
        <div class="exp_card_img"><img src="${source_url}" alt="Card Image" height="180px"></div>
        <div class="exp_card_content">
          <h3>${postTitle}</h3>
          <time>${myDate}</time>
          ${excerptText}
          <p style="text-align: right;"><a href="${link}">Continue Reading >></a></p>
        </div>
    `
    expDomElem.innerHTML = postCard;
    postDom.appendChild(expDomElem);
    //console.log(excerpt[`rendered`]);
    //console.log(source_url);
  })
}

const latestNews = () => {
  let url = `https://www.expressiveinfo.com/wp-json/wp/v2/posts?categories=1&per_page=4&_embed`;
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
      displayEachPost(data);
    })
    .catch(err => {
      console.log(err);
    })
}
latestNews();

const latestSkills = () => {
  let url = `https://www.expressiveinfo.com/wp-json/wp/v2/posts?categories=1375&per_page=4`;
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
      displayEachPost(data);
    })
    .catch(err => {
      console.log(err);
    })
}
//latestSkills();
