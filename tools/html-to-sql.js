// Dependencies ////////////////////////////////////////////
import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'

// Configuration ///////////////////////////////////////////
const srcPath = 'data/book.html'
const dstPath = 'docs/generated-schema.sql'

const sqlHeader = `DROP TABLE IF EXISTS chapter;

CREATE TABLE chapter (
    id CHAPTER PRIMARY KEY,
    body TEXT NOT NULL
  );`

const insertChapterSql = `INSERT INTO words (chapter, body) VALUES`
