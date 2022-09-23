var firebase = require('firebase/app');
const { getDatabase, ref, onValue, get, update } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCPTlliO-fk-dtoWylXPSLgK5p4KDzs1Do",
  authDomain: "lab1-43f1f.firebaseapp.com",
  databaseURL: "https://lab1-43f1f-default-rtdb.firebaseio.com",
  projectId: "lab1-43f1f",
  storageBucket: "lab1-43f1f.appspot.com",
  messagingSenderId: "371857379676",
  appId: "1:371857379676:web:8c318cd5f78717c44df199",
  measurementId: "G-S3SDZ11KE4"
};
firebase.initializeApp(firebaseConfig);
const db = getDatabase();




// console.time("async");

async function main() {

  
  
 


  //This listens to changes on data base and runs when detecting variable change.
  onValue(ref(db, "Lab1/Is_On"), (snapshot) => {
    on_or_off = snapshot.val();
    if (on_or_off) {
    
      console.log('Turn LCD on');
    }

    if (!on_or_off) {
      console.log('Turn LCD off');
    }

  });

  ///Want to do if we read from arduino that cable is disconnected
  //then we want to update Is_connected to false on database. else update it back to true
  //This method updates data:
  // update(ref(db,"/Lab1/"),
  // {
  //   Is_connected: false
  // });

   ///Want to do if we read from arduino that KCD is off
  //then we want to update Is_on to false on database. else update it back to true
  //This method updates data:
  // update(ref(db,"/Lab1/"),
  // {
  //   Is_on: false
  // });


  //This will write to the database the temperature.
  const updates = {};
  //here we will get the data from arduino and put it in temperature
  updates["Lab1/Temperature"] = 8;
  update(ref(db), updates);


}

main().then((ret) => {
  if (ret) console.log(ret);
}).catch((err) => {
  if (err) console.error(err);
});


