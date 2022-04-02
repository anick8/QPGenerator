
# Question Paper Generator
A Node.js server that stores questions and relevant metadata.
It Generates a Question Paper given an input of Total Marks and Distribution of Difficulty

Run using -

npm install

npm start (OR) node index.js

I have also added a python test script with a sample JSON data in the test/ folder
Run using-
 
 python3 testAPI.py testData.json

# Routes

## /getQuestionPaper

Generates a Question Paper given the Total number of Marks and the percentage of Easy,Medium and Hard questions
 
Request Body - 
 - req.body.Marks- The Total Marks of the question Paper
 -  req.body.Difficulty.Easy- The percentage of easy questions
 -  req.body.Difficulty.Medium- The percentage of Medium questions
 -  req.body.Difficulty.Hard- The percentage of Hard questions

 
 Response Body -
 res.body.data  - List of Objects containing the questions and their Metadata 



## /insertQuestion

Inserts a question and details into the Database
    
 - req.body.Question - A unique new Question  
 - req.body.Subject - A subject
 - req.body.Topic - A Topic
 - req.body.Marks - Marks in integer
 - req.body.Difficulty - any of ["Easy","Medium","Hard"]

 Response Body - 
 - res.body.data  - Contains the QuestionUUID.

 
# Response Format

{
success :value,
data:{}
}

 - success  : True or False
 - data : Data returned 
 
