import React from 'react'
import {Link} from "react-router-dom";

function Navigation() {
  return (
    
        
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/categories">Categories</Link></li>
                            <li><Link to="/plants">Plants</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                            <li><Link to="/reviews">Reviews</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/lessons">Lessons</Link></li>
                            <li><Link to="/sections">Sections</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/comments">Comments</Link></li>
                            
                            <li><Link to="/orders">Orders</Link></li>
                            
                        </ul>
      
  )
}

export default Navigation