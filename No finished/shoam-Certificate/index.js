var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var JSZip = require('jszip');

var content = fs
    .readFileSync(__dirname+"/input.docx","binary");

var zip = new JSZip(content);
var doc = new Docxtemplater().loadZip(zip);
doc.setData({//arry
    "products": [{
        "title":"Duk",
        "name":"DukSoftware",
        "reference":"DS0"
    },{
        "title":"Tingerloo",
        "name":"Tingerlee",
        "reference":"T00"
    }]}); //set the templateVariables
// doc.setData({
//     "firstname":"John",
//     "lastname":"Doe",
//
// });
//
doc.render();

var buf = doc.getZip()
    .generate({type:"nodebuffer"});

fs.writeFileSync(__dirname+"/output.docx",buf);
//window.print();
// fs.writeFileSync(__dirname+"/ans.docx",buf);
// loadFile("input.docx",function(err,content){
//     doc=new DocxGen(content)
//     doc.setData({
//         "products": [{
//             "title":"Duk",
//             "name":"DukSoftware",
//             "reference":"DS0"
//         },{
//             "title":"Tingerloo",
//             "name":"Tingerlee",
//             "reference":"T00"
//         }]}); //set the templateVariables
//     doc.render() //apply them
//     output=doc.getZip().generate({type:"blob"}) //Output the document using Data-URI
//     saveAs(output,"output.docx")
// });
// loadFile=function(url,callback){
//     JSZipUtils.getBinaryContent(url,function(err,data){
//         callback(null,data)
//     });
// }