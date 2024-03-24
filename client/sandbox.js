function* generate(b) {
    let a = 1;
    while(a<=b) {
        yield a++;
    }
};

const arr = [...generate(20)];
console.log(arr);