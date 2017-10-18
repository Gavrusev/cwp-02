const net = require('net');
const fs = require('fs');
const port = 8124;
const startConnect = 'QA';
const serverOK="ASK";
let questions=[];
const serverNO = 'DEC';
let  currentQuestionIndex = 0;
const qaPath = "./qa.json";
const qaPath = "./qa.json";

const client = new net.Socket();
const fs = require('fs');
let ind = 0;
client.setEncoding('utf8');
 client.on('data',AskQuestions);

client.connect(port, function() {


  fs.readFile(qaPath, function (err, data) {
           if (err) {
               console.log(err);
           }
           else {
               questions = JSON.parse(data);
               mixQuestion();
              console.log('Connected');
     client.write(startConnect);
           }
       });
});



client.on('data', function(data) {

     if (data === servrOK)
         {
             client.write(questions[ind].quesion);
    


     if (data === serverOK)
        {
             client.write(questions[ind].question);

        }
        else
      {
           questions = JSON.parse(data);
            mixQuestion();
            client.write(serverOK);

         for (let i = 0 ; i < questions.length; i ++)
              {
                console.log(questions[i].question);
                console.log(questions[i].true);
                console.log(questions[i].false);
              }

        }
    });
}

else
{
  client.destroy();
}
  });
function mixQuestion() {
    let counter = questions.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = questions[counter];
        questions[counter] = questions[index];
        questions[index] = temp;
    }
}
