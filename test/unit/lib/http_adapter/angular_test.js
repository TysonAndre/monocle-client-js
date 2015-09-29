var AngularAdapter = require(LIB_DIR + '/http_adapter/angular');
var Promise = context.Promise || require('bluebird');

describe('Angular Adapter', function() {
    beforeEach(function() {
        this.$http = function() {
            // empty
        };
        sinon.stub(this, '$http').returns(Promise.resolve({anything: 'anything'}));
        this.$window = {
            location: {
                href: '/foo'
            }
        };
        this.$q = Promise;
        this.adapter = new AngularAdapter(this.$http, this.$q, this.$window);
    });

    it('is a constructor', function() {
        AngularAdapter.should.be.a('function');
    });

    describe('request()', function() {
        it('is a function', function() {
            this.adapter.request.should.be.a('function');
        });

        ['get', 'post', 'put', 'patch', 'delete'].forEach(function(method) {
            describe('with http method: ' + method, function() {
                it('makes ' + method + ' request using $http', function() {
                    return this.adapter.request(method, '/foo')
                    .then(function(result) {
                        this.$http.calledWith({
                            url: '/foo',
                            method: method.toUpperCase()
                        });
                    }.bind(this));
                });

                it('formats resolved ' + method + ' response', function() {
                    this.$http.returns(Promise.resolve({
                        data: {
                            body: 'some data'
                        }
                    }));
                    return this.adapter.request(method, '/foo')
                    .then(function(value) {
                        value.should.deep.equal({ body: 'some data'});
                    });
                });

                it('sets content-type header', function() {
                    return this.adapter.request(method, '/foo')
                    .then(function(result) {
                        var expectedContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
                        this.$http.lastCall.args[0].headers.should.have.property('Content-Type', expectedContentType);
                    }.bind(this));
                });

                it('sets ajax header', function() {
                    return this.adapter.request(method, '/foo')
                    .then(function(result) {
                        this.$http.lastCall.args[0].headers.should.have.property('X-Requested-With', 'XMLHttpRequest');
                    }.bind(this));
                });

                describe('timeout', function() {
                    it('defaults to 30s', function() {
                        return this.adapter.request(method, this.path)
                        .then(function(result) {
                            this.$http.lastCall.args[0].should.have.property('timeout', 30000);
                        }.bind(this));
                    });

                    it('can be overwritten', function() {
                        this.adapter.setTimeout(5000);
                        return this.adapter.request(method, this.path)
                        .then(function(result) {
                            this.$http.lastCall.args[0].should.have.property('timeout', 5000);
                        }.bind(this));
                    });
                });

                describe('headers', function() {
                    it('passes content-type header', function() {
                        var expectedContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('Content-Type', expectedContentType);
                        }.bind(this));
                    });

                    it('supports custom header', function() {
                        this.adapter.setHeader('x-custom-test', 'test value');
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-test', 'test value');
                        }.bind(this));
                    });

                    it('supports many custom headers', function() {
                        this.adapter.setHeaders({
                            'x-custom-test-1': 'test value 1',
                            'x-custom-test-2': 'test value 2',
                            'x-custom-test-3': 'test value 3'
                        });
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-test-1', 'test value 1');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-test-2', 'test value 2');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-test-3', 'test value 3');
                        }.bind(this));
                    });

                    it('supports callback function to generate header value', function() {
                        this.adapter.setHeader('x-custom-callback', function() {
                            return 'test value';
                        });
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-callback', 'test value');
                        }.bind(this));
                    });

                    it('supports promise to generate header value', function() {
                        this.adapter.setHeader('x-custom-promise', Promise.resolve('test value'));
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-promise', 'test value');
                        }.bind(this));
                    });

                    it('supports callback function that returns a promise to generate header value', function() {
                        this.adapter.setHeader('x-custom-callback-promise', function() {
                            return Promise.resolve('test value');
                        });
                        return this.adapter.request(method, this.path, this.options, this.body)
                        .then(function(result) {
                            this.$http.calledOnce.should.be.true;
                            this.$http.lastCall.args[0].should.have.property('headers');
                            this.$http.lastCall.args[0].headers.should.have.property('x-custom-callback-promise', 'test value');
                        }.bind(this));
                    });
                });

            });
        });
    });
});
