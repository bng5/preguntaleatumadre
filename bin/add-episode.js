const { readID3Tags } = require('read-id3-tags');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const filePath = process.argv[2];

if (!filePath) {
  console.log('Missing audio file');
  process.exit(1);
}

class Episode {
  constructor () {
    const d = new Date();
    this.filename = '';
    this.data = {
      title: '',
      // fecha: ''
      date: null,
      pubDate: d.toISOString().replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}).*$/, '$1-0300'),
      file: '',
      filesize: 0,
      season:   0,
      episode:  0,
      duration: '',
    };
    this.dir = path.resolve(__dirname, '../posts');
    this.setMedia = this.setMedia.bind(this);
    this.setNumberFromLastEpisode = this.setNumberFromLastEpisode.bind(this);
  }

  formatSeconds (time) {
    if (time < 60) {
      return time;
    }
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;
    var ret = [];
    if (hrs > 0) {
      ret.push(hrs);
    }
    ret.push(String(mins).padStart(2, '0'));
    ret.push(String(secs).padStart(2, '0'));
    return ret.join(':');
  }

  async setMedia (filePath) {
    const { size } = fs.statSync(filePath);
    const data = await readID3Tags(filePath);
    const fileName = path.basename(filePath);
    const date = fileName.replace(/^patum-(\d{4}-\d{2}-\d{2})\.mp3$/, '$1');
    this.data.title = data.title;
    this.data.date = date;
    this.data.file = `/episodios/${fileName}`;
    this.data.filesize = size;
    this.data.duration = this.formatSeconds(data.duration);

    this.filename = `${date}-${data.title.toLowerCase().replace(' ', '_')}.yml`;
  }

  async setNumberFromLastEpisode () {
    const files = fs.readdirSync(this.dir).sort();
    const file = fs.readFileSync(path.join(this.dir, files.pop()), 'utf8');
    const { date, episode, season } = YAML.parse(file);
    this.data.season = season;
    this.data.episode = (episode + 1);
    this.data.date += date.substring(10);
  }

  saveFile () {
    const data = YAML.stringify(this.data);
    fs.writeFileSync(path.join(this.dir, this.filename), data);
  }
}

(async function () {
  const episode = new Episode();
  await episode.setMedia(filePath);
  episode.setNumberFromLastEpisode();
  episode.saveFile();
})();
