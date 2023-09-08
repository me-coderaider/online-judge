const getDb=require("../util/database").getDb;
class Problem{
    constructor(title, description, testCases, difficulty){
        this.title=title;
        this.description=description;
        this.problemCode=problemCode;
        this.difficulty=difficulty;

    }
    // adding save method to save/add a problem in the database after connecting to the database
    // i.e. we'll first connect to the database and then add the problem
    save(){
        const db=getDb();

        db.collection('problemsList').insertOne({title: 'Two Sum', description : "given an integer array", problemCode:"pl_twoSum_1", difficulty: "easy"})
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports=Problem;