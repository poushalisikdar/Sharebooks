const books = [
   
  
    {
        title: "Mathematics Mastery",
        authorname: "Arya Gupta",
        price: 700,
        edition: 2022,
      
        stream: "science",
        image: {
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1576506542790-51244b486a6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWR5fGVufDB8fDB8fHww",
        },
        location: "Mumbai",
        emailid: "mumbai.seller@example.com",
        whatsappno: 9876543211,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Biology Insights",
        authorname: "K. Sinha",
        price: 750,
        edition: 2023,
  
        stream: "science",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1497333558196-daaff02b56d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWR5fGVufDB8fDB8fHww",
        } ,
        location: "Kolkata",
        emailid: "kolkata.seller@example.com",
        whatsappno: 9876543212,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "History of Science",
        authorname: "P. Bose",
        price: 500,
        edition: 2021,
        
        stream: "arts",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZHl8ZW58MHx8MHx8fDA%3D",
        }, 
        location: "Bangalore",
        emailid: "bangalore.seller@example.com",
        whatsappno: 9876543213,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",

    },
    {
        title: "Computer Fundamentals",
        authorname: "S. Rao",
        price: 850,
        edition: 2024,
        
        stream: "science",
        image:{
            filename:"bookimage",
            url: "https://images.unsplash.com/photo-1502979932800-33d311b7ce56?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8fDA%3D",
        },
        location: "Chennai",
        emailid: "chennai.seller@example.com",
        whatsappno: 9876543214,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Advanced Physics",
        authorname: "R. Mishra",
        price: 900,
        edition: 2024,
    
        stream: "science",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1622673038079-de1ddac26c16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
        },
        location: "Pune",
        emailid: "pune.seller@example.com",
        whatsappno: 9876543215,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Organic Chemistry",
        authorname: "A. Patel",
        price: 600,
        edition: 2023,
       
        stream: "science",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1544822688-c5f41d2c1972?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2tzfGVufDB8fDB8fHww",
        },
        location: "Ahmedabad",
        emailid: "ahmedabad.seller@example.com",
        whatsappno: 9876543216,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "World History",
        authorname: "M. Iyer",
        price: 550,
        edition: 2022,
       
        stream: "arts",
        image: {
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1523865236457-3ae3358a4eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJvb2tzfGVufDB8fDB8fHww",
        },
            
        location: "Hyderabad",
        emailid: "hyderabad.seller@example.com",
        whatsappno: 9876543217,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
   
    {
        title: "Mechanical Engineering",
        authorname: "R. Verma",
        price: 1200,
        edition: 2023,
      
        stream: "science",
        image: {
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1622519624366-1b06e2f2aa0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2tzfGVufDB8fDB8fHww",
        },
        location: "Nagpur",
        emailid: "nagpur.seller@example.com",
        whatsappno: 9876543219,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Basic Electronics",
        authorname: "D. Kulkarni",
        price: 980,
        edition: 2024,
      
        stream: "science",
        image: {
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1618506429948-1746e6e8093f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJvb2tzfGVufDB8fDB8fHww",
        },
        location: "Lucknow",
        emailid: "lucknow.seller@example.com",
        whatsappno: 9876543220,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Environmental Studies",
        authorname: "G. Pillai",
        price: 400,
        edition: 2022,
     
        stream: "arts",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1616330682546-2468b2d8dd17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2tzfGVufDB8fDB8fHww",
        }, 
        location: "Bhopal",
        emailid: "bhopal.seller@example.com",
        whatsappno: 9876543221,
        condition: "Like new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
   
    {
        title: "Introduction to Economics",
        authorname: "V. Reddy",
        price: 400,
        edition: 2021,
  
        stream: "commerce",
        image:{
            filename:"bookimage",
            url:"https://images.unsplash.com/photo-1521056787327-165dc2a32836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2tzfGVufDB8fDB8fHww",
        }, 
        location: "Guwahati",
        emailid: "guwahati.seller@example.com",
        whatsappno: 9876543225,
        condition: "new",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
    {
        title: "Management Basics",
        authorname: "B. Acharya",
        price: 450,
        edition: 2023,
   
        stream: "commerce",
        image:{
            filename:"bookimage",
            url:"https://plus.unsplash.com/premium_photo-1677600122444-0281089cd932?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }, 
        location: "Ranchi",
        emailid: "ranchi.seller@example.com",
        whatsappno: 9876543226,
        condition: "fair",
        city: "Siliguri",
        description: "A well-preserved collection of classic literature.",
    },
   
   
];

module.exports = {data:books};
