const { documentElement: docEl } = document
const { clientWidth } = docEl

docEl.setAttribute('data-scale', true)

const vw = (baseFontSize, psdWidth) => {
  let _baseFontSize = baseFontSize || 100;
  let _psdWidth = psdWidth || 750;

  const doc = document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  // const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  // var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  const dpr = window.devicePixelRatio || 1;
  // var docEl = doc.documentElement;
  // 为了消除安卓dpr乱标的比例
  let rate = 1;
  let scale = 1 / dpr;
  if (isIos) {
    // iOS下不用做什么
  } else if (matches && matches[1] > 534) {
    // 有些兼容环境下, fontSize为100px的时候, 结果1rem=86px; 需要纠正viewport;
    docEl.style.fontSize = _baseFontSize + 'px';
    const div = doc.createElement('div');
    div.setAttribute('style', 'width: 1rem;display:none');
    docEl.appendChild(div);
    const trueWidth = window.getComputedStyle(div).width;
    docEl.removeChild(div);
    // 如果1rem的真实px跟html.fontSize不符. 那么就要加一个rate缩放了;
    if (trueWidth !== docEl.style.fontSize) {
      const trueWidthVal = parseInt(trueWidth, 10);
      rate = _baseFontSize / trueWidthVal;
      scale = scale * rate;
    }
  } else {
    // 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现.
    scale = 1;
  }

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

  // width/750*100, 为了统一rem为0.01rem = 1px
  const setFontSize = function setFontSize() {
    docEl.style.fontSize = _baseFontSize / _psdWidth * docEl.clientWidth * rate + 'px';
  };
  setFontSize();
  window.addEventListener('resize', setFontSize);
}

const flex = (baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534)) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  let scale = 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  docEl.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
};


if (clientWidth >= 750) {
  vw(100, 750);
} else {
  flex();
}