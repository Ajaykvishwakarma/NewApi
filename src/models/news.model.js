const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema(
    {
        articles: [{
            title: { type: String, required: true},
            description: { type: String, required: true},
            content: { type: String, required: true},
            url: { type: String, required: true},
            image: { type: String, required: true},
            publishedAt: { type: String, required: true},
            source: {
                name: { type: String, required: true},
                url: { type: String, required: true}
            }
        }]
    },
    {
        versionKey : false
        
    }
)

module.exports = mongoose.model('contact', contactSchema)