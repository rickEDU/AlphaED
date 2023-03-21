"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Validator = /** @class */ (function () {
    function Validator(data) {
        this.data = data;
    }
    return Validator;
}());
var StringValidator = /** @class */ (function (_super) {
    __extends(StringValidator, _super);
    function StringValidator(data) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");
        }
        return _super.call(this, data) || this;
    }
    return StringValidator;
}(Validator));
var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator(data) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        return _super.call(this, data) || this;
    }
    return NumberValidator;
}(Validator));
var BooleanValidator = /** @class */ (function (_super) {
    __extends(BooleanValidator, _super);
    function BooleanValidator(data) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        return _super.call(this, data) || this;
    }
    return BooleanValidator;
}(Validator));
