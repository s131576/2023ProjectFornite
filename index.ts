import axios from 'axios';
import express, { response } from 'express';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('port', 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let apiImages: string[] = [];
let apiWapons: string[] = [];
let apiBackpack: string[] = [];
app.get('/', (req, res) => {
  res.render("landingpage");
});
app.get('/forniteHome', async (req, res) => {
  apiImages = [];
  let fortniteResponse = await axios.get("https://fortnite-api.theapinetwork.com/items/list");
  let record = fortniteResponse.data
  for (let i = 0; i <= record.data.length; i++) {
    let random = Math.floor(Math.random() * record.data.length);
    if (record.data[random].item.type === "outfit") {
      apiImages.push(record.data[random]);
    }
  }
  res.render("forniteHome", {
    avatarImage: apiImages,
  })
});
app.get("/fornite/:id", (req, res) => {
  let id: number = parseInt(req.params.id);
  let forniteone = apiImages[id];
  let aantal = req.body.forniteone;
  console.log(aantal);

  if (!forniteone) {
    res.render("error");
  }
  else {
    res.render('forniteChar', {
      character: forniteone
    });
  }
});
app.get('/favoriet', async (req, res) => {
  apiWapons = [];
  apiBackpack = [];
  let fortniteResponse = await axios.get("https://fortnite-api.theapinetwork.com/items/list");
  let record = fortniteResponse.data
  for (let i = 0; i <= record.data.length; i++) 
  {
    let random = Math.floor(Math.random() * record.data.length);
    if (record.data[random].item.type === "backpack") {
      apiBackpack.push(record.data[random]);
    }
    if (record.data[random].item.type === "pickaxe") {
      apiWapons.push(record.data[random]);
    }
  }
  res.render('favoriet', {
    avatarBackpack: apiBackpack,
    avatarPickaxe: apiWapons
  });
});
app.get('/blacklist', (req, res) => {
  res.render('blacklist');
});
app.get('/login', (req, res) => {
  res.render('login');
})
app.listen(app.get("port"), async () => {
  console.log(`The application has started on : http://localhost:${app.get("port")}`);
});
export { }
