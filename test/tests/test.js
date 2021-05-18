'use-strict';

const {FreeSVG, ListResult, RetrieveResult, SearchResult} = require('../../');
const chai = require('chai');
const testUtils = require('../test-utils');

const ENV = testUtils.loadEnvFile();
const {expect} = chai;
const freeSVG = new FreeSVG(ENV.FREE_SVG_BEARER_TOKEN);

function testSVGSchema(value) {
  expect(value.id).to.be.a('number');
  expect(value.thumb).to.be.a('string');
  expect(value.svg).to.be.a('string');
  expect(value.publishDatetime).to.be.a('string');
  expect(value.status).to.be.a('string');
  expect(value.createdAt).to.be.an.instanceof(Date);
  expect(value.createdBy).to.be.a('string');
}

function testLinkDictionarySchema(value) {
  expect(value.first).to.be.a('string');
  expect(value.last).to.be.a('string');

  if (value.prev) expect(value.prev).to.be.a('string');
  else expect(value.prev).to.be.null;
  if (value.next) expect(value.next).to.be.a('string');
  else expect(value.next).to.be.null;
}

function testMetaDictionarySchema(value) {
  expect(value.currentPage).to.be.a('number');

  if (value.from) expect(value.from).to.be.a('number');
  else expect(value.from).to.be.null;

  expect(value.lastPage).to.be.a('number');
  expect(value.path).to.be.a('string');
  expect(value.perPage).to.be.a('number');

  if (value.to) expect(value.to).to.be.a('number');
  else expect(value.to).to.be.null;

  expect(value.total).to.be.a('number');
}

function testSVGListSchema(value) {
  expect(value.data).to.be.an.instanceof(Array);
  value.data.forEach(testSVGSchema);
  testLinkDictionarySchema(value.links);
  testMetaDictionarySchema(value.meta);
}

function testListResult(value) {
  expect(value).to.be.an.instanceof(ListResult);
  testSVGListSchema(value);
}

function testSearchResult(value) {
  expect(value).to.be.an.instanceof(SearchResult);
  testSVGListSchema(value);
}

function testRetrieveResult(value) {
  expect(value).to.be.an.instanceof(RetrieveResult);
  testSVGSchema(value);
}

describe('List controller', () => {
  it('Should list all available SVGs without error', () => {
    return freeSVG.list().then(listResult => {
      testListResult(listResult);
    });
  });
});

describe('Search controller', () => {
  it('Should search available SVGs without error', () => {
    return freeSVG.search({query: 'Borders'}).then(searchResult => {
      testSearchResult(searchResult);
    });
  });
});

describe('Retrieve controller', () => {
  it('Should retrieve SVG without error', () => {
    return freeSVG.retrieve(6999)
    .then(retrieveResult => {
      testRetrieveResult(retrieveResult);
    });
  });
});
