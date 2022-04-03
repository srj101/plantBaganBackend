import './App.css';
import Navigation from './Components/Navigation';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Plants from './Components/Pages/Plants';
import Home from './Components/Pages/Home';
import Courses from './Components/Pages/Courses';
import Lessons from './Components/Pages/Lessons';
import Orders from './Components/Pages/Orders';
import Reviews from './Components/Pages/Reviews';
import Sections from './Components/Pages/Sections';
import Users from './Components/Pages/Users';
import AddCourses from './Components/Pages/AddCourses';
import EditCourses from './Components/Pages/EditCourses';
import AddPlants from './Components/Pages/AddPlants';
import Categories from './Components/Pages/Categories';
import EditPlants from './Components/Pages/EditPlants';
import AddCategories from './Components/Pages/AddCategories';
import EditCategory from './Components/Pages/EditCategory';
import AddLesson from './Components/Pages/AddLesson';
import AddSection from './Components/Pages/AddSection';
import News from './Components/Pages/News';
import Comments from './Components/Pages/Comments';
import EditUser from './Components/Pages/EditUser';
import AddNews from './Components/Pages/AddNews';
import EditNews from './Components/Pages/EditNews';

function App() {
  return (
  <div className='app_content__area container-fluid'> 
    <Router>
      <Header/>
        <div className="row">
          <div className="navigation col-2"> 
          <Navigation/> 
          </div>
          <div className="app_content col-10">
            
              <Routes>
                <Route exact path="/" element={<Home/>} />
                
                <Route  path="/plants" element={<Plants/>} />
                <Route  path="/plants/create" element={<AddPlants/>} />
                <Route exact path="/plants/edit/:plantId" element={<EditPlants/>} />
                
                <Route  path="/courses" element={<Courses/>} />
                <Route  path="/courses/create" element={<AddCourses/>} />
                <Route exact path="/courses/edit/:courseId" element={<EditCourses/>} />
                
                <Route exact path="/lessons" element={<Lessons/>} />
                <Route exact path="/lessons/create" element={<AddLesson/>} />

                <Route exact path="/orders" element={<Orders/>} />
                <Route exact path="/reviews" element={<Reviews/>} />

                <Route exact path="/sections" element={<Sections/>} />
                <Route exact path="/sections/create" element={<AddSection/>} />
                
                <Route exact path="/users" element={<Users/>} />
                <Route exact path="/users/edit/:userId" element={<EditUser/>} />

                <Route exact path="/news" element={<News/>} />
                <Route exact path="/news/create" element={<AddNews/>} />
                <Route exact path="/news/edit/:newsId" element={<EditNews/>} />


                <Route exact path="/comments" element={<Comments/>} />
                
                <Route exact path="/categories" element={<Categories/>} />
                <Route exact path="/categories/create" element={<AddCategories/>} />
                <Route exact path="/categories/edit/:catId" element={<EditCategory/>} />
                <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
              </Routes>
            
          </div>
        </div>
      </Router>
    </div>
      
  );
}

export default App;
