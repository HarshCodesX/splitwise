// let obj = {
//     eventName: "birthday",
//     members: ["harsh", "mayur"],
//     expenses: [
//         {
//         whoPaid: "harsh",
//         forWhat: "cake",
//         howMuch: 1000,
//         participants: ["harsh", "mayur"]
//     },
//     {
//         whoPaid: "mayur",
//         forWhat: "food",
//         howMuch: 500,
//         participants: ["harsh"]
//     },
//     {
//         whoPaid: "mayur",
//         forWhat: "decorations",
//         howMuch: 5000,
//         participants: ["harsh", "mayur"]
//     },
    
//     ]
// }

//instead of obj, i will pass id, and find that object by id, which we have to settle
function settle(obj){
  let arr = []; //this
    for(let item of obj.expenses){
        let share = 0;
        let flag = item.participants.includes(item.whoPaid)
        if(flag){
            share = item.howMuch/item.participants.length;
            for(let name of item.participants){
              let str = "" //this
                if(name == item.whoPaid && item.participants.length == 1){
                    str = `${name} will bear the whole expense (${item.howMuch}) for this expense (${item.forWhat})`;
                    arr.push(str);
                }
                else{
                    // console.log(`${name} will pay ${share} to ${item.whoPaid}`) //this
                    if(name == item.whoPaid){
                        continue;
                    }
                    else{
                        str = `${name} will pay ${share} to ${item.whoPaid} for ${item.forWhat}`;
                        arr.push(str)
                    }
                    
                }
            }
        }
        else{
            share = item.howMuch/item.participants.length;
            for(let name of item.participants){
                // console.log(`${name} will pay ${share} to ${item.whoPaid}`);
                str = `${name} will pay ${share} to ${item.whoPaid} for ${item.forWhat}`;
                arr.push(str);
            }
        }
    }
    return arr;
}

module.exports = {settle};





















// settle(obj);


