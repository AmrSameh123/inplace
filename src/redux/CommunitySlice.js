import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tips: [
    { 
      id: "tip-1", 
      author: "Sara Ahmed", 
      track: "frontend", 
      text: "Always use meaningful semantic HTML for better accessibility in non-profit sites.", 
      likedBy: [],
      timestamp: new Date().toISOString()
    },
    { 
      id: "tip-2", 
      author: "Omar Khaled", 
      track: "backend", 
      text: "Caching API responses can save limited server resources for small organizations.", 
      likedBy: ["user-123"], 
      timestamp: new Date().toISOString()
    }
  ],
  opportunityComments: [
    {
      id: "c-1",
      opportunityId: 1,
      opportunityTitle: "Frontend Developer",
      author: "Hamed",
      text: "This opportunity seems perfect for juniors looking for real-world experience!",
      views: 124,
      timestamp: new Date().toISOString()
    }
  ]
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    addTip: (state, action) => {
      state.tips.unshift({
        ...action.payload,
        id: Date.now().toString(),
        likedBy: [],
        timestamp: new Date().toISOString()
      });
    },
    toggleLikeTip: (state, action) => {
      const { tipId, userId } = action.payload;
      const tip = state.tips.find(t => t.id === tipId);
      if (tip) {
        const index = tip.likedBy.indexOf(userId);
        if (index === -1) {
          tip.likedBy.push(userId);
        } else {
          tip.likedBy.splice(index, 1);
        }
      }
    },
    addOpportunityComment: (state, action) => {
      state.opportunityComments.unshift({
        ...action.payload,
        id: Date.now().toString(),
        views: Math.floor(Math.random() * 50) + 1, // Mock initial views
        timestamp: new Date().toISOString()
      });
    },
    editOpportunityComment: (state, action) => {
      const { commentId, newText } = action.payload;
      const comment = state.opportunityComments.find(c => c.id === commentId);
      if (comment) {
        comment.text = newText;
        comment.isEdited = true;
      }
    }
  },
});

export const { addTip, toggleLikeTip, addOpportunityComment, editOpportunityComment } = communitySlice.actions;
export default communitySlice.reducer;
