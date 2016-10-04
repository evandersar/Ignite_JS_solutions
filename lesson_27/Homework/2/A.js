function Counter(count) {
    this.count = count;
}

exports.counter = function (cnt) {
        return new Counter(cnt); 
    }