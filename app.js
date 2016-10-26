var express = require("express"),
    app     = express();
    
app.set("view engine", "ejs");
app.get("/",function(req,res){
    
    res.render("index");
});

app.get("/:date",function(req,res){
    
    function convert(time){
      
      var date = new Date(time * 1000);
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      var day = date.getDate()
      var month = months[date.getMonth()];
      var year = date.getFullYear();
      var result =  month + " "+ day + ", " + year ;
      
      return result ;
  }
    
    var input = req.params.date;
    if(!isNaN(input)){
      var result = convert(input);
      var data = { unix: input, natural: result };
      res.json(data);
     }else{
      var natural = new Date(input);
      if(!isNaN(natural)){
          
          var unixTime = natural / 1000 ;
          var data = { unix: unixTime, natural: input };
          res.json(data);
      }
    else{
          res.json({unix: null, natural: null});

  }
     }
  
    
});
    
app.listen(process.env.PORT, process.env.IP);