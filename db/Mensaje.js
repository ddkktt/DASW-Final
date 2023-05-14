const {mongoose} = require('./connectdb');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        ref: 'User',
        required: true
    },
    projectId: {
        type: String,
        ref: 'Project',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

messageSchema.statics.getMessagesByProjectId = async function (projectId) {
    const query = this.find({ projectId }).populate('sender');
    return await query.exec();
  };

messageSchema.statics.deleteMessagesByProjectId = async function (projectId) {
  return await this.deleteMany({ projectId }).exec();
};

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };

