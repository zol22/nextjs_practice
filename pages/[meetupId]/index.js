import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from 'mongodb'; 
import { Fragment } from "react";
import Head from 'next/head'

function MeetupDetails(props) {
  return (
      <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}></meta>
        </Head>
        <MeetupDetail image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
      </Fragment>
  )
}
  // Next.js needs to pre-generate all versions of this dynamic  page in advance for all the supported ids
  export async function getStaticPaths(){
    const client = await  MongoClient.connect('mongodb+srv://Solange:rCztaDGGZ7Zj592l@cluster0.egngl.mongodb.net/meetups?retryWrites=true&w=majority') // this returns a promise, meetup is the database name
    const db = client.db();
    const meetupsCollection = db.collection('meetups'); // create a meetups collection
    const meetups = await meetupsCollection.find({},{ _id:1 }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            },
        }))
    }
  }

  export async function getStaticProps( context){
      //  We need a way to identify each meetup
      const meetupId = context.params.meetupId;
      const client = await  MongoClient.connect('mongodb+srv://Solange:rCztaDGGZ7Zj592l@cluster0.egngl.mongodb.net/meetups?retryWrites=true&w=majority') // this returns a promise, meetup is the database name
      const db = client.db();
      const meetupsCollection = db.collection('meetups'); // create a meetups collection
      const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId),})
      client.close();

      return {
          props: {
              meetupData: {
                  id: selectedMeetup._id.toString(),
                  title: selectedMeetup.title,
                  address: selectedMeetup.address,
                  image: selectedMeetup.image,
                  description: selectedMeetup.description,
              }
          }
      }
  } 


export default MeetupDetails;