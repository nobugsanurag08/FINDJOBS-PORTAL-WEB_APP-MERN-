const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel")
const User = require("../models/userModel")
const moment = require("moment");
router.get("/getalljobs", async(req, res) => {
  
      try {
        // console.log("at 5000")
          const jobs = await Job.find()
          res.send(jobs)
      } catch (error) {
          return res.status(400).json({ error });
      }

});

router.post("/postjob", async(req, res) => {
  
    try {
        const fields =req.body
        const jobs = new  Job(fields);
        await jobs.save();
        // console.log(req.body);

        res.send("job posted successfully")
        // console.log("job posted successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.post("/editjob", async(req, res) => {
    console.log(req.body);
    try {
        const updatedjob = await Job.findOneAndUpdate({_id : req.body._id} , req.body)
        // console.log(updatedjob);
        res.send('Job Updated Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }
   
 });
 router.post("/applyjob", async(req, res) => {

    const {user , job} = req.body

    try {

        const jobDetails = await Job.findOne({_id : job._id})

        const appliedCandidate = {
            userid : user._id ,
            appliedDate : moment().format('MMM DD yyyy')
        }

        jobDetails.appliedCandidates.push(appliedCandidate)

        await jobDetails.save()

        const userDetails = await User.findOne({_id : user._id})

        const appliedJob = {
            jobid : job._id ,
            appliedDate : moment().format('MMM DD yyyy')
        }

        userDetails.appliedJobs.push(appliedJob)

        await userDetails.save()
        res.send('Job Applied Successfully')  
    } catch (error) {
        res.send(error)
    }
});

module.exports=router;