/**
 * Created by tinhonng on 12/17/14.
 */
describe('Restful Web Services', function () {

    var reqCase1;
    var reqCase2_1;
    var reqCase2_2;
    var reqCase2_3; //pending--not sure how to write test case for when a client can only one media type

    beforeEach(function () {
        var reqCase1 = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                     'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip'
        };
        var reqCase2_1 = {
            headers: 'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip'
        };
        var reqCase2_2 = {
            headers: 'text/plain; q=0.5, text/html' +
                     'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip'
        };
    });

    it('should prioritize the Accept-* header...general case', function () {
        expect(prioritize(reqCase1)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['fr', 'en'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-*header...with the accept request header missing which the accept request header in this case should be text/html ', function(){
        expect(prioritize(reqCase2_1)).toEqual({
            'accept': ['text/html'],
            'accept-language': ['fr', 'en'],
            'accept-encoding': ['gzip']
        });
    });

    it('should prioritize the Accept-* header...with a list of the accept request headers with q specify', function(){
        expect(prioritize(reqCase2_2)).toEqual({
            'accept': ['text/html', 'text/plain'],
            'accept-language': ['fr', 'en'],
            'accept-encoding': ['gzip']
        });
    });








});