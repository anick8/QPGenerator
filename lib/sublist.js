var Math = require('math');
var findAllSublists = (l) => { // function to find all sublists of an array
    lists = [[]]
    for (i =0;  i< (l.length + 1); i++){
        for (j=0 ; j<i; j++){
            l1=l.slice(j,i)
            if(l1.length>0)lists.push(l1)
        }
    }
    console.log(lists)
    return lists
}

var getSum = (sublists,target,output,greatestlist) => {
    var greatest =0;
    for(list of sublists){
        var sum = list.reduce(function(a, b){ return a + b;}, 0); // find the sum of a sub list
        if(sum == target){
            output.push(list) // if the sum is equal to the target, add the sub list to the output
            break 
        }
        if((sum < target)&&(sum>greatest)){
            greatestlist=list;
            greatest=sum
        }
    }
    return output,greatestlist 
}

var findSumCombo = (arr, target) => {
    
    var arr = arr.map(Number)
    var random_item = (items) => {return items[Math.floor(Math.random()*items.length)];} // function to generate random item from array
    var output = [];
    var greatestlist = [];

    sublists = findAllSublists(arr)
    output,greatestlist = getSum(sublists,target,output,greatestlist) // find the subist that matches the target
    
    if(output[0]==undefined){ // if no sublist matches the target, find the sublist that is closest to the target
        return greatestlist;
    }
    
    return random_item(output)
}
console.log(findSumCombo([6,5,4,5],10))
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