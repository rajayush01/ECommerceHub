import { useState, useEffect } from 'react';
import { Users, Plus, ShoppingCart, MessageCircle, ThumbsUp, ThumbsDown, Crown, Eye, UserCheck, Zap, X, Trash2, Activity } from 'lucide-react';
import data from "../assets/data.json";

export default function SocialShopping() {
  const [activeTab, setActiveTab] = useState('circles');
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedItemForComment, setSelectedItemForComment] = useState(null);
  const [newCircleName, setNewCircleName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [realtimeUpdates, setRealtimeUpdates] = useState([]);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedProductIndex, setSelectedProductIndex] = useState('');


  // Mock data for demo
  const [circles, setCircles] = useState([
    {
      id: 1,
      name: "Family Groceries",
      members: [
        { id: 1, name: "You", email: "you@example.com", role: "owner", avatar: "👤", online: true },
        { id: 2, name: "Sarah", email: "sarah@example.com", role: "member", avatar: "👩", online: true },
        { id: 3, name: "Mike", email: "mike@example.com", role: "member", avatar: "👨", online: false }
      ],
      budget: 450,
      spent: 73.10,
      created: "2 hours ago",
      lastActivity: "5 min ago"
    },
    {
      id: 2,
      name: "Office Supplies",
      members: [
        { id: 1, name: "You", email: "you@example.com", role: "owner", avatar: "👤", online: true },
        { id: 4, name: "Emma", email: "emma@example.com", role: "member", avatar: "👩‍💼", online: true },
        { id: 5, name: "David", email: "david@example.com", role: "viewer", avatar: "👨‍💼", online: true }
      ],
      budget: 400,
      spent: 73.10,
      created: "1 day ago",
      lastActivity: "2 hours ago"
    }
  ]);


  const [sharedCart, setSharedCart] = useState([]);
  useEffect(() => {
    if (!selectedCircle) return;

    const totalSpent = sharedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setCircles(prev =>
      prev.map(circle =>
        circle.id === selectedCircle.id
          ? { ...circle, spent: parseFloat(totalSpent.toFixed(2)) }
          : circle
      )
    );
  }, [sharedCart, selectedCircle]);


  useEffect(() => {
    const TARGET_TOTAL = 73.10;
    const TOLERANCE = 1.00; // +/- 1 dollar acceptable

    const allProducts = Object.values(data).flatMap(category =>
      Object.values(category).flat()
    );


    const validProducts = allProducts.filter(p => p.price && !isNaN(parseFloat(p.price.replace('$', ''))));

    const getRandomCombination = () => {
      const attempts = 500;
      for (let i = 0; i < attempts; i++) {
        const shuffled = [...validProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        const total = selected.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
        if (Math.abs(total - TARGET_TOTAL) <= TOLERANCE) {
          return selected;
        }
      }
      return null;
    };

    const selectedProducts = getRandomCombination();

    if (selectedProducts) {
      const avatars = ["👩", "👤", "👨"];
      const names = ["Sarah", "You", "Mike"];
      const votesArr = [
        { up: 2, down: 0, userVote: "up", status: "approved" },
        { up: 3, down: 0, userVote: null, status: "approved" },
        { up: 0, down: 2, userVote: "down", status: "disputed" }
      ];
      const commentsArr = [
        ["Great choice! - You", "Not sure about the quality. - Mike"],
        ["Seems useful. - Sarah"],
        ["Too expensive - You", "Let’s consider this one. - Sarah"]
      ];

      const cartItems = selectedProducts.map((product, i) => ({
        id: i + 1,
        name: product.title,
        price: parseFloat(product.price.replace('$', '')),
        quantity: 1,
        addedBy: names[i],
        avatar: avatars[i],
        votes: { up: votesArr[i].up, down: votesArr[i].down },
        userVote: votesArr[i].userVote,
        comments: commentsArr[i],
        status: votesArr[i].status,
        image: product.image
      }));

      setSharedCart(cartItems);
    } else {
      console.warn("Couldn't find a 3-product combination close to $73.10");
    }
  }, []);

  const [activityFeed, setActivityFeed] = useState([
    { id: 1, user: "Sarah", action: "added Organic Milk", time: "2 min ago", type: "add" },
    { id: 2, user: "You", action: "removed Organic Milk", time: "1 min ago", type: "remove" },
    { id: 3, user: "Mike", action: "joined", time: "30 sec ago", type: "comment" },
  ]);

  const otherUsers = [
    { name: "Sarah", avatar: "👩" },
    { name: "Mike", avatar: "👨" },
    { name: "Emma", avatar: "👩‍💼" },
    { name: "David", avatar: "👨‍💼" }
  ];

  const getRandomProductFromData = () => {
    const mainCategories = Object.keys(data);
    const randomMain = mainCategories[Math.floor(Math.random() * mainCategories.length)];

    const subCategories = Object.keys(data[randomMain]);
    const randomSub = subCategories[Math.floor(Math.random() * subCategories.length)];

    const products = data[randomMain][randomSub];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    return {
      ...randomProduct,
      parsedPrice: parseFloat(randomProduct.price.replace('$', '')),
      category: randomMain,
      subcategory: randomSub
    };
  };

  const handleClose = () => {
    setShowAddItemModal(false);
  };

  // Real-time simulation
  useEffect(() => {
    let interval;
    if (selectedCircle) {
      interval = setInterval(() => {
        simulateRealtimeActivity();
      }, 2000 + Math.random() * 3000); // Random interval between 4-7 seconds
    }
    return () => clearInterval(interval);
  }, [selectedCircle, sharedCart]);

  const simulateRealtimeActivity = () => {
    const activities = [
      'addItem',
      'voteOnItem',
      'commentOnItem',
      'removeItem',
      'updateQuantity'
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];

    switch (randomActivity) {
      case 'addItem':
        if (Math.random() > 0.7) { // 30% chance
          addRandomItem(randomUser);
        }
        break;
      case 'voteOnItem':
        if (sharedCart.length > 0 && Math.random() > 0.4) { // 60% chance
          voteOnRandomItem(randomUser);
        }
        break;
      case 'commentOnItem':
        if (sharedCart.length > 0 && Math.random() > 0.5) { // 50% chance
          commentOnRandomItem(randomUser);
        }
        break;
      case 'removeItem':
        if (sharedCart.length > 2 && Math.random() > 0.9) { // 10% chance
          removeRandomItem(randomUser);
        }
        break;
      case 'updateQuantity':
        if (sharedCart.length > 0 && Math.random() > 0.8) { // 20% chance
          updateRandomQuantity(randomUser);
        }
        break;
    }
  };

  const addRandomItem = (user) => {
    const randomItem = getRandomProductFromData();

    const newItem = {
      id: Date.now(),
      name: randomItem.title,
      price: randomItem.parsedPrice,
      quantity: Math.floor(Math.random() * 3) + 1, // random quantity between 1–3
      image: randomItem.image,
      addedBy: user.name,
      avatar: user.avatar,
      votes: { up: 0, down: 0 },
      userVote: null,
      comments: [],
      status: "pending"
    };

    setSharedCart(prev => [...prev, newItem]);
    addToActivityFeed(user.name, `added ${randomItem.title}`, "add");
    addRealtimeUpdate(`${user.name} added ${randomItem.title} to cart`);
  };


  const voteOnRandomItem = (user) => {
    const randomItem = sharedCart[Math.floor(Math.random() * sharedCart.length)];
    const voteType = Math.random() > 0.6 ? 'up' : 'down';

    setSharedCart(prev => prev.map(item => {
      if (item.id === randomItem.id) {
        const newVotes = { ...item.votes };
        newVotes[voteType]++;

        // Update status based on votes
        let newStatus = item.status;
        if (newVotes.up >= 2) newStatus = "approved";
        else if (newVotes.down >= 2) newStatus = "disputed";

        return { ...item, votes: newVotes, status: newStatus };
      }
      return item;
    }));

    addToActivityFeed(user.name, `voted ${voteType} on ${randomItem.name}`, "vote");
    addRealtimeUpdate(`${user.name} voted ${voteType} on ${randomItem.name}`);
  };

  const getRandomCommentFromData = () => {
    const Comments = [
      "Great choice!",
      "Do we really need this?",
      "This brand is good quality",
      "Maybe get organic version?",
      "I can get this cheaper elsewhere",
      "Perfect for the recipe",
      "Too expensive IMO",
      "Good deal!",
      "Let's get 2 instead",
      "Healthy option 👍"
    ];
    return Comments[Math.floor(Math.random() * Comments.length)];
  };


  const commentOnRandomItem = (user) => {
    if (sharedCart.length === 0) return;

    const randomItem = sharedCart[Math.floor(Math.random() * sharedCart.length)];
    const randomComment = getRandomCommentFromData();
    const fullComment = `${randomComment} - ${user.name}`;

    setSharedCart(prev => prev.map(item => {
      if (item.id === randomItem.id) {
        return { ...item, comments: [...item.comments, fullComment] };
      }
      return item;
    }));

    addToActivityFeed(user.name, `commented on ${randomItem.name}`, "comment");
    addRealtimeUpdate(`${user.name} commented on ${randomItem.name}`);
  };

  const removeRandomItem = (user) => {
    const randomItem = sharedCart[Math.floor(Math.random() * sharedCart.length)];

    setSharedCart(prev => prev.filter(item => item.id !== randomItem.id));
    addToActivityFeed(user.name, `removed ${randomItem.name}`, "remove");
    addRealtimeUpdate(`${user.name} removed ${randomItem.name} from cart`);
  };

  const updateRandomQuantity = (user) => {
    const randomItem = sharedCart[Math.floor(Math.random() * sharedCart.length)];
    const newQuantity = Math.max(1, randomItem.quantity + (Math.random() > 0.5 ? 1 : -1));

    setSharedCart(prev => prev.map(item => {
      if (item.id === randomItem.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    addToActivityFeed(user.name, `updated quantity of ${randomItem.name}`, "update");
    addRealtimeUpdate(`${user.name} updated ${randomItem.name} quantity to ${newQuantity}`);
  };

  const addToActivityFeed = (user, action, type) => {
    setActivityFeed(prev => [
      { id: Date.now(), user, action, time: "Just now", type },
      ...prev.slice(0, 9)
    ]);
  };

  const addRealtimeUpdate = (text) => {
    setRealtimeUpdates(prev => [
      ...prev.slice(-4),
      { id: Date.now(), text, time: new Date() }
    ]);
  };

  const createCircle = () => {
  if (newCircleName.trim()) {
    const newCircle = {
      id: Date.now(),
      name: newCircleName,
      members: [
        {
          id: 1,
          name: "You",
          email: "you@example.com",
          role: "owner",
          avatar: "👤",
          online: true,
          status: "joined"
        }
      ],
      budget: 400,
      spent: 0,
      created: "Just now",
      lastActivity: "Just now"
    };

    setCircles([...circles, newCircle]);
    setSelectedCircle(newCircle);     // set active
    setSharedCart([]);                // EMPTY cart for new circle
    setActivityFeed([]);              // optional: reset feed
    setRealtimeUpdates([]);           // optional: reset updates
    setNewCircleName('');
    setShowCreateModal(false);
  }
};


  const addItem = () => {
    const item = data?.[selectedMain]?.[selectedSub]?.[parseInt(selectedProductIndex)];

    if (!item?.title || !item?.price) return;

    const newItem = {
      id: Date.now(),
      name: item.title,
      price: parseFloat(item.price.replace('$', '')),
      quantity: 1,
      addedBy: "You",
      image: item.image,
      avatar: "👤",
      votes: { up: 0, down: 0 },
      userVote: null,
      comments: [],
      status: "pending"
    };

    setSharedCart(prev => [...prev, newItem]);
    addToActivityFeed("You", `added ${item.title}`, "add");
    addRealtimeUpdate(`You added ${item.title} to cart`);
    setShowAddItemModal(false);
  };


  const addComment = () => {
    if (newComment.trim() && selectedItemForComment) {
      const fullComment = `${newComment} - You`;

      setSharedCart(prev => prev.map(item => {
        if (item.id === selectedItemForComment.id) {
          return { ...item, comments: [...item.comments, fullComment] };
        }
        return item;
      }));

      addToActivityFeed("You", `commented on ${selectedItemForComment.name}`, "comment");
      addRealtimeUpdate(`You commented on ${selectedItemForComment.name}`);

      setNewComment('');
      setShowCommentModal(false);
      setSelectedItemForComment(null);
    }
  };

  const inviteMember = () => {
  if (inviteEmail.trim() && selectedCircle) {
    const name = inviteEmail.split('@')[0];
    const newMember = {
      id: Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: inviteEmail,
      role: "invited",
      avatar: "✉️",
      online: false,
      status: "pending"
    };

    const updatedCircles = circles.map(circle => {
      if (circle.id === selectedCircle.id) {
        const updatedCircle = {
          ...circle,
          members: [...circle.members, newMember]
        };
        setSelectedCircle(updatedCircle); // Update selectedCircle too
        return updatedCircle;
      }
      return circle;
    });

    setCircles(updatedCircles);
    addToActivityFeed("You", `invited ${newMember.name} to join`, "invite");
    addRealtimeUpdate(`You invited ${newMember.name} to the circle`);
    setInviteEmail('');
  }
};


const acceptInvite = (memberId) => {
  const updatedCircles = circles.map(circle => {
    if (circle.id !== selectedCircle.id) return circle;

    const updatedMembers = circle.members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          status: "joined",
          role: "member",
          avatar: "👤",
          online: true
        };
      }
      return member;
    });

    const updatedCircle = { ...circle, members: updatedMembers };
    setSelectedCircle(updatedCircle); // update view immediately
    return updatedCircle;
  });

  setCircles(updatedCircles);

  const accepted = selectedCircle.members.find(m => m.id === memberId);
  addToActivityFeed("You", `accepted ${accepted?.name}'s join request`, "join");
  addRealtimeUpdate(`${accepted?.name} has joined the circle`);
};



  const voteOnItem = (itemId, voteType) => {
    setSharedCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newVotes = { ...item.votes };
        let newUserVote = item.userVote;

        if (item.userVote === voteType) {
          // Remove vote
          newVotes[voteType]--;
          newUserVote = null;
        } else {
          // Add/change vote
          if (item.userVote && newVotes[item.userVote] > 0) {
            newVotes[item.userVote]--;
          }

          if (item.userVote) {
            newVotes[item.userVote]--;
          }
          newVotes[voteType]++;
          newUserVote = voteType;
        }

        // Update status based on votes
        let newStatus = item.status;
        if (newVotes.up >= 2) newStatus = "approved";
        else if (newVotes.down >= 2) newStatus = "disputed";
        else newStatus = "pending";

        return { ...item, votes: newVotes, userVote: newUserVote, status: newStatus };
      }
      return item;
    }));

    const item = sharedCart.find(i => i.id === itemId);
    addToActivityFeed("You", `voted ${voteType} on ${item?.name}`, "vote");
    addRealtimeUpdate(`You voted ${voteType} on ${item?.name}`);
  };

  const removeItem = (itemId) => {
    const item = sharedCart.find(i => i.id === itemId);
    setSharedCart(prev => prev.filter(item => item.id !== itemId));
    addToActivityFeed("You", `removed ${item?.name}`, "remove");
    addRealtimeUpdate(`You removed ${item?.name} from cart`);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setSharedCart(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    const item = sharedCart.find(i => i.id === itemId);
    addToActivityFeed("You", `updated quantity of ${item?.name}`, "update");
    addRealtimeUpdate(`You updated ${item?.name} quantity to ${newQuantity}`);
  };

  const getTotalCost = () => {
    return sharedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'member': return <UserCheck className="w-4 h-4 text-green-400" />;
      case 'viewer': return <Eye className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'disputed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Social Shopping Circles
                </h1>
                <p className="text-gray-400 mt-1">Shop together, decide together, save together</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-300 text-sm font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('circles')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'circles'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
          >
            My Circles
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'shopping'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
          >
            Group Shopping
          </button>
        </div>

        {/* Circles Tab */}
        {activeTab === 'circles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Shopping Circles</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Circle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {circles.map(circle => (
                <div
                  key={circle.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedCircle(circle);
                    setActiveTab('shopping');
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{circle.name}</h3>
                    <div className="flex items-center space-x-1">
                      {circle.members.slice(0, 3).map(member => (
                        <div key={member.id} className="relative">
                          <span className="text-lg">{member.avatar}</span>
                          {member.online && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
                          )}
                        </div>
                      ))}
                      {circle.members.length > 3 && (
                        <div className="bg-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white">
                          +{circle.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Budget</span>
                      <span className="text-white font-semibold">${circle.budget}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Spent</span>
                        <span className="text-emerald-400 font-semibold">${circle.spent}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(circle.spent / circle.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Created {circle.created}</span>
                      <span className="text-gray-400">Active {circle.lastActivity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping Tab */}
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            {!selectedCircle ? (
              <div className="text-center py-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
                  <Users className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Select a Circle</h3>
                  <p className="text-gray-400">Choose a shopping circle to start collaborative shopping</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Circle Info & Members */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{selectedCircle.name}</h3>
                      <button
                        onClick={() => setSelectedCircle(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Budget</span>
                        <span className="text-white font-semibold">${selectedCircle.budget}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Spent</span>
                          <span className="text-emerald-400 font-semibold">${getTotalCost().toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(getTotalCost() / selectedCircle.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">Members</h4>
                    </div>

                   <div className="space-y-3">
  {selectedCircle.members.map(member => (
    <div key={member.id} className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <span className="text-lg">{member.avatar}</span>
          {member.online && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
          )}
        </div>
        <div>
          <span className="text-white font-medium">{member.name}</span>
          <div className="flex items-center space-x-1">
            {getRoleIcon(member.role)}
            <span className="text-xs text-gray-400 capitalize">
              {member.status === "pending" ? "Invited" : member.role}
            </span>
          </div>
        </div>
      </div>

      {/* Accept button for pending users */}
      {member.status === "pending" ? (
        <button
          onClick={() => acceptInvite(member.id)}
          className="text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600"
        >
          Accept
        </button>
      ) : (
        <div className="text-xs text-gray-400">
          {member.online ? 'Online' : 'Offline'}
        </div>
      )}
    </div>
  ))}
</div>


                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex space-x-2">
                        <input
                          type="email"
                          placeholder="Enter email to invite"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          onClick={inviteMember}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Updates */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <h4 className="text-lg font-bold text-white">Live Updates</h4>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {realtimeUpdates.map(update => (
                        <div key={update.id} className="text-sm text-gray-300">
                          <span className="font-medium">{update.text}</span>
                          <span className="text-gray-500 ml-2">{new Date(update.time).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Shared Cart */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Shared Cart</h3>
                      <button
                        onClick={() => setShowAddItemModal(true)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    {sharedCart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-bold text-white mb-2">Your cart is empty</h4>
                        <p className="text-gray-400">Add items to start collaborative shopping</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sharedCart.map(item => (
                          <div key={item.id} className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 ${getStatusColor(item.status)}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                <span className="font-medium text-white">{item.name}</span>
                              </div>
                              <span className="text-sm text-gray-400">${item.price.toFixed(2)}</span>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {item.votes.up >= 0 && (
                                  <button
                                    onClick={() => voteOnItem(item.id, 'up')}
                                    className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${item.userVote === 'up' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{item.votes.up}</span>
                                  </button>
                                )}
                                {item.votes.down >= 0 && (
                                  <button
                                    onClick={() => voteOnItem(item.id, 'down')}
                                    className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${item.userVote === 'down' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span>{item.votes.down}</span>
                                  </button>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Qty:</span>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                  className="w-16 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                              Added by <span className="font-medium">{item.addedBy}</span>
                            </div>
                            <div className="space-y-2">
                              {item.comments.map((comment, index) => (
                                <div key={index} className="text-gray-300 text-sm">
                                  {comment}
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedItemForComment(item);
                                setShowCommentModal(true);
                              }}
                              className="mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5 inline-block mr-1" />
                              Add Comment
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Activity Feed */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <h4 className="text-lg font-bold text-white">Activity Feed</h4>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {activityFeed.map(activity => (
                        <div key={activity.id} className="text-sm text-gray-300">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                          <span className="text-gray-500 ml-2">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modals */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-4"> Create New Circle</h3>
            <input
              type="text"
              placeholder="Circle Name"
              value={newCircleName}
              onChange={(e) => setNewCircleName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createCircle}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Create Circle
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-md">
            <div className='flex flex-row justify-between'>
              <h3 className="text-2xl font-bold text-white mb-4">Add New Item</h3>
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main category selector */}
            <select
              value={selectedMain}
              onChange={e => setSelectedMain(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select Category</option>
              {Object.keys(data).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>


            {/* Subcategory selector */}
            {selectedMain && (
              <select
                value={selectedSub}
                onChange={e => setSelectedSub(e.target.value)}
                className="w-full mt-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Subcategory</option>
                {Object.keys(data[selectedMain]).map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            )}


            {/* Product selector */}
            {selectedSub && (
              <select
                value={selectedProductIndex}
                onChange={e => setSelectedProductIndex(e.target.value)}
                className="w-full mt-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Product</option>
                {data[selectedMain][selectedSub].map((prod, idx) => (
                  <option key={idx} value={idx}>{prod.title}</option>
                ))}
              </select>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={addItem}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-4">Add Comment</h3>
            <textarea
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4 h-24 resize-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCommentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addComment}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
