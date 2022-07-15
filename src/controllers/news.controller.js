const { Router } = require("express")
const News = require('../models/news.model');

const router = Router()

router.post('/news',  async (req, res) => {
    try{
        const news = await News.create(req.body)
        return res.status(200).send(news)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/news/:id',  async(req, res) => {
    try{
        const news = await News.findById(req.params.id).lean().exec()
        return res.status(200).send(news)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})

router.delete("/news/:id", async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(news);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

router.get('/newses', async(req, res) => {
    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        let totalPages = 0;
        let news
        if(req.query.q) {
             if(req.query.q == 'filter')
            {
                news = await News.find({title: req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await News.find({title: req.query.base}).countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
            }
            else {
                    news = await News.find({block : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await News.find({block : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
        }
        else{
            news = await News.find().skip((page - 1) * limit).limit(limit).lean().exec()
            const totalDocs = await News.find().countDocuments()
            totalPages = (Math.ceil(totalDocs/limit))

        }
        let arr = []
        for(let i = 1; i<=totalPages; i++)
        {
            arr.push(i)

        }
        return res.status(200).send({news, totalPages:arr})
    } catch (error) {
        return req.status(500).send({message : error.message})
    }
})
module.exports = router;