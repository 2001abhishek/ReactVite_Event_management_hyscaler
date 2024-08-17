import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PollSection() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [comment, setComment] = useState('');
  const [pollData, setPollData] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Fetch events from the products collection
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsQuery = query(collection(fireDB, 'products'));
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch poll data from the poll collection
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsQuery = query(collection(fireDB, 'poll'), orderBy('date', 'desc'));
        const pollsSnapshot = await getDocs(pollsQuery);
        const pollsList = pollsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPollData(pollsList);
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPolls();
  }, []);

  // Handle posting a comment
  const handlePostComment = async () => {
    if (!user) {
      toast.error('Please login to post a comment.');
      navigate('/login');
      return;
    }

    if (selectedEvent === '' || comment === '') {
      return toast.error('Please select an event and enter a comment.', {
        position: 'top-center',
        autoClose: 1000,
      });
    }

    const pollEntry = {
      eventId: selectedEvent.id,
      eventName: selectedEvent.title,
      userEmail: user.user.email,
      comment,
      date: new Date().toISOString(),
      replies: [], // Initialize with an empty array for replies
    };

    try {
      await addDoc(collection(fireDB, 'poll'), pollEntry);
      toast.success('Comment posted successfully!', {
        position: 'top-center',
        autoClose: 1000,
      });
      setComment('');
      setSelectedEvent('');
      // Fetch the updated poll data after posting a new comment
      const pollsSnapshot = await getDocs(query(collection(fireDB, 'poll'), orderBy('date', 'desc')));
      const pollsList = pollsSnapshot.docs.map(doc => doc.data());
      setPollData(pollsList);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Handle replying to a comment
  const handleReplyComment = async (pollId) => {
    if (!user) {
      toast.error('Please login to reply to a comment.');
      navigate('/login');
      return;
    }

    if (replyText === '') {
      return toast.error('Please enter a reply.', {
        position: 'top-center',
        autoClose: 1000,
      });
    }

    try {
      const pollDoc = doc(fireDB, 'poll', pollId);
      const poll = pollData.find((p) => p.id === pollId);
      const updatedReplies = [
        ...(poll.replies || []),
        { userEmail: user.user.email, reply: replyText, date: new Date().toISOString() },
      ];

      await updateDoc(pollDoc, {
        replies: updatedReplies,
      });

      toast.success('Reply posted successfully!', {
        position: 'top-center',
        autoClose: 1000,
      });

      setReplyText('');
      setSelectedCommentId(null);

      // Update the local poll data state after replying
      const updatedPollData = pollData.map((p) =>
        p.id === pollId ? { ...p, replies: updatedReplies } : p
      );
      setPollData(updatedPollData);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Poll Section</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Event:</label>
        <select
          value={selectedEvent ? selectedEvent.id : ''}
          onChange={(e) => setSelectedEvent(events.find(event => event.id === e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Thoughts:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Share your thoughts..."
        />
      </div>

      <button
        onClick={handlePostComment}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Post
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Polls:</h2>
        {pollData.length > 0 ? (
          <div className="space-y-4">
            {pollData.map((poll, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-100">
                <p className="text-md"> <span className='font-bold'>{poll.userEmail}</span>  on <span className='font-bold'>{poll.eventName}</span></p>
                {/* <p className="text-sm text-gray-600">{poll.eventName}</p> */}
                <p className="text-md">{poll.comment}</p>
                <p className="text-sm text-gray-500">{new Date(poll.date).toLocaleString()}</p>

                {poll.replies?.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-500">
                      View Replies ({poll.replies.length})
                    </summary>
                    <div className="pl-4 mt-2 space-y-2">
                      {poll.replies.map((reply, i) => (
                        <div key={i} className="bg-gray-200 p-2 rounded-md">
                          <p className="text-sm text-gray-600">{reply.userEmail}</p>
                          <p className="text-md">{reply.reply}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(reply.date).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {selectedCommentId === poll.id ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 border rounded-md"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
                      onClick={() => handleReplyComment(poll.id)}
                    >
                      Reply
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 text-blue-500"
                    onClick={() => setSelectedCommentId(poll.id)}
                  >
                    Reply
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No polls yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default PollSection;
