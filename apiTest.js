fixture('Testcafe API testing')

//Initialize test data
let token = null,
    username = "admin",
    password = "password123",
    bookingId = null,
    firstname = "Behruz",
    lastname = "Uzoqov",
    depositpaid = true,
    totalprice = 100,
    checkin = "2222-02-02",
    checkinFilter = "2222-02-01",
    checkout = "3333-03-03",
    checkoutFilter = "3333-03-04",
    additionalneeds = "wifi",
    additionalneeds2 = "pizza"

// Tests the authentication API
test('Authentication', async (t) => {
   let res = await t.request({
    url : 'https://restful-booker.herokuapp.com/auth',
    method : 'post',
    body : {
       "username" : "admin",
       "password" : "password123" 
    }
   })
   await t.expect(res.status).eql(200)
   await t.expect(res.body.token).typeOf('String')
   token = res.body.token
})

//Get all bookings
test('Gets all bookings', async (t, token) => {
    let res = await t.request({
    url : "https://restful-booker.herokuapp.com/booking",
    method : "GET"
   })
   await t.expect(res.status).eql(200)
   await t.expect(res.body).typeOf('Array')
})

//Create a booking
test('Create booking', async t => {
    let res = await t.request({
        url : `https://restful-booker.herokuapp.com/booking`,
        method : 'POST',
        headers: {
            "Accept":"*/*"
        },
        body: {
            "firstname":firstname,
            "lastname": lastname,
            "totalprice": totalprice,
            "depositpaid": depositpaid,
            "bookingdates" : {
                "checkin" : checkin,
                "checkout": checkout
            },
            "additionalneeds": additionalneeds
        }
    })
    bookingId = res.body.bookingid
    await t.expect(res.status).eql(200)
    await t.expect(res.body.booking.firstname).eql(firstname)
    await t.expect(res.body.booking.lastname).eql(lastname)
    await t.expect(res.body.booking.totalprice).eql(totalprice)
    await t.expect(res.body.booking.depositpaid).eql(depositpaid)
    await t.expect(res.body.booking.bookingdates.checkin).eql(checkin)
    await t.expect(res.body.booking.bookingdates.checkout).eql(checkout)
    await t.expect(res.body.booking.additionalneeds).eql(additionalneeds)

})

// Filter booking by name
test('Filter booking by name', async t => {
    let res = await t.request({
        url : 'https://restful-booker.herokuapp.com/booking',
        method : 'GET',
        headers: {
            "Accept":"*/*"
        },
        params: {
            "firstname": firstname,
            "lastname" : lastname
        }
       })
    await t.expect(res.status).eql(200)
    await t.expect(res.body).typeOf('Array')
    await t.expect(res.body[0].bookingid).eql(bookingId)
})
  
//Filter booking by date
test('Filters bookings by date', async t => {
    let res = await t.request({
        url : 'https://restful-booker.herokuapp.com/booking',
        method : 'GET',
        headers: {
            "Accept":"*/*"
        },
        params:{
            "checkin" : checkinFilter,
            "checkout" : checkoutFilter
        }
       })
    await t.expect(res.status).eql(200)
    await t.expect(res.body[0].bookingid).eql(bookingId) 
})

// Get booking by id
test('Filters bookings by id', async t => {
    let res = await t.request({
        url : `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        method : 'GET',
        headers: {
            "Accept":"*/*"
        }
       })
    //Assert the response body
    await t.expect(res.status).eql(200)
    await t.expect(res.body.firstname).eql(firstname)
    await t.expect(res.body.lastname).eql(lastname)
    await t.expect(res.body.totalprice).eql(totalprice)
    await t.expect(res.body.depositpaid).eql(depositpaid)
    await t.expect(res.body.bookingdates.checkin).eql(checkin)
    await t.expect(res.body.bookingdates.checkout).eql(checkout)
    await t.expect(res.body.additionalneeds).eql(additionalneeds)

})



// Update the booking
test('Update booking', async t => {
    let res = await t.request({
        url : `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        method : 'PUT',
        headers: {
            "Accept" : "*/*",
        },
        auth : {
            "username" : "admin",
            "password" : "password123"
        },
        body : {
            "firstname" : "edited",
            "lastname" : "edited",
            "totalprice" : 1,
            "depositpaid" : false,
            "bookingdates" : {
                "checkin" : checkinFilter,
                "checkout" : checkoutFilter
            },
            "additionalneeds" : additionalneeds2
        }
    })
    //Assert that changes have applied
    await t.expect(res.status).eql(200)
    await t.expect(res.body.firstname).eql("edited")
    await t.expect(res.body.lastname).eql("edited")
    await t.expect(res.body.totalprice).eql(1)
    await t.expect(res.body.depositpaid).eql(false)
    await t.expect(res.body.bookingdates.checkin).eql(checkinFilter)
    await t.expect(res.body.bookingdates.checkout).eql(checkoutFilter)
    await t.expect(res.body.additionalneeds).eql(additionalneeds2)

})

//Partially update the booking
test('Update booking', async t => {
    let res = await t.request({
        url : `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        method : 'PATCH',
        headers: {
            "Accept" : "*/*"
        },
        auth : {
            "username" : "admin",
            "password" : "password123"
        },
        body : {
            "firstname" : firstname,
        }
    })
    await t.expect(res.status).eql(200)
    await t.expect(res.body.firstname).eql(firstname)

})

// Delete the booking
test('Delete the booking', async t => {
    let res = await t.request({
        url : `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        method : 'DELETE',
        auth: {
            username: 'admin', 
            password: 'password123'
        }
    })

    await t.expect(res.status).eql(201)
})

// Ping
test('Check if server is alive', async t => {
    let res = await t.request('https://restful-booker.herokuapp.com/ping')
    await t.expect(res.status).eql(201) 
})

