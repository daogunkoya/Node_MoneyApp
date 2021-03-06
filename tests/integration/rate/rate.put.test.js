const {User} = require('../../../models/user');
const {Rate} = require('../../../models/rate');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe('PUT  /api/rates', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    let id
    
  const exec = () => {
    return request(server)
      .put('/api/rates/' + id)
      .set('x-auth-token', token)
      .send(testData);
  };
  
  beforeEach(async () => { 
            server = require('../../../index'); 

            rateId = mongoose.Types.ObjectId();
            token = new User().generateAuthToken();
            
         
            testData = {        _id:rateId,
                                rate:500,
                                sold_rate:0,
                                bou_rate:0,
                                user_id:0 ,
                                currency_id:1
                            };
                        
              newRate =  await new Rate(testData).save();
            id = newRate._id
        })
    
        afterEach(async () => { 
            
            await Rate.deleteMany();
            await server.close(); 
        });  


            it('Should Return 401 if user is not logged in', async () => {

                token = '';
               const res = await exec();
       
               expect(res.status).toBe(401)
           })
       
            it('Should Return 404 id is not supplied', async () => {   
                        id = ""
                       const res = await exec()
                       expect(res.status).toBe(404)
             }) 

             it('Should Return 404 id is not valid', async () => {   
                id = 1
               const res = await exec()
               expect(res.status).toBe(404) 
            }) 
         
         it('Should Return 404 id given is not found', async () => {   
             delete testData._id
            id = mongoose.Types.ObjectId()
           const res = await exec()
           expect(res.status).toBe(404)
})  
       
           it('Should Update if ID is valid', async () => {
                    delete testData._id
                   const res = await exec();
                   //expect(res.status).toBe(200);
                   expect(res.body).toHaveProperty('_id');
       
           }) 
    

      
})

