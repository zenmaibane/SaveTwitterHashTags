import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

proxyStore.ready().then(async () => {
  // Note:DOMが構築されるまで待つ
  await sleep(3000);
  const tweetBoxClassName = '.public-DraftStyleDefault-block';
  const tweetDom = document.querySelector(tweetBoxClassName);
  console.log(tweetDom);
  // debugger;
  const postButtonDataTestId = 'tweetButtonInline';
  // const tw = twind(config, sheet);
  // observe(tw, shadowRoot);

  // const shadowWrapper = document.createElement('div');
  // shadowWrapper.id = 'root';
  // shadowWrapper.style.display = 'contents';
  // shadowRoot.appendChild(shadowWrapper);

  console.log('あくあ色パレット');
});

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time)); //timeはミリ秒
