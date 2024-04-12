import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
  } from 'firebase/firestore';
  import { app } from '../firebase';

import PostCard from './PostCard';
  
  const Posts = async() => {
    const db = getFirestore(app);
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return (
      <div>
        {data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  export default Posts; 