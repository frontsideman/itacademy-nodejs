const baseUrl = 'https://fe.it-academy.by/Examples/words_tree/';
const firstFile = 'root.txt';

const isJson = str => {
  try {
    JSON.parse(str);
  } catch (error) {
    return false;
  }
  return true;
}



(() => {
  let phrase = '';

  async function fetchAsync (url) {
    let data;
    try {
      const response = await fetch(url);
      data = await response.text();
    } catch (error) {
      return false;
    }
    if (isJson(data)) {
      const parsedData = JSON.parse(data);
      for (let i=0; i<parsedData.length; i++) {
        await fetchAsync(baseUrl + parsedData[i])
      }
    } else if (typeof data === 'string') {
      phrase = phrase + ' ' + data;
    }
    return phrase;
  }

  (async () => {
    const phrase = await fetchAsync(baseUrl + firstFile);
    const buildPhrase = e => {
      console.log(e.target.className);
      document.querySelector(`.${e.target.className} ~ .solution-container`).innerHTML = phrase.slice(1);
    };
    document.querySelector('.solution1').addEventListener('click', buildPhrase );
  })();
})();



(() => {
  let phrase = '';

  function fetchPromise (url) {
    return fetch(url).then(res => res.text()).then(data => {
      if (isJson(data)) {
        const parsedData = JSON.parse(data);
        let ttt = [];
        for (let i=0; i<parsedData.length; i++) {
          // console.log('---', parsedData[i])
          ttt.push(fetchPromise(baseUrl + parsedData[i]))
          // fetchPromise(baseUrl + parsedData[i]);
        }
  //       Promise.all(ttt).then(responses => responses.forEach(
  //   response => alert(`${response.url}: ${response.status}`)
  // ));
      } else if (typeof data === 'string') {
        phrase = phrase + ' ' + data;
        console.log(phrase)
      }
    }).catch(e => {
      return false;
    })
  }

  fetchPromise(baseUrl + firstFile)
})()






