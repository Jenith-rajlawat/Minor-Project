import React from 'react';
import Heading from '../../components/Heading';
import Navigationfeed from '../../components/Navigationfeed';
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { auth } from "../../firebase";
import Distance from '../Distance';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { onSnapshot, query, where } from 'firebase/firestore';



const INFINITY = Number.POSITIVE_INFINITY;

const graph = {
  Mahadevstan: { Koteshwor: 10, Tinkune: 4, Sankhamul: 20 },
  Koteshwor: { Mahadevstan: 10, Balkumari: 15, Sinamangal: 25, Tinkune: 15 },
  Balkumari: { Koteshwor: 15, Gwarko: 15, Sankhamul: 18 },
  Gwarko: { Balkumari: 15, Satdobato: 13, Patan:  10},
  Satdobato: { Gwarko: 13, Ekantakuna: 20, Lagankhel:  10},
  Ekantakuna: { Satdobato: 20, Jhamsikhel: 20, Jwalakhel:  6},
  Jhamsikhel: { Ekantakuna: 20, Balkhu: 5, Sanepa: 7 },
  Balkhu: { Jhamsikhel: 5, Kalanki: 20, Kalimati: 15 },
  Kalanki: { Balkhu: 20, Sitapaila: 15, Kalimati:  20},
  Sitapaila: { Kalanki: 15, Swayambhu: 8, Tahachal: 22 },
  Swayambhu: { Sitapaila: 8, Balaju: 25, Bhagwanpau: 10 },
  Balaju: { Swayambhu: 25, Gongabu: 25, Sorhakhutte: 10, Khusiban: 15 },
  Gongabu: { Balaju: 25, Maharajgunj: 21 },
  Maharajgunj: { Gongabu: 21, Chabahill: 30, Baluwatar: 10 },
  Chabahill: { Maharajgunj: 30, Mitrapark: 3 },
  Mitrapark: { Chabahill: 3, Gaushala: 7 },
  Gaushala: { Mitrapark: 7, Ratopul: 6, Sinamangal: 20, Puranobaneshwor: 8 },
  Sinamangal: { Gaushala: 20, Koteshwor: 25, Puranobaneshwor: 15 },
  Baluwatar: { Maharajgunj: 10, Gyaneshwor: 30, Lazimpat: 25 },
  Lazimpat: { Baluwatar: 25, Ratnapark: 10, Sorhakhutte: 6 },
  Khusiban: { Balaju: 15, Bhagwanpau: 9, Dallu: 7, Sorhakhutte: 11 },
  Ratnapark: { Lazimpat: 10, Newroad: 10, Durbarmarg: 3, Dallu: 15, Bagbazar: 4 },
  Gyaneshwor: { Ratopul: 4, Baluwatar: 30, Durbarmarg: 15 },
  Ratopul: { Gyaneshwor: 4, Gaushala: 6, Maitidevi: 5 },
  Putalisadak: { Bagbazar: 5, Singhadurbar: 8, Maitidevi: 13 },
  Tahachal: { Newroad: 11, Sitapaila: 22, Kalimati: 6, Dallu: 7 },
  Newroad: { Tahachal: 11, Ratnapark: 10, Tripureshwor: 9, Singhadurbar: 10, Maitighar: 10, Bagbazar: 12 },
  Maitidevi: { Ratopul: 5, Putalisadak: 13, Puranobaneshwor: 4, Babarmahal: 17 },
  Puranobaneshwor: { Gaushala: 8, Sinamangal: 15, Maitidevi: 4, Baneshwor: 15 },
  Singhadurbar: { Putalisadak: 8, Newroad: 10, Maitighar: 2 },
  Kalimati: { Balkhu: 15, Kalanki: 20, Tahachal: 6, Tripureshwor: 13 },
  Tripureshwor: { Newroad: 9, Kalimati: 13, Maitighar: 9, Kupondole: 25, Thapathali: 25 },
  Maitighar: { Newroad: 10, Singhadurbar: 2, Tripureshwor: 9, Babarmahal: 8, Kupondole: 15 },
  Baneshwor: { Puranobaneshwor: 15, Tinkune: 8, Sankhamul: 10, Babarmahal: 5 },
  Tinkune: { Baneshwor: 8, Mahadevstan: 4, Koteshwor: 15 },
  Thapathali: { Babarmahal: 6, Sankhamul: 9, Kupondole: 25, Tripureshwor: 25 },
  Gusingal: { Sanepa: 4, Kupondole: 5 },
  Kupondole: { Gusingal: 5, Pulchowk: 6, Thapathali: 25, Tripureshwor: 25 },
  Pulchowk: { Kupondole: 6, Patan: 10, Jwalakhel: 6, Sankhamul: 23 },
  Sankhamul: { Mahadevstan: 20, Baneshwor: 10, Thapathali: 8, Patan: 13, Pulchowk: 23, Balkumari: 18 },
  Sanepa: { Gusingal: 4, Jhamsikhel: 7 },
  Jwalakhel: { Ekantakuna: 6, Lagankhel: 13, Pulchowk: 6 },
  Patan: { Sankhamul: 13, Pulchowk: 10, Lagankhel: 7, Gwarko: 10 },
  Lagankhel: { Patan: 7, Jwalakhel: 13, Satdobato: 10 },
  Durbarmarg: { Bagbazar: 4, Ratnapark: 3, Gyaneshwor: 15 },
  Bagbazar: { Durbarmarg: 4, Putalisadak: 5, Newroad: 12, Ratnapark: 4 },
  Babarmahal: { Maitighar: 8, Maitidevi: 17, Baneshwor: 5, Thapathali: 6 },
  Dallu: { Khusiban: 7, Tahachal: 7, Ratnapark: 15 },
  Bhagwanpau: { Swayambhu: 10, Khusiban: 9 },
  Sorhakhutte: { Khusiban: 11, Balaju: 10, Lazimpat: 6 }

};

