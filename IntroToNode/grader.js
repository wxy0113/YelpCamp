function average(num){
    var sum = 0;
    for(var i = 0; i < num.length; i++){
        sum += num[i];
    }
    console.log(sum/num.length);
}

var score = [90, 74, 56, 12, 88];
average(score);