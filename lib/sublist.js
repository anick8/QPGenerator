
var findAllSublists = (l) => { // function to find all sublists of an array
    lists = [[]]
    for (i =0;  i< (l.length + 1); i++){
        for (j=0 ; j<i; j++){
            l1=l.slice(j,i)
            if(l1.length>0)lists.push(l1)
        }
    }
    return lists
}

var findSumCombo = (arr, target) => {
    
    var arr = arr.map(Number)
    var random_item = (items) => {return items[Math.floor(Math.random()*items.length)];} // function to generate random item from array
    var output = [];

    sublists = findAllSublists(arr)

    
    for(list of sublists){
        var sum = list.reduce(function(a, b){
            return a + b;
        }, 0); // find the sum of a sub list
        if(sum == target){
            output.push(list) // if the sum is equal to the target, add the sub list to the output
            break 
        }
    }
    console.log(output)
    if(output[0]==undefined)return [0]
    return output[0]
}
exports.findSumCombo = findSumCombo;
























/*sum=0
        if(list.length>0){
            for(item of list){
                sum += item
            }
            console.log(sum)
            if(sum == target){
                console.log(list)
                output.push(list) // if the sum is equal to the target, add the sub list to the output
            }
        }*/
        /*CREATE TABLE "QuestionTable" (
            "QuestionUUID" Varchar,
            "Question" Varchar,
            "Subject" Varchar,
            "Topic" Varchar,
            "Marks" Varchar,
            "Difficulty" Varchar,
            PRIMARY KEY ("QuestionUUID"),
            UNIQUE("Question") 
          
          );*/