import { MongoClient } from 'mongodb';

//  Api endpoint ->  api/new-meetup
// only POST 

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const {title, image, address, descrption } = data ; // fields

        const client = await  MongoClient.connect('mongodb+srv://Solange:rCztaDGGZ7Zj592l@cluster0.egngl.mongodb.net/meetups?retryWrites=true&w=majority') // this returns a promise, meetup is the database name
        const db = client.db();

        const meetupsCollection = db.collection('meetups'); // create a meetups collection
        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        res.status(201).json({message: 'Meetup Inserted!'})
    }

}
export default handler;