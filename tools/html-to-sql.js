// Dependencies ////////////////////////////////////////////
import { closeSync, openSync, readFileSync, writeFile, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'


// Configuration ///////////////////////////////////////////
const srcPath = './data/book.html'
const dstPath = './data/generated-schema.sql'

const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

const chapterClass = domRoot.querySelectorAll('.pginternal > span')


const sqlHeader = `DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  chapter text not null
);

`

// REFACTORED: using only a single INSERT statement might improve performance
let insertChapterSql = ""

for (let i = 0; i < chapterClass.length; i++) {
  let filteredString = chapterClass[i].innerText.replace(/'/g, "''") // you can escape apostrophe characters (') by doubling them ('') in SQL

  insertChapterSql += `\n\t('${filteredString}')`

  if (i + 1 < chapterClass.length) {
    insertChapterSql += ","
  }
}

const sqlInsertStatement = `INSERT INTO chapters (chapter) VALUES ${insertChapterSql};`

writeFileSync(dstPath, sqlHeader, 'utf8')
writeFileSync(dstPath, sqlInsertStatement, { encoding: 'utf8', flag: 'a' })
