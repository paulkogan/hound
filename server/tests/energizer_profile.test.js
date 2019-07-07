const Energizer = require('../models/energizer')
const request = require('supertest');
const app = require('../app');




describe('fetch energizers', () => {


     it('gets a list of all energizers from model', async () => {
        const energizers = await Energizer.all();
        console.log("Yo here is one: ", energizers[0].first_name)
        expect(energizers.length).toBeGreaterThan(2)
        expect(Object.keys(energizers[0])).toContain('bio')
    })


    it('gets a list of all energizers from API', async (done) => {
      request(app)
              .get('/api/energizers')
              .set('Accept', 'application/json')
              //.expect('Content-Type', /json/)
              //.expect(res.data.length).toBeGreaterThan(0);
              //.expect(200)
              .end((err,response)=>{
                  console.log("in API test",response)
                  done()
              })


      });

      //  const energizers = await Energizer.all();
      //  console.log(energizers[0].first_name)
      //  expect(energizers.length).toBeGreaterThan(0);


});












// describe('scrape Wiki', () => {
//      it('scrapes a sample wiki page', async () => {
//        request(app)
//        .post('/api/webscrape')
//        .set('Accept', 'application/json')
//        .expect('Content-Type', /json/)
//        .expect(200, done);
//       });
//
//
// });


// export const scrapeWikiUrl = async params => {
//     const result = await apiClient.post(`/api/webscrape/`, params)
//     console.log("IN API, scrape result:", result.data)
//     return result.data.wikiFound
// };





// await Energizer.create({
//     firstName,
//     lastName,
//     occupation,
//     wikiPage,
// });


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
