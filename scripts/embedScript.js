/**
 * 如果你改了这个文件
 * 记得执行一下 minify-js，并且将打包后的文件提交到 git
 */
const PRESET_HEIGHT = 6400;
const scriptSrc = document.currentScript.src;
const scriptURL = new URL(scriptSrc);
const searchParams = scriptURL.searchParams;
// const manual = searchParams.get('manual') === '1';
const ref = searchParams.get('ref');

if (!ref) {
  console.error(`MaxAI embed log: ref is required`);
} else {
  window.MAXAI_EMBED = {
    ref: `partner_${ref}`,
    containerId: 'maxai-embed__0965c92c-2617-11ee-be56-0242ac120002',
    containerDom: null,
    iframeDom: null,
    recordApi: 'https://api.maxai.me/app/ref_count',
    post(url, params) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
    },
    iframeListener(e) {
      if (e.data.type !== 'embed') {
        return;
      }
      const messageHeight = e.data.height;
      if (
        messageHeight &&
        messageHeight > 0 &&
        window.MAXAI_EMBED.containerDom
      ) {
        // set iframe message callback height
        window.MAXAI_EMBED.containerDom.style.height = `${messageHeight}px`;
      }
    },
    iframeOnload() {
      console.log(`maxai iframe onload`);
      window.MAXAI_EMBED.post(window.MAXAI_EMBED.recordApi, {
        data: {
          ref: `[iframe]_${window.MAXAI_EMBED.ref}`,
          date: new Date().toString(),
        },
      });
    },
    async setContainerDom(id) {
      if (!id) {
        console.error(`MaxAI embed log: setContainerDom id is required`);
        return false;
      }

      let timer = null;
      let rotationCount = 0;
      const rotationCountLimit = 5;

      const finder = (resolve) => {
        const containerDom = document.getElementById(id);
        if (containerDom) {
          this.containerDom = containerDom;
          resolve(true);
        } else {
          rotationCount++;
          if (rotationCount > rotationCountLimit) {
            window.clearInterval(timer);
            resolve(false);
          } else {
            timer = window.setTimeout(() => {
              finder(resolve);
            }, 1000);
          }
        }
        return null;
      };

      return new Promise((resolve) => {
        finder(resolve);
      });
    },
    async initialization() {
      // reset containerId
      if (searchParams.has('containerId')) {
        this.containerId = searchParams.get('containerId');
      }

      const setContainerFlag = await this.setContainerDom(this.containerId);
      if (!setContainerFlag) {
        console.error(
          `MaxAI embed log: no find container element, id: `,
          this.containerId,
        );
        return false;
      }

      return true;
    },
    async startRender() {
      try {
        const initSuccess = await this.initialization();
        if (!initSuccess) {
          return false;
        }

        this.containerDom.style.height = `${PRESET_HEIGHT}px`;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.maxai.me/embed/partner?ref=${this.ref}`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allowFullScreen = 'true';
        iframe.onload = this.iframeOnload;
        this.containerDom.appendChild(iframe);

        window.addEventListener('message', this.iframeListener);
        window.addEventListener('beforeunload', () => {
          window.removeEventListener('message', this.iframeListener);
        });
        return true;
      } catch (error) {
        console.error(`MaxAI embed log: startRender error: `, error);
        return false;
      }
    },
    // async createEmbed(containerId) {
    //   if (!containerId) {
    //     console.error(`MaxAI embed log: createEmbed containerId is required`);
    //     return false;
    //   }
    //   this.containerId = containerId;
    //   const success = await this.startRender();
    //   return success;
    // },
  };

  // if (!manual) {
  //   window.MAXAI_EMBED.startRender();
  // }

  console.log(`script onload`);
  try {
    window.MAXAI_EMBED.post(window.MAXAI_EMBED.recordApi, {
      data: {
        ref: `[script]_${window.MAXAI_EMBED.ref}`,
        date: new Date().toString(),
      },
    });
  } catch (error) {}
}
