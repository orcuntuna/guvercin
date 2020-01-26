const remote = require("electron").remote;
const Swal = require('sweetalert2');
const ace = require('ace-builds/src/ace');
var xml_beautify = require('xml-formatter');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { ipcRenderer, ipcMain } = require('electron');
const path = require("path");

const app = remote.app;
const db_path = path.join(app.getPath('home'), "/.guvercin.json");

const adapter = new FileSync(db_path);
const db = low(adapter);

db.defaults({ history: [], collection: [] }).write();
const fetch = require("node-fetch");

var body_editor;
var response_editor;
