class Stack {
    constructor(input) {
        this._stackElements = [];
        if (input instanceof Array) {
            this._stackElements = input;
        }
    }

    printNGE(arr = this._stackElements, n = this._stackElements.length) {
        let s = [];
        const res = {};
        s.push(arr[0]);
        for (var i = 1; i < n; i++) {
            if (s.length == 0) {
                s.push(arr[i]);
                continue;
            }
            while ((s.length == 0) == false && s[s.length - 1] < arr[i]) {
                res[`${s[s.length - 1]}`] = arr[i];
                s.pop();
            }
            s.push(arr[i]);
        }
        while (s.length != 0) {
            res[`${s[s.length - 1]}`] = -1;
            s.pop();
        }
        return res;
    }

    peek() {
        return this.isEmpty()
            ? null
            : this._stackElements[this._stackElements.length - 1];
    }

    push(value) {
        this._stackElements.push(value);
        return this;
    }

    computeHistogram(histogram = this._stackElements) {
        let stack = [];
        let max_area = 0;
        let index = 0;
        while (index < histogram.length) {
            if (
                stack.length == 0 ||
                histogram[stack[stack.length - 1]] <= histogram[index]
            ) {
                stack.push(index);
                index += 1;
            } else {
                let top_of_stack = stack.pop();
                let area =
                    histogram[top_of_stack] *
                    (stack.length > 0
                        ? index - stack[stack.length - 1] - 1
                        : index);
                max_area = Math.max(max_area, area);
            }
        }
        while (stack.length > 0) {
            let top_of_stack = stack.pop();
            let area =
                histogram[top_of_stack] *
                (stack.length > 0
                    ? index - stack[stack.length - 1] - 1
                    : index);
            max_area = Math.max(max_area, area);
        }
        return max_area;
    }

    pop() {
        return this.isEmpty() ? null : this._stackElements.pop();
    }

    slidingMaxOfKSubarrays(k) {
        const a = this._stackElements;
        const n = this._stackElements.length;
        let res = [];
        let max_upto = new Array(n);
        let s = [];
        s.push(0);
        for (let i = 1; i < n; i++) {
            while (s.length != 0 && a[s[s.length - 1]] < a[i]) {
                max_upto[s[s.length - 1]] = i - 1;
                s.pop();
            }
            s.push(i);
        }
        while (s.length != 0) {
            max_upto[s[s.length - 1]] = n - 1;
            s.pop();
        }
        let j = 0;
        for (let i = 0; i <= n - k; i++) {
            while (j < i || max_upto[j] < i + k - 1) {
                j++;
            }
            res.push(a[j]);
        }
        return res;
    }

    static fromArray(elements) {
        return new Stack(elements);
    }

    toArray() {
        return this._stackElements.slice();
    }

    sortStack(input = this._stackElements) {
        let tmpStack = [];
        while (input.length > 0) {
            let tmp = input.pop();
            while (tmpStack.length > 0 && tmpStack[tmpStack.length - 1] > tmp) {
                input.push(tmpStack[tmpStack.length - 1]);
                tmpStack.pop();
            }
            tmpStack.push(tmp);
        }
        return tmpStack;
    }

    isEmpty() {
        return this._stackElements.length === 0;
    }

    size() {
        return this._stackElements.length;
    }
}

module.exports = { Stack };
