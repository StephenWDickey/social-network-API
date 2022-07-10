const { Schema, model } = require('mongoose');
;
const ReactionSchema = require('./Reaction');

const formatDate = require('../utils/formatDate');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Can't post empty Thought!",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  },
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;