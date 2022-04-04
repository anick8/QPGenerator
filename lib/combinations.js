var Math = require('math');
var findAllSublists = (list) => { // function to find all sublists of an array
    var combinations = [];
    var temp= [];
    var combiLen = Math.pow(2, list.length);
        for (var i = 0; i < combiLen ; i++){
            temp= [];
            for (var j=0;j<list.length;j++) {
                if ((i & Math.pow(2,j))){ 
                    temp.push(list[j])
                }
            }
            if (temp !== []) {
                combinations.push(temp);
            }
        }
        return combinations;
}

var getSum = (sublists,target) => {
    var output = [];
    var greatestlist = [];
    var greatest =0;
    for(list of sublists){
        var sum = list.reduce(function(a, b){ return a + b;}, 0); // find the sum of a sub list
        if(sum == target){
            output.push(list) // if the sum is equal to the target, add the sub list to the output
            //break   
        }
        if((sum < target)&&(sum>greatest)){
            greatestlist=list;
            greatest=sum
        }
    }
    
    if(output[0]==undefined){
        return [[greatestlist],greatest];
    }
    return [output,target]
}

var findSumCombo = (arr, target) => {
    
    var arr = arr.map(Number)
    var random_item = (items) => {return items[Math.floor(Math.random()*items.length)];} // function to generate random item from array
    var op =[];

    sublists = findAllSublists(arr)
    op = getSum(sublists,target) // find the subist that matches the target
    

    return [random_item(op[0]),op[1]]
}

exports.findSumCombo = findSumCombo;