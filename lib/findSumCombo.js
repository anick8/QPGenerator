exports.findSumCombo = (arr, sum) => { //Find the combination of marks that make up the total for each difficulty level ,f() => findSumCombo(Markslist,TargetMarks)
   
   const output = [];
   const findCombination = (remain, path, start) => {
      if (remain < 0) {
         return;
      }
      if (remain === 0) {
         output.push([...path]);
         return;
      }
      for (let i = start; i < arr.length; i++) {
         findCombination(remain - arr[i], [...path, arr[i]], i);
      }
   }//recursive function that generates the output list of combinations
   findCombination(sum, [], 0);
   console.log(output)
   for( x of output)
   {   
        var xcopy = [...x];
        for (ele of arr) if(x.includes(ele)) x.splice(x.indexOf(ele),1)
        if(x.length==0)
        {
            return xcopy;
        }
    }
} 

