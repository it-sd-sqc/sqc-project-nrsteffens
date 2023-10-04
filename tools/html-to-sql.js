// Dependencies ////////////////////////////////////////////
import { closeSync, openSync, readFileSync, writeFile, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'


// Configuration ///////////////////////////////////////////
const srcPath = 'data/book.html'
const dstPath = 'docs/generated-schema.sql'
const chapterIds = [
  '#GR_Chapter_1',
  '#GR_Chapter_2',
  '#GR_Chapter_3',
  '#GR_Chapter_4',
  '#GR_Chapter_5',
  '#GR_Chapter_6',
  '#GR_Chapter_7',
  '#GR_Chapter_8'
]

const sqlHeader = `DROP TABLE IF EXISTS chapter;

CREATE TABLE chapter (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
  );`

const insertChapterSql = `INSERT INTO chapters (title, body) VALUES`

const extractTitle = function (root, id) {
  const title = root.querySelector(`#${id}`).text
  return title;
}



// Conversion ////////////////////////////////////////////


const src = readFileSync(srcPath, 'utf8');
const domRoot = parse(src)

const chapters = []

chapterIds.forEach (
  (id) => {

    // Extract title
    const title = extractTitle(domRoot, id)

    chapterIds.push({
      title
    })
  }
)

// Output the data as SQL.
const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)
writeFileSync(fd, `('${chapters[0].index()}', '${chapters[0].title}')`)

closeSync(fd)
console.log(domRoot);





  

