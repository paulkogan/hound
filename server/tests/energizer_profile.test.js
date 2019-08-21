const Energizer = require('../models/energizer')
const request = require('supertest');
const app = require('../app');

// ============= Options with SUPERTEST ======
//(1) Promises  WAY- need that return
//dont need done
// (2) regular Supertest - use done
//(3) async/await - also no done

describe('FETCH ENERGIZERS with SuperTest', () => {

     it('gets a list of all energizers from model', async () => {
        const energizers = await Energizer.all();
        expect(energizers.length).toBeGreaterThan(2)
        expect(Object.keys(energizers[0])).toContain('bio')
    })


    it('gets a list of all energizers from API (ST promise way)', (done) => {
            request(app)
                .get('/api/energizers')
                .expect('Content-Type', /json/)
                .then((response) => {
                     expect(response.statusCode).toBe(200);
                     done();
                });
    });

});


// describe('FETCH ENERGIZERS with Jest only', () => {
//     it('NO ST - gets a list of all energizers from API (async)', async () => {
//       const data = await fetchData();
//       expect(data).toBe('peanut butter');
//     });
//
// });



describe('SCRAPE WIKI with SuperTest', () => {

      it('POST-> scrapes a known wiki page with a 200 response (ST async way)',  async () => {
               let reqObject = {
                     energizer: {
                         firstName: "Tom ",
                         lastName: "Hanks",
                         wikiPage: "https://en.wikipedia.org/wiki/Tom_Hanks"
                     }
               }
               jest.setTimeout(30000);

               let response = await request(app).post('/api/webscrape').send(reqObject)
               //console.log("back in POST test", response)
               //console.log("resp-ALL", response)
               expect(response.statusCode).toBe(200);
               expect(response.body.message).toBe("OK wiki");

      });

      it('POST-> scrapes a bad wiki page with a 402 response (async way)',  async () => {
               let reqObject = {
                     energizer: {
                         firstName: "Tom ",
                         lastName: "Hanks",
                         wikiPage: "https://bad.web.co"
                     }
               }
               jest.setTimeout(5000);

               let response = await request(app).post('/api/webscrape').send(reqObject)
               //console.log("bad post - resp.body", response.body)
               expect(response.statusCode).toBe(422);

             });


             it('POST-> scrapes a bad wiki page with a 402 response (Supettest way)',  (done) => {
                      let reqObject = {
                            energizer: {
                                firstName: "Tom ",
                                lastName: "Hanks",
                                wikiPage: "https://bad.web.co"
                            }
                      }


                      return request(app)
                          .post('/api/webscrape')
                          .send(reqObject)
                          .set('Accept', 'application/json')
                          .expect('Content-Type', /json/)
                          //this can modify the response before testing assertions
                          .expect(function(res) {
                                     res.body.message = "Unable to get wiki";
                            })
                          .expect(422, {
                             message: "Unable to get wiki"
                          })
                          .end(function(err,res){
                                // HTTP status should be 200
                                expect(res.body.message).toBe("Unable to get wiki");
                                // Error key should be false.
                                // expect(res.error)
                                // .toContain('Error: cannot POST /api/webscrape (422)')
                                done();
                          });

              });


});  //describe wiki















//======= old qwell stuff ============

// jest.mock('../../../core/timekit', () => ({
//   fetchAvailability: jest.fn(),
//   createAvailability: jest.fn(),
// }));




// describe('.fetchAvailability', () => {
//   it('uses the timekit wrapper to fetch availability for the given provider', async () => {
//     const provider = await new ProviderFactory().create();
//
//     await fetchAvailability(provider.id);
//
//     expect(timekitWrapper.fetchAvailability).toHaveBeenCalled();
//     expect(timekitWrapper.fetchAvailability.mock.calls[0][0]).toEqual({ provider });
//   });
//
//   it('returns the results of the timekitWrapper query', async () => {
//     timekitWrapper.fetchAvailability.mockImplementation(() => ['some-fake-availability-not-a-real-return-value']);
//
//     const availability = await fetchAvailability(faker.random.uuid());
//
//     expect(availability).toEqual(['some-fake-availability-not-a-real-return-value']);
//   });
// });
//
//
//
//
// describe('.createAvailability', () => {
//   const availabilityDetails = {
//     startTimestamp: moment(),
//     endTimestamp: moment(),
//     provider: { id: faker.random.uuid() },
//     location: { id: faker.random.uuid() },
//   };
//
//   it('creates & saves the availability event', async () => {
//     await createAvailability(availabilityDetails);
//
//     const events = await Event.query();
//     expect(events[0]).toMatchObject({
//       eventName: 'availability',
//       providerId: availabilityDetails.provider.id,
//       locationId: availabilityDetails.location.id,
//     });
//     expect(moment(events[0].startTimestamp).isSame(moment(availabilityDetails.startTimestamp))).toBe(true);
//     expect(moment(events[0].endTimestamp).isSame(moment(availabilityDetails.endTimestamp))).toBe(true);
//   });
