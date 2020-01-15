const Swal = require('sweetalert2');
const ace = require('ace-builds/src/ace');
var xml_beautify = require('xml-formatter');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ history: [{ request_parameters: [{}], request_headers: [{}] }], collection: [{ request_parameters: [{}], request_headers: [{}] }] }).write();
const fetch = require("node-fetch");

var body_editor;
var response_editor;
