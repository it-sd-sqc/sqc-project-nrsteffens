// Dependencies ////////////////////////////////////////////
import { closeSync, openSync, readFileSync, writeFile, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'


// Configuration ///////////////////////////////////////////
const srcPath = 'C:/Users/nstef/Documents/CVTC/SQC/sqc-project-nrsteffens/data/book.html'
const dstPath = 'C:/Users/nstef/Documents/CVTC/SQC/sqc-project-nrsteffens/data/generated-schema.sql'

const src = readFileSync(srcPath, 'utf8');
const domRoot = parse(src)

const chapterClass = domRoot.querySelectorAll('.pginternal > span')



const sqlHeader = `DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    chapter text not null
  );`


const insertStatements = [];

for (let i = 0; i < chapterClass.length; i++) {
  const insertChapterSql = `INSERT INTO chapters (chapter)  VALUES ('${chapterClass[i].innerText}');` 

  insertStatements.push(insertChapterSql);
}

const sqlInsertStatements = insertStatements.join('\n')

writeFileSync(dstPath, sqlHeader, 'utf8')
writeFileSync(dstPath, sqlInsertStatements, { encoding: 'utf8', flag: 'a' })








  

