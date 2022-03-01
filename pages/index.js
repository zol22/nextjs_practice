import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'
import { Fragment } from "react";

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </Fragment>
  )
}
  export async function getStaticProps() {
    const client = await  MongoClient.connect('mongodb+srv://Solange:rCztaDGGZ7Zj592l@cluster0.egngl.mongodb.net/meetups?retryWrites=true&w=majority') // this returns a promise, meetup is the database name
    const db = client.db();
    const meetupsCollection = db.collection('meetups'); // create a meetups collection
    const meetups = await  meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
              title: meetup.title,
              address: meetup.address,
              image: meetup.image,
              id: meetup._id.toString()
            }))
        },
        revalidate: 1,
    }
  }


export default Homepage