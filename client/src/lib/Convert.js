export default{
    timeConvert: function (hours) {
        if (!hours || hours === "0:00") return "End"
        const firstSplit = hours.split(':')
        if (firstSplit[0] === "0") {
            if(firstSplit[1][0]==="0"){
                return firstSplit[1][1]
            }else{
                return firstSplit[1]
            }
        } else {
            return (parseInt(firstSplit[0]) * 60) + parseInt(firstSplit[1])
        }

    }
}