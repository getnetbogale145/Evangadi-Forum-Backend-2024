const express = require('express')
const router = express.Router()

const {addnewquestion,getallquestions,deleteQuestion, updateQuestion,getQuestionTitleAndDescription,totalQuestion,searchedQuestions} = require('../controller/question')

router.get('/all-questions', (req,res)=>{
      res.send('all-questions is here ')
})


router.post('/new-question', addnewquestion)
router.delete('/delete/:QID',deleteQuestion)
router.get('/getallquestions/:offset/:limit',getallquestions)
router.get('/titdescription/:QuestID',getQuestionTitleAndDescription)
router.put('/update/:QID',updateQuestion)
router.get('/noOfquestion',totalQuestion)
router.post('/searchedquestion',searchedQuestions)


module.exports = router
