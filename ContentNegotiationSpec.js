/**
 * Created by tinhonng on 12/17/14.
 */
describe('Restful Web Services', function () {

    var req;

    beforeEach(function () {
        var req = {
            headers: 'Accept: application/json,application/xml;q=0.8 ' +
                     'Accept-Language: fr;q=1.0, en;q=0.5' +
                     'Accept-Encoding: gzip'
        };
    });

    it('should prioritize the Accept header', function () {
        expect(prioritize(req)).toEqual({
            'accept': ['application/json', 'application/xml'],
            'accept-language': ['fr', 'en'],
            'accept-encoding': ['gzip']
        });
    });
});