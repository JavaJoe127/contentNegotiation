/**
 * Created by tinhonng on 12/17/14.
 */
describe('Restful Web Services', function () {

    var reqCase1;
    var reqCase2_1;
    var reqCase2_2;
    var reqCase2_3; //pending--not sure how to write test case for when a client can only one media type
    var reqCase3_1;
    var reqCase3_2;
    var reqCase3_3; // same problem as reqCase 2_3
    var reqCase4_1;
    var reqCase4_2;
    var reqCase4_3; // same problem as reqCase 2_3
    var reqCase5_1;
    var reqCase5_2;
    var reqCase5_3; // same problem as reqCase 2_3

    beforeEach(function () {
        var reqCase1 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                     'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip' +
                     'Accept-Charset: iso-8859-5'
        };
        var reqCase2_1 = {
            headers: 'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip' +
                     'Accept-Charset: iso-8859-5'

        };
        var reqCase2_2 = {
            headers: 'text/plain; q=0.5, text/html' +
                     'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip'+
                     'Accept-Charset: iso-8859-5'
        };
        var reqCase3_1 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                     'Accept-Encoding: gzip' +
                     'Accept-Charset: iso-8859-5'

        };
        var reqCase3_2 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                'Accept-Language: en,en-US,fr;q=0.6' +
                'Accept-Encoding: gzip' +
                'Accept-Charset: iso-8859-5'
        };
        var reqCase4_1 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                'Accept-Language: en,en-US,fr;q=0.6' +
                'Accept-Encoding: gzip'
        };

        var reqCase4_2 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                'Accept-Language: en,en-US,fr;q=0.6' +
                'Accept-Charset: iso-8859-5, unicode-1-1;q=0.8' +
                'Accept-Encoding: gzip'
        };

        var reqCase5_1 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                'Accept-Language: en,en-US,fr;q=0.6' +
                'Accept-Charset: iso-8859-5, unicode-1-1;q=0.8'
        };

        var reqCase5_2 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                'Accept-Language: en,en-US,fr;q=0.6' +
                'Accept-Charset: iso-8859-5, unicode-1-1;q=0.8' +
                'Accept-Encoding: gzip'
        };

    });

    it('should prioritize the Accept-* header...general case', function () {
        expect(prioritize(reqCase1)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['fr', 'en'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-*header...with the accept request header missing which the accept request header in this case should be text/html as default ', function(){
        expect(prioritize(reqCase2_1)).toEqual({
            'accept': ['text/html'],
            'accept-language': ['fr', 'en'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with a list of the accept request headers with q parameter specified', function(){
        expect(prioritize(reqCase2_2)).toEqual({
            'accept': ['text/html', 'text/plain'],
            'accept-language': ['fr', 'en'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with the accept-language request header missing which the accept-language request header in this case should be en as default', function () {
        expect(prioritize(reqCase3_1)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with a list of the accept-language request headers with q parameter specified', function () {
        expect(prioritize(reqCase3_2)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en, en-US, fr'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with the accept-charset request header missing which the accept-charset request header in this case is UTF-8', function () {
        expect(prioritize(reqCase4_1)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en, en-US, fr'],
            'accept-encoding': ['UTF-8'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with a list of the accept-charset request headers with q parameter specified', function () {
        expect(prioritize(reqCase4_2)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en, en-US, fr'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with the aceept-encoding request header missing which in this case we don\'t compress representation ', function () {
        expect(prioritize(reqCase5_1)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en, en-US, fr'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': []
        });
    });


    it('should prioritize the Accept-* header...with a list of the accept-encoding request headers with q parameter specified', function () {
        expect(prioritize(reqCase5_2)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['en, en-US, fr'],
            'accept-charset': ['iso-8859-5'],
            'accept-encoding': ['gzip']
        });
    });



});