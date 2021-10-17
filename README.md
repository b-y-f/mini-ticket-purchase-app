---
Project Name: mini-ticket-purchase-app-2021
Front-End: Reactsn
---

# how to start dev
```
npm i 
npm start
```

# Client

## Website Logic

When user enter the URL of the website, he will be navigate to`TicketPage.jsx` and he could browse all those available events as well as event details and add the ticket they want to buy,  the cart will be holding the selected ticket state. 


This is CartContext should be like, use context to globally manage the shopping cart could be easier than redux in small app. When I have all those data, then I can get total cost for this guest. 

```json
[{
    id:"e0"
    title:"ddd",
    discount: 0.13, // if not defined
    tickets:[{  //user selected tickets
        id:'t0',
        type:"students",
        unit: 19.99,
        qty:1
    },{
        id:'t1',
        type:"adult",
        unit:30.99,
        qty:2
    }]
},{
    ...
}]
    ...
// to 1 dimention array    
    
[{
    id:'123',
    qty: 2,
    event:'ewqe',
    discount:0.12,
    
}]
```







### Login

Simple google login and use user information to retrieve & storage bookings.

use private and public router to redirection authenticated user to the ticket purchase page.

### Events List

Single page show a list of available events , uses MUI cards, separate date time, show you have booked for number of ticket.

Click one of the event user would navigated to ticket page for that specific event. 


### Event Booking

Material Cards to contain event descriptions url, head picture, time etc.

Ticket price,  show totally cost by user add more ticket, after user hit submit button booking date, tickets number, 



### TODO: Query With GraphQL

use `useQuery` and `gql` execute each query and get the response.

When event item button's clicked, should use lazyQuery to fetch that event, once result fetched render with useEffect. 

Use `useMutation` to create and update event data.

``````js
// use below to get detail of single event dynamically
gql`
query findEventById ($id:String!){
	fineEvent(id:$id){
		xxx
		yyy
	}
}`

// set state after get that data 
useEffect(() => {
    if (result.data) {
      setEvent(result.data.xxx)
    }
  }, [result])

// create event
const [ createEvent ] = useMutation(event)
// on submit
createEvent({variables: {...vars}})

// then render
``````



# TODO : Server



Schema for mogooDB

```js
Event {
  title:String,
	totalTicket:{
    type:Int,
    required:true,
  },
	reservedTicket:{
    type:Int,
    default:0
  },
	eventDate:Date,
	desc: String,
  location:{
    ...
  }
}
```

Schema for server

```js
type Event {
	id:ID!
	totalTicket:Int!
	reservedTicket
	title:String
	eventDate:Date
	desc: String
	createdBy:String // in future reference to creator object to check more their events
}

// each query likes a API
type Query {
	eventCount: Int!
	fetchAllEvents: [Event!]!
	seatsForEvent(evtId:String!):Event
}
```











# TODO : GraphQL Notes



get the particular data really needed, all the communication through HTTP POST to the same URL, 

```
// this could find all the event from a event provider
query FetchEventsByCreator{
	creator('id':'xxx'){
		allData
	}
}
```

It could also convert series field inside object to object within object type for further use by adding a resolver(help execute query) to add the sub.

```
type eventCreator {
	name:String!
	joinDate:Date!
}
```




TODO: add seat choice function

```
seats:{
		seatMode: Bool
		avaible:[String]
		reversed:[String]
	}
