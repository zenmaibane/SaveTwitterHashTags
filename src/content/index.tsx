import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

proxyStore.ready().then(async () => {
  // Note:DOMが構築されるまで待つ
  await sleep(3000);
  const tweetButtonDom = document.querySelector<HTMLAnchorElement>(
    'a[data-testid="SideNav_NewTweet_Button"] '
  );
  console.log(tweetButtonDom);
  console.log('ファンタグレープ女');
  document.addEventListener('keydown', function (e) {
    if (e.key === 'n') {
      console.log('n押したよ');
      // 元あるNを押すとcomposeが開くやつをなくす
      // TODO:今だとn押したら全部反応するからどうにか条件を作る
      // TODO:検索がハッシュタグだったらという条件を作る
      e.preventDefault();
      tweetButtonDom?.click();
    }
  });
});

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time)); //timeはミリ秒
