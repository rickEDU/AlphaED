"use strict";
class Validator {
    constructor(data) {
        this.data = data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
