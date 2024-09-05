## 頓挫メモ

Twitter 実況するときにタグが自動で入るようにしたいなぁと考えた。  
Twitter にはハッシュタグを検索した画面でツイートしようとするとタグが自動補完される挙動がある。が、どうも「ポストする」のボタンを押したときはその挙動になって、`N`ショートカットで開くとタグが保持されない。このままだとスマホからは楽にツイートできるが、PC のときは大いに困る。  
なので、PC から実況をしたい自分はどうにか「ハッシュタグをツイートした場合はツイート欄に次からも残るようにする拡張機能」を作りたいと考えた。過去に[TweetDeck に作った機能](https://github.com/zenmaibane/KeepHashTagInTweetDeck)と同じような感じだ。

### 頓挫理由その ① ツイート欄に無理やりテキストを突っ込んでも認識されない。

Textarea で管理されていれば value を突っ込んで～とかができるけど、エディタ部分が自作されている。1 行ごとに生成される DOM は次のような感じだ。

```
<div class="" data-block="true" data-editor="5ghsa" data-offset-key="agedr-0-0">
  <div data-offset-key="agedr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
    <span data-offset-key="agedr-0-0">
      <span data-text="true">テストだよん</span>
    </span>
  </div>
</div>
```

似たような DOM を無理やり生成して突っ込めば見た目上は反映されるが、送信されるときには無視される。外部から無理やり突っ込んだ DOM だし、useState の検知から外れているみたいな挙動をしてそう。

### 頓挫理由その ② `x.com/compose/post?text=hoge`を無理やり開いても体験が悪い

`x.com/compose/post?text=hoge`のように`text`クエリに文言を指定すれば、予めテキストが埋まったツイート欄が開かれるが、どうしても chrome 拡張側だと`window.open`とか`location.href=~~~`するしかなくて、サイトのロードが挟まり実況のテンポが削がれる。`N`ショートカットだったり「ポストする」のボタンを押したときもその URL が開かれる挙動をする。これも Twitter サイト内だったらツイート欄のモーダルが開かれて良い感じに見えるのだが、サイトの`router`を chrome 拡張側からいじれない以上はどうしようもない。

### 頓挫理由その ③ 「ポストする」のボタンを`onClick`するショートカットを作ればよいのでは？と考えたがそう上手くはいかない

「ポストする」のボタンを押せば同等の機能ができるということはそこのイベント発火すればいいじゃんと考えたが、② で書いたように`x.com/compose/post`の URL に遷移するような挙動なため、a タグで作られている。`document.querySelector('[data-testid="SideNav_NewTweet_Button"]').dispatchEvent(new PointerEvent('click'))`みたいなことを書いて実行するも、そう上手くはいかず、実際には ② と同じような挙動をしてしまう。まぁそうか......

ということを試した上で、これ以上のやりかたが思いつかない&もはや実況ツイート専用欄としての iframe を無理やり作って突っ込むみたいになりそうだったので頓挫することにした。うーーーーん、機能自体は本当にほしいからどうにか実現させたい。

<div align="center">
  <br>
 <img src="https://raw.githubusercontent.com/sinanbekar/browser-extension-react-typescript-starter/main/public/images/extension_128.png" alt="Browser Extension React & TypeScript Starter" width="128">
  <br>
  <h2>
    Browser Extension <br>
    React & TypeScript Starter
    <br>
  </h2>
</div>

<p align="center">A cross-platform (Chrome, Firefox, Edge, Opera, Brave) web browser extension (Manifest V3 and Manifest V2) starter kit with hot reload support, built with React, Typescript, Redux, Vite, ESLint, Prettier, TailwindCSS, Jest and more! </p>
<hr />

<div align="center" >
  <a href="https://github.com/sinanbekar/browser-extension-react-typescript-starter/actions">
    <img src="https://github.com/sinanbekar/browser-extension-react-typescript-starter/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
    &nbsp;
  <a>
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
  </a>
    &nbsp;
  <a href="https://github.com/sinanbekar/browser-extension-react-typescript-starter/blob/main/LICENSE">
    <img src="https://img.shields.io/apm/l/atomic-design-ui.svg" alt="MIT License">
  </a>

</div>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#important-notes">Important Notes</a> ·
  <a href="#license">License</a>
</p>

> 🚀 **NEW** (experimental) Zustand for state management instead Redux, with [`webext-zustand`](https://github.com/sinanbekar/webext-zustand) package. You can try it now on the branch [`experimental-zustand`](https://github.com/sinanbekar/browser-extension-react-typescript-starter/tree/experimental-zustand)

## Features

- **Instant HMR** (hot reload)[^1]
- Write once run on any browser
- Global Redux support with persist option. Effortless communication between content, background, popup, options, and more pages.
- Provides a basic content example and popup, options, and welcome pages with all React
- Latest Manifest V3 support
- Manifest V2 support (beta)
- Dynamic manifest.json
- Includes ESLint configured to work with TypeScript and Prettier
- Includes tests with Jest

#### Built with

- React
- TypeScript
- Redux (toolkit and redux-persist)
- TailwindCSS
- Vite
- Jest
- ESLint
- Prettier
- simple-git-hooks (lightweight husky alternative)
- nano-staged

[^1]: While it is fully supported and stable in most cases, hard reloading is rarely recommended.

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Brave](https://raw.github.com/alrra/browser-logos/master/src/brave/brave_48x48.png)](/) |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ✔                                                                                             | ✔ (Beta)                                                                                         | ✔                                                                                       | ✔                                                                                          | ✔                                                                                          |

## Quick Start

Ensure you have

- [Node.js](https://nodejs.org) 16 or later installed
- [Yarn](https://yarnpkg.com) installed

### Use the Template

#### GitHub Template

[Create a repo from this template on GitHub](https://github.com/sinanbekar/browser-extension-react-typescript-starter/generate).

**_or_**

#### Clone to local

If you prefer to do it manually with the cleaner git history

> **Note** If you don't have yarn installed, run: npm install -g yarn

```bash
npx degit sinanbekar/browser-extension-react-typescript-starter my-web-extension
cd my-web-extension
git init
```

Then run the following:

- `yarn install` to install dependencies.
- `yarn dev` to start the development server.
- `yarn build` to build an unpacked extension.

- **Load extension in Chrome (Chromium, Manifest V3)**

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension` button.
  - Select your `dist` folder in the project root.

- **Load extension in Firefox (Manifest V2)**

  - Go to the browser address bar and type `about://debugger`
  - Click on the `Load Temporary Add-on` button.
  - Select your `dist-firefox-v2` folder in the project root.

### Available Commands

- `yarn clean` to remove dist folder. `dev` and `build` commands call this command.
- `yarn format` to fix code with eslint and prettier.
- `yarn lint` to call ESLint and Prettier.
- `yarn test` for testing.

### Redux

You can use redux (redux-toolkit) as state manager between popup, background, content and custom pages. Read the documentation for more.

#### [@eduardoac-skimlinks/webext-redux](https://github.com/eduardoacskimlinks/webext-redux)

### Bundling

#### [@crxjs/vite-plugin](https://github.com/crxjs/chrome-extension-tools)

> **Note** This plugin powers the development side of this starter.
>
> docs: https://crxjs.dev/vite-plugin
>
> Special thanks to [@jacksteamdev](https://github.com/jacksteamdev) and contributors for this amazing plugin.

## Contributing

This repository is following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

## License

MIT © [Sinan Bekar](https://sinan.engineer)
