// Dependencies ////////////////////////////////////////////
import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'

// This module uses the CommonJS module format, so we need
// to import it differently.
import pkg from 'svgoban'
const { serialize } = pkg

// Configuration ///////////////////////////////////////////
const srcPath = 'data/book.html'
const dstPath = 'docs/generated-schema.sql'

const sqlHeader = `DROP TABLE IF EXISTS chapter;

CREATE TABLE chapter (
    id CHAPTER PRIMARY KEY,
    body TEXT NOT NULL
  );`

const insertChapterSql = `INSERT INTO words (chapter, body) VALUES`

const gobanConfig = {
    size: 19,
    theme: 'classic',
    coordSystem: 'A1',
    noMargin: false,
    hideMargin: false
  }