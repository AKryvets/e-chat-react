const chai = require("chai");
const assert = chai.assert;

const v = require("./tests/valid").valid;

describe("Tests for validation.js", function () {
    it('Пустые параметры, ожидаем false', function () {
       assert.equal(v("",""),false)
    });
    it('Параметры 123, 123, ожидаем false', function () {
        assert.equal(v("123","123"),false)
    });
    it('Параметры 123123, 123123, ожидаем false', function () {
        assert.equal(v("123123","123123"),false)
    });
    it('Параметры q, 123, ожидаем false', function () {
        assert.equal(v("q","123"),false)
    });
    it('Параметры q, 123123, ожидаем true', function () {
        assert.equal(v("q","123123"),true)
    });
    it('Параметры qweqvscvq, 123123, ожидаем true', function () {
        assert.equal(v("qweqvscvq","123123"),true)
    });
    it('Параметры qweqvscvq, 123 123, ожидаем false', function () {
        assert.equal(v("qweqvscvq","123 123"),false)
    });
    it('Параметры "", 123 123, ожидаем false', function () {
        assert.equal(v("","123 123"),false)
    });
    it('Параметры qweqvscvq, "", ожидаем false', function () {
        assert.equal(v("qweqvscvq",""),false)
    });
    it('Параметры {}, "", ожидаем false', function () {
        assert.equal(v({},""),false)
    });
    it('Параметры "", "aaaaaa", ожидаем false', function () {
        assert.equal(v({},"aaaaaa"),false)
    });
    it('Параметры "!//*5", "Fsdffa", ожидаем false', function () {
        assert.equal(v("!//*5","Fsdffa"),false)
    });
    it('Параметры "!//*5a", "Fsdffa", ожидаем false', function () {
        assert.equal(v("!//*5a","Fsdffa"),true)
    });
    it('Параметры "11111", "Fsdffa", ожидаем false', function () {
        assert.equal(v("11111","Fsdffa"),false)
    });
    it('Параметры "11111", "111111", ожидаем false', function () {
        assert.equal(v("11111","111111"),false)
    });
    it('Параметры "ərəb", "111111", ожидаем true', function () {
        assert.equal(v("ərəb","111111"),true)
    });
    it('Параметры "FSDFSDF", "111111", ожидаем true', function () {
        assert.equal(v("FSDFSDF","111111"),true)
    });
    it('Параметры "13212313F", "111111", ожидаем true', function () {
        assert.equal(v("13212313F","111111"),true)
    });
    it('Параметры "你好", "111111", ожидаем false', function () {
        assert.equal(v("你好","111111"),false)
    });
    it('Параметры "atilrsa", "111111", ожидаем true', function () {
        assert.equal(v("atilrsa","111111"),true)
    });
    it('Параметры "bb", "1", ожидаем false', function () {
        assert.equal(v("bb","1"),false)
    });
    it('Параметры "bb", "12", ожидаем false', function () {
        assert.equal(v("bb","12"),false)
    });
    it('Параметры "bb", "123", ожидаем false', function () {
        assert.equal(v("bb","123"),false)
    });
    it('Параметры "bb", "1234", ожидаем false', function () {
        assert.equal(v("bb","1234"),false)
    });
    it('Параметры "bb", "12345", ожидаем false', function () {
        assert.equal(v("bb","12345"),false)
    });
    it('Параметры "bb", "123456", ожидаем true', function () {
        assert.equal(v("bb","123456"),true)
    });
    it('Параметры "b", "123456", ожидаем true', function () {
        assert.equal(v("b","123456"),true)
    });
    it('Параметры "AlexandrPred", "123456", ожидаем true', function () {
        assert.equal(v("AlexandrPred","123456"),true)
    });
    it('Параметры "ElenaPred", "123456", ожидаем true', function () {
        assert.equal(v("ElenaPred","123456"),true)
    });
    it('Параметры "Pred", "123456", ожидаем true', function () {
        assert.equal(v("ElenaPred","123456"),true)
    });
});