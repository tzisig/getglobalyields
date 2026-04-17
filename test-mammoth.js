const mammoth = require("mammoth");

mammoth.convertToHtml({path: "word—imports/Article_TQQQ_International_Tax_Implications.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(html.substring(0, 2000));
        console.log("———————————————————");
        console.log(html.slice(—1000)); // The last 1000 characters
    })
    .catch(console.error);
