const axios = require("axios");

const getTheDay = (dates) => {
    
    const week = dates.week < 10 ? "0"+dates.week : dates.week
    const day = "0"+dates.day
    const url = `${process.env.GITHUBPATH}/Full-Time/${week}-Week/${day}-Day/${day}-Day-LessonPlan.md`
    return axios({
        method: 'GET',
        url: url,
        headers: {
            Accept: 'application/vnd.github.v3.raw',
            Authorization: `token ${process.env.AUTH}`
        },
        //responseType: 'stream'
    })
        .then(response => {
            
            let id
            if(response.data.includes("No classroom instruction today.")){
                throw 'no calendar'
            }
            if(response.data.includes('sheets/d/')){
                
                 id = response.data.split('sheets/d/')[1].split('/edit')[0]
            }else{
                id = response.data.split('open?id=')[1].split(")")[0]
            }
            return axios({
                method: 'GET',
                url: `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=Sheet1`
            })

        })
        .then(response => {
            const sheetObject = response.data.split("\n").map(activity => {
                const row = activity.split(",")
                return { Time: row[0].split('"')[1], Number: row[1].split('"')[1], Activity: row[2].split('"')[1], Minutes: row[3].split('"')[1] }
            })
            sheetObject.shift()
            return sheetObject
        })
        .catch(err => {
            
            if(err = "no calendar"){
             return "no calendar"   
            }
            console.log(err)
            return 'there was an error'
        })

}

module.exports = getTheDay