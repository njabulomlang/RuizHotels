export const firebaseConfig = {
    apiKey: "AIzaSyBIbSZRcLlebhJkuav9HOswY2YhS5Civ3k",
    authDomain: "hotel-656ca.firebaseapp.com",
    databaseURL: "https://hotel-656ca.firebaseio.com",
    projectId: "hotel-656ca",
    storageBucket: "hotel-656ca.appspot.com",
    messagingSenderId: "242208875245",
    appId: "1:242208875245:web:f1b9764dc0095102"
  };
  
  export const snapshotToArray = snapshot => {
    let returnArray = [];
  
    snapshot.forEach(element => {
    let list = element.val();
    list.key = element.key;
    returnArray.push(list)
  
    });
  
    return returnArray;
  }
  
  