const dijkstra = (graph, source, destination) => {
  // Initialize distances and previous nodes for all nodes in the graph
  const distances = {};
  const previous = {};
  const nodes = new Set();

  for (const node in graph) {
    distances[node] = INFINITY;
    previous[node] = null;
    nodes.add(node);
  }

  // Set the distance to the source node to 0
  distances[source] = 0;

  while (nodes.size > 0) {
    // Find the unexplored node with the smallest distance from the source
    let currentNode = null; // change to let
    let currentDistance = INFINITY; // change to let
    for (const node of nodes) {
      if (distances[node] < currentDistance) {
        currentNode = node;
        currentDistance = distances[node];
      }
    }

    // If there is no current node, break out of the loop
    if (currentNode === null) {
      break;
    }

    // Remove the current node from the set of unexplored nodes
    nodes.delete(currentNode);

    // Update the distances of the current node's neighbors based on the current distance to the source
    for (const neighbor in graph[currentNode]) {
      const distance = graph[currentNode][neighbor];
      const totalDistance = distance + currentDistance;
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = currentNode;
      }
    }
  }

  // Use the previous nodes to trace the shortest path from the source to the destination
  const path = [destination];
  let currentNode = destination;
  while (currentNode !== source) {
    path.unshift(previous[currentNode]);
    currentNode = previous[currentNode];
  }

  // Calculate the total distance of the shortest path by summing up the distances between consecutive nodes
  let totalDistance = distances[destination];

  return { path, totalDistance };
};





function MyFeed() {
    const [requests, setRequests] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const user = auth.currentUser;
  const [requestsDistances, setRequestsDistances] = useState([]);


  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserLocation(doc.data().location);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (userLocation) {
      const requestCollectionRef = collection(db, 'donorform');
  
      const fetchData = async () => {
        const data = await getDocs(requestCollectionRef);
        const filteredRequests = data.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .filter(item => item.isapproved === "B")
          .sort((a, b) => {
            if (a.creationDate?.seconds > b.creationDate?.seconds) return 1;
            if (a.creationDate?.seconds < b.creationDate?.seconds) return -1;
            return 0;
          })
          .filter((item) => {
            if (userLocation && item.location) {
              const { totalDistance } = dijkstra(graph, userLocation, item.location);
              return totalDistance <= 30;
            }
            return false;
          });
  
        setRequests(filteredRequests);
  
        const requestsWithDistances = filteredRequests.map((request) => {
          const { totalDistance } = dijkstra(graph, userLocation, request.location);
          return { ...request, totalDistance };
        });
  
        setRequestsDistances(requestsWithDistances);
      };
      fetchData();
    }
  }, [userLocation]);
  
  
  




    const handleApprove = async requestId => {
        try {
            const user = auth.currentUser;

            const requestDocRef = doc(db, 'donorform', requestId);
            await updateDoc(requestDocRef, { isapproved: "C", acceptedBy: user.uid });
            const updatedRequests = requests.map(request => {
                if (request.id === requestId) {
                    return { ...request, isapproved: "C", acceptedBy: user.uid };
                } else {
                    return request;
                }
            });
            setRequests(updatedRequests);



        } catch (error) {
            console.error(error);
        }
        
    };



    const dateFormat = form => {
  
        const unixTime = form.bestbefore.seconds;
        
        if (unixTime && !isNaN(unixTime)) {

          return dayjs.unix(unixTime).format('DD-MM-YYYY');
        } else {
          return 'Invalid date';
        }
      };
    //dayjs.unix(form?.bestbefore?.seconds).format('DD-MM-YYYY hh:mm A')

    

    
    return (

        <div className='app-content'>
            <Navigationfeed />
            <div className='right-view'>
                <Heading />
                <div className='body-wrapper'>
                    <div>
                        {requests.map(form => (
                            <div className='request-order' key={form.id}>
                                    <div className='form-group'>
                                        <label className='request-title'>From</label>:
                                        <label className='request-data'>Donar, {form.donoremail}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Title</label>:
                                        <label className='request-data'>{form.title}</label>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Description</label>:
                                        <label className='request-data description'>{form.description}</label>
                                    </div>
                                    <div className='form-group multi-group'>
                                        <div>
                                            <label className='request-title'>Qty</label>:
                                            <label className='request-data'>{form.qty}</label>
                                        </div>
                                        <div>
                                            <label className='request-title'>Location</label>:
                                            <label className='request-data'>{form.location}</label>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='request-title'>Best Before</label>:
                                        <label className='request-data'>{dateFormat(form)}</label>
                                    </div>
                                    <div className='btn-group'>
                                        <button className='btn btn-accept' onClick={() => handleApprove(form.id)}>Accept</button>
                                        
                                    </div>
                            </div>
                        ))}
                    </div>
                    
                    <div>
                    {requestsDistances.map((request) => (
                        <p key={request.id}>Total distance to {request.location}: {request.totalDistance}</p>
                        ))}

                        
                    </div> 

                </div>
                

            </div>
        </div>



    );
}
export default MyFeed;